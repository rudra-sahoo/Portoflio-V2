import { Project } from "./Project";
import styles from "./projects.module.scss";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import anime from "animejs";

interface GitHubProject {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  stargazers_count: number;
  language: string;
  updated_at: string;
  forks_count: number;
  open_issues_count: number;
}

// Update the ProjectProps interface
interface ProjectProps {
  title: string;
  code: string;
  projectLink: string;
  tech: string[];
  description: string;
  modalContent: JSX.Element;
  language: string;
  stars: number;
  forks: number;
  issues: number;
  updatedAt: string;
}

// Custom animated heading component for Projects section
const ProjectsHeading = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!headingRef.current) return;
    
    anime({
      targets: '.project-heading-letter',
      opacity: [0, 1],
      translateY: [50, 0],
      rotate: [-8, 0],
      delay: anime.stagger(80),
      easing: 'easeOutExpo'
    });
    
    anime({
      targets: '.project-heading-underline',
      scaleX: [0, 1],
      duration: 800,
      delay: 700,
      easing: 'easeOutExpo'
    });
  }, []);
  
  return (
    <div className={styles.customHeading} ref={headingRef}>
      <h2 className={styles.headingText}>
        {"Projects".split('').map((letter, index) => (
          <span 
            key={index} 
            className={`project-heading-letter ${letter === ' ' ? styles.space : ''}`}
          >
            {letter}
          </span>
        ))}
      </h2>
      <div className={`${styles.headingUnderline} project-heading-underline`}></div>
    </div>
  );
};

export const Projects = () => {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/rudra-sahoo/repos?sort=updated&per_page=10', {
          headers: {
            'Accept': 'application/vnd.github.v3+json', 
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const repos: GitHubProject[] = await response.json();
        
        const transformedProjects = repos
          .filter(repo => !repo.name.includes('.github.io') && repo.name !== 'rudra-sahoo')
          .map(repo => ({
            title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
            code: repo.html_url,
            projectLink: repo.homepage || '',
            tech: repo.topics?.length > 0 ? repo.topics : [repo.language || 'JavaScript'],
            description: repo.description || `A project called ${repo.name}`,
            language: repo.language || 'Not specified',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            issues: repo.open_issues_count,
            updatedAt: repo.updated_at,
            modalContent: (
              <div>
                <p>{repo.description || `A project called ${repo.name}`}</p>
                <p>Primary language: <strong>{repo.language || 'Not specified'}</strong></p>
                <p>Last updated: <strong>{new Date(repo.updated_at).toLocaleDateString()}</strong></p>
                <div className={styles.modalStats}>
                  {repo.stargazers_count > 0 && (
                    <p>Stars: <strong>{repo.stargazers_count}</strong></p>
                  )}
                  {repo.forks_count > 0 && (
                    <p>Forks: <strong>{repo.forks_count}</strong></p>
                  )}
                  {repo.open_issues_count > 0 && (
                    <p>Open Issues: <strong>{repo.open_issues_count}</strong></p>
                  )}
                </div>
                <p>Check out the code on <a href={repo.html_url} target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
                {repo.homepage && (
                  <p>View the <a href={repo.homepage} target="_blank" rel="noopener noreferrer">live project</a>.</p>
                )}
              </div>
            ),
          }));
        
        setProjects(transformedProjects.slice(0, 6));
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]); 
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
    
    // Set up interval to refresh data every 5 minutes
    const intervalId = setInterval(fetchProjects, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Animation variants for staggered loading
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <section className="section-wrapper" id="projects">
      <ProjectsHeading />

      {loading ? (
        <div className={styles.loadingContainer}>
          <motion.div 
            className={styles.loadingSpinner}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <p>Loading projects...</p>
        </div>
      ) : (
        <motion.div 
          className={styles.projects}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project) => (
            <Project key={project.title} {...project} />
          ))}
        </motion.div>
      )}
    </section>
  );
};