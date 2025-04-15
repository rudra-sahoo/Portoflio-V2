import styles from "./ScrollTop.module.scss";
import { useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { FaHome, FaUser, FaCode, FaEnvelope } from "react-icons/fa";

export const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const goToBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const listenToScroll = () => {
    let hidden = 800;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll > hidden) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    // Update active section
    const sections = ["about", "projects", "contact"];
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          setActiveSection(section);
          break;
        } else if (winScroll < 800) {
          setActiveSection("");
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  return (
    <div className={styles["navigation-wrapper"]}>
      {isVisible && (
        <>
          <div className={styles.navMenu}>
            <button 
              onClick={() => scrollToSection("")} 
              className={`${styles.navButton} ${activeSection === "" ? styles.active : ""}`} 
              title="Home"
            >
              <FaHome />
            </button>
            <button 
              onClick={() => scrollToSection("about")} 
              className={`${styles.navButton} ${activeSection === "about" ? styles.active : ""}`} 
              title="About"
            >
              <FaUser />
            </button>
            <button 
              onClick={() => scrollToSection("projects")} 
              className={`${styles.navButton} ${activeSection === "projects" ? styles.active : ""}`} 
              title="Projects"
            >
              <FaCode />
            </button>
            <button 
              onClick={() => scrollToSection("contact")} 
              className={`${styles.navButton} ${activeSection === "contact" ? styles.active : ""}`} 
              title="Contact"
            >
              <FaEnvelope />
            </button>
          </div>
          <button onClick={goToBtn} className={styles.scroll}>
            <AiOutlineArrowUp />
          </button>
        </>
      )}
    </div>
  );
};
