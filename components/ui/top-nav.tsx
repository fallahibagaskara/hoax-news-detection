"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import Image from 'next/image'

export default function TopNav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <header className="px-4 pt-4 lg:px-20 h-18 flex items-center justify-between">
            <Link className="flex items-center justify-center" href="#">
                <span className="sr-only">Hoax Buster</span>
                <Image src="/logo.png" width={48} height={48} alt="Logo" />
            </Link>
            <Button variant="ghost" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Menu className="h-10 w-10" />
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
    )
}