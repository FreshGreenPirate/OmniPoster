import type { Brand } from '@omni/core/types/brand';

export const demoBrands: Brand[] = [
  {
    id: 'brand_1',
    ownerId: 'user_1',
    name: 'FunFactGuy',
    avatarUrl: 'https://avatars.githubusercontent.com/u/583231?v=4',
    primaryColor: '#8B5CF6',
    createdAt: new Date(),
    updatedAt: new Date(),
    defaultTimezone: 'Europe/Berlin'
  },
  {
    id: 'brand_2',
    ownerId: 'user_1',
    name: 'DarkTalesGuy',
    avatarUrl: 'https://avatars.githubusercontent.com/u/2?v=4',
    primaryColor: '#14B8A6',
    createdAt: new Date(),
    updatedAt: new Date(),
    defaultTimezone: 'America/New_York'
  }
];
