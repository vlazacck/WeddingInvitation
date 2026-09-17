import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionFlowers from './SectionFlowers.jsx';
// TornEdge is not needed in the footer itself, but the extra padding clears the RSVP's TornEdge

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-royal px-4 sm:px-6 pt-24 sm:pt-32 pb-10 sm:pb-16 text-center text-parchment overflow-visible">
      {/* <SectionFlowers size={90} opacity={0.35} /> */}

      <p className="mx-auto max-w-sm font-body italic text-sm sm:text-base relative z-[40]">
        {t('footer.verse')}
      </p>

      <div className="mt-6 sm:mt-8 relative z-[40]">
        <p className="font-display text-xs sm:text-sm uppercase tracking-widest text-goldLight">
          {t('footer.contactTitle')}
        </p>
        <a 
          href={`mailto:${t('footer.contactEmail')}`} 
          className="mt-1 inline-block font-body text-sm sm:text-base underline hover:text-goldLight transition-colors"
        >
          {t('footer.contactEmail')}
        </a>
      </div>

      <div className="mt-4 sm:mt-6 flex justify-center gap-4 relative z-[40]" aria-label={t('footer.social')}>
        {['Instagram', 'Facebook'].map((label) => (
          <a
            key={label}
            href="#"
            className="text-xs sm:text-sm font-body text-parchment/80 hover:text-goldLight transition-colors"
          >
            {label}
          </a>
        ))}
      </div>

      <p className="mt-6 sm:mt-8 text-[0.65rem] sm:text-xs font-body text-parchment/60 relative z-[40]">
        {t('footer.copyright')}
      </p>
    </footer>
  );
}