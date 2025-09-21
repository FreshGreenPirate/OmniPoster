const links = [
  { label: 'Watch the latest YouTube video', href: '#' },
  { label: 'Shop the merch', href: '#' },
  { label: 'Join our Discord', href: '#' },
];

const gridItems = [
  { id: 1, title: 'Behind the scenes', href: '#' },
  { id: 2, title: 'Creator Q&A', href: '#' },
  { id: 3, title: 'Top tips', href: '#' },
];

export function LinkInBioPreview() {
  return (
    <div className="rounded-xl border border-white/5 bg-slate-900/80 p-6 shadow">
      <h2 className="text-sm font-semibold text-white">Link in bio preview</h2>
      <p className="text-xs text-slate-400">Customisable microsite to collect your social links and featured content.</p>
      <div className="mt-4 grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="rounded-lg border border-white/5 bg-slate-950/80 p-4 text-sm">
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-brand/70" />
            <h3 className="mt-3 font-semibold text-white">OmniPoster Demo</h3>
            <p className="mt-1 text-xs text-slate-400">Helping creators ship content everywhere.</p>
            <div className="mt-4 w-full space-y-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block rounded-md border border-white/5 bg-slate-900/80 px-4 py-2 text-xs text-slate-100 hover:border-brand"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {gridItems.map((item) => (
            <a key={item.id} href={item.href} className="group block rounded-lg border border-white/5 bg-slate-950/70 p-4">
              <div className="aspect-video w-full rounded-md bg-slate-800/50" />
              <p className="mt-3 text-xs font-medium text-slate-100 group-hover:text-brand">{item.title}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
