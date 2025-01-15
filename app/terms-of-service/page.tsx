import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Beranda
        </Link>
      </Button>
      <h1 className="text-3xl font-bold mb-6">Syarat dan Ketentuan</h1>
      <div className="prose dark:prose-invert max-w-none">
        <h2>1. Penerimaan Persyaratan</h2>
        <p>Dengan mengakses atau menggunakan layanan Hoax Buster, Anda setuju untuk terikat oleh Ketentuan Layanan ini.</p>

        <h2>2. Deskripsi Layanan</h2>
        <p>Hoax Buster menyediakan layanan verifikasi berita bertenaga AI untuk membantu pengguna mengidentifikasi potensi misinformasi.</p>

        <h2>3. Tanggung Jawab Pengguna</h2>
        <p>Pengguna bertanggung jawab atas semua aktivitas yang terjadi di bawah akun mereka dan harus mematuhi semua hukum dan peraturan yang berlaku.</p>

        <h2>4. Privasi</h2>
        <p>Penggunaan informasi pribadi Anda diatur oleh Kebijakan Privasi kami. Dengan menggunakan Hoax Buster, Anda menyetujui pengumpulan dan penggunaan data pribadi kami sebagaimana diuraikan di dalamnya.</p>

        <h2>5. Kekayaan Intelektual</h2>
        <p>Semua konten dan fungsionalitas di Hoax Buster adalah milik eksklusif Hoax Buster atau pemberi lisensinya dan dilindungi oleh hak cipta dan undang-undang kekayaan intelektual lainnya.</p>

        <h2>6. Penafian Jaminan</h2>
        <p>Hoax Buster disediakan “apa adanya” tanpa jaminan apa pun, baik tersurat maupun tersirat. Kami tidak menjamin keakuratan analisis AI kami dan pengguna harus selalu memverifikasi informasi dari berbagai sumber.</p>

        <h2>7. Batasan Tanggung Jawab</h2>
        <p>Hoax Buster tidak bertanggung jawab atas kerusakan tidak langsung, insidental, khusus, konsekuensial, atau hukuman yang diakibatkan oleh penggunaan atau ketidakmampuan Anda untuk menggunakan layanan ini.</p>

        <h2>8. Perubahan pada Ketentuan</h2>
        <p>Kami berhak untuk mengubah Ketentuan Layanan ini kapan saja. Jika Anda terus menggunakan Hoax Buster setelah perubahan tersebut, berarti Anda menerima Ketentuan Layanan yang baru.</p>

        <h2>9. Hukum yang Mengatur</h2>
        <p>Ketentuan Layanan ini akan diatur oleh dan ditafsirkan sesuai dengan hukum Indonesia, tanpa memperhatikan pertentangan ketentuan hukumnya.</p>

        <h2>10. Informasi Kontak</h2>
        <p>Jika Anda memiliki pertanyaan tentang Ketentuan Layanan ini, silakan hubungi kami di support@hoaxbuster.com.</p>

      </div>
    </div>
  )
}

