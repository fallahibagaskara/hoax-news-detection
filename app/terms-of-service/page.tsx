"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Printer } from "lucide-react"

export default function TermsOfServicePage() {
  const handlePrint = () => window.print()

  return (
    <div className="min-h-screen w-full bg-white relative">
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

        {/* Top bar actions */}
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
            Syarat & Ketentuan
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Terakhir diperbarui: 15 Agustus 2025 · Berlaku di Indonesia
          </p>
        </div>

        {/* Glass card */}
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 pb-20 md:pb-28">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* TOC */}
            <aside className="lg:col-span-4">
              <div className="rounded-2xl border border-white/20 bg-white/70 backdrop-blur-md shadow-lg dark:bg-white/10">
                <div className="p-6">
                  <h2 className="mb-3 text-lg font-semibold">Navigasi</h2>
                  <nav className="space-y-2 text-sm">
                    {[
                      ["1. Penerimaan", "penerimaan"],
                      ["2. Deskripsi Layanan", "deskripsi"],
                      ["3. Penggunaan yang Diperbolehkan", "penggunaan"],
                      ["4. Privasi & Data", "privasi"],
                      ["5. Konten Pengguna", "konten-pengguna"],
                      ["6. Kekayaan Intelektual", "ip"],
                      ["7. Penafian & Batasan", "penafian"],
                      ["8. Akurasi & Kepatuhan", "akurasi"],
                      ["9. Perubahan Layanan", "perubahan"],
                      ["10. Hukum yang Berlaku", "hukum"],
                      ["11. Kontak", "kontak"],
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

            {/* Content */}
            <main className="lg:col-span-8">
              <article className="rounded-2xl border border-white/20 bg-white/70 backdrop-blur-md shadow-lg dark:bg-white/10">
                <div className="p-6 sm:p-8 prose prose-neutral dark:prose-invert max-w-none">
                  <h2 id="penerimaan" className="scroll-mt-28">1. Penerimaan</h2>
                  <p>
                    Dengan mengakses atau menggunakan Hoax Buster (“Layanan”), Anda setuju terikat pada Syarat & Ketentuan ini.
                    Jika Anda tidak setuju, mohon hentikan penggunaan Layanan.
                  </p>

                  <h2 id="deskripsi" className="scroll-mt-28">2. Deskripsi Layanan</h2>
                  <p>
                    Hoax Buster menyediakan analisis probabilistik atas konten berita/tautan menggunakan model bahasa
                    (IndoBERT + heuristik). Hasil berupa skor dan kategori prediksi untuk membantu proses verifikasi—bukan
                    penetapan kebenaran final.
                  </p>

                  <h2 id="penggunaan" className="scroll-mt-28">3. Penggunaan yang Diperbolehkan</h2>
                  <ul>
                    <li>Gunakan Layanan untuk verifikasi awal dan riset edukatif.</li>
                    <li>Dilarang mengunggah konten ilegal, melanggar hak pihak ketiga, atau data pribadi tanpa izin.</li>
                    <li>Dilarang menyalahgunakan hasil analisis untuk menyesatkan, memfitnah, atau melakukan penindasan siber.</li>
                    <li>Kami berhak menerapkan pembatasan (rate limit, kuota, atau anti-abuse) demi stabilitas sistem.</li>
                  </ul>

                  <h2 id="privasi" className="scroll-mt-28">4. Privasi & Data</h2>
                  <p>
                    Penggunaan data Anda tunduk pada Kebijakan Privasi. Demi peningkatan kualitas model, sistem dapat
                    menyimpan log interaksi (tautan, potongan teks, metrik inferensi) secara terbatas dan terproteksi.
                    Jangan unggah data sensitif (mis. NIK, rekam medis, kredensial).
                  </p>

                  <h2 id="konten-pengguna" className="scroll-mt-28">5. Konten Pengguna</h2>
                  <p>
                    Anda mempertahankan hak atas konten yang Anda kirimkan. Dengan mengirimkan konten, Anda memberi kami lisensi
                    non-eksklusif, bebas royalti, dan dapat disublisensikan untuk memproses, menganalisis, menampilkan, serta
                    meningkatkan Layanan. Anda menjamin memiliki hak atas konten tersebut.
                  </p>

                  <h2 id="ip" className="scroll-mt-28">6. Kekayaan Intelektual</h2>
                  <p>
                    Hak cipta, merek, kode, model, dan materi lain dalam Layanan adalah milik Hoax Buster atau pemberi lisensi.
                    Anda tidak diperkenankan merekayasa balik, menyalin substansial, atau membuat karya turunan tanpa izin tertulis.
                  </p>

                  <h2 id="penafian" className="scroll-mt-28">7. Penafian Jaminan & Batasan Tanggung Jawab</h2>
                  <p>
                    Layanan disediakan “apa adanya” tanpa jaminan tersurat/tersirat. Kami tidak menjamin keakuratan,
                    ketersediaan, atau kesesuaian untuk tujuan tertentu. Sejauh diizinkan hukum, kami tidak bertanggung jawab
                    atas kerugian tidak langsung, konsekuensial, kehilangan data/keuntungan, atau biaya hukum akibat penggunaan Layanan.
                  </p>

                  <h2 id="akurasi" className="scroll-mt-28">8. Akurasi, Etika, & Kepatuhan</h2>
                  <ul>
                    <li>Hasil bersifat probabilistik dan dapat salah (false positive/negative).</li>
                    <li>Jangan gunakan sebagai nasihat hukum, medis, finansial, atau keputusan penegakan hukum.</li>
                    <li>Lakukan verifikasi manual dan periksa sumber primer jika keputusan berisiko tinggi.</li>
                  </ul>

                  <h2 id="perubahan" className="scroll-mt-28">9. Perubahan Layanan & Ketentuan</h2>
                  <p>
                    Kami dapat memperbarui model, fitur, atau kebijakan. Perubahan Syarat & Ketentuan berlaku sejak dipublikasikan.
                    Penggunaan berlanjut dianggap sebagai persetujuan Anda terhadap perubahan tersebut.
                  </p>

                  <h2 id="hukum" className="scroll-mt-28">10. Hukum yang Mengatur</h2>
                  <p>
                    Syarat & Ketentuan ini diatur oleh hukum Republik Indonesia. Sengketa akan diselesaikan terlebih dahulu
                    melalui musyawarah; jika tidak tercapai, tunduk pada yurisdiksi pengadilan Indonesia yang berwenang.
                  </p>

                  <h2 id="kontak" className="scroll-mt-28">11. Kontak</h2>
                  <p>
                    Pertanyaan terkait S&K: <a href="mailto:support@hoaxbuster.com">support@hoaxbuster.com</a>
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
