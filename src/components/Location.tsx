import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function Location() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="location" ref={containerRef} className="py-24 md:py-32 lg:py-48 bg-warm-ivory text-forest-charcoal relative z-20 overflow-hidden border-t border-forest-charcoal/10">
      <div className="container mx-auto px-6 md:px-12 xl:px-16">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-24 items-center">
          
          {/* Left Column - Image Container (Map/Grid inspired) */}
          <div className="flex-1 w-full order-2 md:order-1 min-w-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[4/3] md:aspect-square bg-smoked-stone overflow-hidden border border-forest-charcoal/10"
              data-cursor="image"
            >
              {/* Grid overlay for architectural feel */}
              <div className="absolute inset-0 z-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(23,32,29,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(23,32,29,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              
              <div className="absolute inset-0 bg-forest-charcoal/40 mix-blend-multiply z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-warm-limestone/10 mix-blend-screen z-10 pointer-events-none" />
              
              <motion.div
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1.0 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="w-full h-full relative"
              >
                {/* Subtle grain overlay */}
                <div className="absolute inset-0 z-10 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
                
                <motion.img 
                  style={{ y: (shouldReduceMotion || isMobile) ? 0 : imageY }}
                  src="/luxury_hero_bg.webp" 
                  alt="Hyderabad architectural context"
                  className="w-full h-full object-cover scale-[1.1] opacity-95 saturate-[0.85] contrast-[1.15]"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </motion.div>
              
              {/* Marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center">
                <div className="w-3 h-3 bg-muted-clay rounded-full shadow-[0_0_15px_rgba(139,109,88,0.5)]" />
                <div className="absolute w-12 h-12 border border-muted-clay/40 rounded-full animate-ping" />
              </div>
            </motion.div>
          </div>

          {/* Right Column - Text & Address */}
          <div className="flex-1 w-full max-w-xl order-1 md:order-2 min-w-0">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
              transition={{ staggerChildren: 0.15 }}
              className="w-full"
            >
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="block font-sans text-xs tracking-[0.3em] text-forest-charcoal/50 uppercase mb-8"
              >
                06 — Location
              </motion.span>
              
              {/* Responsive Clamp Typography */}
              <motion.h2 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="font-serif text-[clamp(2.25rem,6vw,4rem)] leading-[1.05] text-forest-charcoal uppercase mb-12 flex flex-col tracking-wide break-words hyphens-auto"
              >
                <span>Quthbullapur</span>
                <span className="text-forest-charcoal/60 italic font-light">Hyderabad</span>
              </motion.h2>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 } }
                }}
                className="border-l border-forest-charcoal/20 pl-6 md:pl-8 mb-12"
              >
                <address className="not-italic font-sans text-sm md:text-base text-forest-charcoal/70 font-light leading-loose flex flex-col space-y-1 break-words">
                  <span>Plot No. 89, House No. 8-354/7</span>
                  <span>Near Hanuman Temple</span>
                  <span>MN Reddy Nagar, Phase 2</span>
                  <span>Quthbullapur, Hyderabad – 500055</span>
                  <span>Telangana</span>
                </address>
              </motion.div>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 } }
                }}
                data-cursor="cta"
              >
                <a 
                  href="https://maps.google.com/?q=Sai+Gaurav+Real+Estate+Quthbullapur+Hyderabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center space-x-4 border border-forest-charcoal/20 px-6 md:px-8 py-4 font-sans text-xs tracking-[0.2em] text-forest-charcoal uppercase transition-all duration-300 hover:border-muted-clay hover:text-muted-clay bg-transparent"
                >
                  <span>Get Directions</span>
                  <motion.span 
                    className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-2"
                  >
                    →
                  </motion.span>
                </a>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
