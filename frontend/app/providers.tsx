"use client";

import { ReactNode, useEffect } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import Lenis from "@studio-freight/lenis";

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.5,  // replaces smoothTouch
      // no more smoothTouch in new versions
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      // @ts-ignore
      lenis.destroy?.();
    };
  }, []);

  return <ParallaxProvider>{children}</ParallaxProvider>;
}
