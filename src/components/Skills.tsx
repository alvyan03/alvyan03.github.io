import { Code2, Database, Server } from "lucide-react";

function Skills() {
  const skills = [
    {
      icon: <Code2 size={24} />,
      title: "Software Development",
      description: "Building modern web applications and software solutions.",
      items: ["React.js", "TypeScript", "Next.js", "Node.js", "C#", "Laravel"],
    },

    {
      icon: <Server size={24} />,
      title: "IT Infrastructure",
      description:
        "Working with IT infrastructure, systems, and virtual environments.",
      items: [
        "MikroTik RouterOS",
        "Linux",
        "VirtualBox",
        "Kali Linux",
        "MTCNA",
      ],
    },

    {
      icon: <Database size={24} />,
      title: "Database & Tools",
      description:
        "Managing application data and working with development tools.",
      items: ["SQL Server", "MySQL", "Prisma ORM", "Power BI"],
    },
  ];

  return (
    <section id="skills" className="section skills-section">
      <div className="section-label">02 — SKILLS</div>

      <div className="section-heading">
        <h2>
          My technical <span>toolkit.</span>
        </h2>

        <p>
          Technologies and tools I use across software development, IT
          infrastructure, and data management.
        </p>
      </div>

      <div className="skills-grid">
        {skills.map((skill) => (
          <div className="skill-card" key={skill.title}>
            <div className="skill-icon">{skill.icon}</div>

            <h3>{skill.title}</h3>

            <p>{skill.description}</p>

            <div className="skill-tags">
              {skill.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
