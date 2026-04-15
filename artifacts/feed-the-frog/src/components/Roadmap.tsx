import { motion } from "framer-motion";

export function Roadmap() {
  const phases = [
    {
      title: "Phase 1: Hatch the Egg",
      description: "Token launch, website live, community building"
    },
    {
      title: "Phase 2: Leave the Pond",
      description: "CEX listings, partnerships, 10,000 holders"
    },
    {
      title: "Phase 3: Feed the Frog",
      description: "Game launch, NFT collection, major exchange listing"
    },
    {
      title: "Phase 4: Moon Mission",
      description: "Global domination, 1M holders, frog takes over"
    }
  ];

  return (
    <section id="roadmap" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-primary mb-4 tracking-wider">
            ROADMAP
          </h2>
          <p className="text-xl text-foreground/80">
            The path to the moon starts in the swamp.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-primary/20 transform md:-translate-x-1/2">
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full bg-primary shadow-[0_0_10px_rgba(0,255,65,0.8)]"
            />
          </div>

          <div className="space-y-12">
            {phases.map((phase, idx) => (
              <div key={idx} className={`relative flex items-center md:justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Dot */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.3 + 0.5 }}
                  className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background transform -translate-x-[10px] md:-translate-x-1/2 shadow-[0_0_15px_rgba(0,255,65,0.8)] z-10"
                />

                {/* Content Card */}
                <motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.3, duration: 0.6 }}
                  className={`w-full ml-12 md:ml-0 md:w-[45%] bg-card/60 border border-primary/20 backdrop-blur-sm p-6 rounded-xl hover:border-primary transition-colors`}
                >
                  <h3 className="font-orbitron font-bold text-xl text-white mb-2 drop-shadow-[0_0_5px_rgba(0,255,65,0.5)]">{phase.title}</h3>
                  <p className="text-foreground/70">{phase.description}</p>
                </motion.div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
