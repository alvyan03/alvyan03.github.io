import {
  ArrowUpRight,
  Code2,
  Server,
  Download,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import profilePhoto from "../assets/profile.png";

function Hero() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <section id="home" className="hero section">
      <div className="hero-content">
        <div className="availability hero-reveal">
          <span></span>
          Available for opportunities
        </div>

        <p className="eyebrow hero-reveal">HELLO, I'M</p>

        <h1 className="hero-title hero-reveal">
          Alfian <span>Ramdhan.</span>
        </h1>

        <div className="hero-role hero-reveal">
          <span className="role-line"></span>
          IT & Software Development
        </div>

        <p className="hero-description hero-reveal">
          Informatics Management graduate with an interest in software
          development, IT infrastructure, and networking. Experienced in
          developing web applications and working with modern technologies, with
          a strong interest in building practical and reliable IT solutions.
        </p>

        <div
          className="hero-buttons hero-reveal"
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <a href="#projects" className="button primary">
            View My Work
            <ArrowUpRight size={18} />
          </a>

          {/* Tombol Dropdown Download CV */}
          <div className="cv-dropdown-container">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="button secondary"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              <Download size={18} />
              Download CV
              <ChevronDown
                size={16}
                style={{
                  transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              />
            </button>

            {isDropdownOpen && (
              <div className="cv-dropdown-menu">
                <a
                  href="/CV_Alfian Ramdhan - D.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsDropdownOpen(false)}
                  className="cv-dropdown-item"
                >
                  💻  CV Developer
                </a>
                <a
                  href="/CV_Alfian Ramdhan - Ne.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsDropdownOpen(false)}
                  className="cv-dropdown-item"
                >
                  🌐  CV Network & Infra
                </a>
              </div>
            )}
          </div>

          <a href="#contact" className="button secondary">
            Contact Me
          </a>
        </div>

        <div className="hero-meta hero-reveal">
          <div>
            <strong>Software</strong>
            <span>Development</span>
          </div>

          <div>
            <strong>IT</strong>
            <span>Infrastructure</span>
          </div>

          <div>
            <strong>2026</strong>
            <span>Graduate</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="visual-glow"></div>

        <div className="photo-frame">
          <div className="photo-border"></div>

          <img src={profilePhoto} alt="Alfian Ramdhan" />
        </div>

        <div className="visual-card">
          <div className="code-header">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="code-content">
            <p>
              <span className="purple">const</span>{" "}
              <span className="blue">IT</span> = {"{"}
            </p>

            <p className="indent">
              name: <span className="green">"Alfian"</span>,
            </p>

            <p className="indent">
              role: <span className="green">"IT & Software Development"</span>,
            </p>

            <p className="indent">
              stack: <span className="green">"Web & Infrastructure"</span>
            </p>

            <p>{"}"}</p>
          </div>
        </div>

        <div className="tech-badge react-badge">
          <Code2 size={17} />
          <span>Software Development</span>
        </div>

        <div className="tech-badge web-badge">
          <Server size={17} />
          <span>IT Infrastructure</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
