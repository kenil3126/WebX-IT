import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial, Environment, Float } from "@react-three/drei";

function SpinningCore() {
  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh>
        <icosahedronGeometry args={[1.4, 1]} />
        <MeshDistortMaterial
          color="#0A1F6B"
          attach="material"
          distort={0.35}
          speed={1.8}
          roughness={0.15}
          metalness={0.6}
        />
      </mesh>
      <mesh scale={1.62}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshBasicMaterial color="#38BDF8" wireframe transparent opacity={0.18} />
      </mesh>
    </Float>
  );
}

export default function Product3D({ className = "" }) {
  return (
    <div className={`relative ${className}`} style={{ touchAction: "none" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#1D5FEA" />
        <pointLight position={[-5, -3, -5]} intensity={0.8} color="#38BDF8" />
        <Suspense fallback={null}>
          <SpinningCore />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={2.2}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 1.6}
        />
      </Canvas>
    </div>
  );
}
