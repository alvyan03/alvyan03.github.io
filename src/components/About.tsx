import { BriefcaseBusiness, MapPin } from "lucide-react";

function About() {
  return (
    <section id="about" className="section about">
      <div className="section-label">01 — ABOUT</div>

      <div className="about-grid">
        <div>
          <h2>
            Building practical
            <span> IT solutions.</span>
          </h2>
        </div>

        <div className="about-text">
          <p>
            I'm a Diploma III Informatics Management graduate with an interest
            in software development, IT infrastructure, and networking.
          </p>

          <p>
            I have experience developing web applications and working with
            modern technologies, while also exploring IT infrastructure and
            networking to build practical and reliable IT solutions.
          </p>

          <div className="about-info">
            <div>
              <MapPin size={18} />
              <span>Indonesia</span>
            </div>

            <div>
              <BriefcaseBusiness size={18} />
              <span>IT & Software Development</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
