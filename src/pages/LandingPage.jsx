import React, { useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FAQ from "../components/Accordion";
import Testimoni from "../components/Testimoni";
import Feature from "../components/Feature";
import Hero from "../components/Hero";

const LandingPage = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const ctx = canvas.getContext("2d");
    updateCanvasSize();

    // Indonesia map outline points (simplified)
    const indonesiaOutline = [
      // Sumatera
      { x: 0.15, y: 0.3 },
      { x: 0.12, y: 0.45 },
      { x: 0.08, y: 0.55 },
      { x: 0.05, y: 0.65 },
      // Java
      { x: 0.25, y: 0.7 },
      { x: 0.35, y: 0.72 },
      { x: 0.4, y: 0.73 },
      // Kalimantan
      { x: 0.35, y: 0.4 },
      { x: 0.45, y: 0.35 },
      { x: 0.55, y: 0.45 },
      { x: 0.5, y: 0.6 },
      // Sulawesi
      { x: 0.6, y: 0.4 },
      { x: 0.65, y: 0.3 },
      { x: 0.7, y: 0.45 },
      { x: 0.68, y: 0.55 },
      // Papua
      { x: 0.85, y: 0.4 },
      { x: 0.92, y: 0.45 },
      { x: 0.88, y: 0.55 },
      { x: 0.8, y: 0.5 },
      // Additional islands
      { x: 0.3, y: 0.5 },
      { x: 0.75, y: 0.6 },
      { x: 0.42, y: 0.65 },
      { x: 0.6, y: 0.7 },
    ];

    // Create animated dots representing cities/locations
    const cityDots = indonesiaOutline.map((point, index) => ({
      x: point.x,
      y: point.y,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      speed: (Math.random() * 0.02 + 0.005) * (index % 2 === 0 ? 1 : -1),
      pulsePhase: Math.random() * Math.PI * 2,
      originalOpacity: Math.random() * 0.6 + 0.2,
    }));

    // Connection lines between nearby cities
    const connections = [];
    for (let i = 0; i < cityDots.length; i++) {
      for (let j = i + 1; j < cityDots.length; j++) {
        const dx = cityDots[i].x - cityDots[j].x;
        const dy = cityDots[i].y - cityDots[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 0.3) {
          connections.push({
            from: i,
            to: j,
            opacity: Math.random() * 0.1 + 0.05,
            animationOffset: Math.random() * Math.PI * 2,
          });
        }
      }
    }

    let time = 0;
    let animationFrameId;

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      connections.forEach((connection) => {
        const fromDot = cityDots[connection.from];
        const toDot = cityDots[connection.to];

        const fromX = fromDot.x * canvas.width;
        const fromY = fromDot.y * canvas.height;
        const toX = toDot.x * canvas.width;
        const toY = toDot.y * canvas.height;

        const animatedOpacity =
          connection.opacity *
          (0.5 + 0.5 * Math.sin(time * 2 + connection.animationOffset));

        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.strokeStyle = `rgba(59, 130, 246, ${animatedOpacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Draw city dots
      cityDots.forEach((dot) => {
        const x = dot.x * canvas.width;
        const y = dot.y * canvas.height;

        // Pulsing animation
        dot.pulsePhase += 0.05;
        const pulseFactor = 0.7 + 0.3 * Math.sin(dot.pulsePhase);
        const currentSize = dot.size * pulseFactor;

        // Opacity animation
        dot.opacity += dot.speed;
        if (dot.opacity >= 0.8 || dot.opacity <= 0.1) {
          dot.speed = -dot.speed;
        }

        // Main dot
        ctx.beginPath();
        ctx.fillStyle = `rgba(59, 130, 246, ${dot.opacity})`;
        ctx.arc(x, y, currentSize, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(x, y, currentSize * 3, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          currentSize * 3
        );
        gradient.addColorStop(0, `rgba(59, 130, 246, ${dot.opacity * 0.3})`);
        gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-white min-h-screen relative">
      {/* Animated Indonesia Map Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full pointer-events-none z-0 opacity-30"
        />
      </div>

      {/* Gradient Overlays - Next.js Style */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top gradient */}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] 
          bg-gradient-to-b from-blue-50 via-indigo-50/50 to-transparent 
          rounded-full blur-3xl opacity-60"
        />

        {/* Bottom gradient */}
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[300px] 
          bg-gradient-to-t from-cyan-50 via-blue-50/30 to-transparent 
          rounded-full blur-2xl opacity-50"
        />

        {/* Side accent */}
        <div
          className="absolute top-1/3 left-0 w-[400px] h-[500px] 
          bg-gradient-to-r from-violet-50/40 via-purple-50/20 to-transparent 
          rounded-full blur-3xl opacity-40"
        />
      </div>

      {/* Grid Pattern - Next.js Style */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Subtle radial gradient overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(255,255,255,0.1) 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <div className="space-y-0">
          <Hero />
          <Feature />
          <Testimoni />
          <FAQ />
        </div>
        <Footer />
      </div>

      {/* Floating Elements - Next.js Style */}
      <div className="fixed top-20 right-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60 pointer-events-none z-5" />
      <div
        className="fixed top-1/3 left-10 w-1 h-1 bg-indigo-400 rounded-full animate-pulse opacity-40 pointer-events-none z-5"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="fixed bottom-1/4 right-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse opacity-50 pointer-events-none z-5"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
};

export default LandingPage;
