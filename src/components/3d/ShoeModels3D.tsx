import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { ShoeConfiguration, ShoeModelType } from '../../types';
import { MATERIALS } from '../../data/products';

interface ShoeModelProps {
  config: ShoeConfiguration;
  modelType?: ShoeModelType;
  wireframe?: boolean;
  isHero?: boolean;
}

// 1. PERFORMANCE RUNNER 3D
export const PerformanceRunner3D: React.FC<{
  config: ShoeConfiguration;
  wireframe?: boolean;
}> = ({ config, wireframe }) => {
  const matProps = useMemo(() => {
    const active = MATERIALS.find((m) => m.id === config.material) || MATERIALS[0];
    return { roughness: active.roughness, metalness: active.metalness };
  }, [config.material]);

  const upperMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.upperColor),
        roughness: matProps.roughness,
        metalness: matProps.metalness,
        wireframe: !!wireframe,
      }),
    [config.upperColor, matProps, wireframe]
  );

  const soleMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.soleColor),
        roughness: 0.8,
        metalness: 0.05,
        wireframe: !!wireframe,
      }),
    [config.soleColor, wireframe]
  );

  const laceMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.laceColor),
        roughness: 0.75,
        metalness: 0.05,
        wireframe: !!wireframe,
      }),
    [config.laceColor, wireframe]
  );

  const trimMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#91ACFF'),
        roughness: 0.3,
        metalness: 0.6,
        wireframe: !!wireframe,
      }),
    [wireframe]
  );

  const liningMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1B1D22'),
        roughness: 0.9,
        wireframe: !!wireframe,
      }),
    [wireframe]
  );

  return (
    <group position={[0, -0.2, 0]} rotation={[0, -Math.PI / 4, 0]}>
      {/* Outsole Base Tread */}
      <mesh position={[0, -0.6, 0.1]} material={soleMat} castShadow receiveShadow>
        <boxGeometry args={[1.25, 0.15, 3.4]} />
      </mesh>
      {/* Toe Rocker bevel */}
      <mesh position={[0, -0.52, 1.65]} rotation={[-Math.PI / 10, 0, 0]} material={soleMat} castShadow>
        <boxGeometry args={[1.2, 0.16, 0.5]} />
      </mesh>
      {/* Midsole Cushion */}
      <mesh position={[0, -0.42, 0.05]} material={soleMat} castShadow receiveShadow>
        <boxGeometry args={[1.28, 0.24, 3.3]} />
      </mesh>
      {/* Lateral Trim Wave */}
      <mesh position={[0.62, -0.38, 0.0]} rotation={[0, 0, Math.PI / 16]} material={trimMat}>
        <boxGeometry args={[0.08, 0.1, 2.2]} />
      </mesh>
      <mesh position={[-0.62, -0.38, 0.0]} rotation={[0, 0, -Math.PI / 16]} material={trimMat}>
        <boxGeometry args={[0.08, 0.1, 2.2]} />
      </mesh>
      {/* Main Upper Body */}
      <mesh position={[0, -0.15, 0.15]} material={upperMat} castShadow receiveShadow>
        <boxGeometry args={[1.22, 0.38, 3.0]} />
      </mesh>
      {/* Toe Box Curve */}
      <mesh position={[0, -0.12, 1.25]} rotation={[-Math.PI / 18, 0, 0]} material={upperMat} castShadow>
        <cylinderGeometry args={[0.58, 0.62, 0.35, 32]} />
      </mesh>
      {/* Tongue & Instep */}
      <mesh position={[0, 0.28, 0.45]} rotation={[-Math.PI / 5, 0, 0]} material={upperMat} castShadow>
        <boxGeometry args={[0.75, 0.12, 1.35]} />
      </mesh>
      {/* Ankle Collar */}
      <mesh position={[0, 0.4, -0.6]} material={liningMat} castShadow>
        <boxGeometry args={[1.05, 0.55, 1.2]} />
      </mesh>
      <mesh position={[0, 0.62, -0.55]} material={liningMat}>
        <torusGeometry args={[0.42, 0.12, 16, 32]} />
      </mesh>
      {/* Heel Counter */}
      <mesh position={[0, 0.05, -1.35]} rotation={[Math.PI / 18, 0, 0]} material={upperMat} castShadow>
        <boxGeometry args={[1.1, 0.65, 0.45]} />
      </mesh>
      <mesh position={[0, -0.15, -1.48]} material={trimMat}>
        <boxGeometry args={[1.16, 0.22, 0.2]} />
      </mesh>
      {/* Shoelaces */}
      {[0.15, 0.32, 0.48, 0.62].map((y, idx) => (
        <group key={`runner-lace-${idx}`} position={[0, y, 0.85 - idx * 0.23]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={laceMat} castShadow>
            <cylinderGeometry args={[0.045, 0.045, 0.68, 16]} />
          </mesh>
          <mesh position={[-0.38, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={trimMat}>
            <torusGeometry args={[0.065, 0.02, 12, 24]} />
          </mesh>
          <mesh position={[0.38, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={trimMat}>
            <torusGeometry args={[0.065, 0.02, 12, 24]} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// 2. URBAN STREET SNEAKER 3D (Low Profile Vulcanized)
export const UrbanStreetSneaker3D: React.FC<{
  config: ShoeConfiguration;
  wireframe?: boolean;
}> = ({ config, wireframe }) => {
  const upperMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.upperColor),
        roughness: 0.4,
        metalness: 0.05,
        wireframe: !!wireframe,
      }),
    [config.upperColor, wireframe]
  );

  const soleMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.soleColor),
        roughness: 0.9,
        wireframe: !!wireframe,
      }),
    [config.soleColor, wireframe]
  );

  const laceMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.laceColor),
        roughness: 0.85,
        wireframe: !!wireframe,
      }),
    [config.laceColor, wireframe]
  );

  return (
    <group position={[0, -0.2, 0]} rotation={[0, -Math.PI / 4, 0]}>
      {/* Flat Vulcanized Sidewall Sole */}
      <mesh position={[0, -0.5, 0.1]} material={soleMat} castShadow receiveShadow>
        <boxGeometry args={[1.3, 0.35, 3.4]} />
      </mesh>
      {/* Rubber Toe Bumper Cap */}
      <mesh position={[0, -0.32, 1.62]} rotation={[Math.PI / 10, 0, 0]} material={soleMat} castShadow>
        <boxGeometry args={[1.24, 0.32, 0.4]} />
      </mesh>
      {/* Low-Profile Main Body */}
      <mesh position={[0, -0.15, 0.15]} material={upperMat} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.38, 3.0]} />
      </mesh>
      {/* Low Collar Opening */}
      <mesh position={[0, 0.22, -0.6]} material={upperMat} castShadow>
        <boxGeometry args={[1.05, 0.38, 1.2]} />
      </mesh>
      {/* Flat Instep Tongue */}
      <mesh position={[0, 0.18, 0.5]} rotation={[-Math.PI / 6, 0, 0]} material={upperMat}>
        <boxGeometry args={[0.75, 0.1, 1.4]} />
      </mesh>
      {/* Wide Flat Laces */}
      {[0.12, 0.26, 0.4, 0.52].map((y, idx) => (
        <mesh key={`street-lace-${idx}`} position={[0, y, 0.9 - idx * 0.26]} material={laceMat} castShadow>
          <boxGeometry args={[0.68, 0.04, 0.14]} />
        </mesh>
      ))}
    </group>
  );
};

