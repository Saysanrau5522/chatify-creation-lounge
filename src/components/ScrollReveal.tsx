
import React, { useEffect, useRef, useState } from 'react';
import { cn } from "@/lib/utils";

type AnimationType = 'fade-in' | 'slide-up' | 'slide-down' | 'scale-up' | 'scale-down' | 'blur';

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  threshold?: number;
  once?: boolean;
}

const ScrollReveal = ({
  children,
  animation = 'fade-in',
  delay = 0,
  threshold = 0.1,
  once = true,
  className,
  ...props
}: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once]);

  // Generate the style based on the delay prop
  const delayStyle = delay ? { animationDelay: `${delay}ms` } : {};

  return (
    <div
      ref={ref}
      className={cn(
        isVisible ? `animate-${animation}` : 'opacity-0',
        className
      )}
      style={delayStyle}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
