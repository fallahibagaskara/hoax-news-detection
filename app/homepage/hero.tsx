import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Hero() {
    return (
        <section id="hero" className="w-full py-10 md:py-20 lg:py-28 xl:py-44">
            <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 relative">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                            Deteksi Hoaks dengan AI
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                            Sistem AI kami yang canggih membantu Anda mengidentifikasi dan memerangi informasi yang salah. Tetap terinformasi dengan berita yang akurat.
                        </p>
                    </div>
                    <div className="w-full max-w-sm space-y-4">
                        <div className="space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row justify-center">
                            <Button className="w-full sm:w-auto">
                                <Link href="/check-news">Cek Berita</Link>
                            </Button>
                            <Button className="w-full sm:w-auto" variant="outline" asChild>
                                <Link href="/recent-hoaxes">Lihat Hoaks Berita Terbaru</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

