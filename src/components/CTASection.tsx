import { motion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function CTASection() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section id="contact" className="relative h-[80vh] min-h-[600px] bg-forest-charcoal text-warm-ivory z-20 overflow-hidden flex flex-col justify-center">
      
      {/* 
        ONE CONTROLLED ENTRANCE.
        The entire section is wrapped in a single whileInView trigger 
        so the image and text enter together as one component.
      */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
        className="absolute inset-0 w-full h-full flex flex-col justify-center items-center"
      >
        
        {/* Cinematic Architectural Image Background (0.1s reveal) */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden" data-cursor="image">
          <motion.img 
            variants={{
              hidden: { scale: 1.04, opacity: 0 },
              show: { scale: 1, opacity: 0.9, transition: { duration: 1.5, delay: 0.1, ease: "easeOut" } }
            }}
            src="/final_cta_architecture.jpg"
            alt="Sophisticated modern property at dusk"
            className="w-full h-full object-cover contrast-[1.1] saturate-[0.85]"
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
          
          {/* Shadow enhancement: Deep Forest Multiply */}
          <div className="absolute inset-0 bg-forest-charcoal/60 mix-blend-multiply pointer-events-none" />
          
          {/* Highlight enhancement: Warm Limestone Screen */}
          <div className="absolute inset-0 bg-warm-limestone/10 mix-blend-screen pointer-events-none" />

          {/* Localized gradient for text legibility (bottom heavy) */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-charcoal via-forest-charcoal/80 to-forest-charcoal/10 pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-6 md:px-12 xl:px-16 relative z-10 text-center flex flex-col items-center pt-24 md:pt-32">
          
          {/* 3. SAI GAURAV REAL ESTATE (0.4s reveal) */}
          <motion.span 
            variants={{
              hidden: { opacity: 0, y: 15 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="font-sans text-xs tracking-[0.3em] text-warm-ivory/80 uppercase mb-4"
          >
            Sai Gaurav Real Estate
          </motion.span>
          
          {/* 4. FINAL HEADING (0.6s reveal) */}
          <motion.h2 
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] text-warm-ivory uppercase mb-6 max-w-4xl"
          >
            Find Your Next Address.
          </motion.h2>

          {/* Location Metadata (0.7s reveal) */}
          <motion.span 
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="font-sans text-xs tracking-widest text-muted-clay uppercase mb-12"
          >
            Quthbullapur · Hyderabad
          </motion.span>

          {/* 5. CTA (0.8s reveal) */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            data-cursor="cta"
          >
            <a 
              href="#contact"
              className="group inline-flex items-center space-x-4 border border-warm-ivory/20 px-8 py-5 font-sans text-xs tracking-widest text-warm-ivory uppercase transition-all duration-500 hover:border-muted-clay hover:text-muted-clay bg-forest-charcoal/40 backdrop-blur-sm"
            >
              <span>Let's Talk</span>
              <span className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-2">
                →
              </span>
            </a>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
