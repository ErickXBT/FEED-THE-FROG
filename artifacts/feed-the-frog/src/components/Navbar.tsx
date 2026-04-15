import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";

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
    { name: "What is FEED", href: "#what-is-feed" },
    { name: "Game", href: "#game" },
    { name: "Gallery", href: "#gallery" },
    { name: "Tokenomics", href: "#tokenomics" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "Community", href: "#community" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-primary/20 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 z-50">
          <img src="https://i.imgur.com/MR7IhDd.png" alt="FEED Logo" className="w-10 h-10 object-contain" />
          <span className="font-orbitron font-bold text-xl tracking-wider text-white">
            FEED THE <span className="text-primary">FROG</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#buy"
            className="ml-4 px-6 py-2 bg-transparent border-2 border-primary text-primary font-orbitron font-bold uppercase tracking-widest rounded animate-pulse-glow hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Buy $FEED
          </a>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="lg:hidden text-primary z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Nav */}
        <div
          className={`fixed inset-0 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-transform duration-300 lg:hidden ${
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider font-orbitron"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#buy"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 px-8 py-3 bg-transparent border-2 border-primary text-primary font-orbitron font-bold uppercase tracking-widest rounded animate-pulse-glow"
          >
            Buy $FEED
          </a>
        </div>
      </div>
    </header>
  );
}
