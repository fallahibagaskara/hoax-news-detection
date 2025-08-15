"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function TopNav() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    // Auto-close on route change (prevents stale open state)
    useEffect(() => {
        setOpen(false)
    }, [pathname])

    // Close on ESC for accessibility
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [])

    return (
        <header className="sticky top-4 z-50 w-full">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Brand */}
                <Link className="flex items-center gap-3" href="/">
                    <span className="sr-only">Hoax Buster</span>
                    <Image src="/logo.png" width={25} height={25} alt="Logo" />
                    <span className="hidden font-bold tracking-tight transition-colors duration-300 text-lg sm:text-xl text-neutral-800 dark:text-neutral-200 sm:inline">Hoax Buster</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
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

                {/* Mobile Toggle */}
                <Button
                    type="button"
                    variant="ghost"
                    className="md:hidden"
                    aria-controls="mobile-nav"
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                >
                    {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </div>

            {/* Mobile Sheet */}
            <div
                className={`
    absolute inset-x-0 top-16 z-50 origin-top rounded-b-2xl border-b border-x 
    bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg
    transition-all duration-200
    ${open ? "scale-y-100 opacity-100" : "scale-y-95 opacity-0 pointer-events-none"}
  `}
            >
                <nav className="flex flex-col gap-2 px-6 py-4" aria-label="Mobile">
                    <Link
                        className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                        href="#features"
                        onClick={() => setOpen(false)}
                    >
                        Fitur
                    </Link>
                    <Link
                        className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                        href="#how-it-works"
                        onClick={() => setOpen(false)}
                    >
                        Bagaimana cara kerjanya
                    </Link>
                    <Link
                        className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                        href="/recent-hoaxes"
                        onClick={() => setOpen(false)}
                    >
                        Berita Hoaks Terbaru
                    </Link>
                </nav>
            </div>

        </header>
    )
}
