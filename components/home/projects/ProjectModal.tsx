import styles from "./projectmodal.module.scss";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { AiFillGithub, AiOutlineExport } from "react-icons/ai";
import { MdClose } from "react-icons/md";

interface Props {
  isOpen: boolean;
  setIsOpen: Function;
  title: string;
  code: string;
  projectLink: string;
  tech: string[];
  modalContent: JSX.Element;
}

export const ProjectModal = ({
  modalContent,
  projectLink,
  setIsOpen,
  isOpen,
  title,
  code,
  tech,
}: Props) => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  
  useEffect(() => {
    const body = document.querySelector("body");

    if (isOpen) {
      body!.style.overflowY = "hidden";
    } else {
      body!.style.overflowY = "scroll";
    }
    
    // Close modal with escape key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    // Close modal when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      const modal = document.querySelector(`.${styles.modalCard}`);
      if (modal && !modal.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  // Background overlay animation
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };
  
  // Modal card animation
  const modalVariants = {
    hidden: { 
      opacity: 0,
      y: 100,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 300,
        delay: 0.1
      }
    },
    exit: { 
      opacity: 0,
      y: 50,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const content = (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.modal} 
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.button 
            className={styles.closeModalBtn}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
          >
            <MdClose />
          </motion.button>

          <motion.div
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
            className={styles.modalCard}
          >
            {/* Shine effect */}
            <div className={styles.shine}></div>
            
            {/* Background tiles effect */}
            <div className={styles.background}>
              <div className={styles.tiles}>
                {[...Array(6)].map((_, index) => (
                  <div key={index} className={styles.tile}></div>
                ))}
              </div>
            </div>
            
            <div className={styles.modalContent}>
              <motion.h4
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {title}
              </motion.h4>
              
              <motion.div 
                className={styles.modalTech}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                {tech.map((item, index) => (
                  <span key={index} className={styles.techBadge}>{item}</span>
                ))}
              </motion.div>

              <motion.div 
                className={styles.suppliedContent}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                {modalContent}
              </motion.div>

              <motion.div 
                className={styles.modalFooter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <p className={styles.linksText}>
                  Project Links<span>.</span>
                </p>
                <div className={styles.links}>
                  <motion.div
                    className={`${styles.linkCard} ${hoveredLink === 'github' ? styles.hovered : ''}`}
                    onMouseEnter={() => setHoveredLink('github')}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <div className={styles.shine}></div>
                    <Link target="_blank" rel="nofollow" href={code}>
                      <div className={styles.icon}>
                        <AiFillGithub />
                      </div>
                      <span>source code</span>
                    </Link>
                  </motion.div>
                  
                  {projectLink !== "" && (
                    <motion.div
                      className={`${styles.linkCard} ${hoveredLink === 'live' ? styles.hovered : ''}`}
                      onMouseEnter={() => setHoveredLink('live')}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <div className={styles.shine}></div>
                      <Link target="_blank" rel="nofollow" href={projectLink}>
                        <div className={styles.icon}>
                          <AiOutlineExport />
                        </div>
                        <span>live project</span>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!isOpen) return null;

  // @ts-ignore
  return ReactDOM.createPortal(content, document.getElementById("root"));
};
