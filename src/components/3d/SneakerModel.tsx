import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { ShoeConfiguration, MaterialType } from '../../types';
import { MATERIALS } from '../../data/products';

interface SneakerModelProps {
  config: ShoeConfiguration;
  wireframe?: boolean;
  useGlb?: boolean;
  isHero?: boolean;
}

// Subcomponent: Khronos GLTF Model with dynamic material tinting
const GlbShoe: React.FC<{ config: ShoeConfiguration; wireframe?: boolean }> = ({ config, wireframe }) => {
  const { scene } = useGLTF('/models/shoe.glb');
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Apply material modifications to cloned scene
  useMemo(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          mat.wireframe = !!wireframe;
          
          // Apply customizer tint while preserving normal/bump maps
          const upperColor = new THREE.Color(config.upperColor);
          mat.color = upperColor;

          const activeMatDef = MATERIALS.find(m => m.id === config.material);
          if (activeMatDef) {
            mat.roughness = activeMatDef.roughness;
            mat.metalness = activeMatDef.metalness;
          }

          mesh.material = mat;
        }
      }
    });
  }, [clonedScene, config, wireframe]);

  return (
    <primitive 
      object={clonedScene} 
      scale={2.4} 
      position={[0, -0.4, 0]} 
      rotation={[0, -Math.PI / 4, 0]} 
    />
  );
};

