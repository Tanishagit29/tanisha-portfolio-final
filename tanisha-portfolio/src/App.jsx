import { useState, useEffect, useRef } from "react";
import IdCard from "./IdCard.jsx";
import { useTouchEffects } from "./effects.js";
import { icons } from "./icons.js";
import { profile, skills, education, expertise, traits, experience, projects } from "./data.js";

const sections = ["Home", "About", "Education", "Skills", "Experience", "Projects", "Contact"];

// turns term into highlighted <b>term</b>
const hl = (str) => str.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <b key={i}>{part}</b> : part));

const contactIcons = {
  Email: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>,
  LinkedIn: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>,
  GitHub: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />,
};

function Nav() {
  const isDark = () =>
    document.documentElement.dataset.theme
      ? document.documentElement.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
  const [dark, setDark] = useState(isDark);
  const toggle = () => {
    document.documentElement.dataset.theme = dark ? "light" : "dark";
    setDark(!dark);
  };
  return (
    <nav>
      <div className="logo">
        <i>{profile.initials}</i>
        <div>
          {profile.name}
          <small>PORTFOLIO</small>
        </div>
      </div>
      <ul>
        {sections.map((s) => (
          <li key={s}>
            <a href={`#${s.toLowerCase()}`}>{s}</a>
          </li>
        ))}
      </ul>
      <button id="theme" onClick={toggle} aria-label="Toggle theme">
        {dark ? "☀" : "☾"}
      </button>
    </nav>
  );
}

const roles = ["Data Analyst", "AI Builder", "Web Developer", "Problem Solver"];

function About() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  const [r, setR] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const id = setInterval(() => setR((x) => (x + 1) % roles.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={`ab ${on ? "in" : ""}`} ref={ref}>
      <div className="ab-left">
        <span className="ab-open"><i /> Open to work</span>
        <h3 className="ab-title">Turning raw data into <span>intelligent products.</span></h3>
        <p className="ab-role">I'm a <b key={r}>{roles[r]}</b></p>
        <div className="ab-tags">
          {["Data Science", "AI / ML", "Agentic AI", "Web Development"].map((t) => <span key={t}>{t}</span>)}
        </div>
      </div>
      <div className="ab-right">
        <p className="ab-text">
          {("An aspiring technology professional with a keen interest in Data Science, AI/ML, Agentic AI, and Web Development. Passionate about leveraging data-driven insights, intelligent automation, and emerging technologies to address real-world challenges.")}
        </p>
        <p className="ab-text">
          {("Interested in developing machine learning models, multi-agent systems, and scalable web applications. Committed to continuous learning, technical excellence, and innovation, with a focus on building efficient, intelligent, and impactful digital solutions.")}
        </p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <header className="hero" id="home">
      <div>
        <span className="badge">Open to work</span>
        <h1>
          Hi, I’m <span>{profile.name}</span>
        </h1>
        <p className="lead">{profile.lead}</p>
        <div className="btns">
          <a className="btn pri" href="#projects">View Work →</a>
          <a className="btn" href={profile.resume} target="_blank" rel="noopener noreferrer">Resume ↗</a>
        </div>
        <div className="loc">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
          Navi Mumbai, Maharashtra
        </div>
      </div>
      <IdCard />
    </header>
  );
}

function Marquee() {
  return (
    <div className="marq" aria-label="Skills">
      <div className="track">
        {[...skills, ...skills].map((s, i) => (
          <span key={i}>
            {icons[s] && (
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill={icons[s].c || "currentColor"}>
                <path d={icons[s].p} />
              </svg>
            )}
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  useTouchEffects();
  return (
    <>
      <div className="wrap">
        <Nav />
        <Hero />
      </div>
      <Marquee />
      <main className="wrap">
        <section className="blk" id="about">
          <h2>About</h2>
          <About />
        </section>

        <section className="blk" id="education">
          <h2>Education</h2>
          <div className="tl">
            {education.map((e) => (
              <div key={e.title}>
                <small>{e.when}</small>
                <h4>{e.title}</h4>
                <p>{e.where}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="blk" id="skills">
          <h2>Expertise &amp; Skills</h2>
          <div className="skillgrid">
            <div className="skillcard">
              <div className="sk-head"><h3>Technical Arsenal</h3><span className="pill">Proficiency</span></div>
              <div className="sk-bars">
                {expertise.map((x) => (
                  <div className="bar" key={x.name}>
                    <div className="bar-top">
                      <span className="bar-ic">
                        {icons[x.icon] ? (
                          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill={icons[x.icon].c || "currentColor"}><path d={icons[x.icon].p} /></svg>
                        ) : <b>AI</b>}
                      </span>
                      <span className="bar-name">{x.name}</span>
                      <span className="pill">{x.pct}%</span>
                    </div>
                    <div className="track-bar"><i style={{ "--w": `${x.pct}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="skillcard">
              <div className="sk-head"><h3>Professional Traits</h3><span className="pill">Core Competencies</span></div>
              <div className="traits">
                {traits.map((t) => <span key={t.label} className={`trait ${t.tone}`}>{t.label}</span>)}
              </div>
              <div className="learner">
                <b>Constant Learner &amp; Tech Pioneer</b>
                <p>Continuously exploring Agentic AI, LLM workflows, machine learning and modern web technologies to build intelligent, impactful solutions.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="blk" id="experience">
          <div className="cj-head">
            <h2>Career Journey</h2>
            <p>An evolving path of learning, building and impact</p>
          </div>
          <div className="cj">
            <div className="cj-line"><i /></div>
            {experience.map((x, i) => (
              <div key={x.title} className={`cj-item ${i % 2 ? "right" : "left"}`}>
                <span className="cj-dot" />
                <article className="cj-card">
                  <div className="cj-when">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                    {x.when}
                  </div>
                  <h4>{x.title}</h4>
                  <p className="cj-co">{x.where}</p>
                  <ul>{x.pts.map((p) => <li key={p}>{p}</li>)}</ul>
                </article>
              </div>
            ))}
          </div>
        </section>

        <section className="blk" id="projects">
          <h2>Projects</h2>
          <div className="grid proj-grid">
            {projects.map((p) => (
              <article className="proj" key={p.title}>
                <div className="th" style={{ background: p.bg }}>
                  {p.img && <img src={p.img} alt={`${p.title} screenshot`} loading="lazy" style={{ objectPosition: p.pos }} />}
                </div>
                <h4>{p.title}</h4>
                <ul className="pts">{p.pts.map((x, i) => <li key={i}>{hl(x)}</li>)}</ul>
                <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                {p.link && <a className="plink" href={p.link} target="_blank" rel="noopener noreferrer">Live demo ↗</a>}
              </article>
            ))}
          </div>
        </section>
        <section className="blk" id="contact">
          <h2>Let's Talk</h2>
          <div className="lt-me">
            <h3>{profile.name}</h3>
            <p className="lt-tag">Let's build something meaningful with AI, data and technology.</p>
          </div>
          <div className="contact">
            {profile.contact.map((c) => (
              <a key={c.label} className="ccard" href={c.href} target={c.label === "Email" ? undefined : "_blank"} rel="noopener noreferrer">
                <span className="cic">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{contactIcons[c.label]}</svg>
                </span>
                <span className="ctx"><b>{c.label}</b><small>{c.text}</small></span>
                <span className="car">↗</span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
