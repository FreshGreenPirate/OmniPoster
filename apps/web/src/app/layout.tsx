import '@/app/globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { QueryClientProvider } from '@/components/query-client-provider';
import { Sidebar } from '@/components/sidebar';
import { TopBar } from '@/components/topbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'OmniPoster',
  description: 'Cross-platform social media scheduling suite',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider>
          <div className="flex min-h-screen bg-slate-900 text-slate-100">
            <Sidebar />
            <div className="flex flex-1 flex-col">
              <TopBar />
              <main className="flex-1 overflow-y-auto bg-slate-950 p-6">{children}</main>
            </div>
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
