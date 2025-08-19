"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Printer } from "lucide-react"

export default function PrivacyPolicyPage() {
  const handlePrint = () => window.print()

  return (
    <div className="min-h-screen w-full bg-white relative overflow-x-hidden">
      {/* bg */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)",
        }}
      />

      <section className="relative w-full">
        {/* glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 dark:to-white/5" />
          <div aria-hidden className="absolute left-1/2 top-0 -z-10 h-[560px] w-[840px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        </div>

        {/* top actions */}
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 pt-8">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost" className="rounded-xl">
              <Link href="/"><ArrowLeft className="mr-2 h-5 w-5" />Kembali</Link>
            </Button>
            <Button variant="secondary" className="rounded-xl" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Cetak / Simpan PDF
            </Button>
          </div>
        </div>

        {/* header */}
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 pt-8 pb-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Kebijakan Privasi</h1>
        </div>

        {/* content */}
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 pb-20 md:pb-28">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* toc */}
            <aside className="lg:col-span-4">
              <div className="rounded-2xl border border-white/20 bg-white/70 backdrop-blur-md shadow-lg dark:bg-white/10">
                <div className="p-6">
                  <h2 className="mb-3 text-lg font-semibold">Navigasi</h2>
                  <nav className="space-y-2 text-sm">
                    {[
                      ["1. Ringkasan", "ringkas"],
                      ["2. Data yang Kami Kumpulkan", "data"],
                      ["3. Cara Kami Menggunakan Data", "pakai"],
                      ["4. Cookie", "cookie"],
                      ["5. Berbagi Data", "berbagi"],
                      ["6. Penyimpanan & Retensi", "retensi"],
                      ["7. Keamanan", "aman"],
                      ["8. Pilihan & Hak Anda", "hak"],
                      ["9. Transfer Lintas Negara", "transfer"],
                      ["10. Anak di Bawah Umur", "anak"],
                      ["11. Perubahan Dokumen Ini", "perubahan"],
                      ["12. Hubungi Kami", "kontak"],
                    ].map(([label, id]) => (
                      <a key={id} href={`#${id}`} className="block rounded-lg px-3 py-2 hover:bg-accent scroll-mt-28">
                        {label}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>

            {/* main */}
            <main className="lg:col-span-8">
              <article className="rounded-2xl border border-white/20 bg-white/70 backdrop-blur-md shadow-lg dark:bg-white/10">
                <div className="p-6 sm:p-8 prose prose-neutral dark:prose-invert max-w-none">
                  <h2 id="ringkas" className="scroll-mt-28">1. Ringkasan</h2>
                  <p>
                    Kami membangun Hoax Buster untuk membantu Anda memeriksa klaim dan tautan berita. Kami hanya
                    mengumpulkan data yang dibutuhkan untuk menjalankan layanan, memperbaikinya, dan mematuhi hukum.
                    Kami tidak menjual data pribadi Anda.
                  </p>

                  <h2 id="data" className="scroll-mt-28">2. Data yang Kami Kumpulkan</h2>
                  <ul>
                    <li>
                      <strong>Yang Anda kirim:</strong> teks atau tautan yang Anda periksa, umpan balik, serta info akun (jika ada).
                    </li>
                    <li>
                      <strong>Data teknis:</strong> IP, jenis perangkat/OS/browser, waktu akses, halaman rujukan, dan log kesalahan.
                    </li>
                    <li>
                      <strong>Hasil sistem:</strong> label/ skor model, penjelasan singkat, dan metrik kinerja.
                    </li>
                  </ul>
                  <p className="text-xs text-muted-foreground">
                    Mohon jangan kirim data sensitif (mis. NIK, kata sandi, rekam medis) ke kolom pemeriksaan.
                  </p>

                  <h2 id="pakai" className="scroll-mt-28">3. Cara Kami Menggunakan Data</h2>
                  <ul>
                    <li>Menjalankan fitur pemeriksaan dan menjaga layanan tetap stabil.</li>
                    <li>Memperbaiki kualitas model dan pengalaman pengguna.</li>
                    <li>Mencegah penyalahgunaan serta memenuhi kewajiban hukum.</li>
                    <li>Menginformasikan pembaruan penting terkait layanan.</li>
                  </ul>

                  <h2 id="cookie" className="scroll-mt-28">4. Cookie</h2>
                  <p>
                    Cookie membantu kami mengingat sesi, preferensi tampilan, dan statistik penggunaan secara agregat.
                    Anda bisa menonaktifkannya di pengaturan browser, namun beberapa fitur mungkin terbatas.
                  </p>

                  <h2 id="berbagi" className="scroll-mt-28">5. Berbagi Data</h2>
                  <ul>
                    <li><strong>Penyedia layanan</strong> (hosting, analitik agregat) sesuai perjanjian pengolahan data.</li>
                    <li><strong>Penegak hukum</strong> bila diwajibkan undang-undang.</li>
                    <li>Kami tidak menjual data pribadi Anda kepada siapa pun.</li>
                  </ul>

                  <h2 id="retensi" className="scroll-mt-28">6. Penyimpanan & Retensi</h2>
                  <p>
                    Kami menyimpan data selama dibutuhkan untuk pengoperasian, perbaikan layanan, dan kepatuhan.
                    Log pemeriksaan biasanya berumur pendek. Sampel yang dipakai untuk evaluasi model diperkecil dan
                    disanitasi seperlunya.
                  </p>

                  <h2 id="aman" className="scroll-mt-28">7. Keamanan</h2>
                  <p>
                    Kami menggunakan praktik wajar seperti enkripsi saat transit, kontrol akses, dan pemantauan. Tidak ada
                    sistem yang 100% aman, tetapi kami terus meningkatkan perlindungan.
                  </p>

                  <h2 id="hak" className="scroll-mt-28">8. Pilihan & Hak Anda</h2>
                  <ul>
                    <li>Meminta salinan, koreksi, atau penghapusan data tertentu.</li>
                    <li>Menolak atau membatasi pemrosesan tertentu bila diizinkan hukum.</li>
                    <li>Menarik persetujuan (jika pemrosesan berbasis persetujuan).</li>
                  </ul>
                  <p>
                    Ajukan permintaan ke <a href="mailto:hoaxbuster@fallahi.my.id">hoaxbuster@fallahi.my.id</a>.
                    Kami mungkin perlu memverifikasi identitas Anda.
                  </p>

                  <h2 id="transfer" className="scroll-mt-28">9. Transfer Lintas Negara</h2>
                  <p>
                    Jika data diproses di luar Indonesia, kami menerapkan perlindungan setara melalui perjanjian dan
                    mekanisme transfer yang sesuai.
                  </p>

                  <h2 id="anak" className="scroll-mt-28">10. Anak di Bawah Umur</h2>
                  <p>
                    Layanan ini tidak ditujukan untuk anak di bawah 13 tahun. Jika Anda merasa ada data anak yang masuk,
                    beri tahu kami agar dapat kami hapus.
                  </p>

                  <h2 id="perubahan" className="scroll-mt-28">11. Perubahan Dokumen Ini</h2>
                  <p>
                    Kami bisa memperbarui kebijakan ini dari waktu ke waktu. Versi terbaru akan selalu ada di halaman ini.
                    Jika perubahannya signifikan, kami akan memberi tahu Anda dengan cara yang wajar.
                  </p>

                  <h2 id="kontak" className="scroll-mt-28">12. Hubungi Kami</h2>
                  <p>
                    Pertanyaan soal privasi? Email: <a href="mailto:hoaxbuster@fallahi.my.id">hoaxbuster@fallahi.my.id</a>
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
