import Header from "./components/Header"
import Hero from "./components/Hero"
import Services from "./components/Services"
import Footer from "./components/Footer"
import About from "./components/About"
import Testimonials from "./components/Testimonials"

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <Footer />
    </div>
  )
}
