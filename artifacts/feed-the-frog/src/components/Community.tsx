import { motion } from "framer-motion";
import { FaXTwitter, FaTelegram } from "react-icons/fa6";

export function Community() {
  return (
    <section id="community" className="py-32 relative overflow-hidden bg-card/80 border-t border-primary/20">
      {/* Particle background effect via CSS gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0"></div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-bold font-orbitron text-white mb-6 tracking-widest drop-shadow-[0_0_15px_rgba(0,255,65,0.6)]">
            JOIN THE POND
          </h2>
          <p className="text-2xl text-primary font-medium mb-12">
            The frog needs you. The pond is calling.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="#" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-primary text-white font-orbitron font-bold text-xl rounded hover:bg-primary hover:text-black transition-all w-full sm:w-auto justify-center group"
            >
              <FaXTwitter className="w-6 h-6 group-hover:scale-110 transition-transform" />
              TWITTER / X
            </a>
            
            <a 
              href="#" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-primary text-black font-orbitron font-bold text-xl rounded hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,255,65,0.4)] w-full sm:w-auto justify-center group"
            >
              <FaTelegram className="w-6 h-6 group-hover:scale-110 transition-transform" />
              TELEGRAM
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
