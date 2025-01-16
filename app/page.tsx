import TopNav from '@/components/ui/top-nav'
import Hero from './homepage/hero'
import Features from './homepage/features'
import HowItWorks from './homepage/how'
import Footer from '@/components/ui/footer'

export default function LandingPage() {
  return (
    <>
      <TopNav />
      <main className="flex flex-col items-center justify-center flex-1">
        <Hero />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </>
  )
}

