import { motion } from "framer-motion";

export function AboutFeed() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-card/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full"></div>
              <img 
                src="https://i.imgur.com/R5fBfRt.png" 
                alt="About FEED THE FROG" 
                className="relative z-10 w-full max-w-md mx-auto rounded-xl border border-primary/30 shadow-[0_0_30px_rgba(0,255,65,0.15)]"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-primary mb-8 tracking-wider">
              About FEED
            </h2>
            <div className="space-y-6 text-lg md:text-xl text-foreground/80 leading-relaxed">
              <p>
                FEED THE FROG is more than just a meme coin — it's a movement. A hungry frog. A community. A revolution in the pond.
              </p>
              <p>
                Born from the swamp, built for the moon. $FEED is the token that feeds the frog and feeds your wallet.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
