/**
 * Portfolio content.
 * Edit the lists below to update the Skills, Projects and Experience sections;
 * main.js renders them automatically. No build step needed.
 */
window.PORTFOLIO_DATA = {
  /**
   * Skills, grouped into cards.
   * icon: one of "layout", "server", "database", "tool", "smartphone", "code"
   */
  skills: [
    {
      category: "Frontend",
      icon: "layout",
      items: ["HTML5", "CSS3 / Sass", "JavaScript (ES2023)", "TypeScript", "React", "Next.js", "Tailwind CSS"]
    },
    {
      category: "Backend",
      icon: "server",
      items: ["Node.js", "Express", "Python", "Django", "REST APIs", "GraphQL"]
    },
    {
      category: "Databases",
      icon: "database",
      items: ["PostgreSQL", "MongoDB", "Redis", "Firebase", "Prisma"]
    },
    {
      category: "Tools & DevOps",
      icon: "tool",
      items: ["Git & GitHub", "Docker", "CI/CD", "Linux", "Jest", "Figma"]
    }
  ],

  /**
   * Projects.
   * category: used for the filter buttons (projects sharing a category are grouped)
   * image:    optional path to a screenshot, e.g. "assets/images/projects/shopsphere.png".
   *           Without one, a colored preview is generated (tweak its color with `hue`, 0-360).
   * live / code: optional URLs; links are hidden when left empty.
   */
  projects: [
    {
      title: "ShopSphere",
      category: "Web",
      description: "A full-featured e-commerce platform with product search, cart, Stripe checkout and an admin dashboard for managing inventory.",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      image: "",
      hue: 250,
      live: "https://example.com",
      code: "https://github.com/your-username/shopsphere"
    },
    {
      title: "TaskFlow",
      category: "Web",
      description: "A real-time Kanban board for teams, with drag-and-drop tasks, comments, due-date reminders and live collaboration.",
      tags: ["Vue", "Firebase", "Tailwind CSS"],
      image: "",
      hue: 170,
      live: "https://example.com",
      code: "https://github.com/your-username/taskflow"
    },
    {
      title: "WeatherNow",
      category: "Mobile",
      description: "A clean, offline-friendly weather app with hourly forecasts, location search and severe-weather alerts.",
      tags: ["React Native", "Expo", "OpenWeather API"],
      image: "",
      hue: 200,
      live: "",
      code: "https://github.com/your-username/weathernow"
    },
    {
      title: "DevNotes CLI",
      category: "Open Source",
      description: "A command-line tool for writing, tagging and searching Markdown notes, with Git sync built in. 300+ stars on GitHub.",
      tags: ["Python", "Click", "SQLite"],
      image: "",
      hue: 25,
      live: "",
      code: "https://github.com/your-username/devnotes"
    },
    {
      title: "Pulse Analytics",
      category: "Web",
      description: "A privacy-first analytics dashboard with interactive charts, custom date ranges and CSV export.",
      tags: ["TypeScript", "Next.js", "D3.js"],
      image: "",
      hue: 290,
      live: "https://example.com",
      code: "https://github.com/your-username/pulse"
    },
    {
      title: "FitTrack",
      category: "Mobile",
      description: "A workout and habit tracker with streaks, progress charts and a library of guided routines.",
      tags: ["Flutter", "Dart", "Firebase"],
      image: "",
      hue: 340,
      live: "",
      code: "https://github.com/your-username/fittrack"
    }
  ],

  /**
   * Experience and education, newest first.
   */
  experience: [
    {
      role: "Senior Frontend Developer",
      company: "Company Name",
      location: "Remote",
      period: "2023 to Present",
      highlights: [
        "Lead a team of 4 building the customer-facing dashboard used by 50k+ users.",
        "Cut page load times by 40% through code-splitting and image optimisation.",
        "Introduced a shared component library and visual regression testing."
      ]
    },
    {
      role: "Full-Stack Developer",
      company: "Agency Name",
      location: "Your City",
      period: "2021 to 2023",
      highlights: [
        "Delivered 15+ client projects, from marketing sites to custom web apps.",
        "Built REST and GraphQL APIs with Node.js and PostgreSQL.",
        "Set up CI/CD pipelines that reduced release time from hours to minutes."
      ]
    },
    {
      role: "Junior Web Developer",
      company: "Startup Name",
      location: "Your City",
      period: "2019 to 2021",
      highlights: [
        "Developed responsive UI features in React for an early-stage SaaS product.",
        "Wrote unit and integration tests, raising coverage from 30% to 80%."
      ]
    },
    {
      role: "BSc Computer Science",
      company: "University Name",
      location: "Your City",
      period: "2015 to 2019",
      summary: "Graduated with honours. Final-year project: a real-time collaborative code editor."
    }
  ]
};