// 3. COURT HIGH-TOP 3D (Tall Ankle Basketball Collar)
export const CourtHighTop3D: React.FC<{
  config: ShoeConfiguration;
  wireframe?: boolean;
}> = ({ config, wireframe }) => {
  const upperMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.upperColor),
        roughness: 0.35,
        metalness: 0.05,
        wireframe: !!wireframe,
      }),
    [config.upperColor, wireframe]
  );

  const soleMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.soleColor),
        roughness: 0.85,
        wireframe: !!wireframe,
      }),
    [config.soleColor, wireframe]
  );

  const laceMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.laceColor),
        roughness: 0.8,
        wireframe: !!wireframe,
      }),
    [config.laceColor, wireframe]
  );

  const accentMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#91ACFF'),
        roughness: 0.3,
        metalness: 0.5,
        wireframe: !!wireframe,
      }),
    [wireframe]
  );

  return (
    <group position={[0, -0.2, 0]} rotation={[0, -Math.PI / 4, 0]}>
      {/* Heavy Cupsole Base */}
      <mesh position={[0, -0.52, 0.1]} material={soleMat} castShadow receiveShadow>
        <boxGeometry args={[1.32, 0.38, 3.4]} />
      </mesh>
      {/* Main Lower Foot */}
      <mesh position={[0, -0.15, 0.2]} material={upperMat} castShadow receiveShadow>
        <boxGeometry args={[1.25, 0.4, 3.0]} />
      </mesh>
      {/* High-Top Tall Ankle Shaft */}
      <mesh position={[0, 0.6, -0.55]} material={upperMat} castShadow>
        <boxGeometry args={[1.15, 1.15, 1.35]} />
      </mesh>
      {/* Padded Ankle Collar Donut */}
      <mesh position={[0, 1.12, -0.55]} material={accentMat}>
        <torusGeometry args={[0.45, 0.14, 16, 32]} />
      </mesh>
      {/* Tall Instep Tongue */}
      <mesh position={[0, 0.55, 0.35]} rotation={[-Math.PI / 7, 0, 0]} material={upperMat} castShadow>
        <boxGeometry args={[0.78, 0.12, 1.8]} />
      </mesh>
      {/* Ankle Lockdown Strap */}
      <mesh position={[0, 0.95, -0.25]} material={accentMat} castShadow>
        <boxGeometry args={[1.22, 0.18, 0.8]} />
      </mesh>
      {/* High-Top Eyelet Tower Lacing (6 Bars) */}
      {[0.12, 0.28, 0.44, 0.6, 0.76, 0.92].map((y, idx) => (
        <mesh key={`court-lace-${idx}`} position={[0, y, 0.9 - idx * 0.22]} material={laceMat} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.72, 16]} />
        </mesh>
      ))}
    </group>
  );
};

