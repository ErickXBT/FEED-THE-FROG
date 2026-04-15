import { motion } from "framer-motion";
import { Zap, Flame, Users } from "lucide-react";

export function WhatIsFeed() {
  const features = [
    {
      title: "0% Tax",
      description: "Buy and sell without any hidden fees. What you trade is what you get.",
      icon: <Zap className="w-10 h-10 text-primary" />,
    },
    {
      title: "LP Burned",
      description: "Liquidity pool tokens are burned forever. Total security and trust.",
      icon: <Flame className="w-10 h-10 text-primary" />,
    },
    {
      title: "Community Driven",
      description: "Owned by the community, for the community. The frog belongs to everyone.",
      icon: <Users className="w-10 h-10 text-primary" />,
    },
  ];

  return (
    <section id="what-is-feed" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 blur-[60px] rounded-full"></div>
              <img 
                src="https://i.imgur.com/jZSgnzd.png" 
                alt="What is FEED" 
                className="relative z-10 w-full max-w-md mx-auto rounded-xl border border-accent/30 shadow-[0_0_30px_rgba(0,255,65,0.15)] animate-float"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-primary mb-8 tracking-wider">
              What is $FEED?
            </h2>
            <div className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-12">
              <p>
                $FEED is a community-driven meme coin with zero taxes, maximum vibes, and a frog that never stops eating. Built on the blockchain, fueled by the community, and destined for greatness. 
              </p>
              <p className="mt-4 font-bold text-white">
                The frog eats flies. You eat profits.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2, duration: 0.5 }}
                  className="bg-card/50 border border-primary/20 backdrop-blur-sm p-6 rounded-xl text-center hover:border-primary hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-all"
                >
                  <div className="mx-auto w-fit mb-4 bg-background p-3 rounded-full border border-primary/30 shadow-[0_0_15px_rgba(0,255,65,0.2)]">
                    {feature.icon}
                  </div>
                  <h3 className="font-orbitron font-bold text-lg text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-foreground/70">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
