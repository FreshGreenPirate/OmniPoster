import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import OAuthProvider from "next-auth/providers/oauth";

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.force-ssl",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.META_CLIENT_ID ?? "",
      clientSecret: process.env.META_CLIENT_SECRET ?? "",
    }),
    OAuthProvider({
      id: "tiktok",
      name: "TikTok",
      type: "oauth",
      version: "2.0",
      clientId: process.env.TIKTOK_CLIENT_ID ?? "",
      clientSecret: process.env.TIKTOK_CLIENT_SECRET ?? "",
      authorization: {
        url: "https://www.tiktok.com/auth/authorize/",
        params: {
          scope: "video.upload user.info.basic",
          response_type: "code",
        },
      },
      token: "https://open-api.tiktok.com/oauth/access_token/",
      userinfo: {
        url: "https://open-api.tiktok.com/user/info/",
      },
      profile(profile: any) {
        return {
          id: profile.data?.user?.open_id,
          name: profile.data?.user?.display_name,
          email: profile.data?.user?.email,
          image: profile.data?.user?.avatar_url,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async session({ session, token }: any) {
      if (token) {
        session.user = {
          ...(session.user ?? {}),
          id: token.sub,
        };
      }
      return session;
    },
  },
};

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth(authConfig);
