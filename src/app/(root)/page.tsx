import LightRays from "@/components/decoration/light-rays";
import { Hero } from "./components/hero";
import { RootHeader } from "./components/root-header";

const RootPage = () => {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <LightRays
        raysOrigin="top-center"
        raysColor="#1447e6"
        raysSpeed={1}
        lightSpread={0.5}
        rayLength={3}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0}
        distortion={0}
        pulsating={false}
        fadeDistance={1}
        saturation={1}
        className="fixed inset-0 z-0 opacity-50 pointer-events-none"
      />
      <RootHeader />
      <main className="flex-1 relative z-10">
        <Hero />
      </main>
    </div>
  );
};

export default RootPage;
