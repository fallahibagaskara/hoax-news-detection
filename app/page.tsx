import TopNav from '@/components/ui/top-nav'
import Hero from './homepage/hero'
import Features from './homepage/features'
import HowItWorks from './homepage/how'
import Footer from '@/components/ui/footer'

export default function LandingPage() {
  return (
    <>
      <div className="min-h-screen w-full bg-white relative">
        <div
          className="fixed inset-0 z-0" // Ganti absolute menjadi fixed
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
        <TopNav />
        <main className="flex flex-col items-center justify-center flex-1">
          <Hero />
          <Features />
          <HowItWorks />
        </main>
        <Footer />
      </div>
    </>
  )
}

