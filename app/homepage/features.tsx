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
                                <span className="rounded-xl bg-violet-100 p-2.5 dark:bg-violet-400/15">
                                    {/* brain icon */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-violet-700 dark:text-violet-300"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path d="M13 7a3 3 0 1 0-6 0" />
                                        <path d="M17 7a3 3 0 0 0-3-3" />
                                        <path d="M7 10a3 3 0 1 0 0 6" />
                                        <path d="M17 13a3 3 0 1 0 0-6" />
                                        <path d="M7 16a3 3 0 0 0 6 0" />
                                        <path d="M13 16a3 3 0 0 0 6 0" />
                                    </svg>
                                </span>
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
                                <span className="rounded-xl bg-amber-100 p-2.5 dark:bg-amber-400/15">
                                    {/* gauge icon */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-amber-700 dark:text-amber-300"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path d="M12 14V7" />
                                        <path d="M20.6 13A8.5 8.5 0 1 0 3.4 13" />
                                        <path d="M5 13h2" />
                                        <path d="M17 13h2" />
                                    </svg>
                                </span>
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
                                <span className="rounded-xl bg-sky-100 p-2.5 dark:bg-sky-400/15">
                                    {/* bar-chart-3 icon */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-sky-700 dark:text-sky-300"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <line x1="3" y1="3" x2="3" y2="21" />
                                        <line x1="21" y1="21" x2="3" y2="21" />
                                        <rect x="7" y="10" width="3" height="7" rx="1" />
                                        <rect x="12" y="6" width="3" height="11" rx="1" />
                                        <rect x="17" y="13" width="3" height="4" rx="1" />
                                    </svg>
                                </span>
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
