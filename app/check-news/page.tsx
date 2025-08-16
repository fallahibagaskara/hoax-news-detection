'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, Gauge, Timer, FileText as FileTextIcon, ShieldAlert, ShieldCheck,
  Link2, Type, Copy, ChevronDown, ChevronUp,
} from 'lucide-react'

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
  'kompas.com', 'cnnindonesia.com', 'tempo.co', 'detik.com',
  'liputan6.com', 'tribunnews.com', 'kumparan.com',
]

// Helpers
function getHost(urlStr: string): string | null {
  try {
    const u = new URL(urlStr)
    const host = u.host.toLowerCase()
    return host.startsWith('www.') ? host.slice(4) : host
  } catch { return null }
}
function isSupportedHost(host: string): boolean {
  return SUPPORTED_DOMAINS.some(d => host === d || host.endsWith('.' + d))
}
function countSentences(txt: string): number {
  return (txt || '').split(/[\.\!\?\n]+/g).map(s => s.trim()).filter(s => s.length > 3).length
}
function formatMs(ms: number | null): string {
  if (!ms || ms <= 0) return '—'
  if (ms < 1000) return `${Math.round(ms)} ms`
  return `${(ms / 1000).toFixed(1)} s`
}
function formatDecimal(p?: number) {
  if (p == null || Number.isNaN(p)) return '—';
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(p);
}


