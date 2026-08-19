import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Only initialize on desktop / fine pointers
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Track mouse position
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentState = 'default'; // 'nav', 'cta', 'image', 'default'

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updateCursor = () => {
      // Offset cursor by 15px so it doesn't block the native pointer
      cursor.style.transform = `translate3d(${mouseX + 15}px, ${mouseY + 15}px, 0)`;
      requestAnimationFrame(updateCursor);
    };

    // Fast state change logic (no react renders)
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorState = target.closest('[data-cursor]')?.getAttribute('data-cursor');

      if (cursorState === 'nav' && currentState !== 'nav') {
        currentState = 'nav';
        cursor.className = 'fixed top-0 left-0 w-1.5 h-1.5 bg-warm-ivory rotate-45 pointer-events-none z-[100] transition-all duration-150';
      } else if (cursorState === 'cta' && currentState !== 'cta') {
        currentState = 'cta';
        cursor.className = 'fixed top-0 left-0 w-3 h-3 border border-warm-ivory bg-transparent pointer-events-none z-[100] transition-all duration-150';
      } else if (cursorState === 'image' && currentState !== 'image') {
        currentState = 'image';
        // Chevron shape
        cursor.className = 'fixed top-0 left-0 w-4 h-4 border-r border-b border-warm-ivory -rotate-45 pointer-events-none z-[100] transition-all duration-150';
      } else if (!cursorState && currentState !== 'default') {
        currentState = 'default';
        // Diamond default
        cursor.className = 'fixed top-0 left-0 w-2.5 h-2.5 bg-warm-ivory rotate-45 pointer-events-none z-[100] transition-all duration-150';
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    
    const rafId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="hidden md:block fixed top-0 left-0 w-2.5 h-2.5 bg-warm-ivory rotate-45 pointer-events-none z-[100] transition-all duration-150"
      style={{ willChange: 'transform' }}
    />
  );
}
