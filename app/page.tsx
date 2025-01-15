'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { Progress } from "@/components/ui/progress"
import { Menu } from 'lucide-react'

export default function LandingPage() {
  const [newsTitle, setNewsTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<null | { isHoax: boolean; confidence: number; explanation: string }>(null)
  const [showCheckNews, setShowCheckNews] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    // Simulate API call with setTimeout
    setTimeout(() => {
      const mockResult = {
        isHoax: Math.random() > 0.5,
        confidence: Math.floor(Math.random() * 30) + 70,
        explanation: "Analisis AI kami telah menentukan hal ini berdasarkan referensi silang dengan sumber-sumber yang telah diverifikasi dan mendeteksi pola-pola umum kesalahan informasi."
      }
      setResult(mockResult)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link className="flex items-center justify-center" href="#">
          <span className="sr-only">Hoax Buster</span>
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
            className="h-6 w-6"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" x2="12" y1="9" y2="13" />
            <line x1="12" x2="12.01" y1="17" y2="17" />
          </svg>
        </Link>
        <Button variant="ghost" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <nav className={`${mobileMenuOpen ? 'flex' : 'hidden'} absolute top-14 left-0 right-0 bg-background z-10 flex-col items-center gap-4 p-4 md:static md:flex md:flex-row md:gap-6`}>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Fitur
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#how-it-works">
            Bagaimana cara kerjanya
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/recent-hoaxes">
            Berita Hoaks Terbaru
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
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
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
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
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
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
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Hoax Buster. Semua hak cipta dilindungi undang-undang.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/terms-of-service">
            Syarat dan Ketentuan
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/privacy-policy">
            Kebijakan Privasi
          </Link>
        </nav>
      </footer>
    </div>
  )
}

