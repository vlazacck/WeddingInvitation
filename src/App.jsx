import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Envelope from './components/Envelope.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Welcome from './components/Welcome.jsx';
import Countdown from './components/Countdown.jsx';
import Schedule from './components/Schedule.jsx';
import Location from './components/Location.jsx';
import RSVP from './components/RSVP.jsx';
import Footer from './components/Footer.jsx';
import Petals from './components/Petals.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import Telegram from './components/telegram.jsx';

export default function App() {
  const { i18n, t } = useTranslation();
  const [opened, setOpened] = useState(false);

  // Keep html lang + document title/meta in sync with the active language,
  // required for accessibility and correct font fallback.
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.title = t('meta.title');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('meta.description'));
  }, [i18n.language, t]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header />
      {!opened && <Envelope onOpen={() => setOpened(true)} />}
      <main
        id="main-content"
        className={`relative transition-opacity duration-700 ${
          opened ? 'opacity-100' : 'opacity-0 pointer-events-none h-0'
        }`}
        style={{ overflowX: 'clip' }}
        aria-hidden={!opened}
      >
        <Petals />
        <Hero />
        <Welcome />
        <Countdown />
        <Schedule />
        <Location />
        <Telegram/>
        <RSVP />
        <Footer />
      </main>
      {opened && <MusicPlayer />}
    </>
  );
}
