import { harshitProfile, ProjectInfo } from './aiKnowledge';

export interface AIResponse {
  text: string;
  projects?: ProjectInfo[];
  showContactCTA?: boolean;
  isFallback?: boolean;
}

export async function askHarshitAI(query: string): Promise<AIResponse> {
  const trimmed = query.trim();
  const lower = trimmed.toLowerCase();

  // Check optional server API if configured via environment variable
  const apiUrl = import.meta.env.VITE_AI_API_URL;
  if (apiUrl) {
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: trimmed }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.response) {
          return { text: data.response, projects: data.projects, showContactCTA: data.showContactCTA };
        }
      }
    } catch (e) {
      console.warn('AI API endpoint unavailable, switching to local knowledge fallback:', e);
    }
  }

  // --- Local Fallback Engine ---

  // 1. Easter Eggs
  if (lower.includes('who created you') || lower.includes('who built you') || lower.includes('who made you')) {
    return {
      text: "You're talking to Harshit AI 🤖 — built for Harshit's developer portfolio.",
    };
  }

  if (lower.includes('sudo hire harshit') || lower.includes('sudo hire')) {
    return {
      text: "🚀 Checking developer profile...\n\n✓ Core & Advanced Java\n✓ Spring Boot & Spring MVC\n✓ REST APIs & Web Services\n✓ MySQL & JDBC Schema Design\n✓ 250+ DSA Problems Solved\n✓ Full Stack Project Experience\n\nProfile ready.\n\nWant to connect with Harshit?",
      showContactCTA: true,
    };
  }

  // 2. Who is Harshit / Summary / About
  if (
    lower.includes('who is harshit') ||
    lower.includes('about harshit') ||
    lower.includes('tell me about harshit') ||
    lower.includes('who are you') ||
    lower.includes('introduction') ||
    lower.includes('summary')
  ) {
    return {
      text: `Harshit Satti is a Java Backend Developer & Software Engineer pursuing B.Tech in Computer Science at COER University (CGPA: 7.00, 2023–2027).\n\n${harshitProfile.summary}\n\nHe is actively seeking Backend Developer / Software Engineer roles.`,
      showContactCTA: true,
    };
  }

  // 3. Projects
  if (
    lower.includes('project') ||
    lower.includes('built') ||
    lower.includes('work done') ||
    lower.includes('application') ||
    lower.includes('portfolio projects')
  ) {
    let matchedProjects = harshitProfile.projects;

    if (lower.includes('exam') || lower.includes('proctor') || lower.includes('servlet')) {
      matchedProjects = [harshitProfile.projects[1]];
    } else if (lower.includes('job') || lower.includes('portal') || lower.includes('recommendation')) {
      matchedProjects = [harshitProfile.projects[0]];
    }

    return {
      text: `Harshit has built full-stack backend applications with clean architecture and role-based security:\n\n1. **SmartJobPortal with AI-Based Recommendation Engine** (Spring Boot, React, MySQL, REST APIs)\n2. **AI-Powered Secure Online Examination System** (Java, Servlets, JSP, JDBC, MySQL)\n\nCheck out the project cards below for direct live demos:`,
      projects: matchedProjects,
      showContactCTA: true,
    };
  }

  // 4. Skills / Tech Stack
  if (
    lower.includes('skill') ||
    lower.includes('java') ||
    lower.includes('spring') ||
    lower.includes('tech') ||
    lower.includes('stack') ||
    lower.includes('framework') ||
    lower.includes('database') ||
    lower.includes('mysql') ||
    lower.includes('tool')
  ) {
    if (lower.includes('spring')) {
      return {
        text: `Harshit has strong backend expertise in **Spring Boot** and **Spring MVC**:\n\n• Built full-stack applications with Spring Boot RESTful APIs.\n• Implemented role-based authentication and authorization (Candidate, Recruiter, Admin).\n• Integrated JPA/Hibernate ORM with MySQL databases.\n• Hands-on experience with Kafka and H2 Database integration during his JPMorgan Chase virtual experience.`,
        projects: [harshitProfile.projects[0]],
      };
    }

    if (lower.includes('java')) {
      return {
        text: `Harshit specializes in **Core Java** and **Advanced Java**:\n\n• Frameworks: Spring Boot, Spring MVC, Hibernate ORM, Servlets, JSP, J2EE.\n• Certified in Java Foundations by Oracle (2026) and Java Bootcamp by LetsUpgrade (2025).\n• Solid understanding of OOP principles, Exception Handling, Multithreading, and Collections framework.`,
      };
    }

    return {
      text: `Here is a summary of Harshit's technical skill set:\n\n• **Languages:** Core Java, Advanced Java, SQL\n• **Backend Frameworks:** Spring Boot, Spring MVC, Hibernate ORM, Servlets, JSP, J2EE\n• **API Development:** REST APIs, RESTful Web Services, Postman\n• **Database:** MySQL, JDBC (Schema design, Normalization, Indexing)\n• **Core Concepts:** Data Structures & Algorithms (250+ solved), OOP, MVC Architecture, Multithreading\n• **Tools:** Git, GitHub, IntelliJ IDEA, VS Code, Eclipse, Postman`,
    };
  }

  // 5. DSA / Problem Solving / LeetCode
  if (
    lower.includes('dsa') ||
    lower.includes('leetcode') ||
    lower.includes('geeksforgeeks') ||
    lower.includes('gfg') ||
    lower.includes('problem solving') ||
    lower.includes('algorithm') ||
    lower.includes('data structure')
  ) {
    return {
      text: `Harshit has strong algorithmic and problem-solving skills:\n\n• Solved **250+ Data Structures & Algorithms (DSA)** problems on LeetCode and GeeksforGeeks.\n• Completed **160 Days DSA Certification** from GeeksforGeeks (2025).\n• Certified in **Problem Solving** on HackerRank (2025).\n• Strong foundation in arrays, linked lists, trees, graphs, dynamic programming, and OOP logic.`,
    };
  }

  // 6. Experience / Internship / Hackathon
  if (
    lower.includes('experience') ||
    lower.includes('intern') ||
    lower.includes('incodevision') ||
    lower.includes('jpmorgan') ||
    lower.includes('forage') ||
    lower.includes('hackathon') ||
    lower.includes('sih')
  ) {
    return {
      text: `Harshit's professional and virtual experience highlights:\n\n1. **Java Backend Developer Intern – IncodeVision** (April 2026 – June 2026):\n   Contributed to scalable backend services using Java, Spring Boot, REST APIs, and MySQL. Worked on API implementation, database integration, bug fixing, and team collaboration via Git/GitHub.\n\n2. **Software Engineering Virtual Experience – JPMorgan Chase & Co. (Forage)** (July 2026):\n   Completed job simulation tasks covering Project Setup, Kafka Integration, H2 Database Integration, and REST Controller development.\n\n3. **Internal Hackathon 6.0 (Smart India Hackathon 2025)** (Aug 2025):\n   Collaborated on competitive, time-bound problem solving and system design at COER University.`,
    };
  }

  // 7. Education / Degree / College
  if (
    lower.includes('education') ||
    lower.includes('college') ||
    lower.includes('university') ||
    lower.includes('degree') ||
    lower.includes('btech') ||
    lower.includes('b.tech') ||
    lower.includes('cgpa') ||
    lower.includes('coer')
  ) {
    return {
      text: `Harshit's Educational Background:\n\n• **Institution:** COER University, Roorkee, Uttarakhand\n• **Degree:** B.Tech in Computer Science & Engineering\n• **CGPA:** 7.00\n• **Duration:** 2023 – 2027`,
    };
  }

  // 8. Certifications
  if (
    lower.includes('certif') ||
    lower.includes('achievement') ||
    lower.includes('oracle') ||
    lower.includes('azure') ||
    lower.includes('guvi') ||
    lower.includes('mandi')
  ) {
    const list = harshitProfile.certifications
      .map((c, i) => `${i + 1}. **${c.title}** – ${c.issuer} (${c.year})`)
      .join('\n');
    return {
      text: `Harshit holds 7 key certifications:\n\n${list}`,
    };
  }

  // 9. Hire / Opportunity / Availability
  if (
    lower.includes('hire') ||
    lower.includes('available') ||
    lower.includes('opportunity') ||
    lower.includes('why') ||
    lower.includes('join') ||
    lower.includes('role')
  ) {
    return {
      text: `Harshit is **actively seeking Java Backend Developer & Software Engineer roles**.\n\nBased on his portfolio data, here is why he is a strong candidate:\n• Hands-on backend internship experience at IncodeVision.\n• Proven full-stack projects using Java, Spring Boot, REST APIs, and MySQL.\n• 250+ DSA problems solved on LeetCode & GeeksforGeeks.\n• Certified by Oracle, Microsoft Learn, GeeksforGeeks, and HackerRank.\n• Strong commitment to clean code, database optimization, and scalable backend architecture.`,
      showContactCTA: true,
    };
  }

  // 10. Contact / Email / Phone
  if (
    lower.includes('contact') ||
    lower.includes('email') ||
    lower.includes('phone') ||
    lower.includes('reach') ||
    lower.includes('linkedin') ||
    lower.includes('github') ||
    lower.includes('mail')
  ) {
    return {
      text: `You can reach Harshit directly through any of the following channels:\n\n• **Email:** [harshitsati30@gmail.com](mailto:harshitsati30@gmail.com)\n• **Phone:** +91 8755776798\n• **Location:** Roorkee, Uttarakhand, India\n• **LinkedIn:** [Harshit Satti on LinkedIn](${harshitProfile.linkedin})\n• **GitHub:** [har0028 on GitHub](${harshitProfile.github})`,
      showContactCTA: true,
    };
  }

  // Generic fallback if question cannot be answered from portfolio data
  return {
    text: "I don't have that information in my portfolio data. You can ask me about Harshit's skills, projects, internship experience, education, certifications, or how to contact him!",
    showContactCTA: true,
  };
}
