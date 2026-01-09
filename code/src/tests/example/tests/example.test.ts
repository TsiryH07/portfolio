import {describe, expect, it} from 'vitest';
import {routing} from '../../../lib/i18n/routing';

describe('routing', () => {
  it('uses fr as default locale', () => {
    expect(routing.defaultLocale).toBe('fr');
  });

  it('supports both fr and en locales', () => {
    expect(routing.locales).toEqual(expect.arrayContaining(['fr', 'en']));
  });
});

describe('sanity check', () => {
  it('can run a basic assertion', () => {
    expect(1 + 1).toBe(2);
  });
});
