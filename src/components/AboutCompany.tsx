import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function AboutCompany() {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section ref={containerRef} className="py-24 md:py-32 lg:py-48 bg-forest-charcoal text-warm-ivory relative z-20 border-t border-warm-ivory/5">
      <div className="container mx-auto px-6 md:px-12 xl:px-16 relative z-10 h-full flex flex-col justify-center">
        
        {/* UPPER LEFT: 0.1 */}
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="block font-sans text-xs tracking-[0.3em] text-warm-ivory/50 uppercase mb-12 lg:mb-24 text-center lg:text-left"
        >
          04 — Experience
        </motion.span>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* CENTER / LOWER: Massive 32 (Col 1-7) - 0.2 */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-start">
            {/* Very thin architectural line passing behind */}
            <div className="absolute top-1/2 left-0 w-[150%] h-[1px] bg-warm-limestone/5 -translate-y-1/2 -z-10 hidden lg:block" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
              transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(10rem,20vw,20rem)] leading-[0.75] font-serif text-warm-ivory/15 select-none tracking-tighter"
            >
              32
            </motion.div>
          </div>
          
          {/* RIGHT SIDE TEXT (Col 8-12) */}
          <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left mt-8 lg:mt-12">
            {/* 0.45 */}
            <motion.h3 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl md:text-5xl lg:text-6xl text-warm-ivory tracking-[0.1em] leading-[1.1] mb-6 lg:mb-8"
            >
              Years in <br className="hidden lg:block"/> Business
            </motion.h3>
            
            {/* 0.6 */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-sm md:text-base leading-relaxed text-warm-ivory/70 max-w-sm mx-auto lg:mx-0 mb-12 lg:mb-16"
            >
              Three decades of experience in real estate, construction and property development.
            </motion.p>
            
            {/* 0.75 */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
              transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center lg:items-start"
            >
              <div className="w-8 h-[1px] bg-muted-clay mb-6 hidden lg:block" />
              <span className="font-sans text-xs tracking-[0.2em] text-warm-ivory/50 uppercase leading-loose">
                Sai Gaurav Real Estate <br className="lg:hidden" />
                <span className="hidden lg:inline"> · </span>Quthbullapur · Hyderabad
              </span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
