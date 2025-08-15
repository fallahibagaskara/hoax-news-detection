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

    // Auto-close on route change
    useEffect(() => setOpen(false), [pathname])

    // Close on ESC
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [])

    // Lock scroll when mobile menu open
    useEffect(() => {
        const root = document.documentElement
        if (open) root.style.overflow = "hidden"
        else root.style.overflow = ""
        return () => { root.style.overflow = "" }
    }, [open])

    return (
        <header className="sticky top-4 z-50 w-full">
            {/* Floating glass container */}
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between rounded-2xl border bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg px-2 md:px-6">
                    {/* Brand */}
                    <Link className="flex items-center gap-3 pl-3 sm:pl-4" href="/">
                        <span className="sr-only">Hoax Buster</span>
                        <Image src="/logo.png" width={28} height={28} alt="Logo" />
                        <span className="text-lg sm:text-xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200">
                            Hoax Buster
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
                        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
                            Fitur
                        </Link>
                        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#how-it-works">
                            Cara Kerja
                        </Link>
                    </nav>

                    {/* Mobile Toggle */}
                    <Button
                        type="button"
                        variant="ghost"
                        className="md:hidden grid place-items-center h-16 w-16 p-0 rounded-2xl"
                        aria-controls="mobile-nav"
                        aria-expanded={open}
                        aria-label="Toggle menu"
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? (
                            <X className="!h-7 !w-7 shrink-0" />
                        ) : (
                            <Menu className="!h-7 !w-7 shrink-0" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Backdrop */}
            <div
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"} md:hidden`}
                onClick={() => setOpen(false)}
                aria-hidden="true"
            />

            {/* Mobile Sheet (aligned under floating nav) */}
            <div
                id="mobile-nav"
                role="dialog"
                aria-modal="true"
                className={`
          fixed left-4 right-4 top-20 z-50 origin-top rounded-2xl border
          bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-xl
          transition-all duration-200 md:hidden
          ${open ? "scale-y-100 opacity-100" : "scale-y-95 opacity-0 pointer-events-none"}
        `}
            >
                <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
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
                        Cara Kerja
                    </Link>
                </nav>
            </div>
        </header>
    )
}
