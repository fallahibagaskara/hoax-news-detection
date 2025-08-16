"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import {
  ArrowLeft, ExternalLink, Copy, CalendarDays, Tag, Gauge, ShieldAlert,
  FileTextIcon,
  Timer
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Demo data (biasanya dari API/DB)
const recentHoaxes = [
  { id: 1, title: "Fake Celebrity Death Hoax", url: "https://example.com/celebrity-hoax", detectedDate: "2023-07-10", score: 1.0, ms: 29, sentenceCount: 100, confidence: 98, category: "Entertainment" },
  { id: 2, title: "Misleading Political Statement", url: "https://example.com/political-hoax", detectedDate: "2023-07-09", score: 1.0, ms: 29, sentenceCount: 100, confidence: 87, category: "Politics" },
  { id: 3, title: "False Medical Claim", url: "https://example.com/medical-hoax", detectedDate: "2023-07-08", score: 1.0, ms: 29, sentenceCount: 100, confidence: 95, category: "Health" },
  { id: 4, title: "Fabricated Scientific Discovery", url: "https://example.com/science-hoax", detectedDate: "2023-07-07", score: 1.0, ms: 29, sentenceCount: 100, confidence: 92, category: "Science" },
  { id: 5, title: "Manipulated Sports Result", url: "https://example.com/sports-hoax", detectedDate: "2023-07-06", score: 1.0, ms: 29, sentenceCount: 100, confidence: 89, category: "Sports" },
]

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
function formatDate(iso: string) {
  // tampilkan tanggal lokal singkat
  return new Date(iso).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })
}

const catTone: Record<string, string> = {
  Entertainment: "bg-pink-500/10 text-pink-700 dark:text-pink-300",
  Politics: "bg-red-500/10 text-red-700 dark:text-red-300",
  Health: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Science: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  Sports: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
}

export default function RecentHoaxesPage() {
  const [cat, setCat] = useState<string>("all")
  const cats = useMemo(() => ["all", ...Array.from(new Set(recentHoaxes.map(h => h.category)))], [])
  const items = useMemo(
    () => (cat === "all" ? recentHoaxes : recentHoaxes.filter(h => h.category === cat)),
    [cat]
  )

  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Futuristic grid + glow background */}
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
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Deteksi Hoaks Terbaru</h1>
            <p className="text-sm text-muted-foreground">Temuan terakhir sistem — gunakan sebagai verifikasi awal.</p>
          </div>
          <Button asChild variant="ghost" className="rounded-xl hidden sm:flex">
            <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Kembali</Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="-mx-6 px-6 sm:mx-0 sm:px-0">
            <div className="overflow-x-auto overscroll-x-contain scrollbar-none rounded-md">
              <Tabs value={cat} onValueChange={setCat}>
                <TabsList
                  className="
            inline-flex min-w-max gap-1
            whitespace-nowrap
            backdrop-blur bg-white/60 dark:bg-white/10
          "
                >
                  {cats.map((c) => (
                    <TabsTrigger
                      key={c}
                      value={c}
                      className="shrink-0 capitalize px-4 py-2"
                    >
                      {c}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>


        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((h) => {
            const tone = catTone[h.category] || "bg-gray-500/10 text-foreground"
            const barColor =
              h.confidence >= 90 ? "[&>div]:bg-red-600"
                : h.confidence >= 80 ? "[&>div]:bg-red-500"
                  : "[&>div]:bg-amber-500" // fallback (jika confidence rendah)

            return (
              <Card
                key={h.id}
                className="
                  rounded-2xl border bg-white/70 backdrop-blur-md dark:bg-white/10
                  hover:shadow-xl transition-shadow
                "
              >
                <CardHeader className="pb-3">
                  <div className="mb-2 flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 text-red-600" />
                    <Badge className="rounded-full px-2.5 py-0.5 text-xs bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))]">
                      Hoaks terdeteksi
                    </Badge>
                  </div>
                  <CardTitle className="leading-snug">{h.title}</CardTitle>
                  <CardDescription className="truncate">{h.url}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Meta row */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      {formatDate(h.detectedDate)}
                    </div>
                    <div className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs ${tone}`}>
                      <Tag className="h-3.5 w-3.5" />
                      {h.category}
                    </div>
                  </div>

                  <div
                    className={`mt-2 rounded-xl border p-4 mb-4 border-red-500/20 bg-red-500/5`}
                  >
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4 text-red-600" />
                      <span
                        className={`text-sm font-semibold text-red-600`}
                      >
                        Prediksi: Hoaks
                      </span>
                    </div>
                    {/* Confidence */}
                    <div className="mt-3">
                      <div className="mb-2 flex items-center justify-between text-sm font-medium text-red-600">
                        Keyakinan
                        <span className="text-sm font-semibold text-red-600">{h.confidence}%</span>
                      </div>
                      <Progress value={h.confidence} className={`w-full ${barColor}`} />
                    </div>
                  </div>

                  <div className="mb-4 grid grid-cols-3 gap-3">
                    <Metric label="Skor Hoaks" value={`${formatDecimal(h.score)}`} icon={<Gauge className="h-3.5 w-3.5" />} tone="emerald" />
                    <Metric label="Kalimat Dicek" value={h.sentenceCount.toString()} icon={<FileTextIcon className="h-3.5 w-3.5" />} tone="sky" />
                    <Metric label="Waktu" value={formatMs(h.ms)} icon={<Timer className="h-3.5 w-3.5" />} tone="amber" />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="secondary"
                      className="rounded-xl"
                      onClick={() => navigator.clipboard.writeText(h.url)}
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Salin URL
                    </Button>
                    <Button asChild className="rounded-xl">
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
      </div >
    </div >
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