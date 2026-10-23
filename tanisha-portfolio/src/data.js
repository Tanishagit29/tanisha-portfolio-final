import astrachainImg from "./assets/astrachain.jpg";
import cinematchImg from "./assets/cinematch.jpg";
import quizifyImg from "./assets/quizify.jpg";
import projectflowImg from "./assets/projectflow.jpg";
// Edit your content here.
export const profile = {
  name: "Tanisha Poojary",
  initials: "TP",
  role: "Aspiring Technology Professional",
  lead: "Data-driven thinker. AI enthusiast. Developer by passion. Exploring intelligent systems, machine learning, and web technologies to turn complex challenges into impactful solutions.",
  about: "An aspiring technology professional with a keen interest in Data Science, AI/ML, Agentic AI, and Web Development. Passionate about leveraging data-driven insights, intelligent automation, and emerging technologies to address real-world challenges. Interested in developing machine learning models, multi-agent systems, and scalable web applications. Committed to continuous learning, technical excellence, and innovation, with a focus on building efficient, intelligent, and impactful digital solutions.",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tanishapoojary" },
    { label: "GitHub", href: "https://github.com/Tanishagit29" },
    { label: "Email", href: "mailto:tpoojary382@gmail.com" },
  ],
  contact: [
    { label: "Email", text: "tpoojary382@gmail.com", href: "mailto:tpoojary382@gmail.com" },
    { label: "LinkedIn", text: "Let's connect", href: "https://www.linkedin.com/in/tanishapoojary" },
    { label: "GitHub", text: "See my code", href: "https://github.com/Tanishagit29" },
  ],
  resume: "/Tanisha_Poojary_Resume.pdf",
  cardInfo: [
    ["FOCUS", "Data Science & AI/ML"],
    ["ALSO", "Agentic AI"],
    ["BUILDS", "Web Applications"],
    ["STATUS", "Learning"],
  ],
};

export const skills = ["React", "HTML", "CSS", "scikit-learn", "PyTorch", "FastAPI", "Vercel", "AWS", "Render", "Streamlit", "Python", "JavaScript", "C++", "SQL", "NumPy", "Pandas", "Git", "Figma", "Power BI", "Matplotlib", "Seaborn", "NLP", "LLM", "Agentic AI"];

export const education = [
  {
    "when": "2023 – Present",
    "title": "B.Tech in Electronics and Computer Science",
    "where": "Pillai College of Engineering, Panvel · CGPA 9.2 / 10"
  },
  {
    "when": "Higher Secondary",
    "title": "HSC (Class XII)",
    "where": "St. Mary's Junior College · 81%"
  },
  {
    "when": "Secondary",
    "title": "SSC (Class X)",
    "where": "St. Lawrence High School · 92%"
  }
];

export const certifications = [
  "AWS Academy Graduate: Cloud Computing",
  "Complete AIML and Data Science (Apna College)",
  "Complete Web Development Course (Udemy)",
  "Oracle Certified Agentic AI Foundations Associate"
];

export const achievements = [
  "Winner, Code with Gen AI, organized by CSI-PCE",
  "5-Star Rating in Python on HackerRank",
  "Website Team Member, IEEE PCE: built with HTML, CSS, JavaScript and React.js"
];

export const experience = [
  {
    "when": "Jun 2026 – Aug 2026",
    "title": "Agentic AI Intern",
    "where": "Pillai College of Engineering · Onsite",
    "pts": [
      "Developed AI-powered applications using Python, LLMs and Agentic AI to automate multi-step tasks.",
      "Designed multi-agent workflows for task planning, reasoning, information retrieval and autonomous decision-making.",
      "Implemented RAG pipelines using embeddings and vector databases for context-aware, knowledge-grounded responses.",
      "Built and tested applications with LangChain, LangGraph, Streamlit, APIs and prompt engineering."
    ]
  },
  {
    "when": "Apr 2026 – May 2026",
    "title": "AI and Data Analyst Intern",
    "where": "Xylofy AI · Remote",
    "pts": [
      "Performed data preprocessing, analysis and visualization to derive insights from business datasets.",
      "Assisted in developing machine learning workflows for data-driven business solutions.",
      "Created interactive dashboards and analytical reports to support decision-making.",
      "Applied Python, SQL, Excel and data visualization to analyze and present business insights."
    ]
  },
  {
    "when": "Mar 2026 – May 2026",
    "title": "App Testing Intern",
    "where": "Core Tattva",
    "pts": [
      "Performed manual testing of mobile application features to identify bugs and UI inconsistencies.",
      "Executed functional, usability and regression testing across multiple user flows.",
      "Documented defects with reproduction steps and collaborated with developers for issue resolution.",
      "Validated bug fixes and ensured stable app performance before release."
    ]
  }
];

