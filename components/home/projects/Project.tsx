import { useAnimation, useInView, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiFillGithub, AiOutlineExport } from "react-icons/ai";
import { FiStar, FiGitBranch, FiAlertCircle, FiCalendar } from "react-icons/fi";
import { ProjectModal } from "./ProjectModal";
import styles from "./projects.module.scss";
import { Reveal } from "@/components/utils/Reveal";

interface Props {
  modalContent: JSX.Element;
  description: string;
  projectLink: string;
  tech: string[];
  title: string;
  code: string;
  language: string;
  stars: number;
  forks: number;
  issues: number;
  updatedAt: string;
}

export const Project = ({
  modalContent,
  projectLink,
  description,
  title,
  code,
  tech,
  language,
  stars,
  forks,
  updatedAt,
}: Props) => {

  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  // Truncate description to prevent overflow
  const truncatedDescription = description?.length > 120 
    ? `${description.substring(0, 120)}...` 
    : description || '';

  // Format date
  const formattedDate = new Date(updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <>
      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
              type: "spring",
              damping: 15,
              stiffness: 100 
            }
          }
        }}
        initial="hidden"
        animate={controls}
      >
        <motion.div
          className={`${styles.projectCard} ${isHovered ? styles.hovered : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
          
          <div className={styles.projectContent}>
            <Reveal width="100%">
              <div className={styles.projectTitle}>
                <h4>{title}</h4>
                <div className={styles.projectLinks}>
                  <motion.div 
                    className={styles.icon}
                    whileHover={{ y: -3 }} 
                    transition={{ duration: 0.2 }}
                  >
                    <Link href={code} target="_blank" rel="nofollow">
                      <AiFillGithub size="1.8rem" />
                    </Link>
                  </motion.div>
                  
                  {projectLink !== "" && (
                    <motion.div 
                      className={styles.icon}
                      whileHover={{ y: -3 }} 
                      transition={{ duration: 0.2 }}
                    >
                      <Link href={projectLink} target="_blank" rel="nofollow">
                        <AiOutlineExport size="1.8rem" />
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            </Reveal>
            
            <div className={styles.projectTitleLine} />
            
            <Reveal>
              <div className={styles.projectDescription}>
                {truncatedDescription}
              </div>
            </Reveal>
            
            <Reveal>
              <div className={styles.projectStats}>
                <div className={styles.statItem}>
                  <span className={styles.language}>
                    <span 
                      className={styles.languageDot} 
                      style={{ 
                        backgroundColor: getLanguageColor(language) 
                      }}
                    ></span>
                    {language}
                  </span>
                </div>
                {stars > 0 && (
                  <div className={styles.statItem}>
                    <FiStar />
                    <span>{stars}</span>
                  </div>
                )}
                {forks > 0 && (
                  <div className={styles.statItem}>
                    <FiGitBranch />
                    <span>{forks}</span>
                  </div>
                )}
                <div className={styles.statItem}>
                  <FiCalendar />
                  <span>{formattedDate}</span>
                </div>
              </div>
            </Reveal>
            
            <Reveal>
              <button 
                className={styles.projectLearnMore}
                onClick={() => setIsOpen(true)}
              >
                Learn More
              </button>
            </Reveal>
            
            <Reveal>
              <div className={styles.projectTech}>
                {tech.slice(0, 3).map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
                {tech.length > 3 && <span>+{tech.length - 3}</span>}
              </div>
            </Reveal>
          </div>
        </motion.div>
      </motion.div>
      
      <ProjectModal
        modalContent={modalContent}
        projectLink={projectLink}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        title={title}
        code={code}
        tech={tech}
      />
    </>
  );
};

// Function to get language color
function getLanguageColor(language: string): string {
  const colors: {[key: string]: string} = {
    "JavaScript": "#f1e05a",
    "TypeScript": "#3178c6",
    "Python": "#3572A5",
    "Java": "#b07219",
    "C#": "#178600",
    "PHP": "#4F5D95",
    "C++": "#f34b7d",
    "HTML": "#e34c26",
    "CSS": "#563d7c",
    "Ruby": "#701516",
    "Go": "#00ADD8",
    "Swift": "#ffac45",
    "Kotlin": "#A97BFF",
    "Rust": "#dea584",
  };
  
  return colors[language] || "#8e8e8e";
}
