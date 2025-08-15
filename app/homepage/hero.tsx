import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section
            className="
          relative mx-auto w-full
          min-h-[calc(100svh-64px)]
          grid place-items-center
          px-6 sm:px-8 lg:px-12
          text-center overflow-hidden
        "
        >
            <div className="mx-auto max-w-6xl relative z-10">
                <div className="mb-6 sm:mb-8 md:mb-10 flex justify-center">
                    <div
                        className="inline-flex cursor-pointer"
                    >
                        <span
                            data-slot="badge"
                            className="inline-flex items-center justify-center font-medium w-fit whitespace-nowrap shrink-0 [&amp;>svg]:size-3 [&amp;>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive overflow-hidden [a&amp;]:hover:bg-secondary/90 gap-2 py-2 px-3 sm:px-4 text-xs sm:text-sm rounded-full shadow-lg backdrop-blur-md transition-all duration-300 border bg-white/80 border-gray-200/50 text-gray-900 hover:bg-white/90"
                        >
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </div>
                            <span className="font-medium">Model Latih Terbaru</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="lucide lucide-zap h-3 w-3 text-orange-500"
                                aria-hidden="true"
                            >
                                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                            </svg>
                            <span className="font-medium">v1.0</span>
                        </span>
                    </div>
                </div>
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-1 sm:mb-3">
                        <span className="font-medium transition-colors duration-300 text-gray-900 dark:text-gray-50">
                            Deteksi Indikasi Hoaks
                        </span>
                    </h1>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold tracking-tight">
                        <span className="bg-gradient-to-r bg-[200%_auto] bg-clip-text leading-tight text-transparent transition-all duration-300 from-neutral-900 via-slate-500 to-neutral-500 dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
                            Berbasis Pola Bahasa
                        </span>
                    </h2>
                </div>
                <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-lg mx-auto leading-relaxed transition-colors duration-300 px-4 sm:px-0 text-gray-600 dark:text-gray-200">
                    Membantu Anda mengidentifikasi kemungkinan hoaks dari berita menggunakan model IndoBERT terlatih. Hasil bersifat probabilistik—bukan vonis final.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-10 sm:mb-14 max-w-4xl mx-auto px-4 sm:px-0">
                    <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl shadow-lg backdrop-blur-md transition-all duration-300 border w-full sm:w-auto bg-white/70 border-gray-200/30 hover:bg-white/80">
                        <div className="p-2 rounded-lg transition-colors duration-300 bg-violet-100">
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
                                className="lucide lucide-link-2 h-4 sm:h-5 w-4 sm:w-5 transition-colors duration-300 text-violet-600"
                                aria-hidden="true"
                            >
                                <path d="M15 7h3a5 5 0 0 1 0 10h-3" />
                                <path d="M9 17H6a5 5 0 0 1 0-10h3" />
                                <line x1="8" x2="16" y1="12" y2="12" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <h3 className="font-semibold text-sm transition-colors duration-300 text-gray-900">
                                URL
                            </h3>
                            <p className="text-xs transition-colors duration-300 text-gray-600">
                                Deteksi Dengan Tautan
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl shadow-lg backdrop-blur-md transition-all duration-300 border w-full sm:w-auto bg-white/70 border-gray-200/30 hover:bg-white/80">
                        <div className="p-2 rounded-lg transition-colors duration-300 bg-pink-100">
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
                                className="lucide lucide-file-text h-4 sm:h-5 w-4 sm:w-5 transition-colors duration-300 text-pink-600"
                                aria-hidden="true"
                            >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <line x1="10" y1="9" x2="8" y2="9" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <h3 className="font-semibold text-sm transition-colors duration-300 text-gray-900">
                                Konten
                            </h3>
                            <p className="text-xs transition-colors duration-300 text-gray-600">
                                Deteksi Dengan Konten
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
                    <Button
                        data-slot="button"
                        className="inline-flex items-center justify-center whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([className*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-primary-foreground h-10 rounded-md has-[>svg]:px-4 cursor-pointer gap-2 px-4 sm:px-8 py-3 text-sm sm:text-base font-medium shadow-lg transition-all duration-300 flex-1 sm:flex-none bg-slate-950 hover:bg-slate-900 dark:bg-white dark:text-black dark:hover:bg-gray-100"
                    >
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
                            className="lucide lucide-search-check h-4 sm:h-5 w-4 sm:w-5"
                            aria-hidden="true"
                        >
                            <path d="m8 11 2 2 4-4"></path>
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </svg>
                        <Link href="/check-news">Deteksi Berita</Link>
                    </Button>

                    <Button
                        data-slot="button"
                        className="inline-flex items-center justify-center whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([className*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-10 rounded-md has-[>svg]:px-4 cursor-pointer gap-2 px-4 sm:px-8 py-3 text-sm sm:text-base font-medium shadow-lg transition-all duration-300 flex-1 sm:flex-none bg-white text-black hover:bg-gray-100"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 32 32"
                            enable-background="new 0 0 32 32"
                        >
                            <path fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" d="M25,26H7c-1.7,0-3-1.3-3-3V6h18v7" />
                            <path fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" d="M25,26L25,26c-1.7,0-3-1.3-3-3V13h6v10
	C28,24.7,26.7,26,25,26z"/>
                            <rect x="8" y="10" fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" width="10" height="3" />
                            <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="7" y1="16" x2="12" y2="16" />
                            <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="14" y1="16" x2="19" y2="16" />
                            <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="7" y1="19" x2="12" y2="19" />
                            <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="14" y1="19" x2="19" y2="19" />
                            <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="7" y1="22" x2="12" y2="22" />
                            <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="14" y1="22" x2="19" y2="22" />
                        </svg>
                        <Link href="/recent-hoaxes">Berita Hoaks Terbaru</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
