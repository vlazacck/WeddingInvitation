import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n.js';
import PhotoGallery from '../PhotoGallery.jsx';

describe('PhotoGallery Component', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en');
    document.documentElement.lang = 'en';
  });

  it('renders gallery title and navigation controls properly', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <PhotoGallery />
      </I18nextProvider>
    );

    expect(screen.getByRole('heading', { level: 2, name: /Our Cherished Moments/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Previous photo/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next photo/i })).toBeInTheDocument();
  });

  it('advances to next slide when Next button is clicked', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <PhotoGallery />
      </I18nextProvider>
    );

    const nextBtn = screen.getByRole('button', { name: /Next photo/i });
    expect(screen.getByRole('tab', { name: /Go to photo 1/i })).toHaveAttribute('aria-selected', 'true');

    fireEvent.click(nextBtn);
    expect(screen.getByRole('tab', { name: /Go to photo 2/i })).toHaveAttribute('aria-selected', 'true');
  });

  it('navigates directly to a photo when clicking a tab dot', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <PhotoGallery />
      </I18nextProvider>
    );

    const dot3 = screen.getByRole('tab', { name: /Go to photo 3/i });
    fireEvent.click(dot3);

    expect(dot3).toHaveAttribute('aria-selected', 'true');
  });

  it('opens and closes fullscreen lightbox', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <PhotoGallery />
      </I18nextProvider>
    );

    const magnifyBtn = screen.getByRole('button', { name: /View photo in fullscreen/i });
    fireEvent.click(magnifyBtn);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /Close fullscreen/i });
    fireEvent.click(closeBtn);

    await act(async () => {
      // Allow Framer Motion exit animation to resolve
      await new Promise((r) => setTimeout(r, 100));
    });

    // AnimatePresence will remove or set opacity: 0
    expect(screen.queryByRole('button', { name: /Close fullscreen/i })).toBeNull();
  });
});