// Subcomponent: Tailored Multi-Part Modular Athletic Runner
// Allows discrete coloring of Sole, Upper, Laces, and Material changes
const ProceduralModularShoe: React.FC<{ config: ShoeConfiguration; wireframe?: boolean }> = ({
  config,
  wireframe,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  const matProps = useMemo(() => {
    const activeMatDef = MATERIALS.find(m => m.id === config.material) || MATERIALS[0];
    return {
      roughness: activeMatDef.roughness,
      metalness: activeMatDef.metalness,
    };
  }, [config.material]);

  // Upper Material
  const upperMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(config.upperColor),
      roughness: matProps.roughness,
      metalness: matProps.metalness,
      wireframe: !!wireframe,
    });
  }, [config.upperColor, matProps, wireframe]);

  // Sole Material (Rubber / Cushion foam)
  const soleMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(config.soleColor),
      roughness: 0.85,
      metalness: 0.05,
      wireframe: !!wireframe,
    });
  }, [config.soleColor, wireframe]);

  // Midsole Foam (Dual-density supercritical foam)
  const midsoleMaterial = useMemo(() => {
    const isSoleLight = new THREE.Color(config.soleColor).getHSL({ h: 0, s: 0, l: 0 }).l > 0.4;
    return new THREE.MeshStandardMaterial({
      color: isSoleLight ? new THREE.Color('#EAE9E4') : new THREE.Color('#22242A'),
      roughness: 0.65,
      metalness: 0.02,
      wireframe: !!wireframe,
    });
  }, [config.soleColor, wireframe]);

  // Lace Material
  const laceMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(config.laceColor),
      roughness: 0.8,
      metalness: 0.05,
      wireframe: !!wireframe,
    });
  }, [config.laceColor, wireframe]);

  // Accent / Trim Material (Electric Studio Blue or Chrome)
  const accentMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#8CA8FF'),
      roughness: 0.25,
      metalness: 0.7,
      wireframe: !!wireframe,
    });
  }, [wireframe]);

  // Collar & Inner Lining Material
  const liningMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1B1D22'),
      roughness: 0.9,
      metalness: 0.0,
      wireframe: !!wireframe,
    });
  }, [wireframe]);

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} rotation={[0, -Math.PI / 4, 0]}>
      {/* 1. OUTSOLE BASE TREAD */}
      <mesh position={[0, -0.6, 0.1]} material={soleMaterial} castShadow receiveShadow>
        <boxGeometry args={[1.25, 0.15, 3.4]} />
      </mesh>

      {/* Outsole Toe Rocker bevel */}
      <mesh position={[0, -0.52, 1.65]} rotation={[-Math.PI / 10, 0, 0]} material={soleMaterial} castShadow>
        <boxGeometry args={[1.2, 0.16, 0.5]} />
      </mesh>

      {/* Outsole Heel Bevel */}
      <mesh position={[0, -0.48, -1.5]} rotation={[Math.PI / 12, 0, 0]} material={soleMaterial} castShadow>
        <boxGeometry args={[1.22, 0.18, 0.55]} />
      </mesh>

      {/* Outsole Tread Grooves / Sipes */}
      {[-1.1, -0.6, -0.1, 0.4, 0.9, 1.3].map((z, idx) => (
        <mesh key={`tread-${idx}`} position={[0, -0.68, z]} material={soleMaterial}>
          <boxGeometry args={[1.28, 0.04, 0.12]} />
        </mesh>
      ))}

      {/* 2. MIDSOLE CUSHION (Supercritical nitrogen elastomer) */}
      <mesh position={[0, -0.42, 0.05]} material={midsoleMaterial} castShadow receiveShadow>
        <boxGeometry args={[1.28, 0.24, 3.3]} />
      </mesh>

      {/* Midsole Lateral Ergonomic Wave */}
      <mesh position={[0.62, -0.38, 0.0]} rotation={[0, 0, Math.PI / 16]} material={accentMaterial}>
        <boxGeometry args={[0.08, 0.1, 2.2]} />
      </mesh>
      <mesh position={[-0.62, -0.38, 0.0]} rotation={[0, 0, -Math.PI / 16]} material={accentMaterial}>
        <boxGeometry args={[0.08, 0.1, 2.2]} />
      </mesh>

      {/* 3. MAIN UPPER BODY (Lower Foot Frame) */}
      <mesh position={[0, -0.15, 0.15]} material={upperMaterial} castShadow receiveShadow>
        <boxGeometry args={[1.22, 0.38, 3.0]} />
      </mesh>

      {/* 4. TOE BOX (Front sculpt) */}
      <mesh position={[0, -0.12, 1.25]} rotation={[-Math.PI / 18, 0, 0]} material={upperMaterial} castShadow>
        <cylinderGeometry args={[0.58, 0.62, 0.35, 32]} />
      </mesh>

      {/* Toe Cap Guard Overlay */}
      <mesh position={[0, -0.05, 1.48]} rotation={[-Math.PI / 8, 0, 0]} material={accentMaterial}>
        <boxGeometry args={[1.0, 0.1, 0.45]} />
      </mesh>

      {/* 5. TONGUE & INSTEP (Vamp) */}
      <mesh position={[0, 0.28, 0.45]} rotation={[-Math.PI / 5, 0, 0]} material={upperMaterial} castShadow>
        <boxGeometry args={[0.75, 0.12, 1.35]} />
      </mesh>

      {/* Padded Tongue Crest */}
      <mesh position={[0, 0.72, 0.0]} rotation={[-Math.PI / 6, 0, 0]} material={liningMaterial} castShadow>
        <boxGeometry args={[0.7, 0.14, 0.5]} />
      </mesh>

      {/* 6. COLLAR & ANKLE OPENING */}
      <mesh position={[0, 0.4, -0.6]} material={liningMaterial} castShadow>
        <boxGeometry args={[1.05, 0.55, 1.2]} />
      </mesh>

      {/* Ankle Collar Padding Cushion */}
      <mesh position={[0, 0.62, -0.55]} rotation={[0, 0, 0]} material={liningMaterial}>
        <torusGeometry args={[0.42, 0.12, 16, 32]} />
      </mesh>

      {/* 7. HEEL COUNTER & PULL TAB */}
      <mesh position={[0, 0.05, -1.35]} rotation={[Math.PI / 18, 0, 0]} material={upperMaterial} castShadow>
        <boxGeometry args={[1.1, 0.65, 0.45]} />
      </mesh>
      {/* Heel Stabilizer Clip */}
      <mesh position={[0, -0.15, -1.48]} material={accentMaterial}>
        <boxGeometry args={[1.16, 0.22, 0.2]} />
      </mesh>
      {/* Heel Pull Loop */}
      <mesh position={[0, 0.65, -1.3]} rotation={[Math.PI / 3, 0, 0]} material={laceMaterial}>
        <torusGeometry args={[0.18, 0.04, 12, 24]} />
      </mesh>

      {/* 8. 3D SHOELACES (Cross-Laced Bridge) */}
      {[
        { y: 0.15, z: 0.85, rot: 0.1 },
        { y: 0.32, z: 0.62, rot: 0.12 },
        { y: 0.48, z: 0.38, rot: 0.15 },
        { y: 0.62, z: 0.15, rot: 0.18 },
      ].map((lace, idx) => (
        <group key={`lace-group-${idx}`} position={[0, lace.y, lace.z]}>
          {/* Main Horizontal Lace Bar */}
          <mesh rotation={[0, 0, Math.PI / 2]} material={laceMaterial} castShadow>
            <cylinderGeometry args={[0.045, 0.045, 0.68, 16]} />
          </mesh>
          {/* Eyelet Rivets on Left and Right */}
          <mesh position={[-0.38, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={accentMaterial}>
            <torusGeometry args={[0.065, 0.02, 12, 24]} />
          </mesh>
          <mesh position={[0.38, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={accentMaterial}>
            <torusGeometry args={[0.065, 0.02, 12, 24]} />
          </mesh>
          {/* Cross Diagonal Lace Strut */}
          <mesh
            position={[0, 0.03, -0.06]}
            rotation={[idx % 2 === 0 ? 0.35 : -0.35, 0, idx % 2 === 0 ? 0.4 : -0.4]}
            material={laceMaterial}
          >
            <cylinderGeometry args={[0.035, 0.035, 0.72, 16]} />
          </mesh>
        </group>
      ))}

      {/* Lace Bow Knot */}
      <mesh position={[0, 0.75, 0.02]} rotation={[Math.PI / 4, 0, 0]} material={laceMaterial}>
        <sphereGeometry args={[0.09, 16, 16]} />
      </mesh>
      <mesh position={[-0.15, 0.72, -0.02]} rotation={[0, 0.4, 0.4]} material={laceMaterial}>
        <torusGeometry args={[0.12, 0.035, 12, 24]} />
      </mesh>
      <mesh position={[0.15, 0.72, -0.02]} rotation={[0, -0.4, -0.4]} material={laceMaterial}>
        <torusGeometry args={[0.12, 0.035, 12, 24]} />
      </mesh>

      {/* 9. ARCHITECTURAL LATERAL BADGE */}
      <mesh position={[0.63, 0.0, -0.2]} rotation={[0, Math.PI / 2, 0]} material={accentMaterial}>
        <boxGeometry args={[0.9, 0.1, 0.03]} />
      </mesh>
      <mesh position={[-0.63, 0.0, -0.2]} rotation={[0, -Math.PI / 2, 0]} material={accentMaterial}>
        <boxGeometry args={[0.9, 0.1, 0.03]} />
      </mesh>
    </group>
  );
};

export const SneakerModel: React.FC<SneakerModelProps> = ({
  config,
  wireframe = false,
  useGlb = false,
  isHero = false,
}) => {
  const outerGroup = useRef<THREE.Group>(null);

  // Subtle floating motion in Hero section
  useFrame((state) => {
    if (!outerGroup.current) return;
    if (isHero) {
      const t = state.clock.getElapsedTime();
      outerGroup.current.position.y = Math.sin(t * 1.2) * 0.06;
      outerGroup.current.rotation.y = Math.sin(t * 0.4) * 0.08;
    }
  });

  return (
    <group ref={outerGroup}>
      {useGlb ? (
        <GlbShoe config={config} wireframe={wireframe} />
      ) : (
        <ProceduralModularShoe config={config} wireframe={wireframe} />
      )}
    </group>
  );
};

useGLTF.preload('/models/shoe.glb');
