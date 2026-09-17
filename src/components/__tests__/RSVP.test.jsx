import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n.js';
import RSVP from '../RSVP.jsx';

function renderRSVP() {
  render(
    <I18nextProvider i18n={i18n}>
      <RSVP />
    </I18nextProvider>
  );
}

describe('RSVP form validation', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('shows required-field errors when submitted empty', async () => {
    renderRSVP();
    fireEvent.click(screen.getByRole('button', { name: /click to open/i }));
    fireEvent.click(await screen.findByRole('button', { name: /send rsvp/i }));

    expect(await screen.findAllByText('This field is required')).toHaveLength(2);
  });

  it('shows an error for an invalid email address', async () => {
    renderRSVP();
    fireEvent.click(screen.getByRole('button', { name: /click to open/i }));

    fireEvent.change(await screen.findByLabelText(/full name/i), {
      target: { value: 'Test Guest' }
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'not-an-email' }
    });
    fireEvent.click(screen.getByRole('button', { name: /send rsvp/i }));

    expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();
  });

  it('submits successfully with valid data', async () => {
    renderRSVP();
    fireEvent.click(screen.getByRole('button', { name: /click to open/i }));

    fireEvent.change(await screen.findByLabelText(/full name/i), {
      target: { value: 'Test Guest' }
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'guest@example.com' }
    });
    fireEvent.click(screen.getByRole('button', { name: /send rsvp/i }));

    expect(await screen.findByText(/thank you/i)).toBeInTheDocument();
  });
});
