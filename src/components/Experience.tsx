import { X, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";

function Experience() {
  const [showDetail, setShowDetail] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const experienceImages = [
    "/ST1.jpg",
    "/ST2.jpg",
    "/ST3.jpg",
    "/ST4.jpg",
    "/ST5.jpg",
    "/ST6.jpg",
  ];

  return (
    <section id="experience" className="section experience">
      <div className="section-label">03 — EXPERIENCE</div>

      <div className="section-heading project-heading">
        <div>
          <h2>
            Where I've <span>worked.</span>
          </h2>
        </div>

        <p>
          My professional experience, contributions, and work documentation.
        </p>
      </div>

      <div className="experience-carousel">
        <div className="experience-track" ref={sliderRef}>
          <article
            className="experience-card"
            role="button"
            tabIndex={0}
            onClick={() => setShowDetail(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setShowDetail(true);
              }
            }}
            aria-label="View internship details"
          >
            <div className="experience-date">
              <span>DEC 2025</span>
              <span>—</span>
              <span>JUN 2026</span>
            </div>

            <div className="experience-main">
              <p className="experience-company">
                PT United Tractors Pandu Engineering
              </p>

              <h3>Full Stack Developer Intern</h3>

              <p>
                Contributed to the development of internal web applications,
                including project monitoring, dashboards, board management,
                timelines, assignments, and task management features.
              </p>

              <div className="experience-tags">
                <span>Next.js</span>
                <span>Node.js</span>
                <span>TypeScript</span>
                <span>SQL Server</span>
              </div>

              <div className="experience-open-hint">
                Click to explore <span>↗</span>
              </div>
            </div>

            <ChevronRight className="experience-card-arrow" size={22} />
          </article>
        </div>
      </div>

      <div className="carousel-caption">
        <span>01 — 01 EXPERIENCE</span>
        <span>Click to view work documentation</span>
      </div>

      {showDetail && (
        <div className="modal-backdrop" onClick={() => setShowDetail(false)}>
          <div
            className="modal-content experience-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Internship experience details"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setShowDetail(false)}
              aria-label="Close details"
            >
              <X size={20} />
            </button>

            <span className="modal-category">
              INTERNSHIP · DEC 2025 — JUN 2026
            </span>

            <h2>Full Stack Developer Intern</h2>

            <p className="experience-company">
              PT United Tractors Pandu Engineering
            </p>

            <h4 className="gallery-heading">Work Documentation</h4>

            <div className="experience-gallery">
              {experienceImages.map((image, index) => (
                <div className="experience-gallery-item" key={image}>
                  <img
                    src={image}
                    alt={`Work documentation ${index + 1}`}
                    loading="lazy"
                  />

                  <span>
                    Documentation {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>

            <div className="modal-body">
              <h4>Overview</h4>

              <p>
                Contributed to the development of internal web applications to
                support project monitoring, task management, and team
                collaboration.
              </p>

              <h4>Key Contributions</h4>

              <ul>
                <li>
                  Developed features for the SATRIA Prompt project monitoring
                  system.
                </li>
                <li>Built dashboard and board management features.</li>
                <li>
                  Developed timeline, assignment, and task management features.
                </li>
                <li>
                  Collaborated with Business Analysts during development and
                  testing.
                </li>
                <li>Conducted UAT and fixed application bugs.</li>
              </ul>

              <h4>Technologies</h4>

              <div className="experience-tags">
                <span>React.js</span>
                <span>Next.js</span>
                <span>Node.js</span>
                <span>TypeScript</span>
                <span>Prisma ORM</span>
                <span>SQL Server</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Experience;
