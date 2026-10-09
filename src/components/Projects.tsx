import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";

interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tech: string[];
  images: string[];
  link: string;
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      number: "01",
      title: "AIR",
      category: "Sustainability Water Monitoring",
      description:
        "A web-based monitoring system designed to support sustainable water management through centralized monitoring and visualization of water-related data.",
      longDescription:
        "A web-based monitoring system designed to support air quality sustainability management through data visualization—including summaries and analytics—and real-time reporting.",
      tech: ["ReactJS", "ASP.NET", "SQL Server"],
      images: ["/Air1.jpg", "/Air2.jpg", "/Air3.jpg", "/Air4.jpg"],
      link: "",
    },
    {
      number: "02",
      title: "Sejenak",
      category: "Mental Health Mobile Application",
      description:
        "A mobile application integrated with a Spring Boot backend and REST API to support accessible mental health services through mobile devices.",
      longDescription:
        "A mobile application supporting mental health services, integrated with a Spring Boot backend and REST API.",
      tech: ["React Native", "Spring Boot", "SQL Server"],
      images: [
        "/SJ1.jpg",
        "/SJ2.jpg",
        "/SJ3.jpg",
        "/SJ4.jpg",
        "/SJ5.jpg",
        "/SJ6.jpg",
        "/SJ7.jpg",
        "/SJ8.jpg",
        "/SJ9.jpg",
        "/SJ10.jpg",
        "/SJ11.jpg",
      ],
      link: "",
    },
    {
      number: "03",
      title: "Intrusion Detection System",
      category: "Network Security",
      description:
        "A network security project implemented using MikroTik RouterOS to detect and monitor suspicious network activities.",
      longDescription:
        "A network security project using MikroTik RouterOS and Kali Linux to detect and monitor suspicious network activities through firewall rules and log systems.",
      tech: ["MikroTik RouterOS", "Kali Linux", "VirtualBox"],
      images: [
        "/ID1.jpg",
        "/ID2.jpg",
        "/ID3.jpg",
        "/ID4.jpg",
        "/ID5.jpg",
        "/ID6.jpg",
        "/ID7.jpg",
      ],
      link: "",
    },
    {
      number: "04",
      title: "Badan Penjaminan Mutu (BPM)",
      category: "Questionnaire Management System",
      description:
        "A web-based application for creating and managing questionnaires to collect student responses and feedback.",
      longDescription:
        "Developed a questionnaire management application that allows users to create and organize questions for students to answer, supporting structured data collection for evaluation and feedback purposes.",
      tech: ["ReactJS", "ASP.NET", "SQL Server"],
      images: [],
      link: "",
    },
  ];

  const slide = (direction: number) => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const card = slider.querySelector(".project-card");

    if (!card) return;

    const gap = 24;
    const distance = card.getBoundingClientRect().width + gap;

    slider.scrollBy({
      left: direction * distance,
      behavior: "smooth",
    });
  };

  return (
    <section id="projects" className="section projects">
      <div className="section-label">02 — SELECTED WORK</div>

      <div className="section-heading project-heading">
        <div>
          <h2>
            Things I've <span>built.</span>
          </h2>
        </div>

        <p>
          A selection of software development and network projects I've worked
          on during my academic and professional experience.
        </p>
      </div>

      <div className="projects-carousel">
        <button
          type="button"
          className="carousel-arrow carousel-prev"
          onClick={() => slide(-1)}
          aria-label="Previous project"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="projects-grid" ref={sliderRef}>
          {projects.map((project) => (
            <article
              className="project-card"
              key={project.number}
              role="button"
              tabIndex={0}
              aria-label={`View ${project.title} details`}
              onClick={() => setSelectedProject(project)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedProject(project);
                }
              }}
            >
              <div className="project-preview">
                {project.images.length > 0 ? (
                  <img
                    src={project.images[0]}
                    alt={`${project.title} preview`}
                  />
                ) : (
                  <div className="project-placeholder">
                    <span>{project.number}</span>
                    <h3>{project.title}</h3>
                    <p>{project.category}</p>
                  </div>
                )}

                <span className="project-index">{project.number}</span>

                <div className="project-open-hint">Click to explore</div>
              </div>

              <div className="project-content">
                <p className="project-category">{project.category}</p>

                <h3>{project.title}</h3>

                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="carousel-arrow carousel-next"
          onClick={() => slide(1)}
          aria-label="Next project"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="carousel-caption">
        <span>01 — 04 PROJECTS</span>
        <span>Click a project to view its gallery</span>
      </div>

      {selectedProject && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProject.title} details`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project details"
            >
              <X size={20} />
            </button>

            <span className="modal-category">{selectedProject.category}</span>

            <h2>{selectedProject.title}</h2>

            {selectedProject.images.length > 0 ? (
              <div className="modal-images-wrapper">
                {selectedProject.images.map((imgSrc, index) => (
                  <div className="modal-image-container" key={imgSrc}>
                    <img
                      src={imgSrc}
                      alt={`${selectedProject.title} screenshot ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="modal-empty">
                Project preview is not available yet.
              </div>
            )}

            <div className="modal-body">
              <h4>Overview</h4>

              <p>{selectedProject.longDescription}</p>

              <h4>Technologies</h4>

              <div className="project-tech">
                {selectedProject.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
