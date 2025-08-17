export default function HowItWorks() {
    return (
        <section id="how-it-works" className="relative w-full">
            {/* Decorative background */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 dark:to-white/5" />
                <div
                    aria-hidden
                    className="absolute left-1/2 top-0 -z-10 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
                />
            </div>

            <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-20 md:py-28">
                <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Bagaimana Cara Kerjanya
                </h2>
                <p className="mx-auto mt-3 mb-14 max-w-2xl text-center text-sm sm:text-base text-muted-foreground">
                    Tiga langkah ringkas—input, analisis, hasil. Cepat, transparan, dan siap eksekusi.
                </p>

                {/* Steps */}
                <ol className="grid grid-cols-1 gap-5 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Step 1 */}
                    <li className="group relative rounded-2xl border border-gray-200/30 bg-white/70 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/40 dark:bg-white/10 dark:border-white/10">
                        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="flex items-start gap-4 p-6 sm:p-7">
                            <div className="relative">
                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-sm">
                                    1
                                </span>
                            </div>
                            <div className="flex-1">
                                <div className="mb-3 inline-flex items-center gap-2">
                                    <h3 className="text-lg font-semibold sm:text-xl">Kirim Berita</h3>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Tempel <span className="font-medium">tautan</span> artikel atau <span className="font-medium">paste teks</span> beritanya. Sistem akan mengekstrak konten yang relevan.
                                </p>
                            </div>
                        </div>
                    </li>

                    {/* Step 2 */}
                    <li className="group relative rounded-2xl border border-gray-200/30 bg-white/70 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/40 dark:bg-white/10 dark:border-white/10">
                        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="flex items-start gap-4 p-6 sm:p-7">
                            <div className="relative">
                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-sm">
                                    2
                                </span>
                            </div>
                            <div className="flex-1">
                                <div className="mb-3 inline-flex items-center gap-2">
                                    <h3 className="text-lg font-semibold sm:text-xl">Analisis Pola Bahasa</h3>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    IndoBERT memindai pola linguistik, fitur semantik, dan sinyal yang sering muncul pada hoaks.
                                </p>
                            </div>
                        </div>
                    </li>

                    {/* Step 3 */}
                    <li className="group relative rounded-2xl border border-gray-200/30 bg-white/70 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/40 dark:bg-white/10 dark:border-white/10">
                        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="flex items-start gap-4 p-6 sm:p-7">
                            <div className="relative">
                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-sm">
                                    3
                                </span>
                            </div>
                            <div className="flex-1">
                                <div className="mb-3 inline-flex items-center gap-2">
                                    <h3 className="text-lg font-semibold sm:text-xl">Dapatkan Hasil</h3>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Tampilkan <span className="font-medium">skor probabilitas</span>, kategori prediksi, dan ringkasan alasan. Gunakan sebagai sistem pendukung keputusan.
                                </p>
                            </div>
                        </div>
                    </li>
                </ol>
            </div>
        </section>
    )
}
