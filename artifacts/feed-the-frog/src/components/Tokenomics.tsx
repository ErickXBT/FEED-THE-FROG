import { motion } from "framer-motion";

export function Tokenomics() {
  const stats = [
    { value: "1,000,000,000", label: "Total Supply" },
    { value: "0%", label: "Tax" },
    { value: "BURNED", label: "LP Status" }
  ];

  return (
    <section id="tokenomics" className="py-24 relative overflow-hidden bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 order-2 lg:order-1"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-primary mb-8 tracking-wider">
              TOKENOMICS
            </h2>
            <p className="text-xl text-foreground/80 mb-12 italic">
              "Simple. Clean. Froggy."
            </p>

            <div className="space-y-6">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="bg-background/80 border border-primary/30 p-6 rounded-xl flex items-center justify-between hover:border-primary hover:shadow-[0_0_15px_rgba(0,255,65,0.2)] transition-all"
                >
                  <span className="text-foreground/70 uppercase tracking-widest font-semibold">{stat.label}</span>
                  <span className="font-orbitron font-bold text-2xl md:text-3xl text-white drop-shadow-[0_0_10px_rgba(0,255,65,0.5)]">{stat.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50, rotate: -10 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full"></div>
              <img 
                src="https://i.imgur.com/JWb6PGS.png" 
                alt="Tokenomics" 
                className="relative z-10 w-full max-w-md animate-float drop-shadow-[0_0_40px_rgba(0,255,65,0.4)]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
