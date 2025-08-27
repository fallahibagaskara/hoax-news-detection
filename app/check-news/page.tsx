'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, Gauge, Timer, FileText as FileTextIcon, ShieldAlert, ShieldCheck,
  Link2, Type, Copy, ChevronDown, ChevronUp, CalendarDays, Tag,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Spinner } from '@/components/ui/spinner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

type PredictRespCommon = {
  label: number
  p_valid: number
  p_hoax: number
  title: string
  content: string
  category: string
  verdict: string
  confidence: number
  reasons: string[]
  credibility_score: number
  published_at?: string
  total_sentences: number
  inference_ms: number
  total_ms: number
}

type PredictRespUrl = PredictRespCommon & {
  source: string
  extracted_chars: number
  extraction_ms?: number
}

type PredictRespText = PredictRespCommon & {
  source?: string
  extracted_chars?: number
}

type Mode = 'url' | 'text'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://127.0.0.1:8000'

const SUPPORTED_DOMAINS = [
  'kompas.com', 'cnnindonesia.com', 'tempo.co', 'detik.com',
  'liputan6.com', 'tribunnews.com', 'kumparan.com', 'antaranews.com',
]

// ---------- utils ----------
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

function formatMs(ms?: number | null): string {
  if (ms == null || ms <= 0) return '—'
  if (ms < 1000) return `${Math.round(ms)} ms`
  return `${(ms / 1000).toFixed(1)} s`
}

function formatDecimal(p?: number) {
  if (p == null || Number.isNaN(p)) return '—'
  return new Intl.NumberFormat('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(p)
}

function normalizeDateString(str: string) {
  return str.replace(/T(\d{2})-(\d{2})-(\d{2})Z/, "T$1:$2:$3Z")
}

function formatDate(str?: string) {
  if (!str) return '—'
  try {
    const fixed = normalizeDateString(str)
    const date = new Date(fixed)
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }) + " " + date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return "—"
  }
}

function formatPercent(prob?: number) {
  if (prob == null) return 0
  return parseFloat((prob * 100).toFixed(2))
}

const toneByCategory: Record<string, string> = {
  politik: 'bg-red-500/10 text-red-700 dark:text-red-300',
  ekonomi: 'bg-green-500/10 text-green-700 dark:text-green-300',
  bisnis: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300',
  hukum: 'bg-orange-500/10 text-orange-700 dark:text-orange-300',
  internasional: 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
  olahraga: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
  hiburan: 'bg-pink-500/10 text-pink-700 dark:text-pink-300',
  tekno: 'bg-purple-500/10 text-purple-700 dark:text-purple-300',
  otomotif: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
  kesehatan: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  pendidikan: 'bg-lime-500/10 text-lime-700 dark:text-lime-300',
  sains: 'bg-sky-500/10 text-sky-700 dark:text-sky-300',
  lifestyle: 'bg-rose-500/10 text-rose-700 dark:text-rose-300',
  umum: 'bg-gray-500/10 text-gray-700 dark:text-gray-300',
}

