import Navbar from './components/sections/Navbar.jsx'
import Hero from './components/sections/Hero.jsx'
import LogoCloud from './components/sections/LogoCloud.jsx'
import Features from './components/sections/Features.jsx'
import HowItWorks from './components/sections/HowItWorks.jsx'
import Pricing from './components/sections/Pricing.jsx'
import Testimonials from './components/sections/Testimonials.jsx'
import FAQ from './components/sections/FAQ.jsx'
import Footer from './components/sections/Footer.jsx'

function App() {
  return (
    <div id="top" className="flex min-h-screen flex-col bg-void">
      <Navbar />

      <main id="main" className="flex-1">
        <Hero />
        <LogoCloud />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
      </main>

      <Footer />
    </div>
  )
}

export default App
