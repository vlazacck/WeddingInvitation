import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionFlowers from './SectionFlowers.jsx';
import TornEdge from './TornEdge.jsx';

export default function Telegram() {
  const { t } = useTranslation();

  return (
    <section 
      id="telegram" 
      className="relative bg-parchmentDeep px-4 sm:px-6 pt-24 sm:pt-32 pb-10 sm:pb-16 text-center"
    >
      {/* <SectionFlowers size={206} opacity={0.9} zIndex={30} customLayout={{ bottomLeft: true }} bottomOffset="-3.6rem" pull={20} /> */}
      {/* <SectionFlowers size={200} opacity={0.9} zIndex={20} customLayout={{ topLeft: true }} topOffset="1.9rem" pull={26} /> */}
      
      <div className="relative z-[40] mx-auto w-full" style={{ maxWidth: '640px' }}>
        
        {/* Camera Icon */}
        <div className="flex justify-center mb-4">
          <svg 
            viewBox="0 0 24 24" 
            className="w-12 h-12 sm:w-16 sm:h-16 text-burgundy" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
          </svg>
        </div>

        {/* Emphasized Title */}
        <h2 className="font-script text-3xl sm:text-4xl lg:text-5xl text-burgundy mb-4">
          {t('telegram.title', 'Send Us Your Photos!')}
        </h2>
        
        {/* Request Description */}
        <p className="font-body text-base sm:text-lg text-ink/80 mb-8 leading-relaxed max-w-md mx-auto">
          {t('telegram.request', 'We would love to see our wedding through your eyes! Please send us your pictures and videos from the celebration through our dedicated Telegram bot.')}
        </p>
        
        {/* Telegram Bot Button */}
      {/* Telegram Bot Button */}
<a
  href="https://telegram.me/betyermibot"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center gap-3 rounded-full bg-[#48151d] px-8 py-4 font-display text-base sm:text-lg tracking-wide text-white shadow-lg hover:bg-[#f6efdd] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
>
  {/* Telegram Paper Plane Icon */}
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
  </svg>
  Send us photos
</a>
      </div>
      
      {/* Torn Edge matching Schedule.jsx */}
      <TornEdge />
    </section>
  );
}