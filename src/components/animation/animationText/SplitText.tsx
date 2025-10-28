"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "center" | "right";
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 0,
  duration = 0.5,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.2,
  rootMargin = "0px",
  textAlign = "left",
  onLetterAnimationComplete
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // Divide el texto en letras o palabras
    const parts =
      splitType === "chars"
        ? text.split("")
        : text.split(" ").map((word) => word + " ");

    element.innerHTML = parts
      .map(
        (part) =>
          `<span class="split-letter" style="display:inline-block">${part}</span>`
      )
      .join("");

    const letters = element.querySelectorAll(".split-letter");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              letters,
              { ...from },
              {
                ...to,
                ease,
                duration,
                delay: delay / 1000,
                stagger: 0.05,
                onComplete: onLetterAnimationComplete
              }
            );
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [
    text,
    delay,
    duration,
    ease,
    splitType,
    from,
    to,
    threshold,
    rootMargin,
    onLetterAnimationComplete
  ]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ textAlign }}
    ></div>
  );
};

export default SplitText;
