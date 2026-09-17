import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import WeddingPhoto from './WeddingPhoto.jsx';
import SectionFlowers from './SectionFlowers.jsx';
import TornEdge from './TornEdge.jsx';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      aria-label={t('hero.eyebrow')}
      className="relative flex flex-col items-center justify-start min-h-screen px-4 sm:px-6 pt-16 sm:pt-20 pb-10 sm:pb-16 overflow-visible bg-gradient-to-b from-parchment via-parchmentDeep to-parchment"
    >
      {/* ── Corner flowers – top corners, offset below the fixed header ── */}
      <SectionFlowers size={170} topOffset="4.5rem" />

      {/* ── Centered content wrapper keeps everything readable on wide screens ── */}
      <div className="relative z-[30] w-full flex flex-col items-center" style={{ maxWidth: '680px' }}>

      {/* ── Wedding Photo – prominently displayed with feathered edges ── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative z-[2] w-full flex justify-center mt-4 sm:mt-8"
        style={{ maxWidth: '520px' }}
      >
        <WeddingPhoto
          src="/assets/wedding.webp"
          featherX={0.88}
          featherY={0.85}
          featherEdge={0.35}
        />
      </motion.div>

      {/* ── Text card overlapping the bottom of the photo up to knees ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-[40] w-[90%] max-w-[380px] sm:max-w-md rounded-t-full border-4 border-gold/60 bg-parchment/85 backdrop-blur-sm px-5 sm:px-6 pt-14 sm:pt-20 pb-8 sm:pb-10 text-center shadow-[0_0_60px_-15px_rgba(201,162,39,0.5)]"
        style={{ marginTop: '-35%' }}
      >
        <svg
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-full h-full opacity-20"
          viewBox="0 0 300 400"
          aria-hidden="true"
        >
          <path
            d="M0 400 V150 A150 150 0 0 1 300 150 V400"
            fill="url(#glass)"
          />
          <defs>
            <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6B1F2A" />
              <stop offset="50%" stopColor="#3B2352" />
              <stop offset="100%" stopColor="#C9A227" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative z-10">
          <p className="font-display text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase text-royal/80">
            {t('hero.eyebrow')}
          </p>
          <p className="mt-1 font-display text-base sm:text-lg text-ink/70">{t('hero.date')}</p>

          <h1 className="mt-4 sm:mt-6 font-script text-4xl sm:text-5xl md:text-6xl leading-tight text-burgundy whitespace-pre-line">
            {t('hero.names')}
          </h1>

          <motion.button
            type="button"
            onClick={() =>
              document.getElementById('welcome')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="mt-6 sm:mt-8 inline-flex flex-col items-center gap-2 text-royal/80 hover:text-royal"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="font-script text-lg sm:text-xl">{t('hero.scrollDown')}</span>
            <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true">
              <path fill="none" stroke="currentColor" strokeWidth="2" d="M6 9l6 6 6-6" />
            </svg>
          </motion.button>
        </div>
      </motion.div>

      <p className="relative z-[40] mt-6 sm:mt-10 max-w-sm text-center font-body italic text-sm sm:text-base text-ink/80 px-4">
        {t('hero.verse')}
      </p>
      </div>
      <TornEdge color="#F6EFDD" />
    </section>
  );
}
