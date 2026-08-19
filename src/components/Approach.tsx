import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function Approach() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  return (
    <section id="about" ref={containerRef} className="py-24 md:py-32 lg:py-48 bg-warm-ivory text-forest-charcoal relative z-20 overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 xl:px-16">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          
          {/* Thin Architectural Line connecting text and image */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="hidden lg:block absolute top-16 left-[40%] w-[20%] h-[1px] bg-forest-charcoal/20 origin-left z-0"
          />

          {/* Left Column - Typography */}
          <div className="lg:w-5/12 flex flex-col pt-12 z-10">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
              transition={{ staggerChildren: 0.15 }}
            >
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="block font-sans text-[0.65rem] tracking-[0.3em] text-forest-charcoal/50 uppercase mb-10"
              >
                01 — Our Approach
              </motion.span>
              
              <motion.h2 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="font-serif text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-forest-charcoal uppercase mb-12 max-w-md"
              >
                Real Estate, <br/>
                <span className="italic font-light text-forest-charcoal/80">With a Different</span> <br/>
                Perspective.
              </motion.h2>
              
              <div className="space-y-6 font-sans text-sm md:text-base text-forest-charcoal/70 font-light leading-relaxed max-w-sm">
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                  }}
                >
                  Sai Gaurav operates at the intersection of design appreciation and rigorous market analysis. We do not merely broker transactions; we align discerning clients with properties of enduring value.
                </motion.p>
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                  }}
                >
                  Rooted in Quthbullapur, Hyderabad, our legacy is built on discretion, execution, and an uncompromising standard for quality.
                </motion.p>
              </div>

            </motion.div>
          </div>

          {/* Right Column - Large Asymmetrical Image */}
          <div className="lg:w-7/12 flex justify-end z-10">
            <motion.div 
              className="w-full lg:w-[90%] relative aspect-[4/5] overflow-hidden bg-forest-charcoal"
              initial={{ clipPath: "inset(20% 0% 0% 0%)", opacity: 0 }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
              viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="image"
            >
              {/* Proper Architectural Grading Layers */}
              <div className="absolute inset-0 bg-forest-charcoal/50 mix-blend-multiply z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-warm-limestone/10 mix-blend-screen z-10 pointer-events-none" />
              
              <motion.img 
                style={{ y: (shouldReduceMotion || isMobile) ? 0 : imageY }}
                src="/about_architecture.jpg" 
                alt="Architectural details"
                className="w-full h-full object-cover scale-[1.1] opacity-95 saturate-[0.85] contrast-[1.1]"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
