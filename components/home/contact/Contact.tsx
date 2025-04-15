import { useState, useRef, useEffect } from "react";
import { Reveal } from "@/components/utils/Reveal";
import styles from "./contact.module.scss";
import { AiFillMail, AiFillInstagram } from "react-icons/ai";
import Link from "next/link";
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OutlineButton } from "@/components/buttons/OutlineButton";
import { motion } from "framer-motion";
import anime from "animejs";
import Confetti from "react-confetti";

// Custom animated heading component for Contact section
const ContactHeading = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!headingRef.current) return;
    
    anime({
      targets: '.contact-heading-letter',
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
        {"Contact Me".split('').map((letter, index) => (
          <span 
            key={index} 
            className={`contact-heading-letter ${letter === ' ' ? styles.space : ''}`}
          >
            {letter}
          </span>
        ))}
      </h2>
      <div className={`${styles.headingUnderline} heading-underline`}></div>
    </div>
  );
};

export const Contact = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Using the provided secret key
    emailjs.sendForm(
      'service_jb3h1kk', 
      'template_51kgulh', 
      form.current!, 
      'FLzqpb_gwBOafkf7W'
    )
      .then((result) => {
        setIsLoading(false);
        setShowConfetti(true);
        toast.success('Message sent successfully!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setMessage('');
        form.current!.reset();
        
        // Stop confetti after 5 seconds
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
      }, (error) => {
        setIsLoading(false);
        toast.error('Something went wrong. Please try again.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={true}
          numberOfPieces={200}
        />
      )}
      <ToastContainer />
      <section className="section-wrapper" id="contact">
        <ContactHeading />
        <div className={styles.contactWrapper}>
          <Reveal width="100%">
            <p className={styles.contactCopy}>
              Shoot me an email if you want to connect! You can also find me on{" "}
              <Link
                href="https://www.instagram.com/rudra.sah00/"
                target="_blank"
                rel="nofollow"
                className={styles.socialLink}
              >
                Instagram
              </Link>{" "}
              if that&apos;s more your speed.
            </p>
          </Reveal>
          <Reveal width="100%">
            <div className={styles.emailContainer}>
              <Link href="mailto:rudranarayanaknr@gmail.com" className={styles.contactEmail}>
                <div>
                  <AiFillMail size="2.4rem" />
                  <span>rudranarayanaknr@gmail.com</span>
                </div>
              </Link>
            </div>
          </Reveal>
          <Reveal width="100%">
            <form autoComplete="false" className={styles.contactForm} ref={form} onSubmit={sendEmail}>
              <div className={styles.inputBox}>
                <input type="text" placeholder="Full Name" autoComplete="false" name="to_name" required />
                <input type="email" placeholder="Email Address" autoComplete="false" name="from_name" required />
              </div>
              <textarea 
                placeholder="Your Message"
                autoComplete="false"
                required
                name="message"
                value={message}
                onChange={handleMessageChange}
              ></textarea>
              
              <div className={styles.buttonContainer}>
                <motion.div
                  whileHover={{ scale: isLoading ? 1 : 1.05 }}
                  whileTap={{ scale: isLoading ? 1 : 0.95 }}
                >
                  <OutlineButton disabled={isLoading}>
                    {isLoading ? (
                      <div className={styles.buttonLoading}>
                        <div className={styles.loadingSpinner}></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </OutlineButton>
                </motion.div>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
};
