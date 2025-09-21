import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrandSwitcher } from '@/components/workspaces/brand-switcher';

describe('BrandSwitcher', () => {
  it('renders demo brands', () => {
    render(<BrandSwitcher />);
    expect(screen.getByText('OmniPoster Demo')).toBeInTheDocument();
  });
});
