import React, { useRef, useEffect, type JSX } from "react";
import robot from "../../assets/robot-removebg-preview.png";
import About from "./about";
import Features from "./Features";

export default function LandingPage(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Particle configuration
  const baseHue = 220;
  const rangeHue = 100;
  const particleCount = 700;
  const rangeSpeed = 1.5;
  const turbulence = 0.6;
  const particleSize = 1.2;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
      );
    }

    function noise(x: number, y: number, t: number) {
      return (
        Math.sin(x * 0.0017 + t * 0.0013) * 0.5 +
        Math.cos(y * 0.0019 - t * 0.0007) * 0.35 +
        Math.sin((x + y) * 0.0009 + t * 0.0011) * 0.15
      );
    }

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      angle: Math.random() * Math.PI * 2,
      speed: 0.2 + Math.random() * rangeSpeed,
      hue: (baseHue + (Math.random() - 0.5) * rangeHue + 360) % 360,
      life: Math.random() * 1000,
    }));

    function drawGradientBackground() {
      const gradient = ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height / window.devicePixelRatio
      );
      gradient.addColorStop(0, "rgb(15, 23, 42)"); // slate-900
      gradient.addColorStop(1, "rgb(0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    let last = performance.now();
    function step(now: number) {
      const dt = Math.min(40, now - last);
      last = now;
      const t = now * 0.001;

      drawGradientBackground();

      for (const p of particles) {
        const n = noise(p.x, p.y, t) * turbulence;
        const nx = Math.cos(p.angle) * p.speed + n * 2;
        const ny =
          Math.sin(p.angle) * p.speed + noise(p.y, p.x, t) * turbulence * 2;

        p.x += nx * (dt * 0.06);
        p.y += ny * (dt * 0.06);
        p.life += dt * 0.01;

        if (p.x < -20) p.x = window.innerWidth + 20;
        if (p.x > window.innerWidth + 20) p.x = -20;
        if (p.y < -20) p.y = window.innerHeight + 20;
        if (p.y > window.innerHeight + 20) p.y = -20;

        const alpha =
          0.07 + Math.min(0.9, Math.abs(noise(p.x * 0.6, p.y * 0.6, t)) * 0.8);
        const size = particleSize + Math.sin(p.life * 0.01) * 0.8;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 85%, 55%, ${alpha})`;
        ctx.arc(p.x, p.y, Math.max(0.4, size), 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    }

    resize();
    rafRef.current = requestAnimationFrame(step);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Hero / Landing Section */}
      <section className="relative w-screen h-screen flex items-center justify-center text-white overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black">
        {/* Animated particle canvas */}
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 w-full h-full -z-10"
          aria-hidden
        />

        {/* Cyan glow accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.12),transparent_70%)] pointer-events-none" />

        <div
          ref={contentRef}
          className="relative z-10 w-full max-w-7xl px-8 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-16"
        >
          {/* Left text section */}
          <div className="flex flex-col text-left lg:w-1/2 space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 drop-shadow-md">
              Welcome to Responder
            </h1>
            <p className="text-lg text-slate-200 leading-relaxed max-w-lg">
              Your AI-powered assistant for seamless communication and coding
              support — smart, fast, and secure for every developer’s workflow.
            </p>
            <button className="w-fit px-6 py-3 bg-cyan-400 hover:bg-cyan-300 rounded-lg text-black font-semibold shadow-md active:scale-95 transition-transform">
              Login
            </button>
          </div>

          {/* Right image section */}
          <div className="flex justify-center items-center lg:w-1/2">
            <img
              src={robot}
              alt="Responder Assistant"
              className="w-64 h-64 drop-shadow-[0_0_25px_rgba(14,165,233,0.4)] hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <About />
      {/* Features Section */}
      <Features />
    </>
  );
}
