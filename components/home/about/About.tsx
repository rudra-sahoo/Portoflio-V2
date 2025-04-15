import { Reveal } from "@/components/utils/Reveal"; 
import styles from "./about.module.scss";
import { Stats } from "./Stats";
import { motion } from "framer-motion";
import anime from "animejs";
import { useEffect, useRef } from "react";
import { AiFillInstagram, AiFillMail } from "react-icons/ai";
import { AboutHeading } from "./AboutHeading";

// Footer component with social links
const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Animate footer elements using animejs
    anime({
      targets: '.footer-icon',
      scale: [0, 1],
      opacity: [0, 1],
      rotate: [45, 0],
      delay: anime.stagger(100),
      easing: 'spring(1, 80, 10, 0)'
    });
    
    anime({
      targets: '.footer-line',
      width: ['0%', '100%'],
      easing: 'easeInOutQuad',
      duration: 800
    });
  }, []);
  
  return (
    <div className={styles.footer} ref={containerRef}>
      <div className={styles.footerLine + " footer-line"}></div>
      <div className={styles.socialLinks}>
        <a 
          href="https://www.instagram.com/rudra.sah00/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="footer-icon"
        >
          <AiFillInstagram size={28} />
        </a>
        <a 
          href="mailto:rudranarayanaknr@gmail.com" 
          className="footer-icon"
        >
          <AiFillMail size={28} />
        </a>
      </div>
      <motion.p 
        className={styles.footerText}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        Connect with me on social media
      </motion.p>
    </div>
  );
};

// Current Project highlighting DuckBuck
const CurrentProject = () => {
  return (
    <Reveal>
      <div className={styles.currentProject}>
        <h3>Current Project: <span>DuckBuck</span></h3>
        <p>
          I&apos;m currently building <a href="https://duckbuck.in" target="_blank" rel="noopener noreferrer">DuckBuck</a>, an innovative walkie-talkie over the internet platform. This exciting project combines real-time audio communication with web technologies to create seamless voice interactions across devices and locations.
        </p>
        <div className={styles.projectHighlight}>
          <div className={styles.projectLink}>
            <a href="https://duckbuck.in" target="_blank" rel="noopener noreferrer">
              duckbuck.in
            </a>
          </div>
          <p className={styles.projectStatus}>In development</p>
        </div>
      </div>
    </Reveal>
  );
};

export const About = () => {
  return (
    <section id="about" className="section-wrapper">
      <AboutHeading />
      <div className={styles.about}>
        <div>
          <Reveal>
            <p className={`${styles.aboutText}`}>
              <span>Hi</span> there! My name is Rudra Sahoo, and I&apos;m a Computer Science student with a passion for creating and designing websites. I have experience in web development, specializing in the MERN stack. I enjoy coding and strive to build modern and visually appealing websites that provide excellent user experiences. I am proficient in front-end technologies such as HTML, CSS, JavaScript, and React, as well as back-end technologies like Node.js and MongoDB. I am always eager to learn and explore new technologies and frameworks. If you&apos;re looking for a developer who can deliver high-quality websites with a creative touch, I&apos;m here to help. Let&apos;s collaborate and bring your vision to life!
            </p>
          </Reveal>
          
          <CurrentProject />
          <Footer />
        </div>
        <Stats />
      </div>
    </section>
  );
};
