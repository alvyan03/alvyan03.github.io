import { ArrowUpRight } from "lucide-react";

function Projects() {
  const projects = [
    {
      number: "01",
      title: "SATRIA Prompt",
      category: "Project Management System",
      description:
        "A web-based project management system developed to manage projects and employees, featuring Dashboard, Board, Timeline, Assignment, Task, and Document Management.",
      tech: ["Next.js", "Node.js", "Prisma", "SQL Server"],
      image: "",
      link: "",
    },

    {
      number: "02",
      title: "AIR",
      category: "Sustainability Water Monitoring",
      description:
        "A web-based monitoring system designed to support sustainable water management through centralized monitoring and visualization of water-related data.",
      tech: ["ReactJS", "ASP.NET Web API", "SQL Server"],
      image: "",
      link: "",
    },

    {
      number: "03",
      title: "Sejenak",
      category: "Mental Health Mobile Application",
      description:
        "A mobile application integrated with a Spring Boot backend and REST API to support accessible mental health services through mobile devices.",
      tech: ["React Native", "Spring Boot", "SQL Server"],
      image: "",
      link: "",
    },

    {
      number: "04",
      title: "Intrusion Detection System",
      category: "Network Security",
      description:
        "A network security project implemented using MikroTik RouterOS to detect and monitor suspicious network activities through firewall rules, address lists, and logging.",
      tech: [
        "MikroTik RouterOS",
        "Kali Linux",
        "VirtualBox",
      ],
      image: "",
      link: "",
    },
  ];

  return (
    <section id="projects" className="section projects">
      <div className="section-label">04 — PROJECTS</div>

      <div className="section-heading project-heading">
        <div>
          <h2>
            Selected <span>work.</span>
          </h2>
        </div>

        <p>
          Selected projects developed during my internship experience, focusing
          on project monitoring, task management, collaboration, and web-based
          IT solutions.
        </p>
      </div>

      <div className="projects-list">
        {projects.map((project) => (
          <article className="project-card" key={project.number}>
            <div className="project-number">{project.number}</div>

            <div className="project-content">
              <p className="project-category">{project.category}</p>

              <h3>{project.title}</h3>

              <p className="project-description">{project.description}</p>

              <div className="project-tech">
                {project.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-view"
                >
                  View Project
                  <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
