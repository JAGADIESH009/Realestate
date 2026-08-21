import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function FeaturedProperties() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const detailY = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"]);

  return (
    <section 
      ref={containerRef} 
      id="properties" 
      className="py-24 md:py-32 lg:py-48 bg-forest-charcoal text-warm-ivory relative z-20"
    >
      <div className="container mx-auto px-6 md:px-12 xl:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: 60% Image */}
          <div className="lg:col-span-7 relative" data-cursor="image">
            <motion.div 
              className="w-full relative aspect-[4/3] lg:aspect-[4/5] overflow-hidden bg-dark-walnut"
              initial={{ clipPath: "inset(20% 0% 0% 0%)", opacity: 0 }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
              viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Proper Architectural Grading Layers */}
              <div className="absolute inset-0 bg-forest-charcoal/30 mix-blend-multiply z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-warm-limestone/5 mix-blend-screen z-10 pointer-events-none" />

              {/* Main Image */}
              <motion.img 
                style={{ y: (shouldReduceMotion || isMobile) ? 0 : imageY }}
                initial={{ scale: 1.04 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                src="/luxury_hero_bg.webp" 
                alt="Premium architectural property"
                className="w-full h-full object-cover opacity-95 saturate-[0.9] contrast-[1.1] transition-transform duration-[1.5s] ease-out hover:scale-[1.02]"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
              />
            </motion.div>

            {/* Overlapping Detail Image (Bottom Right) */}
            <motion.div
              style={{ y: (shouldReduceMotion || isMobile) ? 0 : detailY }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
              transition={{ duration: 1, delay: 0.4 }}
              className="absolute -bottom-8 -right-4 lg:-bottom-16 lg:-right-12 w-1/3 max-w-[200px] aspect-square bg-forest-charcoal p-2 shadow-2xl z-20 hidden md:block"
            >
              <div className="absolute inset-0 bg-forest-charcoal/20 mix-blend-multiply z-10 pointer-events-none" />
              <img 
                src="/luxury_hero_bg.webp" 
                alt="Architectural material detail" 
                className="w-full h-full object-cover saturate-[0.85] contrast-125"
              />
            </motion.div>
          </div>

          {/* RIGHT: 40% Text Content */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
              transition={{ duration: 0.8 }}
              className="block font-sans text-xs tracking-[0.3em] text-warm-ivory/50 uppercase mb-8 lg:mb-12"
            >
              05 — Property Collection
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-warm-ivory uppercase tracking-wide leading-[1.05] mb-8 lg:mb-12"
            >
              Places<br />With<br />Potential.
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-sm md:text-base leading-relaxed text-warm-ivory/70 max-w-sm mb-12 lg:mb-16"
            >
              Property opportunities selected with location, quality and long-term value in mind.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="cta"
            >
              <a 
                href="#contact"
                className="group inline-flex items-center space-x-4 border-b border-warm-ivory/30 pb-4 font-sans text-xs tracking-widest text-warm-ivory uppercase transition-colors duration-500 hover:border-muted-clay hover:text-muted-clay"
              >
                <span>Explore Opportunities</span>
                <span className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-2">
                  →
                </span>
              </a>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
