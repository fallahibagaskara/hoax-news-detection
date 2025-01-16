"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'

export default function TopNav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
            <Link className="flex items-center justify-center" href="#">
                <span className="sr-only">Hoax Buster</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                >
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                    <line x1="12" x2="12" y1="9" y2="13" />
                    <line x1="12" x2="12.01" y1="17" y2="17" />
                </svg>
            </Link>
            <Button variant="ghost" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Menu className="h-6 w-6" />
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