// 4. MINIMAL LEATHER TRAINER 3D (Sleek Monolithic Luxury)
export const MinimalLeatherTrainer3D: React.FC<{
  config: ShoeConfiguration;
  wireframe?: boolean;
}> = ({ config, wireframe }) => {
  const upperMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.upperColor),
        roughness: 0.3,
        metalness: 0.02,
        wireframe: !!wireframe,
      }),
    [config.upperColor, wireframe]
  );

  const soleMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.soleColor),
        roughness: 0.85,
        wireframe: !!wireframe,
      }),
    [config.soleColor, wireframe]
  );

  const laceMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.laceColor),
        roughness: 0.75,
        wireframe: !!wireframe,
      }),
    [config.laceColor, wireframe]
  );

  return (
    <group position={[0, -0.2, 0]} rotation={[0, -Math.PI / 4, 0]}>
      {/* Italian Low Cupsole */}
      <mesh position={[0, -0.55, 0.1]} material={soleMat} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.28, 3.3]} />
      </mesh>
      {/* Clean Monolithic Saddle */}
      <mesh position={[0, -0.2, 0.15]} material={upperMat} castShadow receiveShadow>
        <boxGeometry args={[1.15, 0.44, 3.0]} />
      </mesh>
      {/* Sculpted Smooth Toe Box */}
      <mesh position={[0, -0.16, 1.25]} rotation={[-Math.PI / 20, 0, 0]} material={upperMat} castShadow>
        <cylinderGeometry args={[0.55, 0.58, 0.38, 36]} />
      </mesh>
      {/* Clean Collar */}
      <mesh position={[0, 0.22, -0.6]} material={upperMat} castShadow>
        <boxGeometry args={[0.98, 0.44, 1.15]} />
      </mesh>
      {/* Minimal Tonal Laces */}
      {[0.14, 0.28, 0.42, 0.54].map((y, idx) => (
        <mesh key={`minimal-lace-${idx}`} position={[0, y, 0.88 - idx * 0.24]} material={laceMat} castShadow>
          <boxGeometry args={[0.62, 0.035, 0.1]} />
        </mesh>
      ))}
    </group>
  );
};

