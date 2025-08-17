"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, SearchCheck, Newspaper, Link2, FileText, ShieldAlert, FileTextIcon, Timer, Gauge } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function Hero() {
    return (
        <section
            className="
        relative mx-auto w-full
        min-h-[calc(100svh-64px)]
        overflow-hidden mt-20 lg:mt-0
      "
        >
            {/* Decorative background */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 dark:to-white/5" />
                <div className="absolute left-1/2 top-0 -z-10 h-[720px] w-[1100px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -right-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-fuchsia-400/10 blur-2xl" />
            </div>

            {/* Content */}
            <div className="container mx-auto grid min-h-[calc(100svh-64px)] grid-cols-1 items-center gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-12">
                {/* Left: copy + CTA */}
                <div>
                    {/* Badge */}
                    <div className="mb-6 flex">
                        <span className="inline-flex items-center gap-2 rounded-full border border-gray-200/50 bg-white/80 px-3 py-2 text-xs sm:text-sm font-medium text-gray-900 shadow-lg backdrop-blur-md dark:bg-white/10">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                            </span>
                            Model Latih Terbaru
                            <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-emerald-700 dark:text-emerald-300">v1.0</span>
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                        <span className="text-foreground">Deteksi Indikasi Hoaks</span>
                    </h1>
                    <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                        <span className="bg-gradient-to-r from-foreground via-muted-foreground to-muted-foreground bg-[200%_auto] bg-clip-text text-transparent">
                            Berbasis Pola Bahasa
                        </span>
                    </h2>

                    {/* Subcopy */}
                    <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
                        Identifikasi kemungkinan hoaks dari berita menggunakan IndoBERT terlatih. Hasil bersifat probabilistik—alat bantu untuk keputusan, bukan vonis final.
                    </p>

                    {/* Feature chips */}
                    <div className="mt-6 flex flex-wrap gap-2">
                        <span className="rounded-full border border-white/20 bg-white/70 px-3 py-1 text-xs text-foreground backdrop-blur-md dark:bg-white/10">Tag Kategori</span>
                        <span className="rounded-full border border-white/20 bg-white/70 px-3 py-1 text-xs text-foreground backdrop-blur-md dark:bg-white/10">Skor Probabilitas</span>
                        <span className="rounded-full border border-white/20 bg-white/70 px-3 py-1 text-xs text-foreground backdrop-blur-md dark:bg-white/10">Ringkasan Alasan</span>
                    </div>

                    {/* CTAs */}
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Button className="h-11 rounded-xl px-6 shadow-lg" asChild>
                            <Link href="/check-news" aria-label="Buka halaman deteksi berita">
                                <SearchCheck className="mr-2 h-5 w-5" />
                                Deteksi Berita
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="secondary" className="h-11 rounded-xl px-6 shadow-lg" asChild>
                            <Link href="/recent-hoaxes" aria-label="Lihat berita hoaks terbaru">
                                <Newspaper className="mr-2 h-5 w-5" />
                                Berita Hoaks Terbaru
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Right: glass preview */}
                <div className="relative">
                    {/* glass card */}
                    <div className="relative rounded-2xl border border-white/20 bg-white/70 p-5 sm:p-6 backdrop-blur-md shadow-2xl dark:bg-white/10">
                        {/* header */}
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-rose-400" />
                                <span className="h-2 w-2 rounded-full bg-amber-400" />
                                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            </div>
                            <span className="text-xs text-muted-foreground">Preview</span>
                        </div>

                        {/* input tiles */}
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div className="rounded-xl border border-gray-200/40 bg-white/70 p-4 backdrop-blur hover:bg-white/80 transition dark:bg-white/10">
                                <div className="mb-2 inline-flex items-center gap-2">
                                    <span className="rounded-lg bg-violet-100 p-2 dark:bg-violet-400/15">
                                        <Link2 className="h-4 w-4 text-violet-700 dark:text-violet-300" />
                                    </span>
                                    <span className="text-sm font-semibold">URL</span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Tempel tautan berita untuk diekstrak & dianalisis.
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200/40 bg-white/70 p-4 backdrop-blur hover:bg-white/80 transition dark:bg-white/10">
                                <div className="mb-2 inline-flex items-center gap-2">
                                    <span className="rounded-lg bg-pink-100 p-2 dark:bg-pink-400/15">
                                        <FileText className="h-4 w-4 text-pink-700 dark:text-pink-300" />
                                    </span>
                                    <span className="text-sm font-semibold">Konten</span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Paste teks berita untuk analisis cepat.
                                </p>
                            </div>
                        </div>

                        {/* result snippet */}
                        <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                            <div className="flex items-center gap-2">
                                <ShieldAlert className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm font-semibold text-emerald-600">Prediksi: Valid</span>
                            </div>
                            <div className="mt-3">
                                <div
                                    className={`mb-2 flex items-center justify-between text-sm font-medium text-emerald-600
                                        }`}
                                >
                                    <span>Keyakinan</span>
                                    <span className="font-semibold tabular-nums">{74}%</span>
                                </div>
                                <Progress
                                    value={74}
                                    className={`h-2 rounded-full [&>div]:bg-emerald-500`}
                                />
                            </div>
                            {/* <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                Sinyal bahasa provokatif rendah; sumber rujukan konsisten; struktur klaim faktual.
                            </p> */}
                        </div>

                        {/* micro-metrics */}
                        <div className="mt-4 grid grid-cols-3 gap-3">
                            <div className="rounded-lg border bg-white/60 p-3 text-center backdrop-blur dark:bg-white/10">
                                <div className="mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded bg-emerald-500/10">
                                    <Gauge className="h-3.5 w-3.5 text-emerald-600" />
                                </div>
                                <div className="text-xs text-muted-foreground">Skor Hoaks</div>
                                <div className="text-sm font-semibold">0.26</div>
                            </div>
                            <div className="rounded-lg border bg-white/60 p-3 text-center backdrop-blur dark:bg-white/10">
                                <div className="mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded bg-sky-500/10">
                                    <FileTextIcon className="h-3.5 w-3.5 text-sky-600" />
                                </div>
                                <div className="text-xs text-muted-foreground">Kalimat Dicek</div>
                                <div className="text-sm font-semibold">18</div>
                            </div>
                            <div className="rounded-lg border bg-white/60 p-3 text-center backdrop-blur dark:bg-white/10">
                                <div className="mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded bg-amber-500/10">
                                    <Timer className="h-3.5 w-3.5 text-amber-600" />
                                </div>
                                <div className="text-xs text-muted-foreground">Waktu</div>
                                <div className="text-sm font-semibold">0.7s</div>
                            </div>
                        </div>
                    </div>

                    {/* subtle glow behind card */}
                    <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-primary/10 blur-2xl" />
                </div>
            </div>
        </section>
    )
}
