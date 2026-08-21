import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const services = [
  {
    id: "01",
    title: "Property Sales",
    description: "Curated portfolio of premium residential and commercial spaces across Hyderabad.",
  },
  {
    id: "02",
    title: "Property Consulting",
    description: "Strategic advice on market positioning, valuation, and architectural potential.",
  },
  {
    id: "03",
    title: "Investment",
    description: "Identifying high-yield opportunities in emerging and established neighborhoods.",
  },
  {
    id: "04",
    title: "Property Sourcing",
    description: "Discrete acquisition of off-market properties tailored to exact specifications.",
  }
];

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <section id="services" ref={containerRef} className="py-32 md:py-48 bg-forest-charcoal text-warm-ivory z-20 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 xl:px-16">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 md:mb-32">
          <motion.div 
            style={{ opacity, y: (shouldReduceMotion || isMobile) ? 0 : y }}
            className="flex flex-col"
          >
            <span className="block font-sans text-xs tracking-[0.3em] text-warm-ivory/50 uppercase mb-8">
              02 — Expertise
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-warm-ivory uppercase">
              What We Do.
            </h2>
          </motion.div>
          
          <motion.p 
            style={{ opacity }}
            className="font-sans text-sm text-warm-ivory/60 font-light leading-relaxed max-w-sm mt-8 md:mt-0"
          >
            A comprehensive suite of real estate services designed for those who demand excellence in every transaction.
          </motion.p>
        </div>

        {/* Interactive Services List (Editorial Index) */}
        <div className="w-full flex flex-col border-t border-warm-ivory/10">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: isMobile ? "-20px" : "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col md:flex-row items-start md:items-center py-12 md:py-16 border-b border-warm-ivory/10 transition-colors duration-[0.8s] ease-[0.16,1,0.3,1] hover:bg-dark-walnut"
              data-cursor="cta"
            >
              
              {/* Number */}
              <div className="md:w-1/6 mb-4 md:mb-0 md:pl-8">
                <span className="font-serif text-2xl text-warm-ivory/30 transition-all duration-[0.8s] ease-[0.16,1,0.3,1] group-hover:text-muted-clay group-hover:-translate-y-2 inline-block">
                  {service.id}
                </span>
              </div>
              
              {/* Content */}
              <div className="flex-1 md:w-2/6 relative z-10 transition-transform duration-[0.8s] ease-[0.16,1,0.3,1] group-hover:translate-x-4 md:pl-0 pl-2">
                <h3 className="font-sans text-xl md:text-3xl tracking-[0.1em] text-warm-ivory transition-all duration-[0.8s]">
                  {service.title}
                </h3>
              </div>

              <div className="md:w-3/6 mt-4 md:mt-0 relative z-10 transition-transform duration-[0.8s] ease-[0.16,1,0.3,1] group-hover:translate-x-6 md:pl-0 pl-2 pr-8">
                <p className="font-sans text-sm text-warm-ivory/50 font-light leading-relaxed max-w-sm transition-colors duration-500 group-hover:text-warm-ivory/80">
                  {service.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center overflow-hidden opacity-0 -translate-x-8 transition-all duration-[0.8s] ease-[0.16,1,0.3,1] group-hover:opacity-100 group-hover:translate-x-0">
                <span className="text-muted-clay text-2xl font-light">→</span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
