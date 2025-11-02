"use client";

import { create } from "zustand";

export type RoomFunction = "wohnzimmer" | "kuche" | "schlafzimmer" | "bad" | "arbeitszimmer";

export type MaterialPreset = "helles-holz" | "beton" | "dunkel";

interface FurnitureState {
  sofa: boolean;
  esstisch: boolean;
  kuecheninsel: boolean;
  bett: boolean;
  schreibtisch: boolean;
}

interface ConfigState {
  apartmentLength: number;
  apartmentWidth: number;
  wallHeight: number;
  wallThickness: number;
  selectedRoom: RoomFunction;
  materials: MaterialPreset;
  ambientLight: number;
  sunLight: number;
  furniture: FurnitureState;
  setDimension: (key: "apartmentLength" | "apartmentWidth" | "wallHeight" | "wallThickness", value: number) => void;
  setRoom: (room: RoomFunction) => void;
  setMaterial: (material: MaterialPreset) => void;
  setLight: (key: "ambientLight" | "sunLight", value: number) => void;
  toggleFurniture: (key: keyof FurnitureState) => void;
}

const defaultFurniture: FurnitureState = {
  sofa: true,
  esstisch: true,
  kuecheninsel: false,
  bett: true,
  schreibtisch: false,
};

export const useConfigStore = create<ConfigState>((set) => ({
  apartmentLength: 12,
  apartmentWidth: 8,
  wallHeight: 3,
  wallThickness: 0.25,
  selectedRoom: "wohnzimmer",
  materials: "helles-holz",
  ambientLight: 0.35,
  sunLight: 1.1,
  furniture: defaultFurniture,
  setDimension: (key, value) =>
    set(() => ({
      [key]: Number(value.toFixed(2)),
    })),
  setRoom: (room) => set({ selectedRoom: room }),
  setMaterial: (material) => set({ materials: material }),
  setLight: (key, value) =>
    set(() => ({
      [key]: Number(value.toFixed(2)),
    })),
  toggleFurniture: (key) =>
    set((state) => ({
      furniture: {
        ...state.furniture,
        [key]: !state.furniture[key],
      },
    })),
}));
