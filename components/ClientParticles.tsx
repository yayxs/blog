'use client'

import dynamic from "next/dynamic";
import { Suspense } from "react";

const ParticlesComponent = dynamic(() => import("@/components/Particles"), {
  ssr: false,
  loading: () => null,
});

export default function ClientParticles() {
  return (
    <Suspense fallback={null}>
      <ParticlesComponent
        particleCount={150}
        particleSpread={50}
        speed={0.2}
        moveParticlesOnHover={true}
        particleColors={["#4F46E5", "#0EA5E9", "#8B5CF6"]}
        alphaParticles={true}
        particleBaseSize={2}
        sizeRandomness={0.5}
        cameraDistance={50}
      />
    </Suspense>
  );
} 