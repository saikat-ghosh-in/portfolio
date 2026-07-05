const experience = [
  {
    id: 1,
    company: "Capgemini Technology Solutions India Limited",
    location: "Kolkata, West Bengal",
    roles: [
      {
        title: "Senior Consultant",
        period: "Apr 2026 - Present",
        summary: "Focusing on production stability, system reliability, and proactive risk management in core retail services.",
        bullets: [
          "Eliminated a daily connection-reliability issue on a business-critical operations dashboard, by replacing a scheduled keep-alive workaround with a proper session-init fix.",
          "Proactively resolved a subtle dependency-management bug in core services before it caused a production incident, improving code reliability and reducing future maintenance risk for the team.",
        ],
        tags: ["Java", "Session Management", "Production Stability", "Dependency Management", "Core Services"],
      },
      {
        title: "Consultant",
        period: "Apr 2024 - Mar 2026",
        summary: "Led backend development for a large-scale retail platform, focusing on service scalability, API design, and production reliability.",
        bullets: [
          "Built and maintained scalable Java backend services using Spring Boot, Hibernate/JPA, and SQL Server for an enterprise retail platform, improving team productivity by 50% and reducing manual effort by 90%.",
          "Implemented authentication and authorization using Spring Security, JWT, and RBAC with audit logging for enterprise compliance.",
          "Led code reviews and root cause analysis for production issues, ensuring system stability and SLA-compliant delivery.",
          "Built and optimized RESTful APIs for retail operations, and collaborated with clients on requirement analysis and solution design validation across project milestones.",
        ],
        tags: ["Java", "Spring Boot", "Hibernate/JPA", "SQL Server", "Spring Security", "JWT", "RBAC", "RESTful APIs", "Client Collaboration"],
      },
      {
        title: "Associate Consultant",
        period: "Aug 2022 - Mar 2024",
        summary: "Built backend automation and data systems for a retail client, focused on reducing manual workflows and ensuring high availability of production systems.",
        bullets: [
          "Developed Java/Spring Boot backend automation for a retail client, reducing manual data processing by 40% and improving report generation speed by 60%.",
          "Built JPA/Hibernate-based data extraction and reporting systems, achieving 99.8% data accuracy and 99.9% production uptime.",
          "Maintained production systems and resolved critical issues within SLA timelines, reducing downtime by 25% through proactive monitoring.",
        ],
        tags: ["Java", "Spring Boot", "JPA/Hibernate", "Database Reporting", "Production Support", "Proactive Monitoring", "SLA Compliance"],
      }
    ]
  }
];

export default experience;