import { FaXTwitter, FaTelegram } from "react-icons/fa6";

export function Footer() {
  const navLinks = [
    { name: "About", href: "#about" },
    { name: "What is FEED", href: "#what-is-feed" },
    { name: "Game", href: "#game" },
    { name: "Gallery", href: "#gallery" },
    { name: "Tokenomics", href: "#tokenomics" },
    { name: "Roadmap", href: "#roadmap" },
  ];

  return (
    <footer className="bg-background border-t border-primary/30 pt-16 pb-8 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          
          <div className="flex items-center gap-4">
            <img src="https://i.imgur.com/MR7IhDd.png" alt="FEED Logo" className="w-12 h-12 object-contain" />
            <span className="font-orbitron font-bold text-2xl tracking-widest text-white">
              FEED THE <span className="text-primary">FROG</span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="p-3 bg-card rounded-full border border-primary/20 hover:border-primary hover:text-primary transition-colors text-white">
              <FaXTwitter size={20} />
            </a>
            <a href="#" className="p-3 bg-card rounded-full border border-primary/20 hover:border-primary hover:text-primary transition-colors text-white">
              <FaTelegram size={20} />
            </a>
          </div>

        </div>

        <div className="border-t border-primary/10 pt-8 flex flex-col items-center text-center max-w-3xl mx-auto">
          <p className="text-sm text-foreground/50 mb-4 uppercase tracking-widest">
            Not financial advice. Feed the frog at your own risk. $FEED is a meme coin with no intrinsic value.
          </p>
          <p className="text-xs text-foreground/40 font-orbitron">
            © 2024 FEED THE FROG. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
