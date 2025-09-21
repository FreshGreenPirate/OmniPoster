import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';
import type { OAuthConfig } from 'next-auth/providers';

type GenericProfile = Record<string, unknown>;

function instagramProvider(): OAuthConfig<GenericProfile> {
  return {
    id: 'instagram',
    name: 'Instagram',
    type: 'oauth',
    authorization: {
      url: 'https://www.facebook.com/v18.0/dialog/oauth',
      params: {
        scope: 'instagram_basic,instagram_content_publish,pages_show_list'
      }
    },
    token: 'https://graph.facebook.com/v18.0/oauth/access_token',
    userinfo: {
      url: 'https://graph.facebook.com/v18.0/me',
      params: {
        fields: 'id,name,email'
      }
    },
    profile(profile) {
      const raw = profile as { id?: string | number; name?: string; email?: string };
      return {
        id: raw.id ? String(raw.id) : 'instagram-user',
        name: raw.name ?? 'Instagram user',
        email: raw.email,
        image: null
      };
    },
    clientId: process.env.META_CLIENT_ID ?? '',
    clientSecret: process.env.META_CLIENT_SECRET ?? ''
  };
}

function tiktokProvider(): OAuthConfig<GenericProfile> {
  return {
    id: 'tiktok',
    name: 'TikTok',
    type: 'oauth',
    authorization: {
      url: 'https://www.tiktok.com/v2/auth/authorize/',
      params: {
        client_key: process.env.TIKTOK_CLIENT_KEY,
        scope: 'user.info.basic,video.upload',
        response_type: 'code'
      }
    },
    token: {
      url: 'https://open.tiktokapis.com/v2/oauth/token/'
    },
    userinfo: {
      url: 'https://open.tiktokapis.com/v2/user/info/'
    },
    profile(profile) {
      const data = (profile as { data?: { user: { open_id: string; display_name?: string } } }).data?.user;
      return {
        id: data?.open_id ?? 'tiktok-user',
        name: data?.display_name ?? 'TikTok user',
        email: null,
        image: null
      };
    },
    clientId: process.env.TIKTOK_CLIENT_KEY ?? '',
    clientSecret: process.env.TIKTOK_CLIENT_SECRET ?? ''
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
    instagramProvider(),
    tiktokProvider()
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? 'user';
      }
      return session;
    }
  }
};
