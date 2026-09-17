import { ArrowUpRight } from "lucide-react";

function Experience() {
  return (
    <section className="section experience">
      <div className="section-label">03 — EXPERIENCE</div>

      <div className="experience-card">
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
            including project monitoring, dashboard, board management, timeline,
            assignment management, and task management features.
          </p>

          <div className="experience-tags">
            <span>React.js</span>
            <span>Next.js</span>
            <span>Node.js</span>
            <span>TypeScript</span>
            <span>SQL Server</span>
          </div>
        </div>

        <ArrowUpRight className="experience-arrow" size={24} />
      </div>
    </section>
  );
}

export default Experience;
