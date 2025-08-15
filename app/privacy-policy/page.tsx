"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Printer } from "lucide-react"

export default function PrivacyPolicyPage() {
  const handlePrint = () => window.print()

  return (
    <div className="min-h-screen w-full bg-white relative overflow-x-hidden">
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
radial-gradient(circle 500px at 20% 80%, rgba(139,92,246,0.3), transparent),
radial-gradient(circle 500px at 80% 20%, rgba(59,130,246,0.3), transparent)
`,
          backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
        }}
      />
      <section className="relative w-full">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 dark:to-white/5" />
          <div
            aria-hidden
            className="absolute left-1/2 top-0 -z-10 h-[560px] w-[840px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
          />
        </div>

        {/* Top actions */}
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 pt-8">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost" className="rounded-xl">
              <Link href="/">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Kembali
              </Link>
            </Button>
            <Button variant="secondary" className="rounded-xl" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Cetak / Simpan PDF
            </Button>
          </div>
        </div>

        {/* Header */}
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 pt-8 pb-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Kebijakan Privasi
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Terakhir diperbarui: 15 Agustus 2025 · Berlaku di Indonesia
          </p>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 pb-20 md:pb-28">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* TOC */}
            <aside className="lg:col-span-4">
              <div className="rounded-2xl border border-white/20 bg-white/70 backdrop-blur-md shadow-lg dark:bg-white/10">
                <div className="p-6">
                  <h2 className="mb-3 text-lg font-semibold">Navigasi</h2>
                  <nav className="space-y-2 text-sm">
                    {[
                      ["1. Cakupan", "cakupan"],
                      ["2. Data yang Dikumpulkan", "data"],
                      ["3. Penggunaan Data", "penggunaan"],
                      ["4. Cookie & Teknologi", "cookie"],
                      ["5. Berbagi dengan Pihak Ketiga", "pihak-ketiga"],
                      ["6. Penyimpanan & Retensi", "retensi"],
                      ["7. Keamanan", "keamanan"],
                      ["8. Hak Pengguna", "hak"],
                      ["9. Transfer Internasional", "transfer"],
                      ["10. Anak di Bawah Umur", "anak"],
                      ["11. Perubahan Kebijakan", "perubahan"],
                      ["12. Kontak", "kontak"],
                    ].map(([label, id]) => (
                      <a
                        key={id}
                        href={`#${id}`}
                        className="block rounded-lg px-3 py-2 hover:bg-accent scroll-mt-28"
                      >
                        {label}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>

            {/* Main */}
            <main className="lg:col-span-8">
              <article className="rounded-2xl border border-white/20 bg-white/70 backdrop-blur-md shadow-lg dark:bg-white/10">
                <div className="p-6 sm:p-8 prose prose-neutral dark:prose-invert max-w-none">
                  <h2 id="cakupan" className="scroll-mt-28">1. Cakupan</h2>
                  <p>
                    Kebijakan ini menjelaskan bagaimana Hoax Buster (“kami”) mengumpulkan, menggunakan, menyimpan,
                    membagikan, dan melindungi data pribadi terkait penggunaan layanan verifikasi berita berbasis pola bahasa.
                  </p>

                  <h2 id="data" className="scroll-mt-28">2. Data yang Dikumpulkan</h2>
                  <ul>
                    <li><strong>Data yang Anda berikan</strong>: nama, email (jika akun), konten teks/tautan yang Anda kirim untuk dianalisis, dan umpan balik.</li>
                    <li><strong>Data teknis</strong>: alamat IP, jenis perangkat/OS/browser, waktu akses, halaman dirujuk, dan event log (mis. error, waktu respons).</li>
                    <li><strong>Data inferensi</strong>: skor probabilitas, label prediksi, metrik model, dan ringkasan analisis yang dihasilkan sistem.</li>
                    <li><strong>Data penggunaan</strong>: fitur yang digunakan, frekuensi, dan preferensi tampilan (mis. tema gelap/terang).</li>
                  </ul>
                  <p className="text-xs text-muted-foreground">
                    Catatan: mohon <em>jangan</em> unggah data sensitif (NIK, kredensial, rekam medis) ke dalam kolom analisis.
                  </p>

                  <h2 id="penggunaan" className="scroll-mt-28">3. Penggunaan Data</h2>
                  <ul>
                    <li>Menyediakan dan mengoperasikan layanan analisis hoaks (termasuk debug, logging, dan anti-abuse).</li>
                    <li>Meningkatkan akurasi model (evaluasi, tuning, validasi) dengan sampel terpilih dan tersanitasi.</li>
                    <li>Mengembangkan fitur baru (mis. highlight kata pemicu, penjelasan model).</li>
                    <li>Komunikasi layanan (pemberitahuan pembaruan, perubahan kebijakan, dukungan).</li>
                    <li>Kepatuhan hukum dan penegakan ketentuan layanan.</li>
                  </ul>

                  <h2 id="cookie" className="scroll-mt-28">4. Cookie & Teknologi Serupa</h2>
                  <p>
                    Kami menggunakan cookie/penyimpanan lokal untuk autentikasi sesi, preferensi tampilan, dan analitik agregat.
                    Anda dapat mengatur browser untuk menolak cookie; sebagian fitur mungkin terbatas.
                  </p>

                  <h2 id="pihak-ketiga" className="scroll-mt-28">5. Berbagi dengan Pihak Ketiga</h2>
                  <ul>
                    <li><strong>Pemroses data</strong> (mis. infrastruktur, analitik agregat) berdasarkan perjanjian pemrosesan.</li>
                    <li><strong>Penegakan hukum</strong> jika diwajibkan oleh hukum yang berlaku.</li>
                    <li>Kami tidak menjual data pribadi Anda.</li>
                  </ul>

                  <h2 id="retensi" className="scroll-mt-28">6. Penyimpanan & Retensi</h2>
                  <p>
                    Data disimpan selama diperlukan untuk tujuan operasional, peningkatan kualitas layanan, dan kepatuhan hukum.
                    Log inferensi berumur pendek; sampel konten dapat dipertahankan lebih lama secara terbatas untuk evaluasi model,
                    dengan minimisasi dan sanitasi data.
                  </p>

                  <h2 id="keamanan" className="scroll-mt-28">7. Keamanan</h2>
                  <p>
                    Kami menerapkan kontrol keamanan yang wajar (enkripsi in transit, kontrol akses berjenjang, pemantauan anomali).
                    Namun, tidak ada sistem yang sepenuhnya aman; mitigasi risiko dilakukan secara berkelanjutan.
                  </p>

                  <h2 id="hak" className="scroll-mt-28">8. Hak Pengguna</h2>
                  <ul>
                    <li>Akses, koreksi, dan penghapusan data pribadi.</li>
                    <li>Penarikan persetujuan (jika pemrosesan berbasis persetujuan).</li>
                    <li>Keberatan/ pembatasan pemrosesan tertentu sesuai hukum yang berlaku.</li>
                  </ul>
                  <p>
                    Permintaan dapat diajukan ke <a href="mailto:privacy@hoaxbuster.com">privacy@hoaxbuster.com</a>.
                    Kami dapat memverifikasi identitas sebelum memproses permintaan.
                  </p>

                  <h2 id="transfer" className="scroll-mt-28">9. Transfer Internasional</h2>
                  <p>
                    Jika pemrosesan melibatkan lokasi di luar Indonesia, kami memastikan perlindungan yang setara melalui
                    perjanjian dan mekanisme transfer yang sesuai.
                  </p>

                  <h2 id="anak" className="scroll-mt-28">10. Anak di Bawah Umur</h2>
                  <p>
                    Layanan tidak ditujukan untuk anak di bawah 13 tahun. Jika Anda yakin anak mengirim data pribadi,
                    hubungi kami untuk penghapusan.
                  </p>

                  <h2 id="perubahan" className="scroll-mt-28">11. Perubahan Kebijakan</h2>
                  <p>
                    Kebijakan ini dapat diperbarui sewaktu-waktu. Perubahan berlaku sejak dipublikasikan.
                    Penggunaan berlanjut menandakan persetujuan terhadap kebijakan yang diperbarui.
                  </p>

                  <h2 id="kontak" className="scroll-mt-28">12. Kontak</h2>
                  <p>
                    Pertanyaan/permintaan subjek data: <a href="mailto:privacy@hoaxbuster.com">privacy@hoaxbuster.com</a>
                  </p>
                </div>
              </article>
            </main>
          </div>
        </div>
      </section>
    </div>
  )
}
