import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hoax Buster',
  description: 'Deteksi kebenaran berita dengan cepat dan mudah hanya menggunakan tautan berita',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
