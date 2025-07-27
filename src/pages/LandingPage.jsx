import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FAQ from "../components/Accordion";
import Testimoni from "../components/Testimoni";
import Feature from "../components/Feature";
import Hero from "../components/Hero";

const LandingPage = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const createIndonesiaParallaxMap = () => {
      const container = mapContainerRef.current;
      container.innerHTML = ""; // Clear existing content

      // Create main container div
      const mapDiv = document.createElement("div");
      mapDiv.style.position = "relative";
      mapDiv.style.width = "100%";
      mapDiv.style.height = "100%";
      mapDiv.style.display = "flex";
      mapDiv.style.alignItems = "center";
      mapDiv.style.justifyContent = "center";
      mapDiv.style.minHeight = "400px";

      // Create and load the Indonesia image
      const indonesiaImg = document.createElement("img");
      indonesiaImg.src = "/indonesiadot.png";
      indonesiaImg.alt = "Indonesia Map";
      indonesiaImg.style.maxWidth = "90%";
      indonesiaImg.style.maxHeight = "80%";
      indonesiaImg.style.objectFit = "contain";
      indonesiaImg.style.opacity = "0.85";
      indonesiaImg.style.filter = "brightness(1.1) contrast(1.05)";
      indonesiaImg.style.transition = "transform 0.1s ease-out";

      // Handle image load
      indonesiaImg.onload = () => {
        setImageLoaded(true);

        // Create multiple parallax layers
        const createParallaxLayer = (zIndex, speed, opacity) => {
          const layer = document.createElement("div");
          layer.style.position = "absolute";
          layer.style.top = "0";
          layer.style.left = "0";
          layer.style.width = "100%";
          layer.style.height = "100%";
          layer.style.pointerEvents = "none";
          layer.style.zIndex = zIndex;
          layer.style.opacity = opacity;
          layer.className = `parallax-layer-${speed}`;
          return layer;
        };

        // Create 3 parallax layers
        const layer1 = createParallaxLayer(1, "slow", "0.4"); // Background elements
        const layer2 = createParallaxLayer(2, "medium", "0.6"); // Mid elements
        const layer3 = createParallaxLayer(3, "fast", "0.8"); // Foreground elements

        // Parallax elements for different layers
        const parallaxElements = {
          slow: [
            // Large background circles - water bodies
            {
              x: 0.2,
              y: 0.3,
              size: 60,
              color: "#0ea5e9",
              type: "circle",
              blur: 20,
            },
            {
              x: 0.7,
              y: 0.6,
              size: 80,
              color: "#06b6d4",
              type: "circle",
              blur: 25,
            },
            {
              x: 0.5,
              y: 0.8,
              size: 70,
              color: "#0284c7",
              type: "circle",
              blur: 22,
            },
            {
              x: 0.1,
              y: 0.7,
              size: 50,
              color: "#0369a1",
              type: "circle",
              blur: 18,
            },
            {
              x: 0.85,
              y: 0.2,
              size: 65,
              color: "#075985",
              type: "circle",
              blur: 20,
            },
          ],
          medium: [
            // Medium flood prediction zones
            {
              x: 0.15,
              y: 0.4,
              size: 35,
              color: "#f59e0b",
              type: "pulse",
              blur: 8,
            },
            {
              x: 0.35,
              y: 0.7,
              size: 40,
              color: "#ef4444",
              type: "pulse",
              blur: 10,
            },
            {
              x: 0.6,
              y: 0.35,
              size: 30,
              color: "#10b981",
              type: "pulse",
              blur: 6,
            },
            {
              x: 0.75,
              y: 0.55,
              size: 38,
              color: "#f59e0b",
              type: "pulse",
              blur: 9,
            },
            {
              x: 0.45,
              y: 0.5,
              size: 33,
              color: "#06b6d4",
              type: "pulse",
              blur: 7,
            },
            {
              x: 0.25,
              y: 0.6,
              size: 36,
              color: "#8b5cf6",
              type: "pulse",
              blur: 8,
            },
          ],
          fast: [
            // Small active indicators - rainfall, sensors
            {
              x: 0.3,
              y: 0.25,
              size: 12,
              color: "#3b82f6",
              type: "dot",
              blur: 2,
            },
            {
              x: 0.55,
              y: 0.4,
              size: 15,
              color: "#ef4444",
              type: "dot",
              blur: 3,
            },
            {
              x: 0.8,
              y: 0.3,
              size: 10,
              color: "#10b981",
              type: "dot",
              blur: 2,
            },
            {
              x: 0.2,
              y: 0.55,
              size: 14,
              color: "#f59e0b",
              type: "dot",
              blur: 3,
            },
            {
              x: 0.65,
              y: 0.65,
              size: 13,
              color: "#06b6d4",
              type: "dot",
              blur: 2,
            },
            {
              x: 0.4,
              y: 0.35,
              size: 16,
              color: "#8b5cf6",
              type: "dot",
              blur: 3,
            },
            {
              x: 0.7,
              y: 0.45,
              size: 11,
              color: "#ec4899",
              type: "dot",
              blur: 2,
            },
            {
              x: 0.15,
              y: 0.65,
              size: 14,
              color: "#84cc16",
              type: "dot",
              blur: 3,
            },
          ],
        };

        // Create elements for each layer
        Object.keys(parallaxElements).forEach((layerType) => {
          const layer =
            layerType === "slow"
              ? layer1
              : layerType === "medium"
              ? layer2
              : layer3;

          parallaxElements[layerType].forEach((element, index) => {
            const el = document.createElement("div");
            el.style.position = "absolute";
            el.style.left = `${element.x * 100}%`;
            el.style.top = `${element.y * 100}%`;
            el.style.width = `${element.size}px`;
            el.style.height = `${element.size}px`;
            el.style.backgroundColor = element.color;
            el.style.borderRadius = "50%";
            el.style.transform = "translate(-50%, -50%)";
            el.style.filter = `blur(${element.blur}px)`;
            el.className = `parallax-${layerType}-${index}`;

            // Add different animations based on type
            if (element.type === "pulse") {
              el.style.animation = `pulse-parallax-${layerType}-${index} ${
                3 + Math.random() * 2
              }s ease-in-out infinite`;
            } else if (element.type === "dot") {
              el.style.animation = `dot-parallax-${layerType}-${index} ${
                2 + Math.random() * 3
              }s ease-in-out infinite`;
            } else {
              el.style.animation = `float-parallax-${layerType}-${index} ${
                4 + Math.random() * 4
              }s ease-in-out infinite`;
            }

            el.style.animationDelay = `${Math.random() * 2}s`;

            // Add CSS animations
            const styleElement = document.createElement("style");
            styleElement.textContent = `
              @keyframes pulse-parallax-${layerType}-${index} {
                0%, 100% { 
                  transform: translate(-50%, -50%) scale(1);
                  opacity: 0.6;
                }
                50% { 
                  transform: translate(-50%, -50%) scale(1.3);
                  opacity: 0.9;
                }
              }
              @keyframes dot-parallax-${layerType}-${index} {
                0%, 100% { 
                  transform: translate(-50%, -50%) scale(1);
                  opacity: 0.8;
                }
                25% { 
                  transform: translate(-50%, -50%) scale(1.5);
                  opacity: 1;
                }
                75% { 
                  transform: translate(-50%, -50%) scale(0.8);
                  opacity: 0.4;
                }
              }
              @keyframes float-parallax-${layerType}-${index} {
                0%, 100% { 
                  transform: translate(-50%, -50%) translateY(0px);
                  opacity: 0.4;
                }
                50% { 
                  transform: translate(-50%, -50%) translateY(-10px);
                  opacity: 0.7;
                }
              }
            `;
            document.head.appendChild(styleElement);

            layer.appendChild(el);
          });
        });

        // Add floating data particles
        for (let i = 0; i < 20; i++) {
          const particle = document.createElement("div");
          particle.style.position = "absolute";
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.top = `${Math.random() * 100}%`;
          particle.style.width = `${2 + Math.random() * 4}px`;
          particle.style.height = `${2 + Math.random() * 4}px`;
          particle.style.backgroundColor = "#3b82f6";
          particle.style.borderRadius = "50%";
          particle.style.opacity = "0.3";
          particle.style.transform = "translate(-50%, -50%)";
          particle.style.animation = `float-particle-${i} ${
            5 + Math.random() * 5
          }s linear infinite`;
          particle.style.animationDelay = `${Math.random() * 3}s`;

          const particleStyle = document.createElement("style");
          particleStyle.textContent = `
            @keyframes float-particle-${i} {
              0% { 
                transform: translate(-50%, -50%) translateY(0px) translateX(0px);
                opacity: 0;
              }
              10% { 
                opacity: 0.3;
              }
              90% { 
                opacity: 0.3;
              }
              100% { 
                transform: translate(-50%, -50%) translateY(-20px) translateX(${
                  Math.random() * 40 - 20
                }px);
                opacity: 0;
              }
            }
          `;
          document.head.appendChild(particleStyle);
          layer3.appendChild(particle);
        }

        // Mouse parallax effect
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (e) => {
          const rect = container.getBoundingClientRect();
          mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width;
          mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height;
        };

        const updateParallax = () => {
          // Update image transform
          const imageTransform = `translate(${mouseX * 5}px, ${mouseY * 5}px)`;
          indonesiaImg.style.transform = imageTransform;

          // Update layer transforms with different speeds
          layer1.style.transform = `translate(${mouseX * 10}px, ${
            mouseY * 10
          }px)`;
          layer2.style.transform = `translate(${mouseX * 20}px, ${
            mouseY * 20
          }px)`;
          layer3.style.transform = `translate(${mouseX * 30}px, ${
            mouseY * 30
          }px)`;

          requestAnimationFrame(updateParallax);
        };

        // Scroll parallax effect
        const handleScroll = () => {
          const scrollY = window.scrollY;
          const scrollFactor = scrollY * 0.5;

          layer1.style.transform = `translate(${mouseX * 10}px, ${
            mouseY * 10 + scrollFactor * 0.2
          }px)`;
          layer2.style.transform = `translate(${mouseX * 20}px, ${
            mouseY * 20 + scrollFactor * 0.4
          }px)`;
          layer3.style.transform = `translate(${mouseX * 30}px, ${
            mouseY * 30 + scrollFactor * 0.6
          }px)`;

          indonesiaImg.style.transform = `translate(${mouseX * 5}px, ${
            mouseY * 5 + scrollFactor * 0.1
          }px)`;
        };

        // Add event listeners
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll);

        updateParallax();

        // Add layers to map
        mapDiv.appendChild(layer1);
        mapDiv.appendChild(layer2);
        mapDiv.appendChild(layer3);

        // Cleanup function for event listeners
        mapDiv._cleanup = () => {
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("scroll", handleScroll);
        };

        setMapLoaded(true);
      };

      // Handle image load error
      indonesiaImg.onerror = () => {
        console.warn("Failed to load /indonesiadot.png, using fallback");
        const fallbackDiv = document.createElement("div");
        fallbackDiv.style.display = "flex";
        fallbackDiv.style.alignItems = "center";
        fallbackDiv.style.justifyContent = "center";
        fallbackDiv.style.width = "100%";
        fallbackDiv.style.height = "100%";
        fallbackDiv.style.color = "#6b7280";
        fallbackDiv.style.fontSize = "18px";
        fallbackDiv.style.fontWeight = "500";
        fallbackDiv.textContent = "Peta Indonesia - Prediksi Banjir";
        mapDiv.appendChild(fallbackDiv);
        setMapLoaded(true);
      };

      mapDiv.appendChild(indonesiaImg);
      container.appendChild(mapDiv);
    };

    createIndonesiaParallaxMap();

    // Cleanup function
    return () => {
      if (mapContainerRef.current) {
        // Clean up event listeners
        const mapDiv = mapContainerRef.current.querySelector("div");
        if (mapDiv && mapDiv._cleanup) {
          mapDiv._cleanup();
        }
        mapContainerRef.current.innerHTML = "";
      }
    };
  }, []);

  // Enhanced fallback canvas animation
  const CanvasFallback = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
      if (mapLoaded) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const indonesiaRegions = [
        { x: 0.2, y: 0.6, color: "#16a34a", label: "Java" },
        { x: 0.25, y: 0.65, color: "#dc2626", label: "Bandung" },
        { x: 0.35, y: 0.62, color: "#f59e0b", label: "Central Java" },
        { x: 0.45, y: 0.58, color: "#ef4444", label: "East Java" },
        { x: 0.08, y: 0.4, color: "#3b82f6", label: "North Sumatra" },
        { x: 0.1, y: 0.55, color: "#f59e0b", label: "Central Sumatra" },
        { x: 0.12, y: 0.7, color: "#16a34a", label: "South Sumatra" },
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

      let animationFrameId;

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
          particle.pulsePhase += 0.03;
          particle.driftX += (Math.random() - 0.5) * 0.1;
          particle.driftY += (Math.random() - 0.5) * 0.1;

          particle.driftX = Math.max(-10, Math.min(10, particle.driftX));
          particle.driftY = Math.max(-10, Math.min(10, particle.driftY));

          particle.x = particle.originalX + particle.driftX;
          particle.y = particle.originalY + particle.driftY;

          const pulseFactor = 0.6 + 0.4 * Math.sin(particle.pulsePhase);
          const currentSize = particle.size * pulseFactor;

          ctx.beginPath();
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = particle.opacity;
          ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
          ctx.fill();

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

    if (mapLoaded) return null;

    return (
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none z-0 opacity-30"
      />
    );
  };

  return (
    <div className="bg-white min-h-screen relative">
      {/* Floonder Parallax Map Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          ref={mapContainerRef}
          className="w-full h-full flex items-center justify-center"
          style={{
            filter: "hue-rotate(15deg) saturate(0.9) brightness(1.1)",
          }}
        />
        <CanvasFallback />
      </div>

      {/* Enhanced Gradient Overlays - Floonder Theme */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[1200px] h-[700px]
          bg-gradient-to-b from-blue-50 via-cyan-50/60 via-emerald-50/40 to-transparent
          rounded-full blur-3xl opacity-50"
        />

        <div
          className="absolute top-1/2 left-1/4 w-[900px] h-[500px]
          bg-gradient-to-r from-emerald-50/60 via-green-50/40 via-blue-50/30 to-transparent
          rounded-full blur-2xl opacity-60"
        />

        <div
          className="absolute bottom-0 right-1/3 w-[700px] h-[500px]
          bg-gradient-to-t from-cyan-100/70 via-blue-100/50 via-indigo-100/40 to-transparent
          rounded-full blur-2xl opacity-40"
        />

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

      {/* Floonder Data Grid Pattern */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
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

      {/* Enhanced Floating Elements */}
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
    </div>
  );
};

export default LandingPage;
