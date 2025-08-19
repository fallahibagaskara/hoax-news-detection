import TopNav from '@/components/ui/top-nav'
import Hero from './homepage/hero'
import Features from './homepage/features'
import HowItWorks from './homepage/how'
import Footer from '@/components/ui/footer'

export default function LandingPage() {
  return (
    <>
      <div className="min-h-screen w-full bg-white relative overflow-x-hidden">
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)",
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

