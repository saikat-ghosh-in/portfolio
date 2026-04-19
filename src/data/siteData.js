// ─── Profile ─────────────────────────────────────────────────────────────────
export const profile = {
  name: "Saikat Ghosh",
  title: "Java Developer & Full-Stack Engineer",
  tagline: "Building scalable backend systems with Java, Spring Boot & microservices — and shipping the frontend too.",
  about: [
    "I am a Java Developer with nearly 4 years of experience designing and delivering scalable backend systems using Java, Spring Boot, and JPA/Hibernate for retail enterprise platforms. I am highly proficient in REST API development, microservices architecture, and implementing secure authentication mechanisms like JWT and RBAC with Spring Security.",
    "In addition to my extensive backend expertise, I possess strong hands-on full-stack capabilities utilizing React and Redux Toolkit. I recently architected and deployed Mercato, a production-grade eCommerce platform complete with payment gateway integrations, demonstrating my ability to manage the full software development lifecycle from end to end.",
    "I am deeply committed to writing clean, maintainable code, adhering to SOLID principles, and building high-performance systems with a focus on enterprise-level reliability."
  ],
  email: "saikat.ghosh.in99@gmail.com",
  phone: "+91-9144510804",
  linkedin: "https://linkedin.com/in/ln-saikat",
  linkedinLabel: "linkedin.com/in/ln-saikat",
  github: "https://github.com/saikat-ghosh-in",
  location: "Kolkata, West Bengal, India",
  availableForWork: true,
};

// ─── Navigation Links ────────────────────────────────────────────────────────
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

// ─── Skills ──────────────────────────────────────────────────────────────────
export const skills = [
  {
    category: "Languages",
    icon: "code",
    items: ["Java (8, 11, 17)", "SQL"],
  },
  {
    category: "Frameworks",
    icon: "layers",
    items: ["Spring Boot", "Spring Security", "Hibernate", "JPA", "Apache Kafka"],
  },
  {
    category: "Frontend",
    icon: "layout",
    items: ["React", "Redux Toolkit", "JavaScript", "HTML", "CSS"],
  },
  {
    category: "Databases",
    icon: "database",
    items: ["PostgreSQL", "Microsoft SQL Server", "Azure SQL", "MongoDB"],
  },
  {
    category: "Cloud & DevOps",
    icon: "cloud",
    items: ["OCI", "Nginx", "Git", "Maven", "CI/CD", "Azure CLI"],
  },
  {
    category: "Methodologies",
    icon: "clipboard",
    items: ["Agile (Scrum)", "SOLID Principles", "Microservices", "Code Reviews"],
  },
];

// ─── Education ───────────────────────────────────────────────────────────────
export const education = [
  {
    id: 1,
    degree: "Bachelor of Technology — Civil Engineering",
    institution: "National Institute of Technology, Durgapur",
    period: "Aug 2018 - Jun 2022",
  },
];

// ─── Certifications ──────────────────────────────────────────────────────────
export const certifications = [
  {
    id: 1,
    title: "Java Spring Boot Full Stack",
    issuer: "Udemy",
    instructor: "Faisal Memon (EmbarX)",
    completedOn: "Feb 2026",
    note: "Comprehensive masterclass covering production-grade full-stack development — Spring Boot, Spring Security 7, JWT, JPA/Hibernate, REST APIs, React, PostgreSQL, and AWS deployment. Included advanced topics such as pagination, role and permission management, and Spring AI integration.",
    topics: [
      "Spring Boot & Spring Framework",
      "Spring Security 7 & JWT",
      "JPA / Hibernate",
      "REST API Development",
      "React (Full Stack)",
      "PostgreSQL & MySQL",
      // "AWS Deployment",
      // "Spring AI & Generative AI",
    ],
    url: "https://www.udemy.com/certificate/UC-82a9da08-486e-4dd8-9d27-027ab6ce0a49/",
  },
];

// ─── Contact Form Fields ─────────────────────────────────────────────────────
export const contactFields = [
  { id: "name", label: "Name", type: "text", placeholder: "Your name" },
  { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  { id: "message", label: "Message", type: "textarea", placeholder: "Your message…" },
];

// ─── Contact ─────────────────────────────────────────────────────────────────
export const contact = {
  text: "Have a project in mind or just want to say hi? Feel free to reach out via the form or through my social links.",
  links: [
    { icon: "mail", label: profile.email, url: `mailto:${profile.email}` },
    { icon: "location", label: profile.location },
  ],
  form: {
    fields: [
      { name: "name", label: "Name", type: "text", placeholder: "Your name" },
      { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
      { name: "message", label: "Message", type: "textarea", placeholder: "Your message…" },
    ],
    buttonText: "Send Message",
  },
};