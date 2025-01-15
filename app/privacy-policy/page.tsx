import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Beranda
        </Link>
      </Button>
      <h1 className="text-3xl font-bold mb-6">Kebijakan Privasi</h1>
      <div className="prose dark:prose-invert max-w-none">
        <h2>1. Informasi yang Kami Kumpulkan</h2>
        <p>Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami, seperti saat Anda membuat akun, menggunakan layanan kami, atau menghubungi kami untuk mendapatkan dukungan. Informasi tersebut dapat mencakup nama, alamat email, dan konten artikel berita yang Anda kirimkan untuk diverifikasi.</p>

        <h2>2. Bagaimana Kami Menggunakan Informasi Anda</h2>
        <p>Kami menggunakan informasi yang kami kumpulkan untuk menyediakan, memelihara, dan meningkatkan layanan kami, untuk mengembangkan fitur-fitur baru, dan untuk melindungi Hoax Buster dan para pengguna kami.</p>

        <h2>3. Pembagian dan Pengungkapan Informasi</h2>
        <p>Kami tidak membagikan informasi pribadi Anda kepada pihak ketiga kecuali seperti yang dijelaskan dalam kebijakan ini. Kami dapat membagikan informasi yang dikumpulkan atau tidak teridentifikasi, yang tidak dapat digunakan secara wajar untuk mengidentifikasi Anda.</p>

        <h2>4. Penyimpanan Data</h2>
        <p>Kami menyimpan informasi Anda selama diperlukan untuk menyediakan layanan kami dan memenuhi tujuan yang diuraikan dalam kebijakan ini. Anda dapat meminta penghapusan akun Anda dan data terkait kapan saja.</p>

        <h2>5. Keamanan</h2>
        <p>Kami mengambil langkah-langkah yang wajar untuk membantu melindungi informasi pribadi Anda dari kehilangan, pencurian, penyalahgunaan, akses yang tidak sah, pengungkapan, pengubahan, dan penghancuran.</p>

        <h2>6. Hak-hak Anda</h2>
        <p>Tergantung pada lokasi Anda, Anda mungkin memiliki hak-hak tertentu terkait informasi pribadi Anda, seperti hak untuk mengakses, mengoreksi, atau menghapus data Anda.</p>

        <h2>7. Perubahan pada Kebijakan Ini</h2>
        <p>Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Kami akan memberi tahu Anda tentang perubahan apa pun dengan memposting kebijakan privasi baru di halaman ini.</p>

        <h2>8. Hubungi Kami</h2>
        <p>Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami di privacy@hoaxbuster.com.</p>
      </div>
    </div>
  )
}

