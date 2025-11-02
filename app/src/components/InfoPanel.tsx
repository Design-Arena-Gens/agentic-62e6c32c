"use client";

import { useMemo } from "react";
import { useConfigStore, MaterialPreset } from "@/store/configStore";
import { AreaChart, Ruler, Sparkles, Waves } from "lucide-react";

export function InfoPanel() {
  const { apartmentLength, apartmentWidth, wallHeight, selectedRoom, materials } = useConfigStore();

  const stats = useMemo(() => {
    const area = apartmentLength * apartmentWidth;
    const volume = area * wallHeight;
    const proportions = apartmentLength / apartmentWidth;

    return [
      {
        icon: <AreaChart className="h-4 w-4" />,
        label: "Wohnfläche",
        value: `${area.toFixed(1)} m²`,
        note: `Optimale Größe für ${selectedRoom === "wohnzimmer" ? "familienfreundliche" : "kompakte"} Grundrisse`,
      },
      {
        icon: <Ruler className="h-4 w-4" />,
        label: "Proportion",
        value: `${proportions.toFixed(2)} : 1`,
        note: "Für harmonische Raumwirkung zwischen Länge & Breite",
      },
      {
        icon: <Waves className="h-4 w-4" />,
        label: "Lichtraum",
        value: `${volume.toFixed(1)} m³`,
        note: "Volumen für natürliche Luftzirkulation",
      },
      {
        icon: <Sparkles className="h-4 w-4" />,
        label: "Material",
        value: materialLabel(materials),
        note: materialNote(materials),
      },
    ];
  }, [apartmentLength, apartmentWidth, wallHeight, materials, selectedRoom]);

  return (
    <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
      <h2 className="text-lg font-semibold text-white">Projektanalyse</h2>
      <p className="text-sm text-white/60">
        Automatisch generierte Kennzahlen für deinen Grundriss. Passe Maße und Materialien an, um die Werte zu optimieren.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {stats.map((item) => (
          <div key={item.label} className="flex flex-col rounded-2xl border border-white/10 bg-surface/70 p-4">
            <div className="flex items-center gap-3 text-white">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
                {item.icon}
              </span>
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-white/60">{item.note}</p>
              </div>
            </div>
            <p className="mt-4 text-2xl font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function materialLabel(material: MaterialPreset) {
  switch (material) {
    case "helles-holz":
      return "Helles Holz";
    case "beton":
      return "Sichtbeton";
    case "dunkel":
      return "Geräucherte Eiche";
    default:
      return "Neutral";
  }
}

function materialNote(material: MaterialPreset) {
  switch (material) {
    case "helles-holz":
      return "Skandinavische Leichtigkeit & Weite";
    case "beton":
      return "Urbanes Loft-Ambiente";
    case "dunkel":
      return "Elegante Boutique-Atmosphäre";
    default:
      return "Individuell";
  }
}
