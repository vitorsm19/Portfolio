import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Services } from '@/components/sections/Services'
import { ContractorFit } from '@/components/sections/ContractorFit'
import { HowIWork } from '@/components/sections/HowIWork'
import { Skills } from '@/components/sections/Skills'
import { Faq } from '@/components/sections/Faq'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="overflow-x-clip">
        <Hero />

        <section id="about" aria-label="About" className="py-24 lg:py-36">
          <About />
        </section>

        <section id="work" aria-label="Selected work" className="bg-bg-secondary py-24 lg:py-36">
          <Projects />
        </section>

        <section id="services" aria-label="Services" className="py-24 lg:py-36">
          <Services />
        </section>

        <section id="approach" aria-label="What you can count on" className="bg-bg-secondary py-24 lg:py-36">
          <ContractorFit />
        </section>

        <section id="process" aria-label="Working together" className="py-24 lg:py-36">
          <HowIWork />
        </section>

        <section id="stack" aria-label="Tech stack" className="bg-bg-secondary py-24 lg:py-36">
          <Skills />
        </section>

        <section id="faq" aria-label="Frequently asked questions" className="py-24 lg:py-36">
          <Faq />
        </section>

        <section id="contact" aria-label="Contact" className="bg-bg-secondary py-24 lg:py-36">
          <Contact />
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
