import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    // Only apply smooth scroll on desktop viewports to preserve native high-performance mobile scrolling
    if (window.innerWidth < 1024) return;

    // Dynamically override native smooth scroll to prevent rendering conflicts with linear interpolation
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';

    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let isAnimated = false;
    const lerpStrength = 0.075; // Optimal HSL/Lenis interpolation stiffness

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetScrollY += e.deltaY;
      
      // Enforce viewport page boundaries
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScrollY = Math.max(0, Math.min(targetScrollY, maxScroll));

      if (!isAnimated) {
        isAnimated = true;
        requestAnimationFrame(updateScroll);
      }
    };

    const updateScroll = () => {
      const diff = targetScrollY - currentScrollY;
      currentScrollY += diff * lerpStrength;

      window.scrollTo(0, currentScrollY);

      // Continue animating if the delta is significant
      if (Math.abs(diff) > 0.3) {
        requestAnimationFrame(updateScroll);
      } else {
        currentScrollY = targetScrollY;
        isAnimated = false;
      }
    };

    // Keep state values in sync if user manually drags the browser scrollbar or uses arrow keys
    const handleScroll = () => {
      if (!isAnimated) {
        targetScrollY = window.scrollY;
        currentScrollY = window.scrollY;
      }
    };

    // Smooth scroll for anchor links using the same lerp animation loop
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          const targetId = href.slice(1);
          const element = document.getElementById(targetId);
          if (element) {
            e.preventDefault();
            const rect = element.getBoundingClientRect();
            targetScrollY = window.scrollY + rect.top;

            // Enforce viewport page boundaries
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            targetScrollY = Math.max(0, Math.min(targetScrollY, maxScroll));

            if (!isAnimated) {
              isAnimated = true;
              requestAnimationFrame(updateScroll);
            }
          }
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleAnchorClick);
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    };
  }, []);

  return null;
}
