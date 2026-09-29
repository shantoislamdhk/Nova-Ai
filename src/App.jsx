import Navbar from './components/sections/Navbar.jsx'
import Hero from './components/sections/Hero.jsx'
import LogoCloud from './components/sections/LogoCloud.jsx'
import Footer from './components/sections/Footer.jsx'

function App() {
  return (
    <div id="top" className="flex min-h-screen flex-col bg-void">
      <Navbar />

      <main id="main" className="flex-1">
        <Hero />
        <LogoCloud />
      </main>

      <Footer />
    </div>
  )
}

export default App