export default function CheckNewsPage() {
  const [mode, setMode] = useState<Mode>('url')
  const [url, setUrl] = useState('')
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resultUrl, setResultUrl] = useState<PredictRespUrl | null>(null)
  const [resultText, setResultText] = useState<PredictRespText | null>(null)
  const [showFullContent, setShowFullContent] = useState(false)

  const activeResult = mode === 'url' ? resultUrl : resultText
  const canSubmit = useMemo(() => (mode === 'url' ? url.trim().length > 0 : text.trim().length > 0), [mode, url, text])

  const confidencePct = useMemo(() => {
    const r = activeResult
    if (!r) return 0
    const prob = (r.label === 1 ? r.p_hoax : r.p_valid) || 0
    return formatPercent(prob)
  }, [activeResult])

  const hoaxScore = useMemo(() => (activeResult ? activeResult.p_hoax ?? 0 : 0), [activeResult])
  const isHoax = useMemo(() => !!activeResult && activeResult.label === 1, [activeResult])
  const sentenceCount = activeResult?.total_sentences ?? 0
  const apiTotalMs = activeResult?.total_ms ?? null
  const apiInfMs = activeResult?.inference_ms ?? null
  const apiExtMs = (mode === 'url' ? (resultUrl?.extraction_ms ?? null) : null)

  const host = getHost(url)

  const resolvedCategory = useMemo(() => {
    const c = (mode === 'url' ? resultUrl?.category : resultText?.category) ?? 'umum'
    return c.toLowerCase()
  }, [mode, resultUrl, resultText])

  const resolvedTone = toneByCategory[resolvedCategory] || 'bg-gray-500/10 text-gray-700 dark:text-gray-300'

  const resolvedReasons: string[] = useMemo(() => {
    const raw = mode === 'url' ? resultUrl?.reasons : resultText?.reasons
    if (!raw) return []
    if (Array.isArray(raw)) {
      return raw.map(s => String(s).trim()).filter(Boolean)
    }
    const s = String(raw).trim()
    const parts = s.match(/[^.!?]+[.!?]*/g) || [s]
    return parts.map(p => p.trim()).filter(Boolean)
  }, [mode, resultUrl, resultText])

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    setIsLoading(true)
    setError(null)
    setResultUrl(null)
    setResultText(null)
    setShowFullContent(false)

    try {
      const endpoint = mode === 'url' ? `${API_BASE}/predict_url` : `${API_BASE}/predict`
      const payload = mode === 'url' ? { url } : { text }

      if (mode === 'url') {
        const h = getHost(url)
        if (!h) throw new Error('URL tidak valid.')
        if (!isSupportedHost(h)) throw new Error(`Domain "${h}" belum didukung. Situs yang didukung: ${SUPPORTED_DOMAINS.join(', ')}`)
      } else if (!text.trim()) {
        throw new Error('Konten artikel berita tidak boleh kosong.')
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error((await res.text().catch(() => '')) || `API error ${res.status}`)
      const data = await res.json()

      if (mode === 'url') setResultUrl(data as PredictRespUrl)
      else setResultText(data as PredictRespText)
    } catch (err: any) {
      setError(err?.message || 'Gagal memanggil API.')
    } finally {
      setIsLoading(false)
    }
  }

  function resetAll() {
    setUrl('')
    setText('')
    setResultUrl(null)
    setResultText(null)
    setError(null)
    setShowFullContent(false)
  }

  return (
    <div className="min-h-screen w-full bg-white relative">
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
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

        {/* form */}
        <Card className="max-w-7xl mx-auto rounded-2xl border bg-white/70 backdrop-blur-md dark:bg-white/10">
          <CardHeader>
            <CardTitle>Masukan & Mode Analisis</CardTitle>
            <CardDescription>Tempel URL atau teks lalu jalankan deteksi. Domain yang didukung tercantum di bawah.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={mode} onValueChange={v => setMode(v as Mode)}>
              <TabsList>
                <TabsTrigger value="url">Lewat URL</TabsTrigger>
                <TabsTrigger value="text">Lewat Isi Artikel Berita</TabsTrigger>
              </TabsList>

              <TabsContent value="url" className="mt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Label htmlFor="newsUrl" className="mb-1.5 block text-sm">Tautan Artikel Berita</Label>
                    <div className="relative rounded-xl border bg-white/60 backdrop-blur transition">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Link2 className="h-4.5 w-4.5" />
                      </span>
                      <Input
                        id="newsUrl"
                        placeholder="https://www.kompas.com/cekfakta/read/2024/..."
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        className="h-12 bg-transparent pl-10 pr-3 focus-visible:ring-0"
                      />
                    </div>

                    {host && (
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
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
                      {SUPPORTED_DOMAINS.map(d => (<Badge key={d} variant="secondary">{d}</Badge>))}
                    </div>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="text" className="mt-4">
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <Label htmlFor="newsBody" className="text-sm">Isi Artikel Berita</Label>
                      <span className="text-xs text-muted-foreground">{text.trim().length.toLocaleString()} karakter</span>
                    </div>
                    <div className="relative rounded-xl border bg-white/60 backdrop-blur transition">
                      <span className="pointer-events-none absolute left-3 top-3 text-muted-foreground">
                        <Type className="h-4.5 w-4.5" />
                      </span>
                      <Textarea
                        id="newsBody"
                        placeholder="Tempelkan isi artikel berita di sini…"
                        value={text}
                        rows={14}
                        onChange={e => setText(e.target.value)}
                        className="min-h-[180px] bg-transparent pl-10 pr-3 pt-2 focus-visible:ring-0"
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

        {/* loading */}
        {isLoading && (
          <Card className="mt-8 max-w-7xl mx-auto rounded-2xl border bg-white/70 backdrop-blur-md dark:bg-white/10">
            <CardHeader><CardTitle>Menganalisis…</CardTitle></CardHeader>
            <CardContent>
              <Progress value={66} className="w-full" />
              <p className="text-center mt-4 text-sm text-muted-foreground">Mengambil & menganalisis konten…</p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <Metric label="Skor Hoaks" value="—" icon={<Gauge className="h-3.5 w-3.5" />} tone="emerald" />
                <Metric label="Jumlah Kalimat" value="—" icon={<FileTextIcon className="h-3.5 w-3.5" />} tone="sky" />
                <Metric label="Waktu" value="—" icon={<Timer className="h-3.5 w-3.5" />} tone="amber" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* error */}
        {error && (
          <Card className="mt-8 max-w-7xl mx-auto rounded-2xl border-red-200 bg-red-50/80 dark:bg-red-400/10">
            <CardHeader><CardTitle className="text-red-600">Terjadi Kesalahan</CardTitle></CardHeader>
            <CardContent><p className="text-red-600 whitespace-pre-wrap">{error}</p></CardContent>
          </Card>
        )}

        {/* hasil: URL */}
        {resultUrl && !error && mode === 'url' && (
          <ResultCard
            isHoax={isHoax}
            confidencePct={confidencePct}
            sentenceCount={sentenceCount}
            hoaxScore={hoaxScore}
            category={resultUrl.category}
            toneClass={toneByCategory[resultUrl.category] || 'text-gray-500'}
            title={resultUrl.title}
            content={resultUrl.content}
            reasons={resolvedReasons}
            publishedAt={resultUrl.published_at}
            showFull={showFullContent}
            toggleShow={() => setShowFullContent(v => !v)}
            totalMs={apiTotalMs}
            inferenceMs={apiInfMs}
            extractionMs={apiExtMs}
          >
            <CardDescription>
              Sumber: {resultUrl.source} · Teks terekstrak: {resultUrl.extracted_chars.toLocaleString()} karakter
            </CardDescription>
          </ResultCard>
        )}

        {/* hasil: TEXT */}
        {resultText && !error && mode === 'text' && (
          <ResultCard
            isHoax={isHoax}
            confidencePct={confidencePct}
            sentenceCount={sentenceCount}
            hoaxScore={hoaxScore}
            category={resolvedCategory}
            toneClass={resolvedTone}
            title="Konten pemeriksaan"
            content={resultText.content || text}
            reasons={resolvedReasons}
            publishedAt={resultText.published_at}
            showFull={showFullContent}
            toggleShow={() => setShowFullContent(v => !v)}
            totalMs={apiTotalMs}
          />
        )}
      </div>
    </div>
  )
}

// ---------- small atoms ----------
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
      <blockquote className={`relative rounded-lg bg-muted p-3 text-sm leading-relaxed text-muted-foreground ${clamped ? 'line-clamp-6' : ''}`}>
        {body || '—'}
      </blockquote>
    </div>
  )
}

