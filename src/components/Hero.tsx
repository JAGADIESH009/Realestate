import { motion, type Variants } from 'framer-motion';

export default function Hero() {
  const lineRevealVariants: Variants = {
    hidden: { y: "110%", opacity: 0 },
    show: { 
      y: "0%",
      opacity: 1,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as const }
    },
  };

  return (
    <section className="relative w-full h-[100svh] overflow-hidden flex flex-col justify-between bg-forest-charcoal z-0">
      
      {/* Intro Brand Overlay (Plays once on reload deterministically) */}
      <motion.div 
        className="absolute inset-0 z-[100] flex flex-col justify-center items-center pointer-events-none bg-forest-charcoal"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 1.5, duration: 0.8, ease: "easeInOut" }}
      >
        <motion.span 
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.10, duration: 0.4, ease: "easeOut" }}
          className="font-serif text-4xl md:text-5xl lg:text-7xl text-warm-ivory uppercase tracking-[0.2em] leading-none drop-shadow-xl"
        >
          Sai Gaurav
        </motion.span>
        <motion.span 
          initial={{ opacity: 0, scale: 0.98, y: 5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.30, duration: 0.3, ease: "easeOut" }}
          className="font-sans text-xs md:text-sm tracking-[0.5em] text-muted-sage uppercase mt-6 drop-shadow-md"
        >
          Real Estate
        </motion.span>
      </motion.div>

      {/* Image Background */}
      <div className="absolute inset-0 w-full h-full z-0 bg-forest-charcoal">
        <img
          src="/sai-gaurav-hero.webp"
          alt="Premium Real Estate"
          className="w-full h-full object-cover object-[85%_center] md:object-[75%_center] lg:object-center saturate-[0.85] contrast-[1.1]"
        />
        
        {/* Subtle deep forest / cinematic contrast grade */}
        <div className="absolute inset-0 bg-forest-charcoal/30 mix-blend-multiply pointer-events-none" />
        
        {/* TEXT SAFE ZONE: Localized dark-green gradient in bottom-left/center for headline legibility */}
        <div className="absolute bottom-0 left-0 w-full h-[70%] bg-gradient-to-t from-forest-charcoal/90 via-forest-charcoal/40 to-transparent pointer-events-none" />
        
        {/* Slight brightness reduction in the text area */}
        <div className="absolute bottom-0 left-0 w-full h-[50%] bg-black/10 pointer-events-none" />
      </div>

      {/* Main Content Area - Moved lower to create clear hierarchy away from navigation */}
      <div className="container relative z-10 mx-auto px-6 md:px-12 xl:px-16 flex flex-col justify-end h-full pointer-events-none pb-12 pt-48 md:pt-64">
        
        {/* CENTER CONTENT */}
        <div className="flex flex-col justify-end flex-1 max-w-4xl pb-8 md:pb-16">
          <h1 className="font-serif text-[clamp(1.75rem,3.5vw,3.5rem)] leading-[1.05] text-warm-ivory mb-6 md:mb-8 uppercase flex flex-col pointer-events-auto drop-shadow-lg">
            <span className="overflow-hidden pb-1">
              <motion.span initial="hidden" animate="show" variants={lineRevealVariants} transition={{ delay: 1.80 }} className="block">
                Premium
              </motion.span>
            </span>
            <span className="overflow-hidden pb-1">
              <motion.span initial="hidden" animate="show" variants={lineRevealVariants} transition={{ delay: 1.90 }} className="block italic font-light text-warm-ivory/90">
                Real Estate.
              </motion.span>
            </span>
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.10, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-sm md:text-base text-warm-ivory/80 font-light max-w-md leading-relaxed mb-10 drop-shadow-md pointer-events-auto"
          >
            Property opportunities selected with location, quality and long-term value in mind.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.20, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-start pointer-events-auto"
          >
            <a 
              href="#properties"
              data-cursor="cta"
              className="group inline-flex items-center space-x-3 bg-warm-ivory/10 backdrop-blur-sm border border-warm-ivory/40 px-8 py-4 font-sans text-xs tracking-widest transition-all duration-500 hover:bg-warm-ivory hover:text-forest-charcoal text-warm-ivory"
            >
              <span>Explore Collection</span>
            </a>
          </motion.div>
        </div>

        {/* BOTTOM CONTENT */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
          className="flex justify-between items-end w-full pb-4"
        >
          <span className="font-sans text-xs tracking-[0.2em] text-warm-ivory/50 uppercase">
            Quthbullapur · Hyderabad
          </span>
          <div className="flex flex-col items-center space-y-2">
            <span className="font-sans text-xs tracking-widest text-warm-ivory/50 uppercase rotate-90 origin-right translate-x-3">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-warm-ivory/40 to-transparent" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