export const projects = [
  {
    "title": "AstraChain",
    "tags": ["Python", "LLMs", "XGBoost", "FastAPI", "React"],
    "bg": "linear-gradient(135deg,#0ea5e9,#6366f1)",
    "img": astrachainImg,
    "pos": "left top",
    "pts": ["Built an **Agentic AI** supply chain intelligence platform combining **machine learning** with **LLM-powered agents** to automate demand forecasting, inventory analysis and decision-making.", "Architected a **multi-agent orchestration** workflow with specialised agents for **demand forecasting**, **inventory risk analysis** and **wastage management**.", "Implemented an **XGBoost** forecasting pipeline using historical sales, temporal, promotional, **weather** and **festival** features.", "Delivered **real-time insights** through a **FastAPI** and **React** app integrating AI workflows, models, APIs and databases."]
  },
  {
    "title": "Quizify",
    "tags": [
      "Python",
      "LLM",
      "RAG",
      "Streamlit"
    ],
    "bg": "linear-gradient(135deg,#8b2cf5,#1e90ff)",
    "img": quizifyImg,
    "pos": "center",
    "pts": ["Engineered an **LLM-powered multi-agent** learning platform that turns unstructured **educational PDFs** into personalised assessments and adaptive recommendations.", "Architected **4 specialised AI agents** (Content, Quiz, Evaluation, Recommendation) to automate extraction, question generation, evaluation and learner profiling.", "Built an **adaptive assessment pipeline** that analyses quiz outcomes and **knowledge gaps** to guide question difficulty and targeted revision.", "Developed an interactive **Streamlit** app for automated quiz generation, **real-time evaluation** and progress analysis."]
  },
  {
    "title": "ProjectFlow",
    "tags": [
      "React",
      "TypeScript",
      "FastAPI"
    ],
    "bg": "linear-gradient(135deg,#f7b267,#e0556f)",
    "img": projectflowImg,
    "pos": "left top",
    "link": "https://project-flow-rose.vercel.app/",
    "pts": ["Developed a full-stack **Jira-inspired project management** platform with issue tracking, **Kanban boards**, sprint planning, dashboards and reporting.", "Built a responsive **React + TypeScript** frontend using Tailwind CSS, TanStack Query, Axios and **dnd-kit** drag-and-drop.", "Engineered a **FastAPI** REST backend with **PostgreSQL**, SQLAlchemy, Alembic, **JWT authentication** and **role-based access control**.", "Integrated an **AI Assistant** using the **Claude API** for issue generation, sprint summaries and risk detection, with a heuristic fallback."]
  },
  {
    "title": "CineMatch AI",
    "tags": ["Python", "Machine Learning", "Scikit-learn", "Streamlit"],
    "bg": "linear-gradient(135deg,#e11d48,#7f1d1d)",
    "img": cinematchImg,
    "pos": "left top",
    "link": "https://tanishagit29-movie-recommendation-complete-app-b94tje.streamlit.app/",
    "pts": ["Engineered a **machine learning** movie recommendation system delivering **personalised suggestions** from movie similarity and user preferences.", "Implemented **data preprocessing**, **feature engineering** and **similarity-based** techniques to surface relevant movies.", "Developed and deployed an interactive **Streamlit** web app for a smooth, user-friendly movie discovery experience."]
  }
];

export const expertise = [
  { name: "Python & SQL", icon: "Python", pct: 90 },
  { name: "Data Analysis & Visualization (Pandas, Power BI)", icon: "Pandas", pct: 88 },
  { name: "Machine Learning (Scikit-learn, PyTorch, XGBoost)", icon: "scikit-learn", pct: 85 },
  { name: "React & JavaScript", icon: "React", pct: 82 },
  { name: "Agentic AI & LLMs (LangChain, RAG)", icon: "AI", pct: 85 },
];

export const traits = [
  { label: "Problem Solving", tone: "violet" },
  { label: "Analytical Thinking", tone: "cyan" },
  { label: "Leadership", tone: "amber" },
  { label: "Team Collaboration", tone: "green" },
  { label: "Continuous Learning", tone: "pink" },
  { label: "Data Storytelling", tone: "yellow" },
];
