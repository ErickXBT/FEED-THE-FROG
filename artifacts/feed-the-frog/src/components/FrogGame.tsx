import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

export function FrogGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [flies, setFlies] = useState<{ id: number; x: number; y: number }[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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
      setFlies(current => {
        if (current.length > 4) return current;
        return [...current, {
          id: Date.now(),
          x: Math.random() * 80 + 10, // 10% to 90%
          y: Math.random() * 50 + 10, // 10% to 60%
        }];
      });
    }, 1500);
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Mouse tracking for eyes
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleShoot = (e: React.MouseEvent) => {
    if (!isPlaying || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const targetX = e.clientX - rect.left;
    const targetY = e.clientY - rect.top;
    
    setTongueTarget({ x: targetX, y: targetY });
    
    setTimeout(() => {
      setTongueTarget(null);
    }, 200);
  };

  const catchFly = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // prevent default shoot
    if (!isPlaying) return;
    
    handleShoot(e);
    
    setTimeout(() => {
      setFlies(current => current.filter(f => f.id !== id));
      setScore(s => s + 1);
    }, 100); // slight delay to sync with tongue
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setFlies([]);
    setIsPlaying(true);
  };

  // Frog center coordinates roughly (for tongue base)
  const frogCenter = { x: '50%', y: '80%' };

  return (
    <section id="game" className="py-24 relative overflow-hidden bg-card/40 border-y border-primary/20">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-primary mb-4 tracking-wider">
            FEED THE FROG GAME
          </h2>
          <p className="text-xl text-foreground/80 font-medium">
            Catch flies, earn bragging rights
          </p>
        </motion.div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onClick={handleShoot}
          className="max-w-4xl mx-auto relative rounded-2xl overflow-hidden border-2 border-primary shadow-[0_0_40px_rgba(0,255,65,0.2)] bg-black aspect-video flex items-center justify-center cursor-crosshair"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black z-0"></div>

          {/* HUD */}
          {isPlaying && (
            <div className="absolute top-4 left-4 right-4 flex justify-between z-40 px-4">
              <div className="text-primary font-orbitron text-xl md:text-2xl font-bold drop-shadow-[0_0_10px_rgba(0,255,65,0.8)]">
                SCORE: {score}
              </div>
              <div className="text-white font-orbitron text-xl md:text-2xl font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                TIME: {timeLeft}s
              </div>
            </div>
          )}

          {/* Start / Game Over Screen */}
          {!isPlaying && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-50">
              <h3 className="font-orbitron text-4xl text-white mb-2 animate-pulse-glow text-center">
                {timeLeft === 0 ? "TIME'S UP!" : "READY TO FEED?"}
              </h3>
              {timeLeft === 0 && (
                <p className="text-2xl text-primary mb-6 font-bold font-orbitron">
                  FINAL SCORE: {score}
                </p>
              )}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  startGame();
                }}
                className="mt-6 px-10 py-5 bg-primary text-black font-orbitron font-bold text-2xl uppercase tracking-widest rounded-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,255,65,0.6)] cursor-pointer"
              >
                {timeLeft === 0 ? "PLAY AGAIN" : "START"}
              </button>
            </div>
          )}

          {/* Flies */}
          {flies.map(fly => (
            <motion.div
              key={fly.id}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1], x: [0, Math.random()*20-10, 0], y: [0, Math.random()*20-10, 0] }}
              transition={{ duration: 0.5, x: { yoyo: Infinity, duration: 0.2 }, y: { yoyo: Infinity, duration: 0.3 } }}
              style={{ left: `${fly.x}%`, top: `${fly.y}%` }}
              className="absolute w-6 h-6 bg-white rounded-full z-20 flex items-center justify-center group"
              onClick={(e) => catchFly(e, fly.id)}
            >
              {/* Fly wings */}
              <div className="absolute -left-2 top-1 w-4 h-3 bg-white/50 rounded-full animate-ping"></div>
              <div className="absolute -right-2 top-1 w-4 h-3 bg-white/50 rounded-full animate-ping"></div>
              <div className="w-4 h-4 bg-black rounded-full"></div>
            </motion.div>
          ))}

          {/* The Frog */}
          <div className="absolute bottom-[-10%] w-48 h-48 z-30 pointer-events-none">
            {/* Body */}
            <div className="absolute inset-0 bg-[#00cc00] rounded-[50%] border-4 border-black shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5)]"></div>
            {/* Belly */}
            <div className="absolute bottom-4 left-8 right-8 top-16 bg-[#a7cc67] rounded-[50%] border-2 border-black/20"></div>
            
            {/* Left Eye */}
            <div className="absolute -top-4 left-4 w-16 h-16 bg-white rounded-full border-4 border-black overflow-hidden flex items-center justify-center">
              <motion.div 
                animate={{
                  x: (mousePos.x / (containerRef.current?.offsetWidth || 1)) * 20 - 10,
                  y: (mousePos.y / (containerRef.current?.offsetHeight || 1)) * 20 - 10,
                }}
                className="w-6 h-6 bg-black rounded-full"
              />
            </div>
            
            {/* Right Eye */}
            <div className="absolute -top-4 right-4 w-16 h-16 bg-white rounded-full border-4 border-black overflow-hidden flex items-center justify-center">
              <motion.div 
                animate={{
                  x: (mousePos.x / (containerRef.current?.offsetWidth || 1)) * 20 - 10,
                  y: (mousePos.y / (containerRef.current?.offsetHeight || 1)) * 20 - 10,
                }}
                className="w-6 h-6 bg-black rounded-full"
              />
            </div>

            {/* Mouth */}
            <div className={`absolute top-20 left-10 right-10 h-8 bg-black rounded-full overflow-hidden transition-all duration-100 ${tongueTarget ? 'h-16' : ''}`}>
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-red-500 rounded-t-full"></div>
            </div>
          </div>

          {/* Tongue */}
          {tongueTarget && (
            <motion.div 
              initial={{ height: 0, opacity: 1 }}
              animate={{ 
                height: Math.sqrt(Math.pow(tongueTarget.x - (containerRef.current?.offsetWidth || 0)/2, 2) + Math.pow((containerRef.current?.offsetHeight || 0)*0.8 - tongueTarget.y, 2)),
                rotate: Math.atan2((containerRef.current?.offsetHeight || 0)*0.8 - tongueTarget.y, tongueTarget.x - (containerRef.current?.offsetWidth || 0)/2) * (-180 / Math.PI) + 90
              }}
              transition={{ duration: 0.1 }}
              style={{
                position: 'absolute',
                bottom: '20%',
                left: '50%',
                width: '12px',
                backgroundColor: '#ff4444',
                transformOrigin: 'bottom center',
                zIndex: 25,
                borderRadius: '10px'
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
