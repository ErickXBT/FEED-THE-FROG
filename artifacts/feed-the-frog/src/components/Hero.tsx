import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 min-h-[80vh]">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-left"
          >
            <h1
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black font-orbitron mb-6 text-white leading-tight"
              style={{ textShadow: '0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary))' }}
            >
              FEED<br />THE<br /><span className="text-primary">FROG</span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-foreground/80 mb-8 sm:mb-10 font-medium tracking-wide max-w-lg">
              Eat flies. Stack gains. Feed the frog.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a
                href="#buy"
                className="px-8 py-4 bg-primary text-primary-foreground font-orbitron font-bold text-lg uppercase tracking-widest rounded-lg animate-pulse-glow hover:scale-105 transition-transform"
              >
                Buy $FEED
              </a>
              <a
                href="#community"
                className="px-8 py-4 bg-transparent border-2 border-primary/50 text-foreground font-orbitron font-bold text-lg uppercase tracking-widest rounded-lg hover:border-primary hover:text-primary transition-all"
              >
                Join Community
              </a>
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex items-center justify-center"
          >
            <img
              src="https://i.imgur.com/6BtRP3Z.png"
              alt="Feed the Frog Hero"
              className="w-full max-w-lg lg:max-w-xl animate-float drop-shadow-[0_0_50px_rgba(0,255,65,0.4)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
