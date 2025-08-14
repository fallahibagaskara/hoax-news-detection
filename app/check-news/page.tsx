'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from 'lucide-react'
import { Spinner } from "@/components/ui/spinner"
import { Progress } from "@/components/ui/progress"
import { Textarea } from '@/components/ui/textarea'

type ApiResponse = {
  label: number;      // 0 = valid, 1 = hoax
  p_valid: number;    // probability
  p_hoax: number;     // probability
}

type ResultUI = {
  isHoax: boolean;
  confidence: number;     // 0..100
  explanation?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://127.0.0.1:8000';

export default function CheckNewsPage() {
  const [newsBody, setNewsBody] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ResultUI | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!newsBody.trim()) return

    setIsLoading(true)
    setResult(null)
    setError(null)

    try {
      const res = await fetch(`${API_BASE}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // backend kita menerima { text: string }
        body: JSON.stringify({ text: newsBody })
      })

      if (!res.ok) {
        const t = await res.text().catch(() => '')
        throw new Error(`API error ${res.status}: ${t || res.statusText}`)
      }

      const data: ApiResponse = await res.json()

      const isHoax = data.label === 1
      const confidenceProb = isHoax ? data.p_hoax : data.p_valid
      const confidencePct = Math.round(confidenceProb * 100)

      setResult({
        isHoax,
        confidence: confidencePct,
        explanation: isHoax
          ? 'Model mendeteksi pola khas penipuan/hoaks (mis. ajakan, janji hadiah, klaim bombastis).'
          : 'Model menilai teks konsisten dengan gaya artikel faktual yang terverifikasi.'
      })
    } catch (err: any) {
      setError(err?.message || 'Gagal memanggil API.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
        </Link>
      </Button>

      <Card className="max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle>Cek Berita</CardTitle>
          <CardDescription>Masukkan isi artikel berita yang ingin Anda periksa untuk mengetahui kemungkinan adanya hoaks.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="newsBody">Isi Berita</Label>
                <Textarea
                  id="newsBody"
                  placeholder="Masukan isi berita disini"
                  value={newsBody}
                  rows={20}
                  onChange={(e) => setNewsBody(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => { setNewsBody(''); setResult(null); setError(null); }}>
            Hapus
          </Button>
          <Button onClick={() => handleSubmit()} disabled={isLoading || newsBody.trim() === ''}>
            {isLoading ? <Spinner /> : 'Cek Berita'}
          </Button>
        </CardFooter>
      </Card>

      {isLoading && (
        <Card className="mt-8 max-w-7xl mx-auto">
          <CardHeader>
            <CardTitle>Menganalisis...</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={66} className="w-full" />
            <p className="text-center mt-4">AI sedang menganalisis berita. Mohon tunggu sebentar.</p>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="mt-8 max-w-7xl mx-auto border-red-500">
          <CardHeader>
            <CardTitle className="text-red-600">Terjadi Kesalahan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      )}

      {result && !error && (
        <Card className="mt-8 max-w-7xl mx-auto">
          <CardHeader>
            <CardTitle>Hasil Analisis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-lg font-semibold mb-2 ${result.isHoax ? 'text-red-500' : 'text-green-500'}`}>
              Berita ini kemungkinan besar {result.isHoax ? 'hoaks' : 'bukan hoaks'}.
            </div>
            <Progress value={result.confidence} className="w-full mb-4" />
            <p className="mb-2">Keyakinan: {result.confidence}%</p>
            {result.explanation && (
              <p className="text-gray-600 dark:text-gray-400">{result.explanation}</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
