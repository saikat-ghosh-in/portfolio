const experience = [
  {
    id: 1,
    company: "Capgemini Technology Solutions India Limited",
    location: "Bengaluru, India",
    roles: [
      {
        title: "Senior Consultant",
        period: "Aug 2022 – Present",
        summary: "Focusing on production stability, system reliability, and proactive risk management in core retail services.",
        bullets: [
          "Eliminated a daily connection-reliability issue on a business-critical operations dashboard, by replacing a scheduled keep-alive workaround with a proper session-init fix.",
          "Collaborated across microservices boundaries, building and consuming REST APIs between independently deployed services on a retail platform.",
        ],
        tags: ["Java", "Session Management", "Production Stability", "Microservices", "REST APIs"],
      },
      {
        title: "Consultant",
        period: "Apr 2024 – Mar 2026",
        summary: "Led backend development for a large-scale retail platform, focusing on service scalability, API design, and production reliability.",
        bullets: [
          "Built and maintained scalable Java backend services using Spring Boot, Hibernate/JPA, and SQL Server for an enterprise retail platform, improving team productivity by 50% and reducing manual effort by 90%.",
          "Implemented authentication and authorization using Spring Security, JWT, and RBAC with audit logging for enterprise compliance.",
          "Built and optimized RESTful APIs for retail operations, and collaborated with clients on requirement analysis and solution design validation across project milestones.",
        ],
        tags: ["Java", "Spring Boot", "Hibernate/JPA", "SQL Server", "Spring Security", "JWT", "RBAC", "RESTful APIs"],
      },
      {
        title: "Associate Consultant",
        period: "Aug 2022 – Mar 2024",
        summary: "Built backend automation and data systems for a retail client, focused on reducing manual workflows and ensuring high availability.",
        bullets: [
          "Developed Java/Spring Boot backend automation for a retail client, reducing manual data processing by 40% and improving report generation speed by 60%.",
          "Wrote complex SQL queries and stored procedures on SQL Server to support reporting and data validation needs for retail stakeholders.",
        ],
        tags: ["Java", "Spring Boot", "SQL Server", "Stored Procedures", "Reporting", "JPA/Hibernate"],
      }
    ]
  }
];

export default experience;