function ReasonsList({ items }: { items: string[] }) {
  if (!items?.length) return null
  return (
    <div className="mt-2">
      <div className="text-xs text-muted-foreground mb-1">Alasan:</div>
      <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-0.5">
        {items.map((r, i) => (<li key={i}>{r}</li>))}
      </ul>
    </div>
  )
}

function ResultCard(props: {
  isHoax: boolean
  confidencePct: number
  sentenceCount: number
  hoaxScore: number
  category: string
  toneClass: string
  title: string
  content: string
  reasons: string[]
  publishedAt?: string
  showFull: boolean
  toggleShow: () => void
  children?: React.ReactNode
  totalMs: number | null
  inferenceMs?: number | null
  extractionMs?: number | null
}) {
  const {
    isHoax, confidencePct, sentenceCount, hoaxScore,
    category, toneClass, title, content, reasons, publishedAt, showFull, toggleShow, children,
    totalMs, inferenceMs, extractionMs,
  } = props

  return (
    <Card className="mt-8 max-w-7xl mx-auto rounded-2xl border bg-white/70 backdrop-blur-md dark:bg-white/10">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle>Hasil Analisis</CardTitle>
        </div>
        {children}
      </CardHeader>
      <CardContent>
        {/* meta */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            {formatDate(publishedAt)}
          </div>
          <div className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs ${toneClass}`}>
            <Tag className="h-3.5 w-3.5" />
            {category || 'Tidak Diketahui'}
          </div>
        </div>

        <div className={`mt-2 rounded-xl border p-4 mb-4 ${isHoax ? 'border-red-500/20 bg-red-500/5' : 'border-emerald-500/20 bg-emerald-500/5'}`}>
          <div className="flex items-center gap-2">
            {isHoax ? <ShieldAlert className="h-4 w-4 text-red-600" /> : <ShieldCheck className="h-4 w-4 text-emerald-600" />}
            <span className={`text-sm font-semibold ${isHoax ? 'text-red-600' : 'text-emerald-600'}`}>
              Prediksi: {isHoax ? 'Hoaks' : 'Valid'}
            </span>
          </div>

          <div className="mt-3">
            <div className={`mb-2 flex items-center justify-between text-sm font-medium ${isHoax ? 'text-red-600' : 'text-emerald-600'}`}>
              <span>Keyakinan</span>
              <span className="font-semibold tabular-nums">{confidencePct}%</span>
            </div>
            <Progress
              value={confidencePct}
              className={`h-2 rounded-full ${isHoax ? '[&>div]:bg-red-500' : '[&>div]:bg-emerald-500'}`}
            />
          </div>

          <ReasonsList items={reasons} />
        </div>

        <div className="mb-6 grid grid-cols-3 gap-3">
          <Metric label="Skor Hoaks" value={formatDecimal(hoaxScore)} icon={<Gauge className="h-3.5 w-3.5" />} tone="emerald" />
          <Metric label="Jumlah Kalimat" value={String(sentenceCount)} icon={<FileTextIcon className="h-3.5 w-3.5" />} tone="sky" />
          <Metric label="Waktu (total)" value={formatMs(totalMs)} icon={<Timer className="h-3.5 w-3.5" />} tone="amber" />
        </div>

        {(extractionMs != null || inferenceMs != null) && (
          <div className="mb-6 grid grid-cols-2 gap-3">
            {extractionMs != null && (
              <Metric label="Waktu Ekstraksi" value={formatMs(extractionMs)} icon={<Timer className="h-3.5 w-3.5" />} tone="amber" />
            )}
            {inferenceMs != null && (
              <Metric label="Waktu Inferensi" value={formatMs(inferenceMs)} icon={<Timer className="h-3.5 w-3.5" />} tone="amber" />
            )}
          </div>
        )}

        <PreviewBlock
          title={title}
          body={content}
          onCopy={() => navigator.clipboard.writeText(content)}
          collapsible
          expanded={showFull}
          onToggle={toggleShow}
        />
      </CardContent>
    </Card>
  )
}
