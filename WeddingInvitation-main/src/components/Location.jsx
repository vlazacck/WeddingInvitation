import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import TornEdge from './TornEdge.jsx';

export default function Location() {
  const { t } = useTranslation();

  const mapsUrl =
    'https://www.google.com/maps?q=Kotebe+02+mulu+wengel+church&ll=9.0337967,38.8242241&output=embed&z=18';

  return (
    <section
      id="location"
      className="relative bg-white px-4 sm:px-6 pt-12 sm:pt-16 pb-12 sm:pb-16 text-center overflow-visible z-[20]"
    >
      <div className="relative z-[40] mx-auto w-full max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="font-script text-2xl sm:text-3xl lg:text-4xl text-gold relative z-[40]"
        >
          {t('location.title')}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="mt-2 font-display text-base sm:text-lg leading-snug text-ink/90 relative z-[40]">
            {t('location.venueName')}
          </p>
          <p className="mt-0.5 font-body text-sm sm:text-base leading-snug text-ink/70 relative z-[40]">
            {t('location.address')}
          </p>
        </motion.div>

        {/* Small gold line-art church and decorative divider */}
        <motion.svg
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewBox="0 0 320 125"
          className="mx-auto mt-4 sm:mt-6 w-full max-w-[220px] text-gold relative z-[40]"
          role="img"
          aria-label={t('location.venueName')}
        >
          <path
            d="M160 12v15M154 18h12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M145 45l15-18 15 18v35h-30zM151 80V61a9 9 0 0118 0v19"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle
            cx="160"
            cy="51"
            r="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M42 88h236"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M42 88l-7-3 7 3-7 3M278 88l7-3-7 3 7 3M78 88c-10-2-12-8-5-11 7-3 12 4 8 9-4 5-11 5-16 1M242 88c10-2 12-8 5-11-7-3-12 4-8 9 4 5 11 5 16 1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <iframe
            title={t('location.venueName')}
            src={mapsUrl}
            className="relative z-[30] mx-auto mt-4 w-full max-w-2xl h-[320px] sm:h-[400px] rounded-2xl border-2 border-gold/60 shadow-md"
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </motion.div>
      </div>

      {/* ── Bottom TornEdge hanging downward over the next section ── */}
     {/* ── Bottom TornEdge hanging downward over the next section ── */}
<div
  aria-hidden="true"
  className="absolute bottom-0 left-0 right-0 translate-y-[95%] z-[48] pointer-events-none
             shadow-none [filter:none] [&_*]:!shadow-none [&_*]:![filter:none]"
  style={{ filter: 'none', boxShadow: 'none' }}
>
  <TornEdge color="#ffffff" inset={false} />
</div>
    </section>
  );
}