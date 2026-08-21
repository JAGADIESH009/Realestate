import { useEffect, useRef } from 'react';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Approach from './components/Approach';
import FeaturedProperties from './components/FeaturedProperties';
import AIAssistant from './components/AIAssistant/AIAssistant';
import AboutCompany from './components/AboutCompany';
import Services from './components/Services';
import Location from './components/Location';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll behavior for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-forest min-h-screen font-sans text-ivory overflow-x-hidden">
      
      <CustomCursor />
      
      {/* 
        The entire entrance animation choreography (Brand Reveal -> Nav -> Headline) 
        is hardwired into the initial render of Navigation and Hero components.
      */}
      <Navigation />
      
      <main ref={scrollContainerRef} className="relative w-full">
        <Hero />
        
        {/* Everything after Hero sits in a relatively positioned wrapper that scrolls over the sticky Hero */}
        <div className="relative z-10 bg-forest w-full shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <Approach />
          <Services />
          <FeaturedProperties />
          <AboutCompany />
          <Location />
          <CTASection />
          <Footer />
          <AIAssistant />
        </div>
      </main>
      
    </div>
  );
}

export default App;
