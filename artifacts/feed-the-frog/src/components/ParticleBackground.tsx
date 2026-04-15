import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  opacityDir: number;
  color: string;
}

const COLORS = [
  "0, 204, 0",
  "0, 255, 65",
  "57, 255, 20",
  "0, 180, 0",
];

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    const createParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / 18000);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.5 + 0.5,
          speedY: -(Math.random() * 0.4 + 0.1),
          speedX: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.5 + 0.1,
          opacityDir: (Math.random() > 0.5 ? 1 : -1) * 0.003,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.fill();

        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity += p.opacityDir;

        if (p.opacity <= 0.05 || p.opacity >= 0.65) p.opacityDir *= -1;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    const handleResize = () => {
      resize();
      createParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
