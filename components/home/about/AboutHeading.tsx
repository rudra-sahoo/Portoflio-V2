import { useEffect, useRef } from 'react';
import anime from 'animejs';
import styles from './about.module.scss';

export const AboutHeading = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!headingRef.current) return;
    
    anime({
      targets: '.about-heading-letter',
      opacity: [0, 1],
      translateY: [50, 0],
      rotate: [-8, 0],
      delay: anime.stagger(80),
      easing: 'easeOutExpo'
    });
    
    anime({
      targets: '.heading-underline',
      scaleX: [0, 1],
      duration: 800,
      delay: 700,
      easing: 'easeOutExpo'
    });
  }, []);
  
  return (
    <div className={styles.customHeading} ref={headingRef}>
      <h2 className={styles.headingText}>
        {"About Me".split('').map((letter, index) => (
          <span 
            key={index} 
            className={`about-heading-letter ${letter === ' ' ? styles.space : ''}`}
          >
            {letter}
          </span>
        ))}
      </h2>
      <div className={`${styles.headingUnderline} heading-underline`}></div>
    </div>
  );
};