// 5. TRAIL EXPLORER 3D (Rugged Lugged Outsole & Cord Lacing)
export const TrailExplorer3D: React.FC<{
  config: ShoeConfiguration;
  wireframe?: boolean;
}> = ({ config, wireframe }) => {
  const upperMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.upperColor),
        roughness: 0.75,
        metalness: 0.1,
        wireframe: !!wireframe,
      }),
    [config.upperColor, wireframe]
  );

  const soleMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.soleColor),
        roughness: 0.95,
        wireframe: !!wireframe,
      }),
    [config.soleColor, wireframe]
  );

  const randMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#22252B'),
        roughness: 0.8,
        wireframe: !!wireframe,
      }),
    [wireframe]
  );

  const laceMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.laceColor),
        roughness: 0.7,
        wireframe: !!wireframe,
      }),
    [config.laceColor, wireframe]
  );

  return (
    <group position={[0, -0.2, 0]} rotation={[0, -Math.PI / 4, 0]}>
      {/* Heavy Lugged Outsole */}
      <mesh position={[0, -0.6, 0.1]} material={soleMat} castShadow receiveShadow>
        <boxGeometry args={[1.34, 0.24, 3.45]} />
      </mesh>
      {/* Aggressive Traction Cleats / Lugs */}
      {[-1.2, -0.8, -0.3, 0.2, 0.7, 1.2].map((z, idx) => (
        <mesh key={`trail-lug-${idx}`} position={[0, -0.74, z]} material={soleMat}>
          <boxGeometry args={[1.38, 0.08, 0.2]} />
        </mesh>
      ))}
      {/* Protective Perimeter Rand */}
      <mesh position={[0, -0.38, 0.1]} material={randMat} castShadow>
        <boxGeometry args={[1.3, 0.24, 3.3]} />
      </mesh>
      {/* Weather-Shield Upper */}
      <mesh position={[0, -0.12, 0.15]} material={upperMat} castShadow receiveShadow>
        <boxGeometry args={[1.22, 0.38, 2.95]} />
      </mesh>
      {/* External Heel Protective Cage */}
      <mesh position={[0, 0.15, -1.35]} material={randMat} castShadow>
        <boxGeometry args={[1.2, 0.65, 0.35]} />
      </mesh>
      {/* Hiking Cord Round Laces */}
      {[0.16, 0.32, 0.48, 0.62].map((y, idx) => (
        <group key={`trail-lace-${idx}`} position={[0, y, 0.85 - idx * 0.23]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={laceMat} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.72, 16]} />
          </mesh>
          <mesh position={[-0.4, 0, 0]} material={randMat}>
            <sphereGeometry args={[0.07, 12, 12]} />
          </mesh>
          <mesh position={[0.4, 0, 0]} material={randMat}>
            <sphereGeometry args={[0.07, 12, 12]} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// 6. FUTURE MOTION 3D (Parametric Lattice Midsole)
export const FutureMotion3D: React.FC<{
  config: ShoeConfiguration;
  wireframe?: boolean;
}> = ({ config, wireframe }) => {
  const upperMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.upperColor),
        roughness: 0.65,
        metalness: 0.15,
        wireframe: !!wireframe,
      }),
    [config.upperColor, wireframe]
  );

  const latticeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.soleColor),
        roughness: 0.4,
        metalness: 0.2,
        wireframe: !!wireframe,
      }),
    [config.soleColor, wireframe]
  );

  const neonFinMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#91ACFF'),
        roughness: 0.2,
        metalness: 0.8,
        wireframe: !!wireframe,
      }),
    [wireframe]
  );

  return (
    <group position={[0, -0.2, 0]} rotation={[0, -Math.PI / 4, 0]}>
      {/* Thin Base Tread Film */}
      <mesh position={[0, -0.65, 0.1]} material={latticeMat} castShadow receiveShadow>
        <boxGeometry args={[1.25, 0.08, 3.4]} />
      </mesh>
      {/* 3D-Printed Cellular Lattice Columns */}
      {[-1.2, -0.7, -0.2, 0.3, 0.8, 1.2].map((z, idx) => (
        <group key={`lattice-cell-${idx}`} position={[0, -0.48, z]}>
          <mesh position={[-0.4, 0, 0]} material={latticeMat} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.28, 12]} />
          </mesh>
          <mesh position={[0.4, 0, 0]} material={latticeMat} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.28, 12]} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} material={latticeMat}>
            <cylinderGeometry args={[0.06, 0.06, 0.8, 12]} />
          </mesh>
        </group>
      ))}
      {/* Seamless Aerodynamic Knit Sock Upper */}
      <mesh position={[0, -0.15, 0.15]} material={upperMat} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.38, 3.0]} />
      </mesh>
      {/* Forward-Swept Aerodynamic Shroud */}
      <mesh position={[0, 0.25, 0.4]} rotation={[-Math.PI / 4.5, 0, 0]} material={upperMat} castShadow>
        <boxGeometry args={[0.78, 0.12, 1.5]} />
      </mesh>
      {/* Ankle Sock Ribbed Collar */}
      <mesh position={[0, 0.48, -0.55]} material={upperMat}>
        <cylinderGeometry args={[0.45, 0.48, 0.45, 24]} />
      </mesh>
      {/* Floating Aerodynamic Heel Stabilizer Fin */}
      <mesh position={[0, -0.2, -1.6]} rotation={[-Math.PI / 8, 0, 0]} material={neonFinMat} castShadow>
        <boxGeometry args={[1.2, 0.15, 0.45]} />
      </mesh>
    </group>
  );
};

// Dispatcher Component rendering the appropriate 3D shoe model
export const ShoeModel3D: React.FC<ShoeModelProps> = ({
  config,
  modelType = 'runner',
  wireframe = false,
  isHero = false,
}) => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    if (isHero) {
      const t = state.clock.getElapsedTime();
      group.current.position.y = Math.sin(t * 1.2) * 0.05;
      group.current.rotation.y = Math.sin(t * 0.4) * 0.08;
    }
  });

  return (
    <group ref={group}>
      {modelType === 'runner' && <PerformanceRunner3D config={config} wireframe={wireframe} />}
      {modelType === 'street' && <UrbanStreetSneaker3D config={config} wireframe={wireframe} />}
      {modelType === 'hightop' && <CourtHighTop3D config={config} wireframe={wireframe} />}
      {modelType === 'minimal' && <MinimalLeatherTrainer3D config={config} wireframe={wireframe} />}
      {modelType === 'trail' && <TrailExplorer3D config={config} wireframe={wireframe} />}
      {modelType === 'future' && <FutureMotion3D config={config} wireframe={wireframe} />}
    </group>
  );
};
