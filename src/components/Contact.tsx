import { ArrowUpRight } from "lucide-react";

function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="contact-box">
        <p className="eyebrow">GET IN TOUCH</p>

        <h2>
          Let's build something
          <span> great together.</span>
        </h2>

        <p>
          I'm open to internship, entry-level, and IT & software development
          opportunities.
        </p>

        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=alfianramdhan003@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="button primary"
        >
          Send Me an Email
          <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}

export default Contact;
