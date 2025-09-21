export type Brand = {
  id: string;
  ownerId: string;
  name: string;
  avatarUrl: string;
  primaryColor: string;
  createdAt: Date;
  updatedAt: Date;
  defaultTimezone: string;
};

export type BrandMemberRole = 'OWNER' | 'EDITOR' | 'VIEWER';
