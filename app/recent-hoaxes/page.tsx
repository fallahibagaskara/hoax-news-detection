"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import {
  ArrowLeft, ExternalLink, Copy, CalendarDays, Tag, ShieldAlert,
  ChevronUp, ChevronDown,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000"

type HoaxItem = {
  id: string
  url: string
  title: string
  source: string
  category: string
  label: number
  p_hoax: number
  p_valid: number
  reasons: string[]
  credibility_score: number
  created_at?: string
  published_at?: string
  content?: string
}

type ApiResp = {
  page: number
  limit: number
  total: number
  total_pages: number
  has_next: boolean
  has_prev: boolean
  items: HoaxItem[]
}

// ---- utils ----
function formatDateLocal(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })
}

const catTone: Record<string, string> = {
  politik: "bg-red-500/10 text-red-700 dark:text-red-300",
  ekonomi: "bg-green-500/10 text-green-700 dark:text-green-300",
  bisnis: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
  hukum: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
  internasional: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  olahraga: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  hiburan: "bg-pink-500/10 text-pink-700 dark:text-pink-300",
  tekno: "bg-purple-500/10 text-purple-700 dark:text-purple-300",
  otomotif: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  kesehatan: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  pendidikan: "bg-lime-500/10 text-lime-700 dark:text-lime-300",
  sains: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  lifestyle: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
  umum: "bg-gray-500/10 text-gray-700 dark:text-gray-300",
}

const CATEGORIES = [
  "all",
  "politik",
  "ekonomi",
  "bisnis",
  "hukum",
  "internasional",
  "olahraga",
  "hiburan",
  "tekno",
  "otomotif",
  "kesehatan",
  "pendidikan",
  "sains",
  "lifestyle",
  "umum",
] as const

