import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Envelope({ onOpen }) {
  const { t } = useTranslation();
  const [closing, setClosing] = useState(false);
  const [glowing, setGlowing] = useState(false);

  const handleOpen = () => {
    if (glowing || closing) return;
    setGlowing(true);

    // Wait for the soft glow animation to play before starting the envelope exit transition
    setTimeout(() => {
      setClosing(true);
    }, 1500);

    // Call the parent's onOpen after the envelope is fully closed/faded out
    setTimeout(onOpen, 2400);
  };

  return (
    <AnimatePresence>
      {!closing && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className="fixed inset-0 z-40 flex items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at center, #F0E8D2 0%, #E4D5B0 100%)',
          }}
        >
          <button
            type="button"
            onClick={handleOpen}
            className="group relative focus-visible:outline-none"
            aria-label={t('envelope.tapToOpen')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {/* Envelope card */}
            <div
              className="relative overflow-hidden rounded-[2rem] shadow-[0_32px_80px_rgba(58,46,34,0.22)]"
              style={{
                width: 'min(85vw, 420px)',
                height: 'min(80vh, 620px)',
                backgroundColor: '#F0E8D2',
                border: '1px solid rgba(201, 162, 39, 0.25)',
              }}
            >
              {/* ── Paper texture rendered inline via SVG filter ── */}
              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ mixBlendMode: 'multiply' }}
              >
                <defs>
                  <filter id="paper-grain" x="0%" y="0%" width="100%" height="100%"
                          colorInterpolationFilters="sRGB">
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.72 0.68"
                      numOctaves="4"
                      seed="3"
                      stitchTiles="stitch"
                      result="noise"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.72
                              0 0 0 0 0.64
                              0 0 0 0 0.48
                              0 0 0 0.28 0"
                      in="noise"
                      result="tinted"
                    />
                  </filter>
                  <filter id="paper-speckle" x="0%" y="0%" width="100%" height="100%"
                          colorInterpolationFilters="sRGB">
                    <feTurbulence
                      type="turbulence"
                      baseFrequency="1.1 0.9"
                      numOctaves="2"
                      seed="8"
                      stitchTiles="stitch"
                      result="speck"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.60
                              0 0 0 0 0.52
                              0 0 0 0 0.36
                              0 0 0 0.10 0"
                      in="speck"
                    />
                  </filter>
                </defs>
                {/* grain layer */}
                <rect width="100%" height="100%" filter="url(#paper-grain)" />
                {/* speckle layer */}
                <rect width="100%" height="100%" filter="url(#paper-speckle)" />
              </svg>

              {/* Vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at center, transparent 50%, rgba(160,130,70,0.15) 100%)',
                }}
              />

              {/* Envelope V-fold lines */}
              <svg
                viewBox="0 0 420 620"
                className="absolute inset-0 h-full w-full pointer-events-none"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <path
                  d="M32 32 L210 290 L388 32"
                  fill="none"
                  stroke="rgba(201,162,39,0.35)"
                  strokeWidth="1.2"
                />
                <path
                  d="M32 588 L210 290 L388 588"
                  fill="none"
                  stroke="rgba(201,162,39,0.35)"
                  strokeWidth="1.2"
                />
              </svg>

              {/* ── Golden wax seal — perfectly centered, no white box ── */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Sun-like glow light effect */}
                {/* Sun-like glow light effect */}
                <AnimatePresence>
                  {glowing && (
                    <>
                      {/* Concentric expanding golden glow waves */}
                      <motion.div
                        key="glow-wave-1"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: [0.8, 1.8, 2.4], opacity: [0, 0.75, 0] }}
                        transition={{ duration: 1.8, ease: "easeOut" }}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                          width: 'min(140px, 38vw)',
                          height: 'min(140px, 38vw)',
                          background: 'radial-gradient(circle, rgba(254,243,199,0.85) 0%, rgba(251,191,36,0.3) 45%, rgba(245,158,11,0) 70%)',
                          mixBlendMode: 'normal',
                          zIndex: 5,
                        }}
                      />
                      <motion.div
                        key="glow-wave-2"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: [0.6, 1.4, 1.9], opacity: [0, 0.6, 0] }}
                        transition={{ duration: 2.1, ease: "easeOut", delay: 0.15 }}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                          width: 'min(140px, 38vw)',
                          height: 'min(140px, 38vw)',
                          background: 'radial-gradient(circle, rgba(254,243,199,0.7) 0%, rgba(252,211,77,0.15) 50%, rgba(217,119,6,0) 75%)',
                          mixBlendMode: 'normal',
                          zIndex: 5,
                        }}
                      />
                    </>
                  )}
                </AnimatePresence>

                <motion.div
  className="animate-sealPulse"
  whileTap={{ rotate: -6, scale: 0.94 }}
  // 1. We increased the peak scale to 1.4 (40% larger) and added a rebound to 0.9 before settling
  animate={glowing ? { scale: [1, 1.4, 0.9, 1.05, 1] } : {}}
  // 2. We use a spring transition to give it that organic, snappy bounce
  transition={
    glowing 
      ? { type: "spring", stiffness: 200, damping: 10, mass: 1 } 
      : { duration: 1.5, ease: "easeInOut" }
  }
  style={{
    width: 'min(140px, 38vw)',
    height: 'min(140px, 38vw)',
    borderRadius: '50%',
    overflow: 'hidden',
    filter: glowing 
      ? 'drop-shadow(0 0 30px rgba(251,191,36,0.7)) drop-shadow(0 14px 28px rgba(90,60,5,0.45))'
      : 'drop-shadow(0 14px 28px rgba(90,60,5,0.45))',
    transition: 'filter 0.5s ease-in-out',
    zIndex: 10,
  }}
>
                  <img
                    src="/assets/wax-seal.webp"
                    alt="Wax seal"
                    draggable="false"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      userSelect: 'none',
                      mixBlendMode: 'multiply',
                    }}
                  />
                </motion.div>
              </div>

              {/* Tap to open label */}
              <div className="absolute inset-x-0 bottom-12 flex justify-center">
                <span
                  className="font-display tracking-[0.4em] uppercase transition-colors group-hover:text-royal"
                  style={{
                    fontSize: 'clamp(0.75rem, 2.5vw, 0.95rem)',
                    color: 'rgba(59, 35, 82, 0.78)',
                    letterSpacing: '0.35em',
                  }}
                >
                  {t('envelope.tapToOpen')}
                </span>
              </div>
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
