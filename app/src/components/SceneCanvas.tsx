"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { Environment, OrbitControls, SoftShadows } from "@react-three/drei";
import * as THREE from "three";
import { useConfigStore, MaterialPreset } from "@/store/configStore";

const materialPresets: Record<MaterialPreset, { color: string; roughness: number; metalness: number }> = {
  "helles-holz": { color: "#bda27e", roughness: 0.6, metalness: 0.05 },
  beton: { color: "#757575", roughness: 0.85, metalness: 0.02 },
  dunkel: { color: "#322f35", roughness: 0.5, metalness: 0.1 },
};

function ApartmentScene() {
  const {
    apartmentLength,
    apartmentWidth,
    wallHeight,
    wallThickness,
    materials,
    ambientLight,
    sunLight,
    furniture,
  } = useConfigStore();

  const floorMaterial = useMemo(() => {
    const preset = materialPresets[materials];
    const mat = new THREE.MeshStandardMaterial({
      color: preset.color,
      roughness: preset.roughness,
      metalness: preset.metalness,
    });
    mat.map = createWoodTexture(materials);
    if (mat.map) {
      mat.map.wrapS = mat.map.wrapT = THREE.RepeatWrapping;
      mat.map.repeat.set(apartmentLength / 2, apartmentWidth / 2);
    }
    return mat;
  }, [apartmentLength, apartmentWidth, materials]);

  return (
    <group position={[0, 0, 0]}>
      <ambientLight intensity={ambientLight} />
      <directionalLight
        position={[12, 18, 10]}
        intensity={sunLight}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <Floor length={apartmentLength} width={apartmentWidth} material={floorMaterial} />
      <OuterWalls
        length={apartmentLength}
        width={apartmentWidth}
        height={wallHeight}
        thickness={wallThickness}
      />
      <Zoning length={apartmentLength} width={apartmentWidth} />
      <Furniture length={apartmentLength} width={apartmentWidth} show={furniture} />
    </group>
  );
}

function createWoodTexture(preset: MaterialPreset) {
  if (preset === "beton") {
    return null;
  }

  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = preset === "helles-holz" ? "#b29a77" : "#2b262d";
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = preset === "helles-holz" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.05)";
  for (let i = 0; i < 40; i += 1) {
    const x = Math.random() * size;
    const width = 4 + Math.random() * 12;
    ctx.fillRect(x, 0, width, size);
  }

  return new THREE.CanvasTexture(canvas);
}

function Floor({
  length,
  width,
  material,
}: {
  length: number;
  width: number;
  material: THREE.Material;
}) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[length, width, 32, 32]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function OuterWalls({
  length,
  width,
  height,
  thickness,
}: {
  length: number;
  width: number;
  height: number;
  thickness: number;
}) {
  const wallMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e5e7eb",
        roughness: 0.8,
        metalness: 0.01,
      }),
    []
  );

  const halfL = length / 2;
  const halfW = width / 2;
  const y = height / 2;

  return (
    <group>
      <mesh position={[0, y, -halfW]} castShadow>
        <boxGeometry args={[length, height, thickness]} />
        <primitive object={wallMaterial} attach="material" />
      </mesh>
      <mesh position={[0, y, halfW]} castShadow>
        <boxGeometry args={[length, height, thickness]} />
        <primitive object={wallMaterial} attach="material" />
      </mesh>
      <mesh position={[-halfL, y, 0]} castShadow>
        <boxGeometry args={[thickness, height, width]} />
        <primitive object={wallMaterial} attach="material" />
      </mesh>
      <mesh position={[halfL, y, 0]} castShadow>
        <boxGeometry args={[thickness, height, width]} />
        <primitive object={wallMaterial} attach="material" />
      </mesh>
    </group>
  );
}

function Zoning({ length, width }: { length: number; width: number }) {
  const zoneMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: 0.08,
      }),
    []
  );

  const dividerMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#f472b6",
        linewidth: 2,
      }),
    []
  );

  const zoneDepth = width / 3;

  return (
    <group>
      <mesh position={[0, 0.01, zoneDepth - width / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[length, zoneDepth]} />
        <primitive object={zoneMaterial} attach="material" />
      </mesh>
      <mesh position={[0, 0.01, width / 2 - zoneDepth]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[length, zoneDepth]} />
        <primitive object={zoneMaterial} attach="material" />
      </mesh>

      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(length, width)]} />
        <primitive object={dividerMaterial} attach="material" />
      </lineSegments>
    </group>
  );
}

function Furniture({
  length,
  width,
  show,
}: {
  length: number;
  width: number;
  show: {
    sofa: boolean;
    esstisch: boolean;
    kuecheninsel: boolean;
    bett: boolean;
    schreibtisch: boolean;
  };
}) {
  const y = 0.4;
  const furnitureMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#9d4edd",
        roughness: 0.5,
        metalness: 0.3,
      }),
    []
  );

  const halfL = length / 2;
  const halfW = width / 2;

  return (
    <group>
      {show.sofa && (
        <mesh position={[-halfL / 2, y, halfW - 1.5]} castShadow>
          <boxGeometry args={[2.4, 0.8, 1]} />
          <primitive object={furnitureMaterial} attach="material" />
        </mesh>
      )}
      {show.esstisch && (
        <mesh position={[0, y + 0.2, 0]} castShadow>
          <boxGeometry args={[1.8, 0.75, 1]} />
          <primitive object={furnitureMaterial} attach="material" />
        </mesh>
      )}
      {show.kuecheninsel && (
        <mesh position={[halfL - 2, y + 0.4, halfW - 1.5]} castShadow>
          <boxGeometry args={[1.6, 0.9, 0.9]} />
          <primitive object={furnitureMaterial} attach="material" />
        </mesh>
      )}
      {show.bett && (
        <mesh position={[-halfL + 2, y, -halfW + 2]} castShadow>
          <boxGeometry args={[2.2, 0.75, 1.8]} />
          <primitive object={furnitureMaterial} attach="material" />
        </mesh>
      )}
      {show.schreibtisch && (
        <mesh position={[halfL - 1.8, y, -halfW + 1.2]} castShadow>
          <boxGeometry args={[1.4, 0.75, 0.6]} />
          <primitive object={furnitureMaterial} attach="material" />
        </mesh>
      )}
    </group>
  );
}

export function SceneCanvas() {
  return (
    <div className="h-[65vh] w-full rounded-3xl bg-surface shadow-xl ring-1 ring-white/5">
      <Canvas shadows camera={{ position: [12, 9, 12], fov: 45 }}>
        <color attach="background" args={["#0b1221"]} />
        <SoftShadows size={12} samples={16} focus={0.95} />
        <Suspense fallback={null}>
          <ApartmentScene />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enablePan enableZoom enableRotate maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
    </div>
  );
}
