import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLang = (lng) => {
    i18n.changeLanguage(lng);
  };

  const isAm = i18n.language === 'am';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 sm:px-5 md:px-8 transition-all duration-300 ${
        scrolled ? 'py-1.5 sm:py-2 bg-parchment/90 backdrop-blur shadow-sm' : 'py-2.5 sm:py-4 bg-transparent'
      }`}
    >
      <span className="font-display text-base sm:text-xl md:text-2xl tracking-wide text-royal truncate max-w-[55%]">
        {t('header.brand')}
      </span>

      <div
        role="group"
        aria-label="Language selection"
        className="flex items-center gap-0.5 sm:gap-1 rounded-full border border-gold/50 bg-parchment/80 p-0.5 sm:p-1 shadow-sm flex-shrink-0"
      >
        <button
          type="button"
          onClick={() => switchLang('en')}
          aria-pressed={!isAm}
          className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium transition-colors ${
            !isAm ? 'bg-royal text-parchment' : 'text-royal hover:bg-royal/10'
          }`}
        >
          {t('langToggle.en')}
        </button>
        <button
          type="button"
          onClick={() => switchLang('am')}
          aria-pressed={isAm}
          className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium font-ethiopic transition-colors ${
            isAm ? 'bg-royal text-parchment' : 'text-royal hover:bg-royal/10'
          }`}
        >
          {t('langToggle.am')}
        </button>
      </div>
    </header>
  );
}
