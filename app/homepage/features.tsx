import { BarChart, Brain, Gauge } from "lucide-react";

export default function Features() {
    return (
        <section id="features" className="relative w-full">
            {/* Decorative background: soft grid + radial glow */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 dark:to-white/5" />
                <div
                    aria-hidden
                    className="absolute left-1/2 top-0 -z-10 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
                />
            </div>

            <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-20 md:py-28">
                <h2 className="mb-3 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Fitur Utama
                </h2>
                <p className="mx-auto mb-14 max-w-2xl text-center text-sm sm:text-base text-muted-foreground">
                    Dirancang untuk decision-making cepat: akurat, transparan, dan ramah pengguna.
                </p>

                <div className="grid grid-cols-1 gap-5 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Fitur 1 */}
                    <div className="group relative rounded-2xl border border-gray-200/30 bg-white/70 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/40 dark:bg-white/10 dark:border-white/10">
                        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="p-6 sm:p-7">
                            <div className="mb-4 inline-flex items-center gap-3">
                                <div className="mx-auto mb-1 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 p-2.5 dark:bg-violet-400/15">
                                    <Brain className="h-6 w-6 text-violet-700 dark:text-violet-300" />
                                </div>
                                <span className="text-xs font-medium text-primary/80">Model Bahasa</span>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold sm:text-xl">
                                Deteksi Berbasis IndoBERT
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Dilatih pada korpus berita Indonesia untuk memperkirakan potensi hoaks secara kontekstual.
                            </p>
                        </div>
                    </div>

                    {/* Fitur 2 */}
                    <div className="group relative rounded-2xl border border-gray-200/30 bg-white/70 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/40 dark:bg-white/10 dark:border-white/10">
                        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="p-6 sm:p-7">
                            <div className="mb-4 inline-flex items-center gap-3">
                                <div className="mx-auto mb-1 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 p-2.5 dark:bg-amber-400/15">
                                    <Gauge className="h-6 w-6 text-amber-700 dark:text-amber-300" />
                                </div>
                                <span className="text-xs font-medium text-primary/80">Kecepatan</span>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold sm:text-xl">
                                Analisis Cepat & Responsif
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Skor probabilitas dalam hitungan detik — ideal untuk verifikasi awal sebelum investigasi lanjut.
                            </p>
                        </div>
                    </div>

                    {/* Fitur 3 */}
                    <div className="group relative rounded-2xl border border-gray-200/30 bg-white/70 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/40 dark:bg-white/10 dark:border-white/10">
                        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="p-6 sm:p-7">
                            <div className="mb-4 inline-flex items-center gap-3">
                                <div className="mx-auto mb-1 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 p-2.5 dark:bg-sky-400/15">
                                    <BarChart className="h-6 w-6 text-sky-700 dark:text-sky-300" />
                                </div>
                                <span className="text-xs font-medium text-primary/80">Transparansi</span>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold sm:text-xl">
                                Laporan & Skor Probabilitas
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Tampilkan confidence score, kategori prediksi, dan insight singkat untuk keputusan yang accountable.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
