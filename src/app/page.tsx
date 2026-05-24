import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { HeroParallax } from '@/components/sections/HeroParallax'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Services } from '@/components/sections/Services'
import { Skills } from '@/components/sections/Skills'
import { Contact } from '@/components/sections/Contact'
import { Marquee } from '@/components/ui/Marquee'

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-sans overflow-x-hidden selection:bg-accent/30">
      <Navbar />
      <HeroParallax />

      {/* Marquee ticker */}
      <div className="border-y border-white/6 bg-bg-secondary">
        <Marquee
          text="FRONTEND DEVELOPER  //  AVAILABLE WORLDWIDE  //  LET'S BUILD SOMETHING  //"
          speed={35}
          className="text-text-muted/40 text-lg sm:text-xl font-bold uppercase tracking-[0.15em]!"
        />
      </div>

      <section
        id="about"
        aria-label="About"
        className="py-28 lg:py-40 px-6 lg:px-16 bg-bg-secondary"
      >
        <About />
      </section>

      <section id="work" aria-label="Projects">
        <Projects />
      </section>

      <section id="services" aria-label="Services" className="py-24 lg:py-36 px-6 lg:px-16 pt-0">
        <Services />
      </section>

      <section aria-label="Technical skills">
        <Skills />
      </section>

      <section id="contact" aria-label="Contact" className="py-32 lg:py-44 px-6 lg:px-16">
        <Contact />
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
