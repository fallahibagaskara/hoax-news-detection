import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
            <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Hoax Buster. Semua hak cipta dilindungi undang-undang.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                <Link className="text-xs hover:underline underline-offset-4" href="/terms-of-service">
                    Syarat dan Ketentuan
                </Link>
                <Link className="text-xs hover:underline underline-offset-4" href="/privacy-policy">
                    Kebijakan Privasi
                </Link>
            </nav>
        </footer>
    )
}

