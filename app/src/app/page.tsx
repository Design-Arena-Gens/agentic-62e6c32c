import { SceneCanvas } from "@/components/SceneCanvas";
import { ConfigPanel } from "@/components/ConfigPanel";
import { InfoPanel } from "@/components/InfoPanel";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-10">
      <header className="space-y-6 text-white">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-wide text-white/60">
          <span className="h-2 w-2 rounded-full bg-accent" />
          Spatial Studio / Moderne Wohnung
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold sm:text-5xl">Dein interaktiver 3D-Raumplaner für urbane Wohnungen</h1>
          <p className="max-w-2xl text-base text-white/60 sm:text-lg">
            Entwerfe eine zeitgemäße, europäische Wohnung: Passe Maße, Materialien, Lichtstimmung und Möblierung in Echtzeit an und erhalte sofortige Kennzahlen zu Proportionen und Wohnqualität.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href="#raumplaner"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent/80"
          >
            Direkt planen
          </Link>
          <Link
            href="#details"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:text-white"
          >
            Architektur-Details
          </Link>
        </div>
      </header>

      <section id="raumplaner" className="grid gap-8">
        <SceneCanvas />
        <ConfigPanel />
      </section>

      <section id="details" className="pb-16">
        <InfoPanel />
      </section>

      <footer className="border-t border-white/10 py-6 text-sm text-white/50">
        Entwickelt für moderne europäische Lebensstile · Inspiriert von skandinavischer Klarheit & mediterraner Wärme.
      </footer>
    </main>
  );
}
