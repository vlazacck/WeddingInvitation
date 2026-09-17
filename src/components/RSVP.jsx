import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import TornEdge from './TornEdge.jsx';

// ⚠️ PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE:
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwVN0239xZSmz82le6QyFmGkCD-ZDOpzwN5hyElflFgO01aWYD2TM0egJyJSNrdupBE/exec';

const initialForm = { name: '', email: '', attending: 'yes', guests: 1, message: '', website: '' };

export default function RSVP() {
  const { t } = useTranslation();
  const [revealed, setRevealed] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = t('rsvp.requiredField', 'Required');
    if (!form.email.trim()) {
      next.email = t('rsvp.requiredField', 'Required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = t('rsvp.invalidEmail', 'Invalid email');
    }
    return next;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot for spam bots
    if (form.website) {
      setStatus('success');
      return;
    }

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('submitting');
    
    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          // 'text/plain' bypasses CORS preflight restrictions on Google Apps Script
          'Content-Type': 'text/plain', 
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form to Google Sheets');
      }

      const result = await response.json();
      
      if (result.status === 'success') {
        setStatus('success');
        setForm(initialForm); // Reset form values on success
      } else {
        console.error('Apps Script API Error:', result.message);
        setStatus('error');
      }
    } catch (err) {
      console.error('Network/Fetch Error:', err);
      setStatus('error');
    }
  };

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

      <section id="rsvp" className="relative bg-parchment px-4 sm:px-6 pt-16 sm:pt-20 pb-10 sm:pb-16 text-center">
        {/* Top right flower - swinging (matching Countdown) */}
        <img
          src="/assets/Rightflower.webp"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-[140px] h-auto opacity-90 z-[30] flower-swing-right"
        />
        
        {/* Bottom left flower - swinging (matching Countdown) */}
        <img
          src="/assets/Leftflower.webp"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-[140px] h-auto opacity-90 z-[30] flower-swing-left"
        />
        
        <div className="relative z-[40] mx-auto w-full" style={{ maxWidth: '640px' }}>
          
          {/* Title */}
          <h2 className="mt-8 font-script text-2xl sm:text-3xl lg:text-4xl text-burgundy relative z-[40]">
            {t('rsvp.formTitle', 'Will you join us?')}
          </h2>

          {/* Wax Seal Button */}
          <button
            type="button"
            onClick={() => setRevealed((r) => !r)}
            aria-expanded={revealed}
            aria-controls="rsvp-panel"
            className="mx-auto mt-6 flex flex-col items-center gap-2 relative z-[40]"
          >
            <span className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-burgundy shadow-lg border-2 border-gold/30">
              <span className="font-display text-[0.6rem] sm:text-xs tracking-widest text-goldLight uppercase">
                {t('rsvp.sealLabel', 'RSVP')}
              </span>
            </span>
            <span className="font-script text-base sm:text-lg text-royal/80">
              {revealed ? t('rsvp.clickToClose', 'Close') : t('rsvp.clickToOpen', 'Tap to open')}
            </span>
          </button>

          <AnimatePresence initial={false}>
            {revealed && (
              <motion.div
                id="rsvp-panel"
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="max-w-md mx-auto overflow-hidden text-left relative z-[40]"
              >
                {status === 'success' ? (
                  <div className="rounded-lg bg-sage/20 border border-sage/40 px-4 py-6 text-center">
                    <p className="font-script text-xl sm:text-2xl text-burgundy mb-2">
                      {t('rsvp.successTitle', 'Thank you!')}
                    </p>
                    <p role="status" className="font-body text-sm sm:text-base text-ink/80">
                      {t('rsvp.success', 'Your RSVP has been received.')}
                    </p>
                    <p className="mt-4 font-script text-lg text-royal/80">
                      {t('rsvp.farewell', 'Hope to see you there!')}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5 bg-white/40 backdrop-blur-sm p-6 rounded-xl border border-gold/20 shadow-sm">
                    
                    {/* Honeypot */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="website">Website</label>
                      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={handleChange} />
                    </div>

                    <div>
                      <label htmlFor="name" className="block font-body text-sm text-ink/80 mb-1">
                        {t('rsvp.nameLabel', 'Full Name')}
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder={t('rsvp.namePlaceholder', 'John Doe')}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className="w-full rounded-md border border-gold/50 bg-white/80 px-3 py-2.5 font-body text-sm sm:text-base text-ink focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
                      />
                      {errors.name && <p id="name-error" className="mt-1 text-xs sm:text-sm text-burgundy">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block font-body text-sm text-ink/80 mb-1">
                        {t('rsvp.emailLabel', 'Email Address')}
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder={t('rsvp.emailPlaceholder', 'john@example.com')}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className="w-full rounded-md border border-gold/50 bg-white/80 px-3 py-2.5 font-body text-sm sm:text-base text-ink focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
                      />
                      {errors.email && <p id="email-error" className="mt-1 text-xs sm:text-sm text-burgundy">{errors.email}</p>}
                    </div>

                    <fieldset>
                      <legend className="font-body text-sm text-ink/80 mb-2">
                        {t('rsvp.attendingLabel', 'Will you be attending?')}
                      </legend>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 font-body text-sm text-ink cursor-pointer">
                          <input type="radio" name="attending" value="yes" checked={form.attending === 'yes'} onChange={handleChange} className="text-royal focus:ring-royal" />
                          {t('rsvp.attendingYes', 'Joyfully Accept')}
                        </label>
                        <label className="flex items-center gap-2 font-body text-sm text-ink cursor-pointer">
                          <input type="radio" name="attending" value="no" checked={form.attending === 'no'} onChange={handleChange} className="text-royal focus:ring-royal" />
                          {t('rsvp.attendingNo', 'Regretfully Decline')}
                        </label>
                      </div>
                    </fieldset>

                    {form.attending === 'yes' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                        <label htmlFor="guests" className="block font-body text-sm text-ink/80 mb-1">
                          {t('rsvp.guestsLabel', 'Number of Guests')}
                        </label>
                        <input
                          id="guests"
                          name="guests"
                          type="number"
                          min="1"
                          max="10"
                          value={form.guests}
                          onChange={handleChange}
                          className="w-24 rounded-md border border-gold/50 bg-white/80 px-3 py-2.5 font-body text-sm sm:text-base text-ink focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
                        />
                      </motion.div>
                    )}

                    <div>
                      <label htmlFor="message" className="block font-body text-sm text-ink/80 mb-1">
                        {t('rsvp.messageLabel', 'Message for the Couple (Optional)')}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={form.message}
                        onChange={handleChange}
                        placeholder={t('rsvp.messagePlaceholder', 'Wishing you a lifetime of love...')}
                        className="w-full rounded-md border border-gold/50 bg-white/80 px-3 py-2.5 font-body text-sm sm:text-base text-ink focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors resize-none"
                      />
                    </div>

                    {status === 'error' && (
                      <p role="alert" className="text-xs sm:text-sm text-burgundy text-center">
                        {t('rsvp.error', 'Something went wrong. Please try again.')}
                      </p>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-gold bg-royal px-5 sm:px-6 py-2.5 sm:py-3 font-display text-xs sm:text-sm tracking-wide text-parchment shadow hover:bg-royal/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? t('rsvp.submitting', 'Sending...') : t('rsvp.submit', 'Send RSVP')}
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Torn Edge */}
        <TornEdge color="#F6EFDD" />
      </section>
    </>
  );
}