import { useState, useEffect } from "react";
import { Menu, X, Bot, Send, Sun, Moon } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">(() => {
      return localStorage.getItem("theme") === "light" ? "light" : "dark";
    });

    useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
      const nextTheme = theme === "dark" ? "light" : "dark";

      setTheme(nextTheme);
      document.documentElement.setAttribute("data-theme", nextTheme);
    };
  const [aiOpen, setAiOpen] = useState(false);
  const [input, setInput] = useState("");

  const defaultQuestions = [
    "Tell me about Alfian",
    "What are his skills?",
    "What projects has he worked on?",
    "What is his IT background?",
  ];

  const [answer, setAnswer] = useState(
    "Hi! I'm Alfian's portfolio assistant. Ask me anything about Alfian's skills, experience, projects, or education.",
  );

  const [questions, setQuestions] = useState(defaultQuestions);

  const handleAsk = (question: String) => {
    const q = question.toLowerCase().trim();

    if (!q) return;

    // =========================
    // GREETING
    // =========================
    if (
      q.includes("halo") ||
      q.includes("hello") ||
      q === "hi" ||
      q.includes("hey")
    ) {
      setAnswer(
        "Hi! 👋 I'm Alfian's portfolio assistant. You can ask me about his background, skills, experience, projects, education, or technical experience.",
      );

      setQuestions([
        "Tell me about Alfian",
        "What are his skills?",
        "What projects has he worked on?",
        "What is his IT background?",
      ]);
    }

    // =========================
    // ABOUT ALFIAN
    // =========================
    else if (
      q.includes("siapa alfian") ||
      q.includes("who is alfian") ||
      q.includes("tell me about alfian") ||
      q.includes("tentang alfian") ||
      q === "about alfian"
    ) {
      setAnswer(
        "Alfian Ramdhan is a D3 Informatics Management student at Politeknik Astra with experience in software development, IT infrastructure, networking, and network security. He has experience developing web applications and working with modern technologies.",
      );

      setQuestions([
        "What are his main skills?",
        "Tell me about his experience",
        "What projects has he worked on?",
        "What is his education?",
      ]);
    }

    // =========================
    // SKILLS
    // =========================
    else if (
      q.includes("skill") ||
      q.includes("keahlian") ||
      q.includes("technology") ||
      q.includes("technologies") ||
      q.includes("teknologi") ||
      q.includes("tech stack") ||
      q.includes("kemampuan")
    ) {
      setAnswer(
        "Alfian has experience with JavaScript, C#, Java, PHP, ReactJS, Next.js, React Native, ASP.NET, Spring Boot, Laravel, SQL Server, MySQL, Prisma ORM, GitHub, Postman, Draw.io, MikroTik RouterOS, VirtualBox, and Kali Linux.",
      );

      setQuestions([
        "What is his software development experience?",
        "Does he have networking experience?",
        "What technologies were used in SATRIA?",
        "What certifications does he have?",
      ]);
    }

    // =========================
    // EXPERIENCE
    // =========================
    else if (
      q.includes("experience") ||
      q.includes("pengalaman") ||
      q.includes("work experience") ||
      q.includes("pengalaman kerja") ||
      q.includes("intern") ||
      q.includes("internship") ||
      q.includes("magang") ||
      q.includes("united tractors")
    ) {
      setAnswer(
        "Alfian worked as a Full Stack Developer Intern at PT United Tractors Pandu Engineering from December 2025 to June 2026. He developed the SATRIA Prompt web application, collaborated with a Business Analyst, and was involved in testing, debugging, and bug fixing.",
      );

      setQuestions([
        "What was his role?",
        "Tell me about SATRIA Prompt",
        "What technologies did he use?",
        "What other projects has he worked on?",
      ]);
    }

    // =========================
    // SATRIA
    // =========================
    else if (
      q.includes("satria") ||
      q.includes("project management system") ||
      q.includes("project monitoring system")
    ) {
      setAnswer(
        "SATRIA Prompt is a web-based project management system developed to manage projects and employees. It includes Dashboard, Board, Timeline, Assignment, Task, and Document Management features, with role-based access for Manager, Project Manager, and Collaborator. The system was developed using Next.js, Node.js, Prisma, and SQL Server.",
      );

      setQuestions([
        "What technologies were used in SATRIA?",
        "What features does SATRIA have?",
        "What was Alfian's role?",
        "How does the system work?",
      ]);
    }

    // =========================
    // SATRIA TECHNOLOGY
    // =========================
    else if (
      (q.includes("technology") ||
        q.includes("technologies") ||
        q.includes("teknologi") ||
        q.includes("stack") ||
        q.includes("tech")) &&
      q.includes("satria")
    ) {
      setAnswer(
        "SATRIA Prompt was developed using Next.js, Node.js, Prisma ORM, and SQL Server. Next.js was used for the web application, Node.js for backend development, Prisma for database access, and SQL Server for data management.",
      );

      setQuestions([
        "What features does SATRIA have?",
        "What was Alfian's role?",
        "Tell me about another project",
        "Does Alfian have networking experience?",
      ]);
    }

    // =========================
    // SEJENAK
    // =========================
    else if (
      q.includes("sejenak") ||
      q.includes("mental health") ||
      q.includes("mobile application") ||
      q.includes("aplikasi mobile")
    ) {
      setAnswer(
        "Sejenak is a mental health mobile application developed using React Native, Spring Boot, and SQL Server. The application is integrated with a REST API to support data exchange between the mobile application and backend.",
      );

      setQuestions([
        "What technologies were used in Sejenak?",
        "What is Sejenak about?",
        "Tell me about SATRIA Prompt",
        "What other projects has he worked on?",
      ]);
    }

    // =========================
    // AIR
    // =========================
    else if (
      q.includes("air") ||
      q.includes("sustainable water") ||
      q.includes("water monitoring") ||
      q.includes("monitoring air") ||
      q.includes("monitoring water")
    ) {
      setAnswer(
        "AIR is a project related to Sustainable Water Monitoring. It focuses on monitoring water-related information in support of sustainable water management.",
      );

      setQuestions([
        "Tell me about SATRIA Prompt",
        "Tell me about Sejenak",
        "Tell me about the IDS project",
        "What are his technical skills?",
      ]);
    }

    // =========================
    // IDS
    // =========================
    else if (
      q.includes("ids") ||
      q.includes("intrusion detection") ||
      q.includes("network security") ||
      q.includes("keamanan jaringan") ||
      q.includes("mikrotik")
    ) {
      setAnswer(
        "Alfian developed an Intrusion Detection System project using MikroTik RouterOS to detect and monitor suspicious network activities. The project involved DHCP, DNS, NAT, IP Address, routing, firewall rules, Address List, and logging. He used VirtualBox and Kali Linux for simulation and testing with tools such as Nmap, hping3, and Hydra.",
      );

      setQuestions([
        "What networking technologies does he know?",
        "What security tools did he use?",
        "What is his MTCNA certification?",
        "Tell me about his software projects",
      ]);
    }

    // =========================
    // NETWORKING
    // =========================
    else if (
      q.includes("network") ||
      q.includes("networking") ||
      q.includes("jaringan") ||
      q.includes("dhcp") ||
      q.includes("dns") ||
      q.includes("routing") ||
      q.includes("firewall") ||
      q.includes("nat")
    ) {
      setAnswer(
        "Alfian has academic experience in networking using MikroTik RouterOS, including DHCP, DNS, NAT, IP Address, routing, firewall, network traffic monitoring, and logging. He also used VirtualBox and Kali Linux for network simulation and testing.",
      );

      setQuestions([
        "Tell me about the IDS project",
        "What is his MTCNA certification?",
        "What security tools did he use?",
        "What are his software development skills?",
      ]);
    }

    // =========================
    // INFRASTRUCTURE
    // =========================
    else if (
      q.includes("infrastructure") ||
      q.includes("infrastruktur") ||
      q.includes("infra") ||
      q.includes("it support")
    ) {
      setAnswer(
        "Alfian has an interest in IT Infrastructure, Network, and Network Security. His academic experience includes MikroTik RouterOS configuration, virtualization using VirtualBox, Kali Linux, networking fundamentals, firewall configuration, monitoring, and logging.",
      );

      setQuestions([
        "Tell me about his networking experience",
        "Tell me about the IDS project",
        "What certifications does he have?",
        "What are his software skills?",
      ]);
    }

    // =========================
    // EDUCATION
    // =========================
    else if (
      q.includes("education") ||
      q.includes("pendidikan") ||
      q.includes("kuliah") ||
      q.includes("study") ||
      q.includes("kampus") ||
      q.includes("universitas") ||
      q.includes("politeknik")
    ) {
      setAnswer(
        "Alfian is pursuing a Diploma III (D3) in Informatics Management at Politeknik Astra.",
      );

      setQuestions([
        "What are his skills?",
        "Tell me about his experience",
        "What projects has he worked on?",
        "What certifications does he have?",
      ]);
    }

    // =========================
    // CERTIFICATION
    // =========================
    else if (
      q.includes("certification") ||
      q.includes("certifications") ||
      q.includes("sertifikasi") ||
      q.includes("mtcna") ||
      q.includes("virtual machine fundamental")
    ) {
      setAnswer(
        "Alfian holds the MikroTik Certified Network Associate (MTCNA) certification from MikroTik Academy in 2025 and a Virtual Machine Fundamental certification from AGUNA Course in 2024.",
      );

      setQuestions([
        "Tell me about his networking experience",
        "Tell me about the IDS project",
        "What are his software skills?",
        "Tell me about his experience",
      ]);
    }

    // =========================
    // BPM
    // =========================
    else if (
      q.includes("bpm") ||
      q.includes("lecturer performance") ||
      q.includes("evaluasi dosen") ||
      q.includes("performance evaluation")
    ) {
      setAnswer(
        "BPM is a web-based lecturer performance evaluation system developed using ReactJS, ASP.NET Web API, and SQL Server. The system manages evaluation instruments, survey distribution, assessment results, and evaluation dashboards.",
      );

      setQuestions([
        "What technologies were used?",
        "Tell me about SATRIA Prompt",
        "Tell me about Sejenak",
        "What other projects has he worked on?",
      ]);
    }

    // =========================
    // MEDICAL CARE
    // =========================
    else if (
      q.includes("medical care") ||
      q.includes("medical") ||
      q.includes("health monitoring") ||
      q.includes("employee health")
    ) {
      setAnswer(
        "Medical Care System is a web-based employee health monitoring application developed using ASP.NET and SQL Server. It supports centralized medical records, health examinations, and health reports.",
      );

      setQuestions([
        "What technologies were used?",
        "Tell me about SATRIA Prompt",
        "Tell me about BPM",
        "What other projects has he worked on?",
      ]);
    }

    // =========================
    // WORKSHOP
    // =========================
    else if (
      q.includes("workshop") ||
      q.includes("bengkel") ||
      q.includes("vehicle service")
    ) {
      setAnswer(
        "Workshop Information System is a web-based workshop management application developed to support vehicle service processes, user authentication, service data management, and transaction reporting.",
      );

      setQuestions([
        "What technologies were used?",
        "Tell me about SATRIA Prompt",
        "Tell me about Sejenak",
        "Does Alfian have networking experience?",
      ]);
    }

    // =========================
    // ROLE
    // =========================
    else if (
      q.includes("role") ||
      q.includes("peran") ||
      q.includes("what did alfian do") ||
      q.includes("what was alfian's role")
    ) {
      setAnswer(
        "Alfian worked as a Full Stack Developer Intern at PT United Tractors Pandu Engineering. His responsibilities included developing the SATRIA Prompt web application, collaborating with a Business Analyst, and performing testing, debugging, and bug fixing.",
      );

      setQuestions([
        "Tell me about SATRIA Prompt",
        "What technologies did he use?",
        "What are his other projects?",
        "What is his IT background?",
      ]);
    }

    // =========================
    // SOFTWARE DEVELOPMENT
    // =========================
    else if (
      q.includes("software development") ||
      q.includes("software") ||
      q.includes("web development") ||
      q.includes("pengembangan aplikasi") ||
      q.includes("coding")
    ) {
      setAnswer(
        "Alfian has experience in software development through several web and mobile projects. His technologies include Next.js, Node.js, ReactJS, React Native, ASP.NET, Spring Boot, Java, C#, PHP, Prisma, SQL Server, and MySQL.",
      );

      setQuestions([
        "Tell me about SATRIA Prompt",
        "Tell me about Sejenak",
        "What technologies does he use?",
        "Does he have networking experience?",
      ]);
    }

    // =========================
    // FALLBACK
    // =========================
    else {
      setAnswer(
        "I'm not sure about that specific question yet. You can ask me about Alfian's profile, skills, experience, projects, education, software development, networking, IT infrastructure, or certifications.",
      );

      setQuestions([
        "Tell me about Alfian",
        "What are his skills?",
        "What projects has he worked on?",
        "What is his IT background?",
      ]);
    }

    setInput("");
  };

  const handleSubmit = () => {
    handleAsk(input);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* LOGO */}
        <a href="#home" className="nav-logo">
          A<span>.</span>
        </a>

        {/* DESKTOP NAV */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>

          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>

          <a href="#skills" onClick={() => setMenuOpen(false)}>
            Skills
          </a>

          <a href="#projects" onClick={() => setMenuOpen(false)}>
            Projects
          </a>

          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>

          <button
            className="nav-ai"
            onClick={() => {
              setAiOpen(!aiOpen);
              setMenuOpen(false);
            }}
          >
            <Bot size={16} />
            Ask AI
          </button>
        </div>

        {/* NAVBAR ACTIONS */}
        <div className="nav-actions">
          {/* THEME TOGGLE */}
          <button
            type="button"
            className={`theme-toggle ${theme === "dark" ? "is-dark" : "is-light"}`}
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            aria-pressed={theme === "dark"}
          >
            <span className="theme-toggle-thumb">
              {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
            </span>
          </button>

          {/* LET'S TALK */}
          <a href="#contact" className="nav-talk">
            Let's Talk
          </a>
        </div>

        {/* MOBILE MENU */}
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* AI POPUP */}
      {aiOpen && (
        <div className="ai-popup">
          {/* HEADER */}
          <div className="ai-popup-header">
            <div>
              <strong>✦ AI</strong>
              <span>Portfolio Assistant</span>
            </div>

            <button onClick={() => setAiOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* BODY */}
          <div className="ai-popup-body">
            <div className="ai-answer">{answer}</div>

            {/* QUICK QUESTIONS */}
            <div className="ai-questions">
              {questions.map((question) => (
                <button key={question} onClick={() => handleAsk(question)}>
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* INPUT */}
          <div className="ai-popup-input">
            <input
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />

            <button onClick={handleSubmit}>
              <Send size={17} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
