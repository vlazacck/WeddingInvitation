import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import TornEdge from './TornEdge.jsx';
import SectionFlowers from './SectionFlowers.jsx';

export default function Welcome() {
  const { t } = useTranslation();

  return (
    <section id="welcome" className="relative bg-parchmentDeep px-4 sm:px-6 md:px-16 lg:px-24 pt-20 sm:pt-24 pb-10 sm:pb-16 text-center">
      {/* <SectionFlowers size={110} /> */}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-xl relative z-[40]"
      >
        <h2 className=" mt-8 font-script text-3xl sm:text-4xl text-burgundy leading-snug">
          {t('welcome.titleLine1')}
          <br />
          {t('welcome.titleLine2')}
          <br />
          {t('welcome.titleLine3')}
        </h2>

        <p className="mt-6 sm:mt-8 font-display text-base sm:text-lg text-ink/90">{t('welcome.greeting')}</p>
        <p className="mt-2 font-body text-sm sm:text-base text-ink/80">{t('welcome.body')}</p>

        <blockquote className="mt-8 sm:mt-10 mx-auto max-w-sm rounded-lg border border-gold/40 bg-parchment/70 px-5 sm:px-6 py-4 sm:py-5 shadow-sm">
          <p className="font-body italic text-sm sm:text-base text-ink/90">"{t('welcome.verseText')}"</p>
          <cite className="mt-3 block font-display text-xs sm:text-sm tracking-wide text-royal/80 not-italic">
            — {t('welcome.verseRef')}
          </cite>
        </blockquote>
      </motion.div>
      <SectionFlowers size={200} opacity={0.9} zIndex={20} customLayout={{ topRight: true }} topOffset="1.9rem" pull={26} />
      <TornEdge />
    </section>
  );
}
