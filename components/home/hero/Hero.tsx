import { Reveal } from "@/components/utils/Reveal"; 
import styles from "./hero.module.scss";
import ReactTypingEffect from 'react-typing-effect';
import Image from "next/image";
import { BsChevronDown } from "react-icons/bs";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create particles
    const particlesArray: any[] = [];
    const numberOfParticles = 50;
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        // Add null checks for canvas
        this.x = Math.random() * (canvas?.width ?? window.innerWidth);
        this.y = Math.random() * (canvas?.height ?? window.innerHeight);
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.1})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Add null checks for canvas dimensions
        const width = canvas?.width ?? window.innerWidth;
        const height = canvas?.height ?? window.innerHeight;
        
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };
    
    init();
    
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={styles.particleCanvas}
    />
  );
};

export const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };
  
  // Mouse parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  
  // Remove or comment out these lines in the Hero component
  /*
  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      setMousePosition({ x, y });
    }
  };
  */
  
  // Update the image container motion div
  <motion.div 
    className={styles.imageContainer}
    whileHover={{ 
      scale: 1.05,
      rotateX: 10,
      rotateY: 10,
      transition: { duration: 0.3 }
    }}
    initial={{ scale: 1, rotateX: 0, rotateY: 0 }}
  >
    <Reveal>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      >
        <Image 
          src="/IMG_8178.jpg" 
          alt="Rudra Sahoo" 
          width={300} 
          height={300}
          className={styles.profileImage}
        />
      </motion.div>
    </Reveal>
  </motion.div>
  
  // Motion values for smooth animation
  const x = useSpring(useMotionValue(0), { stiffness: 400, damping: 90 });
  const y = useSpring(useMotionValue(0), { stiffness: 400, damping: 90 });
  
  // Transform mouse position to rotation values
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);
  
  // Update motion values when mouse position changes
  if (mousePosition.x !== x.get()) x.set(mousePosition.x);
  if (mousePosition.y !== y.get()) y.set(mousePosition.y);

  return (
    <section 
      className={`section-wrapper ${styles.hero}`}
      ref={containerRef} 
    >
      <ParticleBackground />
      <div className={styles.heroContent}>
        <div className={styles.copyWrapper}>
          <motion.div 
            className={styles.imageContainer}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              perspective: 1000
            }}
            whileHover={{ scale: 1.02 }} // Reduced scale value
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Reveal>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              >
                <Image 
                  src="/IMG_8178.jpg" 
                  alt="Rudra Sahoo" 
                  width={300} 
                  height={300}
                  className={styles.profileImage}
                  style={{ transform: "translateZ(20px)" }}
                />
              </motion.div>
            </Reveal>
          </motion.div>
          
          <Reveal>
            <motion.h1 
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Hey, I&apos;m Rudra<motion.span
                animate={{ 
                  color: ["#05c2c9", "#4731b6", "#05c2c9"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >.</motion.span>
            </motion.h1>
          </Reveal>
          <Reveal>
            <motion.h2 
              className={styles.subTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              I&apos;m a <span><ReactTypingEffect
                text={[
                  "Full Stack Developer.",
                  "Startup Enthusiast.",
                  "DevOps Engineer.",
                  "Creative Problem Solver.",
                  "Tech Innovator."
                ]}
                speed={40}
                eraseSpeed={40}
                eraseDelay={900}
                typingDelay={300}
              /></span>
            </motion.h2>
          </Reveal>
          {/* Removed Contact Me button section */}
        </div>
      </div>
      <motion.div 
        className={styles.scrollIndicator} 
        onClick={scrollToAbout}
        whileHover={{ scale: 1.1, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <BsChevronDown />
        <span>Scroll down</span>
      </motion.div> 
    </section>
  );
};
