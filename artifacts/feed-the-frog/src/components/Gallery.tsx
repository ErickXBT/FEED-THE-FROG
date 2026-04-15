import { motion } from "framer-motion";

export function Gallery() {
  const images = [
    "https://i.imgur.com/KMD6KXM.png",
    "https://i.imgur.com/DJPxOl9.png",
    "https://i.imgur.com/Fk3p6V8.png",
    "https://i.imgur.com/oQ6jZyS.png",
    "https://i.imgur.com/Wtkk8gf.png",
    "https://i.imgur.com/QOLoniX.png",
    "https://i.imgur.com/RUVpR5p.png",
    "https://i.imgur.com/XfBCYYA.png"
  ];

  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-primary mb-4 tracking-wider">
            GALLERY
          </h2>
          <p className="text-xl text-foreground/80">
            The many faces of $FEED
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative group aspect-square rounded-xl overflow-hidden border border-primary/20 bg-card/30 backdrop-blur-sm cursor-pointer"
            >
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              <img 
                src={src} 
                alt={`Feed the Frog ${idx + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-xl transition-colors duration-300 z-20 shadow-[inset_0_0_20px_rgba(0,255,65,0)] group-hover:shadow-[inset_0_0_20px_rgba(0,255,65,0.3)]"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
