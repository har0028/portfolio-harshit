export interface ProjectInfo {
  name: string;
  description: string;
  technologies: string[];
  focus: string;
  github?: string;
  liveDemo?: string;
}

export interface ExperienceInfo {
  type: string;
  title: string;
  company: string;
  period: string;
  tech: string[];
  bullets: string[];
}

export interface HarshitProfile {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  summary: string;
  availability: string;
  education: {
    institution: string;
    degree: string;
    cgpa: string;
    period: string;
  };
  skills: {
    languages: string[];
    backend: string[];
    apiDevelopment: string[];
    database: string[];
    coreConcepts: string[];
    tools: string[];
  };
  projects: ProjectInfo[];
  experiences: ExperienceInfo[];
  certifications: { title: string; issuer: string; year: string }[];
  dsaCount: string;
}

export const harshitProfile: HarshitProfile = {
  name: "Harshit Satti",
  role: "Java Backend Developer / Software Engineer",
  location: "Roorkee, Uttarakhand, India",
  email: "harshitsati30@gmail.com",
  phone: "+91 8755776798",
  github: "https://github.com/har0028",
  linkedin: "https://www.linkedin.com/in/harshit-satti-4629b3283/",
  resumeUrl: "/Harshit_Satti_Resume2026.pdf",
  summary:
    "Java backend developer with hands-on internship and project experience building full-stack web applications using Java, Spring Boot, Spring MVC, JDBC, Hibernate, and REST APIs. Solved 250+ Data Structures and Algorithms (DSA) problems on LeetCode and GeeksforGeeks, with a strong foundation in Object-Oriented Programming (OOP), MVC architecture, and MySQL database design.",
  availability: "Actively open for Java Backend Developer and Software Engineer roles.",
  education: {
    institution: "COER University (Roorkee, Uttarakhand)",
    degree: "B.Tech in Computer Science & Engineering",
    cgpa: "7.00",
    period: "2023 – 2027",
  },
  skills: {
    languages: ["Core Java", "Advanced Java", "SQL"],
    backend: ["Spring Boot", "Spring MVC", "Hibernate ORM", "Servlets", "JSP", "J2EE"],
    apiDevelopment: ["REST APIs", "RESTful Web Services", "Postman"],
    database: ["MySQL", "JDBC", "Schema Design", "Normalization", "Indexing Principles"],
    coreConcepts: [
      "Data Structures & Algorithms (DSA - 250+ solved)",
      "Object-Oriented Programming (OOP)",
      "MVC Architecture",
      "Exception Handling",
      "Multithreading",
    ],
    tools: ["Git", "GitHub", "IntelliJ IDEA", "VS Code", "Eclipse", "Postman"],
  },
  projects: [
    {
      name: "SmartJobPortal with AI-Based Recommendation Engine",
      description:
        "Full-stack job portal application using Spring Boot, React, MySQL, and REST APIs. Features separate candidate, recruiter, and admin workflows, role-based authentication, and an AI job recommendation feature backed by an optimized MySQL schema.",
      technologies: ["Spring Boot", "React", "MySQL", "REST APIs", "Git", "GitHub"],
      focus: "Role-based authentication & authorization, recommendation system, schema design",
      liveDemo: "https://smart-job-portal-web.onrender.com",
      github: "https://github.com/har0028",
    },
    {
      name: "AI-Powered Secure Online Examination System",
      description:
        "Built from scratch using Java, Servlets, JSP, JDBC, and MySQL. Features role-based dashboards, question delivery, automated result generation, and AI-based proctoring and anti-cheating checks to ensure exam integrity.",
      technologies: ["Java", "Servlets", "JSP", "JDBC", "MySQL"],
      focus: "Role-based authorization, proctoring algorithms, automated result generation",
      liveDemo: "https://ai-secure-exam-system.onrender.com/",
      github: "https://github.com/har0028",
    },
  ],
  experiences: [
    {
      type: "Internship",
      title: "Java Backend Developer Intern",
      company: "IncodeVision",
      period: "April 2026 – June 2026",
      tech: ["Java", "Spring Boot", "REST APIs", "MySQL", "Git", "GitHub"],
      bullets: [
        "Completed a 3-month internship contributing to scalable backend services using Java, Spring Boot, REST APIs, and MySQL.",
        "Worked on database integration, RESTful API implementation, bug fixing, and code optimization.",
        "Collaborated with the development team using Git and GitHub.",
      ],
    },
    {
      type: "Virtual Experience",
      title: "Software Engineering Virtual Experience",
      company: "JPMorgan Chase & Co. (Forage)",
      period: "July 2026",
      tech: ["Java", "Spring Boot", "Kafka", "H2 Database", "REST Controller"],
      bullets: [
        "Completed practical job-simulation tasks covering Project Setup, Kafka Integration, H2 Database Integration, REST API Integration, and REST API Controller development.",
      ],
    },
    {
      type: "Hackathon",
      title: "Internal Hackathon 6.0 (Smart India Hackathon 2025)",
      company: "Department of AI & ML and Cyber Security, COER University",
      period: "30 August 2025",
      tech: ["Problem Solving", "System Design", "Hackathon"],
      bullets: [
        "Actively participated in SIH 6.0 Hackathon, collaborating on problem-solving and solution design in a time-bound environment.",
      ],
    },
  ],
  certifications: [
    { title: "Java Foundations Certification", issuer: "Oracle", year: "2026" },
    { title: "Summer Training Certification", issuer: "HCL GUVI", year: "2026" },
    { title: "Java Bootcamp Certification", issuer: "LetsUpgrade", year: "2025" },
    { title: "160 Days DSA Certification", issuer: "GeeksforGeeks", year: "2025" },
    { title: "Drone Technology Bootcamp Certification", issuer: "IIT Mandi", year: "2025" },
    { title: "Problem Solving Certification", issuer: "HackerRank", year: "2025" },
    { title: "Choose the Right Azure Service for Deploying Your Java Application", issuer: "Microsoft Learn", year: "2026" },
  ],
  dsaCount: "250+ Data Structures & Algorithms problems solved on LeetCode and GeeksforGeeks",
};