export default function RecentHoaxesPage() {
  const [cat, setCat] = useState<string>("all")
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [items, setItems] = useState<HoaxItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // meta dari API untuk pagination
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrev, setHasPrev] = useState(false)

  function cap(s: string) {
    return s === "all" ? "Semua" : s.charAt(0).toUpperCase() + s.slice(1)
  }

  // fetch data per halaman
  useEffect(() => {
    let mounted = true
    async function run() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${API_BASE}/articles/hoax?page=${page}&limit=${limit}`, { cache: "no-store" })
        if (!res.ok) throw new Error(`API error ${res.status}`)
        const data: ApiResp = await res.json()
        if (!mounted) return
        setItems(data.items || [])
        setTotal(data.total || 0)
        setTotalPages(data.total_pages || 1)
        setHasNext(Boolean(data.has_next))
        setHasPrev(Boolean(data.has_prev))
      } catch (e: any) {
        if (mounted) setError(e?.message || "Gagal memuat data.")
      } finally {
        if (mounted) setLoading(false)
      }
    }
    run()
    return () => { mounted = false }
  }, [page, limit])

  // daftar kategori statis
  // filter client-side (hanya untuk item pada halaman ini)
  const filtered = useMemo(
    () => (cat === "all" ? items : items.filter(h => (h.category || "umum").toLowerCase() === cat)),
    [cat, items]
  )

  // reset ke halaman 1 saat ganti kategori
  useEffect(() => { setPage(1) }, [cat])

  function getPageNumbers(curr: number, last: number) {
    const pages: (number | "...")[] = []
    const add = (p: number | "...") => pages.push(p)
    const window = 1
    const start = Math.max(1, curr - window)
    const end = Math.min(last, curr + window)

    if (1 < start) add(1)
    if (2 < start) add("...")
    for (let p = start; p <= end; p++) add(p)
    if (end < last - 1) add("...")
    if (end < last) add(last)
    return pages
  }

  const showingFrom = Math.min((page - 1) * limit + 1, Math.max(total, 0))
  const showingTo = Math.min((page - 1) * limit + (filtered.length || items.length), total)

  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* background */}
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 relative z-10">
        {/* Header */}
        <div className="mb-5 sm:mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
              Deteksi Hoaks Terbaru
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Temuan terakhir sistem — gunakan sebagai verifikasi awal.
            </p>
          </div>
          <Button asChild variant="ghost" className="rounded-xl self-start sm:self-auto">
            <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Kembali</Link>
          </Button>
        </div>

        {/* Filters (scrollable) */}
        <div className="mb-5 sm:mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="overflow-x-auto overscroll-x-contain rounded-md [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Tabs value={cat} onValueChange={setCat}>
              <TabsList className="inline-flex min-w-max gap-1 whitespace-nowrap bg-white/60 dark:bg-white/10 backdrop-blur">
                {CATEGORIES.map((c) => (
                  <TabsTrigger
                    key={c}
                    value={c}
                    className="shrink-0 capitalize px-3 py-2 sm:px-4 text-xs sm:text-sm"
                  >
                    {cap(c)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* States */}
        {loading && <p className="text-sm text-muted-foreground">Memuat data…</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!loading && !error && filtered.length === 0 && (
          <p className="text-sm text-muted-foreground">Belum ada data.</p>
        )}

        {/* Grid responsif */}
        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((h) => {
            const isHoax = h.label === 1
            const confidence = Math.round(((isHoax ? h.p_hoax : h.p_valid) || 0) * 100)
            const tone = catTone[(h.category || "umum").toLowerCase()] || "bg-gray-500/10 text-foreground"
            const barColor =
              confidence >= 90 ? "[&>div]:bg-red-600"
                : confidence >= 80 ? "[&>div]:bg-red-500"
                  : "[&>div]:bg-amber-500"

            const displayDateIso = h.published_at || h.created_at
            const displayDate = displayDateIso ? formatDateLocal(displayDateIso) : "—"

            return (
              <Card
                key={h.id}
                className="rounded-2xl border bg-white/70 backdrop-blur-md dark:bg-white/10 hover:shadow-xl transition-shadow"
              >
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="mb-2 flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 text-red-600" />
                    <Badge className="rounded-full px-2.5 py-0.5 text-[10px] sm:text-xs bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))]">
                      Hoaks terdeteksi
                    </Badge>
                  </div>
                  <CardTitle className="leading-snug text-base sm:text-lg line-clamp-2">
                    {h.title}
                  </CardTitle>
                  <CardDescription className="truncate text-xs sm:text-sm">
                    {h.url}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 sm:space-y-4">
                  {/* Meta row */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      {displayDate}
                    </div>
                    <div className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs ${tone}`}>
                      <Tag className="h-3.5 w-3.5" />
                      {(h.category || "umum")}
                    </div>
                  </div>

                  {/* Verdict */}
                  <div className="rounded-xl border p-3 sm:p-4 border-red-500/20 bg-red-500/5">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4 text-red-600" />
                      <span className="text-xs sm:text-sm font-semibold text-red-600">
                        Prediksi: Hoaks
                      </span>
                    </div>
                    <div className="mt-2 sm:mt-3">
                      <div className="mb-1.5 sm:mb-2 flex items-center justify-between text-xs sm:text-sm font-medium text-red-600">
                        <span>Keyakinan</span>
                        <span className="font-semibold">{confidence}%</span>
                      </div>
                      <Progress value={confidence} className={`w-full h-2 sm:h-2.5 ${barColor}`} />
                    </div>

                    {/* Reasons (bullet list) */}
                    <ReasonsList items={h.reasons || []} />
                  </div>

                  {!!h.content && (
                    <PreviewBlock
                      title="Konten"
                      body={h.content}
                      onCopy={() => navigator.clipboard.writeText(h.content as string)}
                      collapsible
                    />
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2">
                    <Button
                      variant="secondary"
                      className="rounded-xl w-full sm:w-auto"
                      onClick={() => navigator.clipboard.writeText(h.url)}
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Salin URL
                    </Button>
                    <Button asChild className="rounded-xl w-full sm:w-auto">
                      <Link href={h.url} target="_blank" rel="noopener noreferrer">
                        Buka Sumber <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Pagination */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Menampilkan {total ? showingFrom : 0}–{total ? showingTo : 0} dari {total} entri
          </p>

          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="outline"
              className="rounded-lg h-9 px-3"
              disabled={!hasPrev || loading || page <= 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
            >
              Prev
            </Button>

            <div className="hidden xs:flex items-center gap-1 sm:gap-1.5">
              {getPageNumbers(page, totalPages).map((p, i) =>
                p === "..." ? (
                  <span key={`dots-${i}`} className="px-2 text-muted-foreground">…</span>
                ) : (
                  <Button
                    key={p}
                    variant={p === page ? "default" : "outline"}
                    className="rounded-lg h-9 w-9 px-0"
                    onClick={() => setPage(p as number)}
                    disabled={loading}
                  >
                    {p}
                  </Button>
                )
              )}
            </div>

            <Button
              variant="outline"
              className="rounded-lg h-9 px-3"
              disabled={!hasNext || loading || page >= totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Preview & Reasons components ---------- */
function PreviewBlock({
  title, body, onCopy, collapsible = false, expanded = false, onToggle,
}: {
  title: string; body: string; onCopy: () => void;
  collapsible?: boolean; expanded?: boolean; onToggle?: () => void;
}) {
  const [internalExpanded, setInternalExpanded] = useState(false)

  const isControlled = typeof onToggle === "function"
  const isExpanded = isControlled ? expanded : internalExpanded

  const bodyLen = (body || "").length
  const shouldToggle = collapsible && bodyLen > 300
  const clamped = !isExpanded && collapsible

  const handleToggle = () => {
    if (isControlled && onToggle) onToggle()
    else setInternalExpanded(v => !v)
  }

  return (
    <div className="mb-2 sm:mb-3 rounded-xl border bg-white/60 p-3 sm:p-4 backdrop-blur dark:bg-white/10">
      <div className="mb-2 flex items-center justify-between gap-2 sm:gap-3 flex-wrap">
        <h4 className="text-sm font-semibold min-w-0">{title}</h4>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Toggle — icon-only on mobile, icon+label on ≥sm */}
          {shouldToggle && (
            <>
              {/* mobile (icon-only) */}
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-lg p-0 sm:hidden"
                onClick={handleToggle}
                aria-label={isExpanded ? "Sembunyikan" : "Tampilkan"}
                title={isExpanded ? "Sembunyikan" : "Tampilkan"}
              >
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>

              {/* ≥sm (ikon + teks) */}
              <Button
                size="sm"
                variant="ghost"
                className="h-8 rounded-lg px-2 hidden sm:inline-flex"
                onClick={handleToggle}
              >
                {isExpanded ? <ChevronUp className="mr-1 h-4 w-4" /> : <ChevronDown className="mr-1 h-4 w-4" />}
                <span className="text-xs">{isExpanded ? "Sembunyikan" : "Tampilkan"}</span>
              </Button>
            </>
          )}

          {/* Copy — icon-only on mobile, ikon+teks pada ≥sm */}
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-lg p-0 sm:hidden"
            onClick={onCopy}
            aria-label="Salin"
            title="Salin"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 rounded-lg px-2 hidden sm:inline-flex"
            onClick={onCopy}
          >
            <Copy className="mr-1 h-4 w-4" />
            <span className="text-xs">Salin</span>
          </Button>
        </div>
      </div>

      <blockquote
        className={`relative rounded-lg bg-muted p-3 text-xs sm:text-sm leading-relaxed text-muted-foreground ${clamped ? "line-clamp-6" : ""
          }`}
      >
        {body || "—"}
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
