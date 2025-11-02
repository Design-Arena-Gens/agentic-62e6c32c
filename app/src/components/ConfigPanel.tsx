"use client";

import { useMemo } from "react";
import { useConfigStore, MaterialPreset, RoomFunction } from "@/store/configStore";
import { Check, SunMedium, LampDesk } from "lucide-react";

const materialOptions: { id: MaterialPreset; label: string; hint: string }[] = [
  { id: "helles-holz", label: "Helles Holz", hint: "Eichenparkett, warm" },
  { id: "beton", label: "Beton", hint: "Minimalistischer Loft" },
  { id: "dunkel", label: "Dunkles Holz", hint: "Luxuriöser Kontrast" },
];

const roomOptions: { id: RoomFunction; label: string }[] = [
  { id: "wohnzimmer", label: "Wohnbereich" },
  { id: "kuche", label: "Küche" },
  { id: "schlafzimmer", label: "Schlafzimmer" },
  { id: "bad", label: "Bad" },
  { id: "arbeitszimmer", label: "Studio" },
];

export function ConfigPanel() {
  const {
    apartmentLength,
    apartmentWidth,
    wallHeight,
    wallThickness,
    setDimension,
    selectedRoom,
    setRoom,
    materials,
    setMaterial,
    ambientLight,
    sunLight,
    setLight,
    furniture,
    toggleFurniture,
  } = useConfigStore();

  const furnitureOptions = useMemo(
    () => [
      { id: "sofa", label: "Sofa" },
      { id: "esstisch", label: "Esstisch" },
      { id: "kuecheninsel", label: "Kücheninsel" },
      { id: "bett", label: "Bett" },
      { id: "schreibtisch", label: "Schreibtisch" },
    ],
    []
  );

  return (
    <div className="grid gap-8 rounded-3xl bg-surface/60 p-8 ring-1 ring-white/10">
      <section>
        <h2 className="text-lg font-semibold text-white">Grundriss</h2>
        <p className="text-sm text-white/60">
          Konfiguriere die Größe der Wohnung in Metern, um die perfekte Proportion zu finden.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <DimensionControl
            label="Länge"
            value={apartmentLength}
            min={8}
            max={20}
            step={0.5}
            onChange={(value) => setDimension("apartmentLength", value)}
          />
          <DimensionControl
            label="Breite"
            value={apartmentWidth}
            min={6}
            max={14}
            step={0.5}
            onChange={(value) => setDimension("apartmentWidth", value)}
          />
          <DimensionControl
            label="Wandhöhe"
            value={wallHeight}
            min={2.4}
            max={4.2}
            step={0.1}
            onChange={(value) => setDimension("wallHeight", value)}
          />
          <DimensionControl
            label="Wandstärke"
            value={wallThickness}
            min={0.15}
            max={0.5}
            step={0.05}
            onChange={(value) => setDimension("wallThickness", value)}
          />
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="text-lg font-semibold text-white">Raumzonen</h2>
        <div className="flex flex-wrap gap-3">
          {roomOptions.map((room) => (
            <button
              key={room.id}
              onClick={() => setRoom(room.id)}
              className={`rounded-full border px-4 py-2 text-sm transition-all ${
                selectedRoom === room.id
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {room.label}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="text-lg font-semibold text-white">Materialität</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {materialOptions.map((material) => (
            <button
              key={material.id}
              onClick={() => setMaterial(material.id)}
              className={`group relative flex flex-col rounded-2xl border p-4 text-left transition-all ${
                materials === material.id
                  ? "border-accent/80 bg-accent/15"
                  : "border-white/10 bg-white/5 hover:border-white/30"
              }`}
            >
              <span className="text-sm font-semibold text-white">{material.label}</span>
              <span className="mt-1 text-xs text-white/60">{material.hint}</span>
              {materials === material.id && (
                <span className="absolute right-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white">
                  <Check size={14} />
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="text-lg font-semibold text-white">Beleuchtung</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <LightingControl
            icon={<LampDesk className="h-5 w-5" />}
            label="Ambient"
            value={ambientLight}
            min={0}
            max={1.5}
            step={0.05}
            onChange={(value) => setLight("ambientLight", value)}
          />
          <LightingControl
            icon={<SunMedium className="h-5 w-5" />}
            label="Sonnenlicht"
            value={sunLight}
            min={0.4}
            max={2}
            step={0.05}
            onChange={(value) => setLight("sunLight", value)}
          />
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="text-lg font-semibold text-white">Mobiliar</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {furnitureOptions.map((item) => (
            <label
              key={item.id}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
                furniture[item.id as keyof typeof furniture]
                  ? "border-accent text-white"
                  : "border-white/10 text-white/60 hover:text-white"
              }`}
            >
              <span>{item.label}</span>
              <input
                type="checkbox"
                checked={furniture[item.id as keyof typeof furniture]}
                onChange={() => toggleFurniture(item.id as keyof typeof furniture)}
                className="h-4 w-4 accent-accent"
              />
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}

function DimensionControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between text-sm text-white/80">
        <span>{label}</span>
        <span className="font-mono text-white">{value.toFixed(2)} m</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15 [accent-color:_#9d4edd]"
      />
    </div>
  );
}

function LightingControl({
  icon,
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-3 text-white">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 text-accent">
          {icon}
        </span>
        <div>
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xs text-white/60">{value.toFixed(2)}</p>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15 [accent-color:_#9d4edd]"
      />
    </div>
  );
}