export default function CheckNewsPage() {
  const [mode, setMode] = useState<Mode>('url')
  const [url, setUrl] = useState('')
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resultUrl, setResultUrl] = useState<PredictRespUrl | null>(null)
  const [resultText, setResultText] = useState<PredictRespText | null>(null)
  const [latencyMs, setLatencyMs] = useState<number | null>(null)

  // UI state: expand/collapse konten panjang
  const [showFullContent, setShowFullContent] = useState(false)

  const canSubmit = useMemo(() => (mode === 'url' ? url.trim().length > 0 : text.trim().length > 0), [mode, url, text])
  const activeResult = mode === 'url' ? resultUrl : resultText

  const confidencePct = useMemo(() => {
    const r = activeResult
    if (!r) return 0
    const isHoaxLocal = r.label === 1
    const prob = isHoaxLocal ? r.p_hoax : r.p_valid
    return Math.round(prob * 100)
  }, [activeResult])

  const hoaxScore = useMemo(() => {
    const r = activeResult
    if (!r) return 0
    return (r as any).p_hoax
  }, [activeResult])

  const isHoax = useMemo(() => (activeResult ? activeResult.label === 1 : false), [activeResult])

  const sentenceCount = useMemo(() => {
    if (mode === 'url') return resultUrl?.content ? countSentences(resultUrl.content) : 0
    return text ? countSentences(text) : 0
  }, [mode, resultUrl, text])

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setIsLoading(true)
    setError(null)
    setResultUrl(null)
    setResultText(null)
    setLatencyMs(null)
    setShowFullContent(false)

    const t0 = performance.now()
    try {
      if (mode === 'url') {
        const host = getHost(url)
        if (!host) throw new Error('URL tidak valid.')
        if (!isSupportedHost(host)) throw new Error(`Domain "${host}" belum didukung. Situs yang didukung: ${SUPPORTED_DOMAINS.join(', ')}`)

        const res = await fetch(`${API_BASE}/predict_url`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url }),
        })
        if (!res.ok) throw new Error((await res.text().catch(() => '')) || `API error ${res.status}`)
        const data: PredictRespUrl = await res.json()
        setResultUrl(data)
      } else {
        if (!text.trim()) throw new Error('Konten artikel berita tidak boleh kosong.')
        const res = await fetch(`${API_BASE}/predict`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }),
        })
        if (!res.ok) throw new Error((await res.text().catch(() => '')) || `API error ${res.status}`)
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
    setUrl(''); setText(''); setResultUrl(null); setResultText(null); setError(null); setLatencyMs(null); setShowFullContent(false)
  }

  const host = getHost(url)

  return (
    <div className="min-h-screen w-full bg-white relative">
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
            radial-gradient(circle 500px at 0% 20%, rgba(139,92,246,0.3), transparent),
            radial-gradient(circle 500px at 100% 0%, rgba(59,130,246,0.3), transparent)
          `,
          backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
        }}
      />
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-8 relative z-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Cek Artikel Berita</h1>
            <p className="text-sm text-muted-foreground">Verifikasi awal berbasis IndoBERT—hasil bersifat probabilistik.</p>
          </div>
          <Button asChild variant="ghost" className="rounded-xl hidden sm:flex">
            <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Kembali</Link>
          </Button>
        </div>

        {/* === FORM CARD (glassy + modern inputs) === */}
        <Card className="max-w-7xl mx-auto rounded-2xl border bg-white/70 backdrop-blur-md dark:bg-white/10">
          <CardHeader>
            <CardTitle>Masukan & Mode Analisis</CardTitle>
            <CardDescription>
              Tempel URL atau teks lalu jalankan deteksi. Domain yang didukung tercantum di bawah.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>

              <TabsList>
                <TabsTrigger value="url">Lewat URL</TabsTrigger>
                <TabsTrigger value="text">Lewat Isi Artikel Berita</TabsTrigger>
              </TabsList>

              {/* Tab: URL */}
              <TabsContent value="url" className="mt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="group relative">
                    <Label htmlFor="newsUrl" className="mb-1.5 block text-sm">Tautan Artikel Berita</Label>
                    <div className="
                    relative rounded-xl border bg-white/60 backdrop-blur
                    transition ring-0
                  ">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Link2 className="h-4.5 w-4.5" />
                      </span>
                      <Input
                        id="newsUrl"
                        placeholder="https://www.kompas.com/cekfakta/read/2024/..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="h-12 bg-transparent pl-10 pr-3 focus-visible:ring-0"
                      />
                    </div>

                    {/* Host chip + favicon (kalau ada) */}
                    {host && (
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        {/* pakai img biasa agar tidak blocking build */}
                        <img
                          src={`https://www.google.com/s2/favicons?sz=32&domain=${host}`}
                          alt=""
                          width={16}
                          height={16}
                          className="rounded"
                        />
                        <span className={`${isSupportedHost(host) ? 'text-emerald-600' : 'text-amber-600'} font-medium`}>
                          {host} {isSupportedHost(host) ? '(didukung)' : '(tidak didukung)'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <div className="mb-2">Situs yang didukung:</div>
                    <div className="flex flex-wrap gap-2">
                      {SUPPORTED_DOMAINS.map((d) => (<Badge key={d} variant="secondary">{d}</Badge>))}
                    </div>
                  </div>
                </form>
              </TabsContent>

              {/* Tab: TEXT */}
              <TabsContent value="text" className="mt-4">
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div className="group">
                    <div className="mb-1.5 flex items-center justify-between">
                      <Label htmlFor="newsBody" className="text-sm">Isi Artikel Berita</Label>
                      <span className="text-xs text-muted-foreground">{text.trim().length.toLocaleString()} karakter</span>
                    </div>
                    <div className="
                    relative rounded-xl border bg-white/60 backdrop-blur
                    transition
                  ">
                      <span className="pointer-events-none absolute left-3 top-3 text-muted-foreground">
                        <Type className="h-4.5 w-4.5" />
                      </span>
                      <Textarea
                        id="newsBody"
                        placeholder="Tempelkan isi artikel berita di sini…"
                        value={text}
                        rows={14}
                        onChange={(e) => setText(e.target.value)}
                        className="min-h-[180px] bg-transparent pl-10 pr-3 pt-2 focus-visible:ring-0"
                      />
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Perkiraan kalimat: <span className="font-medium">{countSentences(text)}</span>
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

        {/* === LOADING CARD === */}
        {isLoading && (
          <Card className="mt-8 max-w-7xl mx-auto rounded-2xl border bg-white/70 backdrop-blur-md dark:bg-white/10">
            <CardHeader><CardTitle>Menganalisis…</CardTitle></CardHeader>
            <CardContent>
              <Progress value={66} className="w-full" />
              <p className="text-center mt-4 text-sm text-muted-foreground">Mengambil & menganalisis konten…</p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-lg border bg-white/60 p-3 text-center backdrop-blur dark:bg-white/10">
                  <div className="text-xs text-muted-foreground">Skor Hoaks</div>
                  <div className="text-sm font-semibold">—</div>
                </div>
                <div className="rounded-lg border bg-white/60 p-3 text-center backdrop-blur dark:bg-white/10">
                  <div className="text-xs text-muted-foreground">Kalimat Dicek</div>
                  <div className="text-sm font-semibold">{mode === 'url' ? '—' : countSentences(text)}</div>
                </div>
                <div className="rounded-lg border bg-white/60 p-3 text-center backdrop-blur dark:bg-white/10">
                  <div className="text-xs text-muted-foreground">Waktu</div>
                  <div className="text-sm font-semibold">{formatMs(latencyMs)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* === ERROR CARD === */}
        {error && (
          <Card className="mt-8 max-w-7xl mx-auto rounded-2xl border-red-200 bg-red-50/80 dark:bg-red-400/10">
            <CardHeader><CardTitle className="text-red-600">Terjadi Kesalahan</CardTitle></CardHeader>
            <CardContent><p className="text-red-600 whitespace-pre-wrap">{error}</p></CardContent>
          </Card>
        )}

        {/* === HASIL: URL === */}
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
              </div>
            </CardHeader>
            <CardContent>
              {/* Confidence */}
              <Progress
                value={confidencePct}
                className={`w-full mb-2 ${isHoax
                  ? '[&>div]:bg-red-500'
                  : '[&>div]:bg-emerald-500'
                  }`}
              />
              <div
                className={`mt-4 rounded-xl border p-4 mb-4 ${isHoax
                  ? 'border-red-500/20 bg-red-500/5'
                  : 'border-emerald-500/20 bg-emerald-500/5'
                  }`}
              >
                <div className="flex items-center gap-2">
                  {isHoax ? (
                    <ShieldAlert className="h-4 w-4 text-red-600" />
                  ) : (
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  )}
                  <span
                    className={`text-sm font-semibold ${isHoax ? 'text-red-600' : 'text-emerald-600'
                      }`}
                  >
                    Prediksi: {isHoax ? 'Hoaks' : 'Valid'} ({confidencePct}%)
                  </span>
                </div>
                {/* <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
    {isHoax
      ? 'Model mendeteksi pola khas hoaks/penipuan...'
      : 'Sinyal bahasa provokatif rendah; sumber rujukan konsisten; struktur klaim faktual.'}
  </p> */}
              </div>

              {/* Micro-metrics */}
              <div className="mb-6 grid grid-cols-3 gap-3">

                <Metric label="Skor Hoaks" value={`${formatDecimal(hoaxScore)}`} icon={<Gauge className="h-3.5 w-3.5" />} tone="emerald" />
                <Metric label="Kalimat Dicek" value={sentenceCount.toString()} icon={<FileTextIcon className="h-3.5 w-3.5" />} tone="sky" />
                <Metric label="Waktu" value={formatMs(latencyMs)} icon={<Timer className="h-3.5 w-3.5" />} tone="amber" />
              </div>

              {/* Preview judul + konten (modern, collapsible, copy) */}
              <PreviewBlock
                title="Judul artikel berita"
                body={resultUrl.title}
                onCopy={() => navigator.clipboard.writeText(resultUrl.title)}
              />
              <PreviewBlock
                title="Konten artikel berita"
                body={resultUrl.content}
                onCopy={() => navigator.clipboard.writeText(resultUrl.content)}
                collapsible
                expanded={showFullContent}
                onToggle={() => setShowFullContent(v => !v)}
              />
            </CardContent>
          </Card>
        )}

        {/* === HASIL: TEXT === */}
        {resultText && !error && mode === 'text' && (
          <Card className="mt-8 max-w-7xl mx-auto rounded-2xl border bg-white/70 backdrop-blur-md dark:bg-white/10">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <CardTitle>Hasil Analisis</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Progress
                value={confidencePct}
                className={`w-full mb-2 ${isHoax
                  ? '[&>div]:bg-red-500'
                  : '[&>div]:bg-emerald-500'
                  }`}
              />
              <div
                className={`mt-4 rounded-xl border p-4 mb-4 ${isHoax
                  ? 'border-red-500/20 bg-red-500/5'
                  : 'border-emerald-500/20 bg-emerald-500/5'
                  }`}
              >
                <div className="flex items-center gap-2">
                  {isHoax ? (
                    <ShieldAlert className="h-4 w-4 text-red-600" />
                  ) : (
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  )}
                  <span
                    className={`text-sm font-semibold ${isHoax ? 'text-red-600' : 'text-emerald-600'
                      }`}
                  >
                    Prediksi: {isHoax ? 'Hoaks' : 'Valid'} ({confidencePct}%)
                  </span>
                </div>
                {/* <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
    {isHoax
      ? 'Model mendeteksi pola khas hoaks/penipuan...'
      : 'Sinyal bahasa provokatif rendah; sumber rujukan konsisten; struktur klaim faktual.'}
  </p> */}
              </div>

              <div className="mb-4 grid grid-cols-3 gap-3">
                <Metric label="Skor Hoaks" value={`${formatDecimal(hoaxScore)}`} icon={<Gauge className="h-3.5 w-3.5" />} tone="emerald" />
                <Metric label="Kalimat Dicek" value={sentenceCount.toString()} icon={<FileTextIcon className="h-3.5 w-3.5" />} tone="sky" />
                <Metric label="Waktu" value={formatMs(latencyMs)} icon={<Timer className="h-3.5 w-3.5" />} tone="amber" />
              </div>

              <PreviewBlock
                title="Konten pemeriksaan"
                body={text}
                onCopy={() => navigator.clipboard.writeText(text)}
                collapsible
                expanded={showFullContent}
                onToggle={() => setShowFullContent(v => !v)}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

/* ---------- Small UI atoms for cleanliness ---------- */

function Metric({
  label, value, icon, tone = 'emerald',
}: { label: string; value: string; icon: React.ReactNode; tone?: 'emerald' | 'sky' | 'amber' }) {
  const toneMap = {
    emerald: 'bg-emerald-500/10',
    sky: 'bg-sky-500/10',
    amber: 'bg-amber-500/10',
  } as const
  return (
    <div className="rounded-lg border bg-white/60 p-3 text-center backdrop-blur dark:bg-white/10">
      <div className={`mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded ${toneMap[tone]}`}>{icon}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  )
}

function PreviewBlock({
  title, body, onCopy, collapsible = false, expanded = false, onToggle,
}: {
  title: string; body: string; onCopy: () => void;
  collapsible?: boolean; expanded?: boolean; onToggle?: () => void;
}) {
  const clamped = !expanded && collapsible
  return (
    <div className="mb-4 rounded-xl border bg-white/60 p-3 sm:p-4 backdrop-blur dark:bg-white/10">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h4 className="text-sm font-semibold">{title}</h4>
        <div className="flex items-center gap-2">
          {collapsible && (
            <Button size="sm" variant="ghost" className="h-8 rounded-lg px-2" onClick={onToggle}>
              {expanded ? <ChevronUp className="mr-1 h-4 w-4" /> : <ChevronDown className="mr-1 h-4 w-4" />}
              <span className="text-xs">{expanded ? 'Sembunyikan' : 'Tampilkan'}</span>
            </Button>
          )}
          <Button size="sm" variant="secondary" className="h-8 rounded-lg px-2" onClick={onCopy}>
            <Copy className="mr-1 h-4 w-4" />
            <span className="text-xs">Salin</span>
          </Button>
        </div>
      </div>
      <blockquote
        className={`
          relative rounded-lg bg-muted p-3 text-sm leading-relaxed text-muted-foreground
          ${clamped ? 'line-clamp-6' : ''}
        `}
      >
        {body || '—'}
      </blockquote>
    </div>
  )
}
