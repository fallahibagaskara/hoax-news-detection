export default function HowItWorks() {
    return (
        <section id="how-it-works" className="w-full py-10 md:py-20 lg:py-28 xl:py-44">
            <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 relative">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Bagaimana Cara Kerjanya</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">1</div>
                        <h3 className="text-xl font-bold mb-2">Kirim Berita</h3>
                        <p className="text-gray-500 dark:text-gray-400">Masukkan judul atau URL artikel berita yang ingin Anda periksa</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">2</div>
                        <h3 className="text-xl font-bold mb-2">Analisis AI</h3>
                        <p className="text-gray-500 dark:text-gray-400">Sistem AI kami menganalisis konten untuk mencari tanda-tanda kesalahan informasi</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">3</div>
                        <h3 className="text-xl font-bold mb-2">Dapatkan Hasil</h3>
                        <p className="text-gray-500 dark:text-gray-400">Menerima laporan terperinci tentang kredibilitas artikel berita</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

