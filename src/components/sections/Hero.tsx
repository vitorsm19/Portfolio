'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { siteConfig } from '@/data/site'
import { useTypewriter } from '@/hooks/useTypewriter'
import aboutPic from '@/assets/about-pic.png'
import hungaryFlag from '@/assets/hungary-flag.png'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const photoVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const typedText = useTypewriter({
    words: [...siteConfig.hero.typewriterWords],
  })

  return (
    <motion.section
      className="min-h-screen bg-bg-primary flex flex-col items-center justify-evenly  px-6 "
      variants={prefersReducedMotion ? undefined : containerVariants}
      initial={prefersReducedMotion ? false : 'hidden'}
      animate="visible"
    >
      {/* Top row: title + image side by side */}
      <div className="max-w-7xl mx-auto w-full flex flex-col-reverse lg:flex-row items-center justify-around gap-10 lg:gap-16">
        {/* Text content — left on lg */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Greeting */}
          <motion.p
            className="text-text-heading text-xl lg:text-2xl mb-4"
            variants={prefersReducedMotion ? undefined : fadeUp}
          >
            {siteConfig.hero.greeting}
          </motion.p>

          {/* FRONTEND heading */}
          <motion.h1
            className="gradient-text-accent text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.6] py-2"
            variants={prefersReducedMotion ? undefined : fadeUp}
          >
            {siteConfig.hero.headingTop}
          </motion.h1>

          {/* DEVELOPER heading */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.6] py-2 bg-gradient-to-r from-text-secondary to-text-primary bg-clip-text"
            style={{ WebkitTextFillColor: 'transparent' }}
            variants={prefersReducedMotion ? undefined : fadeUp}
          >
            {siteConfig.hero.headingBottom}
          </motion.h1>

          {/* Location */}
          <motion.div
            className="flex items-center gap-2 mt-4 text-text-heading text-sm lg:text-base"
            variants={prefersReducedMotion ? undefined : fadeUp}
          >
            <span>
              {siteConfig.citizenship}. Located in {siteConfig.location}
            </span>
            <Image
              src={hungaryFlag}
              alt="Hungary flag"
              width={20}
              height={14}
              className="rounded-sm"
            />
          </motion.div>
        </div>

        {/* Photo — right on lg, top on mobile */}
        <motion.div
          className="flex-shrink-0"
          variants={prefersReducedMotion ? undefined : photoVariant}
        >
          <Image
            src={aboutPic}
            alt={siteConfig.name}
            width={400}
            height={400}
            priority
            className="w-[180px] lg:w-[400px] drop-shadow-lg object-cover"
          />
        </motion.div>
      </div>

      {/* Bottom row: tagline with typewriter — separate from title/image */}
      <motion.div
        className="max-w-7xl mx-auto w-full flex items-center justify-center mt-16 lg:mt-20"
        variants={prefersReducedMotion ? undefined : fadeUp}
      >
        <p className="text-base lg:text-xl text-text-heading text-center">
          {siteConfig.hero.tagline} <span className="text-accent font-semibold">{typedText}</span>
          <span className="animate-pulse text-accent">|</span> {siteConfig.hero.taglineSuffix}
        </p>
      </motion.div>
    </motion.section>
  )
}
