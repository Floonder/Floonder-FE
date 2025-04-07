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

    const stars = [];
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        xRatio: Math.random(), // Posisi relatif (0-1)
        yRatio: Math.random(), // Posisi relatif (0-1)
        size: Math.random() * 2.5 + 0.8,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.04 + 0.01,
      });
    }

    let animationFrameId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(15, 15, 15, 0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        const x = star.xRatio * canvas.width;
        const y = star.yRatio * canvas.height;

        ctx.beginPath();
        ctx.fillStyle = `rgba(6, 182, 212, ${star.opacity})`;
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, star.size * 2, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, star.size * 2);
        gradient.addColorStop(0, `rgba(6, 182, 212, ${star.opacity * 0.5})`);
        gradient.addColorStop(1, "rgba(6, 182, 212, 0)");
        ctx.fillStyle = gradient;
        ctx.fill();

        star.opacity += star.speed;

        if (star.opacity >= 1 || star.opacity <= 0.1) {
          star.speed = -star.speed;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      cancelAnimationFrame(animationFrameId);
      setTimeout(() => {
        animationFrameId = requestAnimationFrame(animate);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-[#0F0F0F] min-h-screen relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full pointer-events-none z-0"
        />
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] 
          bg-gradient-to-r from-cyan-500/20 via-blue-600/10 to-transparent 
          rounded-full blur-3xl opacity-50"
        ></div>
        <div
          className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] 
          bg-gradient-to-r from-cyan-500/20 via-blue-600/10 to-transparent 
          rounded-full blur-3xl opacity-50"
        ></div>
      </div>

      <div className="fixed inset-0 bg-grid-white/5 opacity-10 pointer-events-none z-0"></div>

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
    </div>
  );
};

export default LandingPage;
