import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Cloud, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function Castle() {
  const castleRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (castleRef.current) {
      castleRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.05) * 0.02;
      castleRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <group ref={castleRef} position={[0, 1, -8]} rotation={[0, 0.2, 0]}>
      {/* Main Central Tower */}
      <mesh position={[0, 4, 0]} castShadow>
        <cylinderGeometry args={[1.2, 1.4, 6, 8]} />
        <meshStandardMaterial 
          color="#2a3b4c"
          roughness={0.7}
          emissive="#ffd700"
          emissiveIntensity={0.15}
        />
        {/* Tower Top */}
        <mesh position={[0, 3.5, 0]}>
          <coneGeometry args={[1.4, 2, 8]} />
          <meshStandardMaterial color="#1a2b3c" />
        </mesh>
      </mesh>

      {/* Side Towers */}
      {[
        [-2, 3, 1],
        [2, 3, 1],
        [-1, 3.5, -1],
        [1, 3.5, -1],
        [-3, 2.5, -0.5],
        [3, 2.5, -0.5]
      ].map((pos, i) => (
        <group key={i} position={[pos[0], pos[1], pos[2]]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.6, 0.8, 4 + Math.random(), 8]} />
            <meshStandardMaterial 
              color="#2a3b4c"
              roughness={0.7}
              emissive="#ffd700"
              emissiveIntensity={0.15}
            />
          </mesh>
          <mesh position={[0, 2.5, 0]}>
            <coneGeometry args={[0.8, 1.5, 8]} />
            <meshStandardMaterial color="#1a2b3c" />
          </mesh>
        </group>
      ))}

      {/* Castle Base */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[8, 2, 4]} />
        <meshStandardMaterial 
          color="#2a3b4c"
          roughness={0.8}
          emissive="#ffd700"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Mountain Base */}
      <mesh position={[0, -2, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[6, 8, 4, 6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={1} />
      </mesh>
    </group>
  );
}

function MagicalLights() {
  const lightsRef = useRef<THREE.Points>(null);
  
  useFrame(({ clock }) => {
    if (lightsRef.current) {
      lightsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      lightsRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
    }
  });

  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 15;
    positions[i3 + 1] = (Math.random() - 0.5) * 15;
    positions[i3 + 2] = (Math.random() - 0.5) * 15;

    const color = new THREE.Color();
    color.setHSL(Math.random() * 0.1 + 0.05, 0.9, 0.7);
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }

  return (
    <points ref={lightsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function Forest() {
  return (
    <group position={[0, -5, -5]}>
      {Array.from({ length: 50 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 30;
        const z = (Math.random() - 0.5) * 20 - 5;
        const scale = 0.5 + Math.random() * 1.5;
        return (
          <mesh key={i} position={[x, 0, z]} scale={[scale, scale, scale]}>
            <coneGeometry args={[0.5, 2, 8]} />
            <meshStandardMaterial color="#0a2f1a" />
          </mesh>
        );
      })}
    </group>
  );
}

const HogwartsBackground: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        shadows
      >
        <fog attach="fog" args={['#001', 10, 30]} />
        <ambientLight intensity={0.2} />
        <pointLight
          position={[10, 10, 10]}
          intensity={0.5}
          castShadow
        />
        <Stars
          radius={100}
          depth={50}
          count={7000}
          factor={4}
          fade
          speed={1}
        />
        
        {/* Moon Light */}
        <directionalLight
          position={[5, 5, -5]}
          intensity={0.5}
          color="#b4c6ff"
        />
        
        <Castle />
        <Forest />
        <MagicalLights />
        
        {/* Atmospheric Clouds */}
        {Array.from({ length: 5 }).map((_, i) => (
          <Cloud
            key={i}
            opacity={0.5}
            speed={0.4}
            width={10}
            depth={1.5}
            segments={20}
            position={[
              (Math.random() - 0.5) * 10,
              3 + Math.random() * 2,
              -5 - Math.random() * 5
            ]}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default HogwartsBackground;