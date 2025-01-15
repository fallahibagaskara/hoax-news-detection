import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from 'lucide-react'

// This would typically come from an API or database
const recentHoaxes = [
  {
    id: 1,
    title: "Fake Celebrity Death Hoax",
    url: "https://example.com/celebrity-hoax",
    detectedDate: "2023-07-10",
    confidence: 98,
    category: "Entertainment",
  },
  {
    id: 2,
    title: "Misleading Political Statement",
    url: "https://example.com/political-hoax",
    detectedDate: "2023-07-09",
    confidence: 87,
    category: "Politics",
  },
  {
    id: 3,
    title: "False Medical Claim",
    url: "https://example.com/medical-hoax",
    detectedDate: "2023-07-08",
    confidence: 95,
    category: "Health",
  },
  {
    id: 4,
    title: "Fabricated Scientific Discovery",
    url: "https://example.com/science-hoax",
    detectedDate: "2023-07-07",
    confidence: 92,
    category: "Science",
  },
  {
    id: 5,
    title: "Manipulated Sports Result",
    url: "https://example.com/sports-hoax",
    detectedDate: "2023-07-06",
    confidence: 89,
    category: "Sports",
  },
]

export default function RecentHoaxesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Deteksi Hoax Terbaru</h1>
        <Button asChild variant="ghost">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Beranda
          </Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recentHoaxes.map((hoax) => (
          <Card key={hoax.id}>
            <CardHeader>
              <CardTitle>{hoax.title}</CardTitle>
              <CardDescription>{hoax.url}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <Badge>{hoax.category}</Badge>
                <span className="text-sm text-muted-foreground">{hoax.detectedDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Keyakinan:</span>
                <span className="text-sm font-bold">{hoax.confidence}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

