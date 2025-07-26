import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FAQ from "../components/Accordion";
import Testimoni from "../components/Testimoni";
import Feature from "../components/Feature";
import Hero from "../components/Hero";

const LandingPage = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null); // Retained for consistency, but not directly used for a map library here
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const createIndonesiaFloodMap = () => {
      const container = mapContainerRef.current;
      container.innerHTML = ""; // Clear existing content

      // Create SVG element
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      svg.setAttribute("viewBox", "0 0 1000 600");
      svg.style.opacity = "0.8"; // Increased opacity for better visibility
      svg.style.backgroundColor = "transparent"; // Ensure transparency

      // More detailed Indonesia archipelago paths (adjusted colors for a more natural, less vibrant look)
      const indonesiaPaths = [
        // Sumatra - Slightly desaturated blue-green
        {
          path: `M 80 120 Q 70 150 75 180 Q 80 220 85 250 Q 90 280 95 310 Q 100 340 90 370 Q 85 380 80 385 Q 75 390 70 385 Q 65 380 68 370 Q 65 340 60 310 Q 55 280 50 250 Q 45 220 50 180 Q 55 150 65 120 Q 70 110 80 120 Z`,
          fill: "#c1e8f9", // Lighter, desaturated blue
          stroke: "#4a90a4", // Darker, desaturated blue
        },
        // Java (main island) - Slightly desaturated green
        {
          path: `M 180 280 Q 220 275 260 280 Q 300 275 340 280 Q 380 275 420 280 Q 460 275 500 280 Q 540 285 580 290 Q 620 295 650 300 L 645 340 Q 605 345 565 340 Q 525 345 485 340 Q 445 345 405 340 Q 365 345 325 340 Q 285 345 245 340 Q 205 345 175 340 Z`,
          fill: "#d0f0d0", // Light, natural green
          stroke: "#5cb85c", // Deeper green
        },
        // Kalimantan - More earthy tone
        {
          path: `M 350 150 Q 390 145 430 150 Q 470 145 510 150 Q 550 155 590 160 Q 630 165 670 170 Q 700 175 720 185 Q 725 195 720 205 Q 715 220 710 240 Q 705 260 700 275 Q 680 270 660 265 Q 620 260 580 255 Q 540 250 500 245 Q 460 240 420 235 Q 380 230 340 225 Q 330 210 335 190 Q 340 170 350 150 Z`,
          fill: "#f5f5dc", // Creamy beige
          stroke: "#b8860b", // Goldenrod
        },
        // Sulawesi - Slightly muted purple
        {
          path: `M 600 200 Q 620 195 635 210 Q 650 225 655 245 Q 660 265 650 285 Q 645 305 635 320 Q 625 335 610 340 Q 595 345 580 340 Q 570 330 575 315 Q 580 300 585 285 Q 590 270 595 255 Q 600 240 605 225 Q 608 210 600 200 Z`,
          fill: "#f1e7f5", // Light, muted purple
          stroke: "#9462a6", // Deeper muted purple
        },
        // Papua - Muted blue-purple
        {
          path: `M 720 220 Q 760 215 800 220 Q 840 225 880 230 Q 920 235 950 240 Q 955 250 950 260 Q 945 280 940 300 Q 935 320 925 335 Q 915 350 900 360 Q 885 370 870 365 Q 855 360 845 350 Q 835 340 830 325 Q 825 310 820 295 Q 815 280 810 265 Q 805 250 800 235 Q 790 225 780 220 Q 750 215 720 220 Z`,
          fill: "#e0d9eb", // Light, muted blue-purple
          stroke: "#6a5acd", // Deeper muted blue-purple
        },
        // Bali & Nusa Tenggara - Muted reddish-brown
        {
          path: `M 650 300 Q 680 305 710 310 Q 740 315 770 320 Q 775 330 770 340 Q 765 350 755 355 Q 745 360 735 355 Q 725 350 720 340 Q 715 330 710 320 Q 690 315 670 310 Q 655 305 650 300 Z`,
          fill: "#f0d8d8", // Light, muted red
          stroke: "#b22222", // Firebrick
        },
      ];

      // Draw Indonesia islands
      indonesiaPaths.forEach((island) => {
        const path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        path.setAttribute("d", island.path);
        path.setAttribute("fill", island.fill);
        path.setAttribute("stroke", island.stroke);
        path.setAttribute("stroke-width", "1.5");
        path.setAttribute("stroke-opacity", "0.6");
        svg.appendChild(path);
      });

      // Generate random flood points across Indonesia
      // NOTE: These coordinates are based on the simplified map's viewBox (1000x600).
      // If you use a very different SVG, adjust these coordinates accordingly.
      const floodPoints = [
        // Java flood points (more concentrated in West Java/Bandung area)
        { x: 200, y: 315, severity: "moderate", city: "Jakarta" },
        { x: 250, y: 320, severity: "severe", city: "Bandung" },
        { x: 300, y: 325, severity: "light", city: "Cirebon" },
        { x: 400, y: 315, severity: "moderate", city: "Yogyakarta" },
        { x: 480, y: 310, severity: "severe", city: "Surabaya" },
        { x: 350, y: 318, severity: "light", city: "Solo" },
        { x: 220, y: 310, severity: "moderate", city: "Bogor" },
        { x: 270, y: 330, severity: "light", city: "Sukabumi" },

        // Sumatra flood points
        { x: 75, y: 180, severity: "moderate", city: "Medan" },
        { x: 70, y: 240, severity: "light", city: "Padang" },
        { x: 80, y: 320, severity: "severe", city: "Palembang" },
        { x: 85, y: 360, severity: "moderate", city: "Lampung" },

        // Kalimantan flood points
        { x: 420, y: 200, severity: "light", city: "Pontianak" },
        { x: 520, y: 180, severity: "moderate", city: "Balikpapan" },
        { x: 600, y: 190, severity: "light", city: "Samarinda" },

        // Sulawesi flood points
        { x: 620, y: 240, severity: "moderate", city: "Makassar" },
        { x: 610, y: 220, severity: "light", city: "Manado" },

        // Eastern Indonesia
        { x: 750, y: 280, severity: "light", city: "Jayapura" },
        { x: 700, y: 325, severity: "moderate", city: "Kupang" },

        // Additional random points for realistic distribution
        {
          x: 180 + Math.random() * 400,
          y: 300 + Math.random() * 30,
          severity: "light",
          city: "",
        },
        {
          x: 60 + Math.random() * 40,
          y: 200 + Math.random() * 150,
          severity: "moderate",
          city: "",
        },
        {
          x: 400 + Math.random() * 200,
          y: 170 + Math.random() * 60,
          severity: "light",
          city: "",
        },
        {
          x: 600 + Math.random() * 100,
          y: 210 + Math.random() * 80,
          severity: "moderate",
          city: "",
        },
      ];

      // Draw flood points with different severity indicators
      floodPoints.forEach((point, index) => {
        const severityColors = {
          light: { fill: "#60a5fa", stroke: "#3b82f6", radius: 6 }, // Blue
          moderate: { fill: "#f59e0b", stroke: "#d97706", radius: 8 }, // Amber
          severe: { fill: "#ef4444", stroke: "#dc2626", radius: 12 }, // Red
        };

        const color = severityColors[point.severity];

        // Outer glow circle
        const glowCircle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );
        glowCircle.setAttribute("cx", point.x);
        glowCircle.setAttribute("cy", point.y);
        glowCircle.setAttribute("r", color.radius * 2);
        glowCircle.setAttribute("fill", color.fill);
        glowCircle.setAttribute("fill-opacity", "0.2");

        // Pulsing animation for glow
        const glowAnimate = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "animate"
        );
        glowAnimate.setAttribute("attributeName", "r");
        glowAnimate.setAttribute(
          "values",
          `${color.radius * 2};${color.radius * 3};${color.radius * 2}`
        );
        glowAnimate.setAttribute("dur", "4s");
        glowAnimate.setAttribute("begin", `${index * 0.3}s`);
        glowAnimate.setAttribute("repeatCount", "indefinite");

        glowCircle.appendChild(glowAnimate);
        svg.appendChild(glowCircle);

        // Main flood point circle
        const circle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );
        circle.setAttribute("cx", point.x);
        circle.setAttribute("cy", point.y);
        circle.setAttribute("r", color.radius);
        circle.setAttribute("fill", color.fill);
        circle.setAttribute("stroke", color.stroke);
        circle.setAttribute("stroke-width", "2");
        circle.setAttribute("fill-opacity", "0.8");

        // Pulsing animation
        const animate = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "animate"
        );
        animate.setAttribute("attributeName", "r");
        animate.setAttribute(
          "values",
          `${color.radius};${color.radius + 3};${color.radius}`
        );
        animate.setAttribute("dur", "3s");
        animate.setAttribute("begin", `${index * 0.2}s`);
        animate.setAttribute("repeatCount", "indefinite");

        // Opacity animation
        const animateOpacity = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "animate"
        );
        animateOpacity.setAttribute("attributeName", "fill-opacity");
        animateOpacity.setAttribute("values", "0.8;0.4;0.8");
        animateOpacity.setAttribute("dur", "3s");
        animateOpacity.setAttribute("begin", `${index * 0.2}s`);
        animateOpacity.setAttribute("repeatCount", "indefinite");

        circle.appendChild(animate);
        circle.appendChild(animateOpacity);
        svg.appendChild(circle);

        // Add city labels for major cities
        if (point.city && point.city.length > 0) {
          const text = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
          );
          text.setAttribute("x", point.x + color.radius + 5);
          text.setAttribute("y", point.y - color.radius - 5);
          text.setAttribute("font-family", "Arial, sans-serif");
          text.setAttribute("font-size", "11");
          text.setAttribute("font-weight", "600"); // Slightly bolder
          text.setAttribute("fill", "#1f2937"); // Darker text
          text.setAttribute("fill-opacity", "0.9");
          text.textContent = point.city;
          svg.appendChild(text);
        }
      });

      // Add animated water ripples effect (for general water movement)
      for (let i = 0; i < 6; i++) {
        const ripple = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );
        // Position ripples over potential water bodies/coasts
        const x = 150 + Math.random() * 600;
        const y = 200 + Math.random() * 200;

        ripple.setAttribute("cx", x);
        ripple.setAttribute("cy", y);
        ripple.setAttribute("r", "20");
        ripple.setAttribute("fill", "none");
        ripple.setAttribute("stroke", "#0891b2");
        ripple.setAttribute("stroke-width", "1");
        ripple.setAttribute("stroke-opacity", "0");

        // Expanding ripple animation
        const animateR = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "animate"
        );
        animateR.setAttribute("attributeName", "r");
        animateR.setAttribute("values", "20;60;20");
        animateR.setAttribute("dur", "6s");
        animateR.setAttribute("begin", `${Math.random() * 3}s`);
        animateR.setAttribute("repeatCount", "indefinite");

        const animateOpacity = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "animate"
        );
        animateOpacity.setAttribute("attributeName", "stroke-opacity");
        animateOpacity.setAttribute("values", "0;0.4;0");
        animateOpacity.setAttribute("dur", "6s");
        animateOpacity.setAttribute("begin", `${Math.random() * 3}s`);
        animateOpacity.setAttribute("repeatCount", "indefinite");

        ripple.appendChild(animateR);
        ripple.appendChild(animateOpacity);
        svg.appendChild(ripple);
      }

      // Add animated rain droplets for "curah hujan" illustration
      for (let i = 0; i < 15; i++) {
        const rainDroplet = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );
        const x = 50 + Math.random() * 900; // Across the whole map
        const y = 50 + Math.random() * 500;
        const size = Math.random() * 2 + 1; // Small droplets

        rainDroplet.setAttribute("cx", x);
        rainDroplet.setAttribute("cy", y);
        rainDroplet.setAttribute("r", size);
        rainDroplet.setAttribute("fill", "#0284c7"); // Blue for rain
        rainDroplet.setAttribute("fill-opacity", "0.7");

        // Animate a short "splash" or "fall" effect
        const splashAnimateR = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "animate"
        );
        splashAnimateR.setAttribute("attributeName", "r");
        splashAnimateR.setAttribute("values", `${size};${size * 3};0`);
        splashAnimateR.setAttribute("dur", "1.5s");
        splashAnimateR.setAttribute("begin", `${Math.random() * 3}s`);
        splashAnimateR.setAttribute("repeatCount", "indefinite");

        const splashAnimateOpacity = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "animate"
        );
        splashAnimateOpacity.setAttribute("attributeName", "fill-opacity");
        splashAnimateOpacity.setAttribute("values", "0.7;0.2;0");
        splashAnimateOpacity.setAttribute("dur", "1.5s");
        splashAnimateOpacity.setAttribute("begin", `${Math.random() * 3}s`);
        splashAnimateOpacity.setAttribute("repeatCount", "indefinite");

        rainDroplet.appendChild(splashAnimateR);
        rainDroplet.appendChild(splashAnimateOpacity);
        svg.appendChild(rainDroplet);
      }

      container.appendChild(svg);
      setMapLoaded(true);
    };

    createIndonesiaFloodMap();

    // Cleanup function
    return () => {
      if (mapContainerRef.current) {
        mapContainerRef.current.innerHTML = "";
      }
    };
  }, []);

  // Enhanced fallback canvas animation
  const CanvasFallback = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
      if (mapLoaded) return; // Only run if the SVG map isn't loaded

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Indonesia archipelago points for fallback (adjust as needed for better representation)
      const indonesiaRegions = [
        // Java region
        { x: 0.2, y: 0.6, color: "#16a34a", label: "Java" },
        { x: 0.25, y: 0.65, color: "#dc2626", label: "Bandung" },
        { x: 0.35, y: 0.62, color: "#f59e0b", label: "Central Java" },
        { x: 0.45, y: 0.58, color: "#ef4444", label: "East Java" },

        // Sumatra region
        { x: 0.08, y: 0.4, color: "#3b82f6", label: "North Sumatra" },
        { x: 0.1, y: 0.55, color: "#f59e0b", label: "Central Sumatra" },
        { x: 0.12, y: 0.7, color: "#16a34a", label: "South Sumatra" },

        // Other islands
        { x: 0.6, y: 0.45, color: "#ec4899", label: "Sulawesi" },
        { x: 0.85, y: 0.5, color: "#9333ea", label: "Papua" },
        { x: 0.7, y: 0.65, color: "#e53e3e", label: "Nusa Tenggara" },
      ];

      const particles = indonesiaRegions.map((region) => ({
        x: region.x * canvas.width,
        y: region.y * canvas.height,
        originalX: region.x * canvas.width,
        originalY: region.y * canvas.height,
        color: region.color,
        size: Math.random() * 4 + 3,
        opacity: Math.random() * 0.6 + 0.4,
        speed: (Math.random() - 0.5) * 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        driftX: 0,
        driftY: 0,
      }));

      let time = 0;
      let animationFrameId;

      const animate = () => {
        time += 0.01;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, i) => {
          particle.pulsePhase += 0.03;
          particle.driftX += (Math.random() - 0.5) * 0.1;
          particle.driftY += (Math.random() - 0.5) * 0.1;

          // Limit drift
          particle.driftX = Math.max(-10, Math.min(10, particle.driftX));
          particle.driftY = Math.max(-10, Math.min(10, particle.driftY));

          // Update position with drift
          particle.x = particle.originalX + particle.driftX;
          particle.y = particle.originalY + particle.driftY;

          const pulseFactor = 0.6 + 0.4 * Math.sin(particle.pulsePhase);
          const currentSize = particle.size * pulseFactor;

          // Main particle
          ctx.beginPath();
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = particle.opacity;
          ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
          ctx.fill();

          // Glow effect
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            currentSize * 4
          );
          gradient.addColorStop(0, particle.color);
          gradient.addColorStop(1, "transparent");

          ctx.beginPath();
          ctx.fillStyle = gradient;
          ctx.globalAlpha = particle.opacity * 0.3;
          ctx.arc(particle.x, particle.y, currentSize * 4, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.globalAlpha = 1;
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles.forEach((particle, i) => {
          particle.originalX = indonesiaRegions[i].x * canvas.width;
          particle.originalY = indonesiaRegions[i].y * canvas.height;
          particle.x = particle.originalX + particle.driftX;
          particle.y = particle.originalY + particle.driftY;
        });
      };

      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", handleResize);
      };
    }, [mapLoaded]);

    if (mapLoaded) return null; // Don't render if the SVG map loaded

    return (
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none z-0 opacity-30"
      />
    );
  };

  return (
    <div className="bg-white min-h-screen relative">
      {/* Floonder Map Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          ref={mapContainerRef}
          className="w-full h-full flex items-center justify-center"
          style={{
            // Apply filters to give the map a more 'GIS' or 'satellite' feel
            filter: "hue-rotate(15deg) saturate(0.9) brightness(1.1)",
          }}
        />
        {/* The CanvasFallback will render only if the SVG map fails to load */}
        <CanvasFallback />
      </div>

      {/* Enhanced Gradient Overlays - Floonder Theme (GIS, Water, Rainfall) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Main gradient with blue water theme - wider and more subtle */}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[1200px] h-[700px]
          bg-gradient-to-b from-blue-50 via-cyan-50/60 via-emerald-50/40 to-transparent
          rounded-full blur-3xl opacity-50"
        />

        {/* Rainfall / green-blue focus gradient (e.g., over Java/Sumatra) */}
        <div
          className="absolute top-1/2 left-1/4 w-[900px] h-[500px]
          bg-gradient-to-r from-emerald-50/60 via-green-50/40 via-blue-50/30 to-transparent
          rounded-full blur-2xl opacity-60"
        />

        {/* Deeper water/prediction theme overlay */}
        <div
          className="absolute bottom-0 right-1/3 w-[700px] h-[500px]
          bg-gradient-to-t from-cyan-100/70 via-blue-100/50 via-indigo-100/40 to-transparent
          rounded-full blur-2xl opacity-40"
        />

        {/* Dynamic water reflection / data flow effect */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 70%, rgba(59,130,246,0.1) 0%, transparent 45%),
              radial-gradient(circle at 80% 30%, rgba(16,185,129,0.08) 0%, transparent 45%),
              radial-gradient(circle at 50% 85%, rgba(6,182,212,0.07) 0%, transparent 40%),
              linear-gradient(135deg, rgba(59,130,246,0.04) 0%, rgba(16,185,129,0.04) 100%)
            `,
          }}
        />
      </div>

      {/* Floonder Data Grid Pattern (more subtle) */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px", // Larger grid cells
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

      {/* Enhanced Floating Elements - Data Points / Prediction Indicators */}
      <div className="fixed top-16 right-12 w-3 h-3 bg-blue-500 rounded-full animate-pulse opacity-70 pointer-events-none z-5" />
      <div
        className="fixed top-1/4 left-8 w-2 h-2 bg-cyan-600 rounded-full animate-pulse opacity-60 pointer-events-none z-5"
        style={{ animationDelay: "0.5s" }}
      />
      <div
        className="fixed bottom-1/3 right-1/5 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse opacity-80 pointer-events-none z-5"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="fixed top-1/2 right-2/5 w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse opacity-50 pointer-events-none z-5"
        style={{ animationDelay: "2.5s" }}
      />
      <div
        className="fixed bottom-1/4 left-1/3 w-2 h-2 bg-teal-500 rounded-full animate-pulse opacity-65 pointer-events-none z-5"
        style={{ animationDelay: "3s" }}
      />

      {/* Loading indicator */}
      {!mapLoaded && (
        <div className="fixed top-4 right-4 text-xs text-blue-700 opacity-70 pointer-events-none z-10 bg-white/90 px-2 py-1 rounded-lg shadow-sm">
          Loading Floonder Map...
        </div>
      )}

      {/* Map legend */}
      {mapLoaded && (
        <div className="fixed bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-xl pointer-events-none z-10 text-xs">
          <div className="font-bold text-gray-800 mb-2">
            Peta Prediksi Banjir
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span className="text-gray-700">Ringan</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-gray-700">Sedang</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-gray-700">Parah</span>
            </div>
            <hr className="my-2 border-gray-200" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-600 opacity-70"></div>
              <span className="text-gray-700">Curah Hujan</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
