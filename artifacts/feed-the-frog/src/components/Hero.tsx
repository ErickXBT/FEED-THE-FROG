import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <img 
            src="https://i.imgur.com/miT1z7v.png" 
            alt="Feed the Frog Hero" 
            className="w-full max-w-2xl mx-auto animate-float drop-shadow-[0_0_30px_rgba(0,255,65,0.3)] mb-8"
          />
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-orbitron mb-6 text-white" style={{ textShadow: '0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary))' }}>
            FEED THE FROG
          </h1>
          <p className="text-xl md:text-3xl text-foreground/80 mb-10 font-medium tracking-wide">
            The hungriest frog on the blockchain
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="#buy" className="px-8 py-4 bg-primary text-primary-foreground font-orbitron font-bold text-xl uppercase tracking-widest rounded-lg animate-pulse-glow hover:scale-105 transition-transform w-full sm:w-auto">
              Buy $FEED
            </a>
            <a href="#community" className="px-8 py-4 bg-transparent border-2 border-primary/50 text-foreground font-orbitron font-bold text-xl uppercase tracking-widest rounded-lg hover:border-primary hover:text-primary transition-all w-full sm:w-auto">
              Join Community
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
