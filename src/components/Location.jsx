import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionFlowers from './SectionFlowers.jsx';
import TornEdge from './TornEdge.jsx';

export default function Location() {
  const { t } = useTranslation();

  const mapsUrl = 'https://www.google.com/maps?q=Kotebe+02+mulu+wengel+church&ll=9.0337967,38.8242241&output=embed&z=18';

  return (
    <section id="location" className="relative bg-parchment px-4 sm:px-6 pt-16 sm:pt-20 pb-10 sm:pb-16 text-center">
      <SectionFlowers size={206} opacity={0.9} zIndex={30} customLayout={{ bottomRight: true }} bottomOffset="-3.6rem" pull={20} />
      <SectionFlowers size={200} opacity={0.9} zIndex={20} customLayout={{ topLeft: true }} topOffset="1.9rem" pull={26} />
      <div className="relative z-[40] mx-auto w-full" style={{ maxWidth: '640px' }}>


      <h2 className="mt-8 font-script text-2xl sm:text-3xl lg:text-4xl text-burgundy relative z-[40]">{t('location.title')}</h2>
      <p className="mt-3 sm:mt-4 font-display text-base sm:text-lg text-ink/90 relative z-[40]">{t('location.venueName')}</p>
      <p className="mt-1 font-body text-sm sm:text-base text-ink/70 relative z-[40]">{t('location.address')}</p>

      {/* Small gold line-art church and decorative divider */}
      <svg
        viewBox="0 0 320 125"
        className="mx-auto mt-6 sm:mt-8 w-full max-w-[220px] text-gold relative z-[40]"
        role="img"
        aria-label={t('location.venueName')}
      >
        <path d="M160 12v15M154 18h12" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M145 45l15-18 15 18v35h-30zM151 80V61a9 9 0 0118 0v19" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="160" cy="51" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M154 80v-10h12v10M42 88h236" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M42 88l-7-3 7 3-7 3M278 88l7-3-7 3 7 3M78 88c-10-2-12-8-5-11 7-3 12 4 8 9-4 5-11 5-16 1M242 88c10-2 12-8 5-11-7-3-12 4-8 9 4 5 11 5 16 1" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <iframe
        title={t('location.venueName')}
        src={mapsUrl}
className="relative z-[30] mx-auto mt-5 aspect-square h-auto w-full max-w-[240px] rounded-2xl border-2 border-gold/70 shadow-sm"
loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      </div>
      <TornEdge color="#F6EFDD" />
    </section>
  );
}
