import React, { Suspense, useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { ShoeModel3D } from './ShoeModels3D';
import { Hotspots } from './Hotspots';
import { useCustomizer } from '../../context/CustomizerContext';
import { CameraPreset, ShoeModelType } from '../../types';
import { Loader2 } from 'lucide-react';
import { MATERIALS } from '../../data/products';

const PRESET_VECTORS: Record<CameraPreset, [number, number, number]> = {
  hero: [2.2, 0.9, 2.6],
  side: [3.2, 0.2, 0.0],
  front: [0.0, 0.3, 3.2],
  rear: [0.0, 0.4, -3.2],
  top: [0.0, 3.6, 0.2],
  close: [1.3, 0.3, 1.3],
};

const CameraController: React.FC<{ activePreset: CameraPreset; isInteracting: boolean }> = ({
  activePreset,
  isInteracting,
}) => {
  const { camera } = useThree();
  const targetVec = useRef(new THREE.Vector3(...PRESET_VECTORS[activePreset]));

  useEffect(() => {
    targetVec.current.set(...PRESET_VECTORS[activePreset]);
  }, [activePreset]);

  useFrame(() => {
    if (!isInteracting) {
      camera.position.lerp(targetVec.current, 0.05);
    }
  });

  return null;
};

// Official Khronos Photorealistic PBR Shoe Model
const GlbShoeMesh: React.FC<{
  config: any;
  wireframe?: boolean;
}> = ({ config, wireframe }) => {
  const { scene } = useGLTF('/models/shoe.glb');

  const { centeredScene } = useMemo(() => {
    const clone = scene.clone();
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());

    // Center on X and Z, set bottom of sole on Y=0
    clone.position.x = -center.x;
    clone.position.y = -box.min.y;
    clone.position.z = -center.z;

    const wrapper = new THREE.Group();
    wrapper.add(clone);
    return { centeredScene: wrapper };
  }, [scene]);

  useEffect(() => {
    centeredScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          mat.wireframe = !!wireframe;

          if (config.upperColor && config.upperColor !== '#141519') {
            mat.color = new THREE.Color(config.upperColor);
          } else {
            mat.color = new THREE.Color('#FFFFFF');
          }

          const activeMatDef = MATERIALS.find((m) => m.id === config.material);
          if (activeMatDef) {
            mat.roughness = activeMatDef.roughness;
            mat.metalness = activeMatDef.metalness;
          }

          mesh.material = mat;
        }
      }
    });
  }, [centeredScene, config.upperColor, config.material, wireframe]);

  return (
    <primitive
      object={centeredScene}
      scale={6.5}
      position={[0, -0.65, 0]}
      rotation={[0.08, -Math.PI * 0.68, 0]}
    />
  );
};

interface SneakerCanvasProps {
  isHero?: boolean;
  modelType?: ShoeModelType;
  enableHotspots?: boolean;
  className?: string;
}

export const SneakerCanvas: React.FC<SneakerCanvasProps> = ({
  isHero = false,
  modelType = 'runner',
  enableHotspots = true,
  className = 'w-full h-full min-h-[420px]',
}) => {
  const { config, activePreset, wireframeMode, useGlbModel } = useCustomizer();
  const [isInteracting, setIsInteracting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className={`flex flex-col items-center justify-center bg-[#0D0E11] ${className}`}>
        <Loader2 className="w-8 h-8 text-[#91ACFF] animate-spin mb-3" />
        <span className="text-xs font-mono text-[#A3A6AE] uppercase tracking-widest">
          Loading 3D Footwear Engine...
        </span>
      </div>
    );
  }

  return (
    <div className={`relative ${className} select-none`}>
      <Canvas
        camera={{ position: PRESET_VECTORS[activePreset], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
        shadows
      >
        <CameraController activePreset={activePreset} isInteracting={isInteracting} />

        {/* Studio Lighting */}
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[5, 7, 5]}
          intensity={2.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-4, 3, -4]} intensity={1.5} color="#B5C7FF" />
        <directionalLight position={[0, 2, 5]} intensity={1.2} color="#FFFFFF" />
        <directionalLight position={[0, -2, 0]} intensity={0.4} color="#91ACFF" />

        <Suspense fallback={null}>
          {useGlbModel ? (
            <GlbShoeMesh config={config} wireframe={wireframeMode} />
          ) : (
            <ShoeModel3D
              config={config}
              modelType={modelType}
              wireframe={wireframeMode}
              isHero={isHero}
            />
          )}

          {enableHotspots && <Hotspots />}

          <ContactShadows
            position={[0, -0.68, 0]}
            opacity={0.7}
            scale={8}
            blur={2.4}
            far={3.0}
            color="#000000"
          />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          minDistance={1.2}
          maxDistance={5.0}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2 + 0.05}
          autoRotate={isHero && !isInteracting}
          autoRotateSpeed={0.7}
          onStart={() => setIsInteracting(true)}
          onEnd={() => {
            setTimeout(() => setIsInteracting(false), 2000);
          }}
        />
      </Canvas>
    </div>
  );
};

useGLTF.preload('/models/shoe.glb');
