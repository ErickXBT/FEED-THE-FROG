import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Game", href: "#game" },
    { name: "Tokenomics", href: "#tokenomics" },
    { name: "Community", href: "#community" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/70 backdrop-blur-md border-b border-primary/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 z-50">
          <img src="https://i.imgur.com/MR7IhDd.png" alt="FEED Logo" className="w-9 h-9 object-contain" />
          <span className="font-orbitron font-bold text-base tracking-widest text-white">
            FEED <span className="text-primary">THE FROG</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/60 hover:text-primary transition-colors uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <a
          href="#buy"
          className="hidden md:inline-flex px-5 py-2 border border-primary text-primary font-orbitron font-bold text-sm uppercase tracking-widest rounded hover:bg-primary hover:text-black transition-all duration-200"
        >
          Buy $FEED
        </a>

        <button
          className="md:hidden text-primary z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={`fixed inset-0 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden ${
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-medium text-foreground/70 hover:text-primary transition-colors uppercase tracking-widest font-orbitron"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#buy"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 px-8 py-3 border border-primary text-primary font-orbitron font-bold text-lg uppercase tracking-widest rounded hover:bg-primary hover:text-black transition-all"
          >
            Buy $FEED
          </a>
        </div>
      </div>
    </header>
  );
}
