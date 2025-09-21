import { Shell } from "@/components/shell";
import { QuickLinks } from "@/components/quick-links";
import { BrandSwitcher } from "@/components/brand-switcher";
import { CalendarPreview } from "@/components/calendar-preview";

export default function PreviewsPage() {
  return (
    <Shell>
      <div className="flex h-full flex-col gap-6 overflow-y-auto p-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Component Gallery</h1>
          <BrandSwitcher />
        </header>
        <section>
          <h2 className="text-lg font-semibold">Quick links</h2>
          <QuickLinks />
        </section>
        <section>
          <h2 className="text-lg font-semibold">Calendar preview</h2>
          <CalendarPreview />
        </section>
      </div>
    </Shell>
  );
}
