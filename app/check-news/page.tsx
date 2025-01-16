'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from 'lucide-react'
import { Spinner } from "@/components/ui/spinner"
import { Progress } from "@/components/ui/progress"

export default function CheckNewsPage() {
  const [newsTitle, setNewsTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<null | { isHoax: boolean; confidence: number; explanation: string }>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    // Simulate API call with setTimeout
    setTimeout(() => {
      // This is where you'd typically make an API call to your backend
      // For demonstration, we'll use a mock result
      const mockResult = {
        isHoax: Math.random() > 0.5,
        confidence: Math.floor(Math.random() * 30) + 70, // Random number between 70 and 99
        explanation: "Analisis AI kami telah menentukan hal ini berdasarkan referensi silang dengan sumber-sumber yang telah diverifikasi dan mendeteksi pola-pola umum kesalahan informasi."
      }
      setResult(mockResult)
      setIsLoading(false)
    }, 2000) // Simulate 2 seconds of processing time
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
          <CardDescription>Masukkan judul artikel berita yang ingin Anda periksa untuk mengetahui kemungkinan adanya hoaks.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="newsTitle">Judul Berita</Label>
                <Input
                  id="newsTitle"
                  placeholder="Masukan judul berita disini"
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setNewsTitle('')}>Hapus</Button>
          <Button onClick={handleSubmit} disabled={isLoading || newsTitle.trim() === ''}>
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
            <p className="text-center mt-4">AI kami sedang menganalisis berita. Ini mungkin memerlukan waktu beberapa saat.</p>
          </CardContent>
        </Card>
      )}
      {result && (
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
            <p className="text-gray-600 dark:text-gray-400">{result.explanation}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

