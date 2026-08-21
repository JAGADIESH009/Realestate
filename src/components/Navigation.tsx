import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Properties', href: '#properties' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-700 ease-[0.16,1,0.3,1] ${
          scrolled ? 'py-4 bg-forest-charcoal/95 backdrop-blur-md border-b border-warm-ivory/5 shadow-sm' : 'pt-12 pb-8 bg-gradient-to-b from-forest-charcoal/80 to-transparent border-b border-transparent'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 xl:px-16 flex justify-between items-center">
          
          {/* LEFT: Logo (Fades in exactly as full-screen Intro fades out) */}
          <div className="flex flex-col cursor-pointer" onClick={() => window.scrollTo(0,0)} data-cursor="nav">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.80, duration: 0.5, ease: "easeOut" }}
              className="font-serif text-lg md:text-xl tracking-widest text-warm-ivory uppercase leading-none"
            >
              Sai Gaurav
            </motion.span>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.80, duration: 0.5, ease: "easeOut" }}
              className="font-sans text-xs tracking-[0.3em] text-muted-sage uppercase mt-1"
            >
              Real Estate
            </motion.span>
          </div>

          {/* CENTER: Desktop Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.95, duration: 0.8, ease: "easeOut" }}
            className="hidden md:flex space-x-10"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                data-cursor="nav"
                className="font-sans text-xs tracking-widest text-warm-ivory/90 uppercase hover:text-muted-sage transition-colors duration-300 relative group overflow-hidden"
              >
                <span className="relative z-10">{link.name}</span>
              </a>
            ))}
          </motion.div>

          {/* RIGHT: CTA (Desktop) / Hamburger (Mobile) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.95, duration: 0.8, ease: "easeOut" }}
            className="flex items-center"
          >
            <a 
              href="#contact"
              data-cursor="cta"
              className="hidden md:flex items-center space-x-2 font-sans text-xs tracking-widest text-warm-ivory uppercase hover:text-muted-sage transition-colors duration-300 group"
            >
              <span>Let's Talk</span>
              <span className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-1" aria-hidden="true">→</span>
            </a>
            
            {/* Mobile Toggle */}
            <button 
              className="md:hidden flex flex-col justify-center items-end w-8 h-8 space-y-1.5 focus:outline-none"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <span className="block w-full h-[1px] bg-warm-ivory" />
              <span className="block w-2/3 h-[1px] bg-warm-ivory" />
            </button>
          </motion.div>

        </div>
      </nav>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-forest-charcoal flex flex-col justify-center px-8"
          >
            <div className="absolute top-6 right-6">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-warm-ivory font-sans text-xs tracking-widest uppercase p-4"
              >
                Close
              </button>
            </div>
            
            <div className="flex flex-col space-y-8 mt-12">
              <span className="font-serif text-sm tracking-[0.3em] text-muted-sage uppercase mb-4">Menu</span>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                  className="font-serif text-4xl text-warm-ivory uppercase"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="font-serif text-4xl text-muted-sage uppercase mt-4"
              >
                Let's Talk
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
