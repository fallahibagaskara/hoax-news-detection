'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

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
  label: number      // 0=valid, 1=hoax
  p_valid: number
  p_hoax: number
  source: string     // domain
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

// Hardcode daftar situs yang didukung (FE)
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

export default function CheckNewsPage() {
  const [mode, setMode] = useState<Mode>('url')

  const [url, setUrl] = useState('')
  const [text, setText] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [resultUrl, setResultUrl] = useState<PredictRespUrl | null>(null)
  const [resultText, setResultText] = useState<PredictRespText | null>(null)

  const canSubmit = useMemo(() => {
    return mode === 'url' ? url.trim().length > 0 : text.trim().length > 0
  }, [mode, url, text])

  const confidencePct = useMemo(() => {
    const r = mode === 'url' ? resultUrl : resultText
    if (!r) return 0
    const isHoax = r.label === 1
    const prob = isHoax ? r.p_hoax : r.p_valid
    return Math.round(prob * 100)
  }, [mode, resultUrl, resultText])

  const isHoax = useMemo(() => {
    const r = mode === 'url' ? resultUrl : resultText
    return r ? r.label === 1 : false
  }, [mode, resultUrl, resultText])

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setIsLoading(true)
    setError(null)
    setResultUrl(null)
    setResultText(null)

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
        if (!text.trim()) throw new Error('Isi berita tidak boleh kosong.')

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
    } catch (err: any) {
      setError(err?.message || 'Gagal memanggil API.')
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
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
        </Link>
      </Button>

      <Card className="max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle>Cek Berita</CardTitle>
          <CardDescription>Pilih salah satu: tempel URL artikel dari situs yang didukung, atau masukkan isi berita langsung.</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
            <TabsList>
              <TabsTrigger value="url">Lewat URL</TabsTrigger>
              <TabsTrigger value="text">Lewat Isi Berita</TabsTrigger>
            </TabsList>

            {/* Tab: URL */}
            <TabsContent value="url" className="mt-4">
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="newsUrl">Tautan Berita</Label>
                    <Input
                      id="newsUrl"
                      placeholder="Contoh: https://www.kompas.com/cekfakta/read/2024/07/22/184000382/..."
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
                    <Label htmlFor="newsBody">Isi Berita</Label>
                    <Textarea
                      id="newsBody"
                      placeholder="Tempelkan isi berita di sini…"
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
          <Button variant="outline" onClick={resetAll}>Hapus</Button>
          <Button onClick={() => handleSubmit()} disabled={isLoading || !canSubmit}>
            {isLoading ? <Spinner /> : 'Cek Berita'}
          </Button>
        </CardFooter>
      </Card>

      {isLoading && (
        <Card className="mt-8 max-w-7xl mx-auto">
          <CardHeader><CardTitle>Menganalisis...</CardTitle></CardHeader>
          <CardContent>
            <Progress value={66} className="w-full" />
            <p className="text-center mt-4">Mengambil & menganalisis konten…</p>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="mt-8 max-w-7xl mx-auto border-red-500">
          <CardHeader><CardTitle className="text-red-600">Terjadi Kesalahan</CardTitle></CardHeader>
          <CardContent><p className="text-red-500 whitespace-pre-wrap">{error}</p></CardContent>
        </Card>
      )}

      {/* Hasil (mode URL) */}
      {resultUrl && !error && mode === 'url' && (
        <Card className="mt-8 max-w-7xl mx-auto">
          <CardHeader>
            <CardTitle>Hasil Analisis</CardTitle>
            <CardDescription>
              Sumber: {resultUrl.source} · Teks terekstrak: {resultUrl.extracted_chars} karakter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-lg font-semibold mb-2 ${isHoax ? 'text-red-500' : 'text-green-500'}`}>
              Berita ini kemungkinan besar {isHoax ? 'hoaks' : 'bukan hoaks'}.
            </div>
            <Progress value={confidencePct} className="w-full mb-2" />
            <p className="mb-4">Keyakinan: {confidencePct}%</p>
            <div className="text-sm text-muted-foreground">
              Judul artikel:
              <blockquote className="mt-2 p-3 bg-muted rounded-lg">{resultUrl.title}</blockquote>
              Isi artikel:
              <blockquote className="mt-2 p-3 bg-muted rounded-lg">{resultUrl.content}</blockquote>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hasil (mode TEXT) */}
      {resultText && !error && mode === 'text' && (
        <Card className="mt-8 max-w-7xl mx-auto">
          <CardHeader><CardTitle>Hasil Analisis</CardTitle></CardHeader>
          <CardContent>
            <div className={`text-lg font-semibold mb-2 ${isHoax ? 'text-red-500' : 'text-green-500'}`}>
              Teks ini kemungkinan besar {isHoax ? 'hoaks' : 'bukan hoaks'}.
            </div>
            <Progress value={confidencePct} className="w-full mb-2" />
            <p className="mb-4">Keyakinan: {confidencePct}%</p>
            <p className="text-sm text-muted-foreground">
              {isHoax
                ? 'Model mendeteksi pola khas hoaks/penipuan (ajakan, janji hadiah, klaim bombastis, dll).'
                : 'Model menilai teks ini konsisten dengan gaya artikel faktual yang terverifikasi.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
