import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TornEdge from './TornEdge.jsx';

const WEDDING_DATE = new Date('2026-11-03T17:00:00');

function getTimeLeft() {
  const diff = Math.max(0, WEDDING_DATE.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  };
}

export default function Countdown() {
  const { t } = useTranslation();
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { value: time.days, label: t('countdown.days') },
    { value: time.hours, label: t('countdown.hours') },
    { value: time.minutes, label: t('countdown.minutes') },
    { value: time.seconds, label: t('countdown.seconds') }
  ];

  return (
    <>
      <style>{`
        @keyframes swing {
          0%, 100% { transform: translate(9%, 15%) rotate(-3deg); }
          50% { transform: translate(9%, 15%) rotate(3deg); }
        }
        @keyframes swing-left {
          0%, 100% { transform: translate(-6%, 47%) rotate(3deg); }
          50% { transform: translate(-6%, 47%) rotate(-3deg); }
        }
        .flower-swing-right {
          animation: swing 8s ease-in-out infinite;
          transform-origin: top right;
        }
        .flower-swing-left {
          animation: swing-left 8s ease-in-out infinite;
          transform-origin: bottom left;
        }
      `}</style>
      
      <section className="relative bg-parchment px-4 sm:px-6 pt-16 sm:pt-20 pb-10 sm:pb-16 text-center" aria-label={t('countdown.title')}>
        {/* Top right flower - swinging */}
        <img
          src="/assets/Rightflower.webp"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-[140px] h-auto opacity-90 z-[30] flower-swing-right"
        />
        
        {/* Bottom left flower - swinging */}
        <img
          src="/assets/Leftflower.webp"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-[140px] h-auto opacity-90 z-[30] flower-swing-left"
        />

        <div className="relative z-[40] mx-auto w-full" style={{ maxWidth: '640px' }}>
          <h2 className="mt-10 font-script text-2xl sm:text-3xl lg:text-4xl text-burgundy relative z-[40]">{t('countdown.title')}</h2>

          <div
            className="mt-6 sm:mt-8 flex items-start justify-center gap-3 sm:gap-8 relative z-[40]"
            role="timer"
            aria-live="polite"
          >
            {units.map((u) => (
              <div key={u.label} className="flex flex-col items-center">
                <span className="font-display text-3xl sm:text-4xl md:text-5xl tabular-nums text-royal">
                  {String(u.value).padStart(2, '0')}
                </span>
                <span className="mt-1 text-[0.65rem] sm:text-xs md:text-sm uppercase tracking-widest text-ink/70">
                  {u.label}
                </span>
              </div>
            ))}
          </div>

          {/* Wedding date displayed below the countdown */}
          <p className="mt-6 sm:mt-8 font-script text-xl sm:text-2xl lg:text-3xl text-burgundy">
            {t('countdown.date', 'November 07 / 2026')}
          </p>
        </div>
        <TornEdge color="#F6EFDD" />
      </section>
    </>
  );
}