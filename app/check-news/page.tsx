'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Gauge, Timer, FileText as FileTextIcon, ShieldAlert, ShieldCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

type PredictRespUrl = {
  label: number
  p_valid: number
  p_hoax: number
  source: string
  extracted_chars: number
  title: string
  content: string
}

type PredictRespText = {
  label: number
  p_valid: number
  p_hoax: number
}

type Mode = 'url' | 'text'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://127.0.0.1:8000'

const SUPPORTED_DOMAINS = [
  'kompas.com',
  'cnnindonesia.com',
  'tempo.co',
  'detik.com',
  'liputan6.com',
  'tribunnews.com',
  'kumparan.com',
]

// Helpers
function getHost(urlStr: string): string | null {
  try {
    const u = new URL(urlStr)
    const host = u.host.toLowerCase()
    return host.startsWith('www.') ? host.slice(4) : host
  } catch {
    return null
  }
}

function isSupportedHost(host: string): boolean {
  return SUPPORTED_DOMAINS.some(d => host === d || host.endsWith('.' + d))
}

function countSentences(txt: string): number {
  // rough heuristic: split by ., !, ?, and newlines; filter out short fragments
  return (txt || '')
    .split(/[\.\!\?\n]+/g)
    .map(s => s.trim())
    .filter(s => s.length > 3).length
}

function formatMs(ms: number | null): string {
  if (!ms || ms <= 0) return '—'
  if (ms < 1000) return `${Math.round(ms)} ms`
  return `${(ms / 1000).toFixed(1)} s`
}

