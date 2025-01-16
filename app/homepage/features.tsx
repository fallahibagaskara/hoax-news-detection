export default function Features() {
    return (
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 relative">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Fitur</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-12 w-12 mb-4 text-primary"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="m9 12 2 2 4-4" />
                        </svg>
                        <h3 className="text-xl font-bold mb-2">Deteksi yang Didukung oleh AI</h3>
                        <p className="text-gray-500 dark:text-gray-400">Algoritma canggih untuk mengidentifikasi potensi hoaks</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-12 w-12 mb-4 text-primary"
                        >
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                            <path d="m9 12 2 2 4-4" />
                        </svg>
                        <h3 className="text-xl font-bold mb-2">Analisis Waktu Nyata</h3>
                        <p className="text-gray-500 dark:text-gray-400">Hasil instan untuk pengambilan keputusan yang cepat</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-12 w-12 mb-4 text-primary"
                        >
                            <rect width="18" height="18" x="3" y="3" rx="2" />
                            <path d="M7 7h10" />
                            <path d="M7 12h10" />
                            <path d="M7 17h10" />
                        </svg>
                        <h3 className="text-xl font-bold mb-2">Laporan Komprehensif</h3>
                        <p className="text-gray-500 dark:text-gray-400">Wawasan terperinci tentang hoaks yang terdeteksi</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

