import { Header } from '@/components/layout/Header'
import { SocialSidebar } from '@/components/layout/SocialSidebar'
import { EmailSidebar } from '@/components/layout/EmailSidebar'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Services } from '@/components/sections/Services'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex w-full">
        <SocialSidebar />
        <div className="flex flex-col items-center w-full">
          <Hero />
          <section id="about" className="w-full">
            <About />
          </section>
          <section id="skills" className="w-full">
            <Skills />
          </section>
          <section id="projects" className="w-full">
            <Projects />
          </section>
          <section id="services" className="w-full">
            <Services />
          </section>
          <section id="contact" className="w-full">
            <Contact />
          </section>
        </div>
        <EmailSidebar />
        <ScrollToTop />
      </main>
    </>
  )
}
