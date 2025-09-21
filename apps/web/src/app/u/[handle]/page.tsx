interface PublicLinkPageProps {
  params: { handle: string };
}

const mockProfile = {
  bio: 'Helping creators publish everywhere without the chaos.',
  theme: 'violet',
  links: [
    { label: 'Latest YouTube', href: '#' },
    { label: 'TikTok channel', href: '#' },
    { label: 'Instagram feed', href: '#' },
  ],
};

export default function PublicLinkPage({ params }: PublicLinkPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-950 px-6 py-16 text-slate-100">
      <div className="h-24 w-24 rounded-full bg-brand/60" />
      <h1 className="mt-6 text-2xl font-semibold">{params.handle}</h1>
      <p className="mt-2 max-w-md text-center text-sm text-slate-300">{mockProfile.bio}</p>
      <div className="mt-6 w-full max-w-md space-y-3">
        {mockProfile.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="block rounded-lg border border-white/10 bg-slate-900/80 px-4 py-3 text-center text-sm font-medium hover:border-brand"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
