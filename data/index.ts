export const navItems = [
  { name: "About", link: "/#about" },
  { name: "Projects", link: "/#projects" },
  { name: "Skills", link: "/#skills" },
  { name: "Education", link: "/#education" },
  { name: "Contact", link: "/#contact" },
];

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/13n-wnUf-IzaCLs19cG_mz2NHe8SFmxQVNgIPollxRAc/edit?usp=sharing";

export const skillGroups = [
  {
    title: "HR Operations",
    items: [
      "Candidate sourcing",
      "Screening",
      "Interview coordination",
      "Pipeline tracking",
    ],
  },
  {
    title: "Tools",
    items: ["Google Sheets", "Excel", "CRM", "HRMS Basics", "Google Docs"],
  },
  {
    title: "Communication",
    items: ["Email drafting", "Candidate follow-ups", "English", "Hindi"],
  },
  {
    title: "AI Tools",
    items: ["Claude", "Gemini"],
  },
];

export const gridItems = [
  {
    id: 1,
    title:
      "I run recruitment pipelines end-to-end — sourcing, screening, interviews, and a live hiring dashboard.",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "Based in Rewari, Haryana — open to hybrid and remote HR intern roles.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My HR toolkit",
    description: "Sheets · Excel · CRM · HRMS · Claude · Gemini",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "First-year BA student focused on people operations and recruitment.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },
  {
    id: 5,
    title:
      "Currently building structured hiring trackers — screening scores, interview rubrics, and selection dashboards.",
    description: "What I'm working on",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Looking for an HR intern?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    slug: "recruitment-tracker",
    title: "Recruitment Management Google Sheet",
    des: "A 6-tab Google Sheets tracker covering sourcing, screening, interviews, selection, and a live hiring dashboard for 9 HR intern candidates.",
    img: "/projects/sheets-tracker.svg",
    iconLists: [],
    link: SHEET_URL,
    stack: [
      "Google Sheets",
      "Excel",
      "Candidate tracking",
      "Sourcing",
      "Screening",
      "Dashboard",
    ],
    problem:
      "Needed one place to move HR intern candidates from first contact through screening, interviews, and a final decision without losing status or scores.",
    architecture: [
      "Six tabs: Candidate Tracker, Sourcing, Screening, Interview Evaluation, Final Selection, and Recruitment Dashboard.",
      "Logged candidates from LinkedIn, Indeed, and referrals with contact status and pipeline stage.",
      "Screening scores covered communication, recruitment knowledge, and Excel.",
      "Dashboard rolled up totals so the pipeline was visible at a glance.",
    ],
    decisions: [
      "Kept the whole process in Google Sheets so sourcing, scores, and status stay on one shared workbook.",
      "Separated sourcing from screening so contact outcome and skill scores are not mixed in one row.",
      "Used a dashboard tab for counts instead of scanning every row for totals.",
    ],
    metrics: [
      "9 candidates tracked, 8 contacted, 7 interviewed, 3 selected.",
    ],
  },
  {
    id: 2,
    slug: "interview-scorecard",
    title: "Interview Evaluation Scorecard",
    des: "A structured interview rubric scoring Communication, HR Knowledge, Problem Solving, and Confidence — used on 7 shortlisted interviews.",
    img: "/projects/excel-scorecard.svg",
    iconLists: [],
    link: SHEET_URL,
    stack: [
      "Google Sheets",
      "Interview scoring",
      "HR Knowledge",
      "Selection",
    ],
    problem:
      "Shortlisted candidates needed a consistent interview score so Selected / Rejected was based on the same four criteria, not memory.",
    architecture: [
      "Scorecard rates Communication, HR Knowledge, Problem Solving, and Confidence, each out of 5.",
      "Overall scores (14–17) and remarks feed the Final Selection tab.",
      "Joining dates are logged for hired candidates on the selection sheet.",
    ],
    decisions: [
      "Used a fixed four-criterion rubric so every interview is comparable.",
      "Recorded remarks next to the score to explain Selected vs Rejected.",
      "Moved only finalists onto a selection tab with joining dates.",
    ],
    metrics: [
      "7 shortlisted interviews scored.",
      "4 reached final selection; 3 were assigned joining dates.",
    ],
  },
];

export const education = [
  {
    id: 1,
    role: "Bachelor of Arts",
    company: "Indira Gandhi University",
    period: "June 2026 — Present",
    location: "Rewari, Haryana",
    thumbnail: "/exp1.svg",
    highlights: [
      "Course work — English, Political Science, Geography.",
    ],
  },
  {
    id: 2,
    role: "Class XII (Humanities), CBSE; 93%",
    company: "Pathfinder Global School",
    period: "2025 — 2026",
    location: "Rewari, Haryana",
    thumbnail: "/exp2.svg",
    highlights: [
      "Course work — English, Political Science, Geography.",
    ],
  },
  {
    id: 3,
    role: "Class X, CBSE; 79%",
    company: "Pathfinder Global School",
    period: "2023 — 2024",
    location: "Rewari, Haryana",
    thumbnail: "/exp3.svg",
    highlights: [],
  },
];

export const achievements = [
  {
    id: 1,
    title: "Block-level Drawing Championship",
    detail: "Winner",
  },
  {
    id: 2,
    title: "District-level Dance Competition",
    detail: "2nd position",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/link.svg",
    link: "https://www.linkedin.com/in/jiya-yadav17",
  },
  {
    id: 2,
    img: "/wha.svg",
    link: "https://wa.me/919053792722",
  },
];
