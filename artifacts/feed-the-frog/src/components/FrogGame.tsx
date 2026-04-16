import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

export function FrogGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [flies, setFlies] = useState<{ id: number; x: number; y: number }[]>([]);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });
  const [tongueTarget, setTongueTarget] = useState<{ x: number; y: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  // Fly generator
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setFlies((current) => {
        if (current.length > 4) return current;
        return [
          ...current,
          {
            id: Date.now(),
            x: Math.random() * 80 + 10,
            y: Math.random() * 50 + 10,
          },
        ];
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const getRelativePos = (clientX: number, clientY: number) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  // Mouse tracking for eyes
  const handleMouseMove = (e: React.MouseEvent) => {
    setPointerPos(getRelativePos(e.clientX, e.clientY));
  };

  // Touch tracking for eyes
  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    setPointerPos(getRelativePos(touch.clientX, touch.clientY));
  };

  const shootAt = useCallback((clientX: number, clientY: number) => {
    if (!isPlaying) return;
    const pos = getRelativePos(clientX, clientY);
    setTongueTarget(pos);
    setTimeout(() => setTongueTarget(null), 200);
  }, [isPlaying]);

  const handleMouseClick = (e: React.MouseEvent) => {
    shootAt(e.clientX, e.clientY);
  };

  const handleTouchShoot = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    if (!touch) return;
    shootAt(touch.clientX, touch.clientY);
  };

  const catchFly = (
    clientX: number,
    clientY: number,
    id: number,
    stopDefault: () => void
  ) => {
    stopDefault();
    if (!isPlaying) return;
    shootAt(clientX, clientY);
    setTimeout(() => {
      setFlies((current) => current.filter((f) => f.id !== id));
      setScore((s) => s + 1);
    }, 100);
  };

  const handleFlyClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    catchFly(e.clientX, e.clientY, id, () => {});
  };

  const handleFlyTouch = (e: React.TouchEvent, id: number) => {
    e.stopPropagation();
    e.preventDefault();
    const touch = e.changedTouches[0];
    if (!touch) return;
    catchFly(touch.clientX, touch.clientY, id, () => {});
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setFlies([]);
    setIsPlaying(true);
  };

  return (
    <section
      id="game"
      className="py-16 sm:py-24 relative overflow-hidden bg-card/40 border-y border-primary/20"
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-orbitron text-primary mb-4 tracking-wider">
            FEED THE FROG GAME
          </h2>
          <p className="text-base sm:text-xl text-foreground/80 font-medium">
            Catch flies, earn bragging rights
          </p>
          <p className="mt-2 text-sm text-foreground/50 md:hidden">
            Tap anywhere to shoot your tongue!
          </p>
        </motion.div>

        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onClick={handleMouseClick}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchShoot}
          className="max-w-4xl mx-auto relative rounded-2xl overflow-hidden border-2 border-primary shadow-[0_0_40px_rgba(0,255,65,0.2)] bg-black flex items-center justify-center cursor-crosshair select-none"
          style={{ aspectRatio: "4/3" }}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black z-0"></div>

          {/* HUD */}
          {isPlaying && (
            <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 flex justify-between z-40 px-2 sm:px-4">
              <div className="text-primary font-orbitron text-sm sm:text-xl md:text-2xl font-bold drop-shadow-[0_0_10px_rgba(0,255,65,0.8)]">
                SCORE: {score}
              </div>
              <div className="text-white font-orbitron text-sm sm:text-xl md:text-2xl font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                TIME: {timeLeft}s
              </div>
            </div>
          )}

          {/* Start / Game Over Screen */}
          {!isPlaying && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-50 px-4">
              <h3 className="font-orbitron text-2xl sm:text-4xl text-white mb-2 animate-pulse-glow text-center">
                {timeLeft === 0 ? "TIME'S UP!" : "READY TO FEED?"}
              </h3>
              {timeLeft === 0 && (
                <p className="text-xl sm:text-2xl text-primary mb-6 font-bold font-orbitron">
                  FINAL SCORE: {score}
                </p>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  startGame();
                }}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  startGame();
                }}
                className="mt-4 px-8 sm:px-10 py-4 sm:py-5 bg-primary text-black font-orbitron font-bold text-xl sm:text-2xl uppercase tracking-widest rounded-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,255,65,0.6)] cursor-pointer touch-manipulation"
              >
                {timeLeft === 0 ? "PLAY AGAIN" : "START"}
              </button>
            </div>
          )}

          {/* Flies */}
          {flies.map((fly) => (
            <motion.div
              key={fly.id}
              initial={{ scale: 0 }}
              animate={{
                scale: [0, 1.2, 1],
                x: [0, Math.random() * 20 - 10, 0],
                y: [0, Math.random() * 20 - 10, 0],
              }}
              transition={{
                duration: 0.5,
                x: { repeat: Infinity, repeatType: "mirror", duration: 0.2 },
                y: { repeat: Infinity, repeatType: "mirror", duration: 0.3 },
              }}
              style={{ left: `${fly.x}%`, top: `${fly.y}%` }}
              className="absolute z-20 flex items-center justify-center touch-manipulation"
              onClick={(e) => handleFlyClick(e, fly.id)}
              onTouchStart={(e) => handleFlyTouch(e, fly.id)}
            >
              {/* Hit area (larger on mobile for easier tapping) */}
              <div className="absolute w-12 h-12 sm:w-8 sm:h-8 rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
              {/* Wings */}
              <div className="absolute -left-2 top-1 w-4 h-3 bg-white/50 rounded-full animate-ping"></div>
              <div className="absolute -right-2 top-1 w-4 h-3 bg-white/50 rounded-full animate-ping"></div>
              {/* Body */}
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center border border-black/20">
                <div className="w-4 h-4 bg-black rounded-full"></div>
              </div>
            </motion.div>
          ))}

          {/* The Frog */}
          <div className="absolute bottom-[-10%] w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 z-30 pointer-events-none left-1/2 -translate-x-1/2">
            <div className="absolute inset-0 bg-[#00cc00] rounded-[50%] border-4 border-black shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5)]"></div>
            <div className="absolute bottom-4 left-8 right-8 top-16 bg-[#a7cc67] rounded-[50%] border-2 border-black/20"></div>

            {/* Left Eye */}
            <div className="absolute -top-4 left-2 sm:left-4 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full border-4 border-black overflow-hidden flex items-center justify-center">
              <motion.div
                animate={{
                  x:
                    (pointerPos.x / (containerRef.current?.offsetWidth || 1)) *
                      20 -
                    10,
                  y:
                    (pointerPos.y / (containerRef.current?.offsetHeight || 1)) *
                      20 -
                    10,
                }}
                className="w-5 h-5 sm:w-6 sm:h-6 bg-black rounded-full"
              />
            </div>

            {/* Right Eye */}
            <div className="absolute -top-4 right-2 sm:right-4 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full border-4 border-black overflow-hidden flex items-center justify-center">
              <motion.div
                animate={{
                  x:
                    (pointerPos.x / (containerRef.current?.offsetWidth || 1)) *
                      20 -
                    10,
                  y:
                    (pointerPos.y / (containerRef.current?.offsetHeight || 1)) *
                      20 -
                    10,
                }}
                className="w-5 h-5 sm:w-6 sm:h-6 bg-black rounded-full"
              />
            </div>

            {/* Mouth */}
            <div
              className={`absolute top-16 sm:top-20 left-8 sm:left-10 right-8 sm:right-10 h-6 sm:h-8 bg-black rounded-full overflow-hidden transition-all duration-100 ${
                tongueTarget ? "h-12 sm:h-16" : ""
              }`}
            >
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-red-500 rounded-t-full"></div>
            </div>
          </div>

          {/* Tongue */}
          {tongueTarget && (
            <motion.div
              initial={{ height: 0, opacity: 1 }}
              animate={{
                height: Math.sqrt(
                  Math.pow(
                    tongueTarget.x -
                      (containerRef.current?.offsetWidth || 0) / 2,
                    2
                  ) +
                    Math.pow(
                      (containerRef.current?.offsetHeight || 0) * 0.8 -
                        tongueTarget.y,
                      2
                    )
                ),
                rotate:
                  Math.atan2(
                    (containerRef.current?.offsetHeight || 0) * 0.8 -
                      tongueTarget.y,
                    tongueTarget.x -
                      (containerRef.current?.offsetWidth || 0) / 2
                  ) *
                    (-180 / Math.PI) +
                  90,
              }}
              transition={{ duration: 0.1 }}
              style={{
                position: "absolute",
                bottom: "20%",
                left: "50%",
                width: "12px",
                backgroundColor: "#ff4444",
                transformOrigin: "bottom center",
                zIndex: 25,
                borderRadius: "10px",
              }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#ff4444] rounded-full"></div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
