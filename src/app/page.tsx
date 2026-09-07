import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Clients } from '@/components/sections/Clients'
import { Work } from '@/components/sections/Work'
import { About } from '@/components/sections/About'
import { Stack } from '@/components/sections/Stack'
import { Engagements } from '@/components/sections/Engagements'
import { Process } from '@/components/sections/Process'
import { Faq } from '@/components/sections/Faq'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="overflow-x-clip">
        <Hero />
        <Clients />

        <section id="work" aria-label="Selected work" className="py-24 lg:py-36">
          <Work />
        </section>

        {/* The one recessed plate on the page, so the recession means something. */}
        <section id="about" aria-label="About" className="bg-paper-deep py-24 lg:py-36">
          <About />
          <Stack />
        </section>

        <section id="engagements" aria-label="Engagements" className="py-24 lg:py-36">
          <Engagements />
        </section>

        <section id="process" aria-label="Working together" className="py-24 lg:py-36">
          <Process />
        </section>

        <section id="faq" aria-label="Frequently asked questions" className="py-24 lg:py-36">
          <Faq />
        </section>

        <section id="contact" aria-label="Contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  )
}