export default function CheckNewsPage() {
  const [mode, setMode] = useState<Mode>('url')

  const [url, setUrl] = useState('')
  const [text, setText] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [resultUrl, setResultUrl] = useState<PredictRespUrl | null>(null)
  const [resultText, setResultText] = useState<PredictRespText | null>(null)

  // New: client-side timing
  const [latencyMs, setLatencyMs] = useState<number | null>(null)

  const canSubmit = useMemo(() => {
    return mode === 'url' ? url.trim().length > 0 : text.trim().length > 0
  }, [mode, url, text])

  const activeResult = mode === 'url' ? resultUrl : resultText

  const confidencePct = useMemo(() => {
    const r = activeResult
    if (!r) return 0
    const isHoaxLocal = r.label === 1
    const prob = isHoaxLocal ? r.p_hoax : r.p_valid
    return Math.round(prob * 100)
  }, [activeResult])

  const hoaxScorePct = useMemo(() => {
    const r = activeResult
    if (!r) return 0
    return Math.round((r as any).p_hoax * 100)
  }, [activeResult])

  const isHoax = useMemo(() => {
    const r = activeResult
    return r ? r.label === 1 : false
  }, [activeResult])

  const sentenceCount = useMemo(() => {
    if (mode === 'url') {
      return resultUrl?.content ? countSentences(resultUrl.content) : 0
    }
    return text ? countSentences(text) : 0
  }, [mode, resultUrl, text])

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setIsLoading(true)
    setError(null)
    setResultUrl(null)
    setResultText(null)
    setLatencyMs(null)

    const t0 = performance.now()
    try {
      if (mode === 'url') {
        const host = getHost(url)
        if (!host) throw new Error('URL tidak valid.')
        if (!isSupportedHost(host)) {
          throw new Error(`Domain "${host}" belum didukung. Situs yang didukung: ${SUPPORTED_DOMAINS.join(', ')}`)
        }

        const res = await fetch(`${API_BASE}/predict_url`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        })
        if (!res.ok) {
          const t = await res.text().catch(() => '')
          throw new Error(t || `API error ${res.status}`)
        }
        const data: PredictRespUrl = await res.json()
        setResultUrl(data)
      } else {
        if (!text.trim()) throw new Error('Konten artikel berita tidak boleh kosong.')

        const res = await fetch(`${API_BASE}/predict`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        })
        if (!res.ok) {
          const t = await res.text().catch(() => '')
          throw new Error(t || `API error ${res.status}`)
        }
        const data: PredictRespText = await res.json()
        setResultText(data)
      }
      setLatencyMs(performance.now() - t0)
    } catch (err: any) {
      setError(err?.message || 'Gagal memanggil API.')
      setLatencyMs(performance.now() - t0)
    } finally {
      setIsLoading(false)
    }
  }

  const resetAll = () => {
    setUrl('')
    setText('')
    setResultUrl(null)
    setResultText(null)
    setError(null)
    setLatencyMs(null)
  }

  return (
    <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-8">
      <Button asChild variant="ghost" className="mb-6 rounded-xl">
        <Link href="/">
          <ArrowLeft className="mr-2 h-5 w-5" /> Kembali
        </Link>
      </Button>

      <Card className="max-w-7xl mx-auto rounded-2xl border bg-white/70 backdrop-blur-md dark:bg-white/10">
        <CardHeader>
          <CardTitle>Cek Artikel Berita</CardTitle>
          <CardDescription>Pilih salah satu: tempel URL dari situs yang didukung, atau masukkan isi artikel langsung.</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
            <TabsList>
              <TabsTrigger value="url">Lewat URL</TabsTrigger>
              <TabsTrigger value="text">Lewat Isi Artikel Berita</TabsTrigger>
            </TabsList>

            {/* Tab: URL */}
            <TabsContent value="url" className="mt-4">
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="newsUrl">Tautan Artikel Berita</Label>
                    <Input
                      id="newsUrl"
                      placeholder="https://www.kompas.com/cekfakta/read/2024/..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <div className="mb-2">Situs yang didukung:</div>
                    <div className="flex flex-wrap gap-2">
                      {SUPPORTED_DOMAINS.map((d) => (
                        <Badge key={d} variant="secondary">{d}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </form>
            </TabsContent>

            {/* Tab: TEXT */}
            <TabsContent value="text" className="mt-4">
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="newsBody">Isi Artikel Berita</Label>
                    <Textarea
                      id="newsBody"
                      placeholder="Tempelkan isi artikel berita di sini…"
                      value={text}
                      rows={18}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={resetAll} className="rounded-xl">Hapus</Button>
          <Button onClick={() => handleSubmit()} disabled={isLoading || !canSubmit} className="rounded-xl">
            {isLoading ? <Spinner /> : 'Cek Artikel Berita'}
          </Button>
        </CardFooter>
      </Card>

      {isLoading && (
        <Card className="mt-8 max-w-7xl mx-auto rounded-2xl border bg-white/70 backdrop-blur-md dark:bg-white/10">
          <CardHeader><CardTitle>Menganalisis…</CardTitle></CardHeader>
          <CardContent>
            <Progress value={66} className="w-full" />
            <p className="text-center mt-4 text-sm text-muted-foreground">Mengambil & menganalisis konten…</p>
            {/* live micro-metrics while loading */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-lg border bg-white/60 p-3 text-center backdrop-blur dark:bg-white/10">
                <div className="text-xs text-muted-foreground">Skor Hoaks</div>
                <div className="text-sm font-semibold">—</div>
              </div>
              <div className="rounded-lg border bg-white/60 p-3 text-center backdrop-blur dark:bg-white/10">
                <div className="text-xs text-muted-foreground">Kalimat Dicek</div>
                <div className="text-sm font-semibold">
                  {mode === 'url' ? '—' : countSentences(text)}
                </div>
              </div>
              <div className="rounded-lg border bg-white/60 p-3 text-center backdrop-blur dark:bg-white/10">
                <div className="text-xs text-muted-foreground">Waktu</div>
                <div className="text-sm font-semibold">{formatMs(latencyMs)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="mt-8 max-w-7xl mx-auto rounded-2xl border-red-200 bg-red-50/80 dark:bg-red-400/10">
          <CardHeader><CardTitle className="text-red-600">Terjadi Kesalahan</CardTitle></CardHeader>
          <CardContent><p className="text-red-600 whitespace-pre-wrap">{error}</p></CardContent>
        </Card>
      )}

      {/* Hasil (mode URL) */}
      {resultUrl && !error && mode === 'url' && (
        <Card className="mt-8 max-w-7xl mx-auto rounded-2xl border bg-white/70 backdrop-blur-md dark:bg-white/10">
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle>Hasil Analisis</CardTitle>
                <CardDescription>
                  Sumber: {resultUrl.source} · Teks terekstrak: {resultUrl.extracted_chars.toLocaleString()} karakter
                </CardDescription>
              </div>
              <Badge variant={isHoax ? 'destructive' : 'success'} className="rounded-full px-3 py-1 text-xs">
                {isHoax ? <ShieldAlert className="mr-1 h-3.5 w-3.5" /> : <ShieldCheck className="mr-1 h-3.5 w-3.5" />}
                {isHoax ? 'Prediksi: Hoaks' : 'Prediksi: Valid'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-lg font-semibold">
              Artikel berita ini kemungkinan besar {isHoax ? <span className="text-red-600">hoaks</span> : <span className="text-emerald-600">bukan hoaks</span>}.
            </div>

            {/* Confidence bar */}
            <Progress value={confidencePct} className="w-full mb-2" />
            <p className="mb-4 text-sm text-muted-foreground">Keyakinan: {confidencePct}%</p>

            {/* Micro-metrics (match hero) */}
            <div className="mb-6 grid grid-cols-3 gap-3">
              <div className="rounded-lg border bg-white/60 p-3 text-center backdrop-blur dark:bg-white/10">
                <div className="mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded bg-emerald-500/10"><Gauge className="h-3.5 w-3.5" /></div>
                <div className="text-xs text-muted-foreground">Skor Hoaks</div>
                <div className="text-sm font-semibold">{hoaxScorePct}%</div>
              </div>
              <div className="rounded-lg border bg-white/60 p-3 text-center backdrop-blur dark:bg-white/10">
                <div className="mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded bg-sky-500/10"><FileTextIcon className="h-3.5 w-3.5" /></div>
                <div className="text-xs text-muted-foreground">Kalimat Dicek</div>
                <div className="text-sm font-semibold">{sentenceCount}</div>
              </div>
              <div className="rounded-lg border bg-white/60 p-3 text-center backdrop-blur dark:bg-white/10">
                <div className="mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded bg-amber-500/10"><Timer className="h-3.5 w-3.5" /></div>
                <div className="text-xs text-muted-foreground">Waktu</div>
                <div className="text-sm font-semibold">{formatMs(latencyMs)}</div>
              </div>
            </div>

            {/* Content preview */}
            <div className="text-sm text-muted-foreground">
              Judul artikel berita:
              <blockquote className="mt-2 p-3 bg-muted rounded-lg">{resultUrl.title}</blockquote>
              Konten artikel berita:
              <blockquote className="mt-2 p-3 bg-muted rounded-lg whitespace-pre-wrap">{resultUrl.content}</blockquote>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hasil (mode TEXT) */}
      {resultText && !error && mode === 'text' && (
        <Card className="mt-8 max-w-7xl mx-auto rounded-2xl border bg-white/70 backdrop-blur-md dark:bg-white/10">
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <CardTitle>Hasil Analisis</CardTitle>
              <Badge variant={isHoax ? 'destructive' : 'default'} className="rounded-full px-3 py-1 text-xs">
                {isHoax ? <ShieldAlert className="mr-1 h-3.5 w-3.5" /> : <ShieldCheck className="mr-1 h-3.5 w-3.5" />}
                {isHoax ? 'Prediksi: Hoaks' : 'Prediksi: Valid'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-lg font-semibold mb-2 ${isHoax ? 'text-red-600' : 'text-emerald-600'}`}>
              Teks ini kemungkinan besar {isHoax ? 'hoaks' : 'bukan hoaks'}.
            </div>
            <Progress value={confidencePct} className="w-full mb-2" />
            <p className="mb-4 text-sm text-muted-foreground">Keyakinan: {confidencePct}%</p>

            {/* Micro-metrics */}
            <div className="mb-4 grid grid-cols-3 gap-3">
              <div className="rounded-lg border bg-white/60 p-3 text-center backdrop-blur dark:bg-white/10">
                <div className="mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded bg-emerald-500/10"><Gauge className="h-3.5 w-3.5" /></div>
                <div className="text-xs text-muted-foreground">Skor Hoaks</div>
                <div className="text-sm font-semibold">{hoaxScorePct}%</div>
              </div>
              <div className="rounded-lg border bg-white/60 p-3 text-center backdrop-blur dark:bg-white/10">
                <div className="mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded bg-sky-500/10"><FileTextIcon className="h-3.5 w-3.5" /></div>
                <div className="text-xs text-muted-foreground">Kalimat Dicek</div>
                <div className="text-sm font-semibold">{sentenceCount}</div>
              </div>
              <div className="rounded-lg border bg-white/60 p-3 text-center backdrop-blur dark:bg-white/10">
                <div className="mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded bg-amber-500/10"><Timer className="h-3.5 w-3.5" /></div>
                <div className="text-xs text-muted-foreground">Waktu</div>
                <div className="text-sm font-semibold">{formatMs(latencyMs)}</div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              {isHoax
                ? 'Model mendeteksi pola khas hoaks/penipuan (ajakan, janji hadiah, klaim bombastis, dll).'
                : 'Model menilai teks ini konsisten dengan gaya artikel berita faktual yang terverifikasi.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
