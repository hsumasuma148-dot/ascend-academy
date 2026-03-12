export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  instructor: string;
  instructorAvatar: string;
  instructorBio: string;
  thumbnail: string;
  category: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  price: number;
  originalPrice: number;
  duration: string;
  lessonCount: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  lessons: Lesson[];
  isBestseller?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  order: number;
  isPreview?: boolean;
}

export interface EnrolledCourse {
  courseId: string;
  progress: number;
  completedLessons: string[];
  enrolledAt: string;
}

export const categories = [
  "All",
  "Programming",
  "Data Science",
  "DevOps",
  "AI & ML",
  "Web Development",
  "Cloud Computing",
  "Cybersecurity",
];

export const courses: Course[] = [
  {
    id: "1",
    title: "Complete Python Bootcamp: From Zero to Hero",
    slug: "complete-python-bootcamp",
    description: "Learn Python like a professional. Start from the basics and go all the way to creating your own applications.",
    longDescription: "This comprehensive Python course takes you from absolute beginner to professional developer. You'll learn core Python concepts, object-oriented programming, web scraping, data analysis, and much more. With hands-on projects and real-world examples, you'll be coding confidently in no time.",
    instructor: "Dr. Sarah Chen",
    instructorAvatar: "",
    instructorBio: "PhD in Computer Science with 15+ years of teaching experience. Former Google engineer.",
    thumbnail: "",
    category: "Programming",
    rating: 4.8,
    reviewCount: 12450,
    studentCount: 89000,
    price: 14.99,
    originalPrice: 89.99,
    duration: "42 hours",
    lessonCount: 156,
    level: "Beginner",
    tags: ["Python", "Programming", "OOP"],
    isBestseller: true,
    lessons: [
      { id: "1-1", title: "Welcome & Course Overview", duration: "5:30", videoUrl: "", order: 1, isPreview: true },
      { id: "1-2", title: "Installing Python & Setup", duration: "12:00", videoUrl: "", order: 2, isPreview: true },
      { id: "1-3", title: "Variables and Data Types", duration: "18:45", videoUrl: "", order: 3 },
      { id: "1-4", title: "Strings and String Methods", duration: "22:10", videoUrl: "", order: 4 },
      { id: "1-5", title: "Numbers and Math Operations", duration: "15:30", videoUrl: "", order: 5 },
      { id: "1-6", title: "Lists and Tuples", duration: "25:00", videoUrl: "", order: 6 },
      { id: "1-7", title: "Dictionaries and Sets", duration: "20:15", videoUrl: "", order: 7 },
      { id: "1-8", title: "Control Flow: If Statements", duration: "18:00", videoUrl: "", order: 8 },
    ],
  },
  {
    id: "2",
    title: "SQL Masterclass: Database Management",
    slug: "sql-masterclass",
    description: "Master SQL from scratch. Learn to query databases, join tables, and write complex queries.",
    longDescription: "Become a SQL expert with this hands-on course. From basic SELECT statements to advanced window functions, CTEs, and performance optimization.",
    instructor: "James Rodriguez",
    instructorAvatar: "",
    instructorBio: "Senior Database Architect at Amazon. 10+ years of experience in data engineering.",
    thumbnail: "",
    category: "Data Science",
    rating: 4.7,
    reviewCount: 8920,
    studentCount: 65000,
    price: 12.99,
    originalPrice: 79.99,
    duration: "28 hours",
    lessonCount: 98,
    level: "Beginner",
    tags: ["SQL", "Database", "PostgreSQL"],
    isBestseller: true,
    lessons: [
      { id: "2-1", title: "Introduction to Databases", duration: "8:00", videoUrl: "", order: 1, isPreview: true },
      { id: "2-2", title: "Your First SQL Query", duration: "15:00", videoUrl: "", order: 2, isPreview: true },
      { id: "2-3", title: "WHERE Clause & Filtering", duration: "20:00", videoUrl: "", order: 3 },
      { id: "2-4", title: "ORDER BY and LIMIT", duration: "12:00", videoUrl: "", order: 4 },
      { id: "2-5", title: "Aggregate Functions", duration: "22:00", videoUrl: "", order: 5 },
      { id: "2-6", title: "GROUP BY and HAVING", duration: "18:00", videoUrl: "", order: 6 },
    ],
  },
  {
    id: "3",
    title: "Docker & Kubernetes: The Complete Guide",
    slug: "docker-kubernetes-guide",
    description: "Build, test, and deploy Docker applications with Kubernetes. Master container orchestration.",
    longDescription: "Learn Docker and Kubernetes from the ground up. This course covers containerization, Docker Compose, Kubernetes deployments, services, and production-ready configurations.",
    instructor: "Michael Park",
    instructorAvatar: "",
    instructorBio: "DevOps lead at Netflix. Kubernetes contributor and conference speaker.",
    thumbnail: "",
    category: "DevOps",
    rating: 4.9,
    reviewCount: 6780,
    studentCount: 42000,
    price: 16.99,
    originalPrice: 99.99,
    duration: "35 hours",
    lessonCount: 120,
    level: "Intermediate",
    tags: ["Docker", "Kubernetes", "DevOps"],
    lessons: [
      { id: "3-1", title: "What is Docker?", duration: "10:00", videoUrl: "", order: 1, isPreview: true },
      { id: "3-2", title: "Installing Docker", duration: "8:00", videoUrl: "", order: 2 },
      { id: "3-3", title: "Your First Container", duration: "20:00", videoUrl: "", order: 3 },
      { id: "3-4", title: "Dockerfile Deep Dive", duration: "25:00", videoUrl: "", order: 4 },
      { id: "3-5", title: "Docker Compose", duration: "30:00", videoUrl: "", order: 5 },
    ],
  },
  {
    id: "4",
    title: "Data Analytics with Python & Pandas",
    slug: "data-analytics-python",
    description: "Analyze real-world datasets using Python, Pandas, NumPy, and Matplotlib.",
    longDescription: "Master data analytics with Python. Learn to clean, transform, visualize, and derive insights from data using industry-standard tools.",
    instructor: "Dr. Emily Watson",
    instructorAvatar: "",
    instructorBio: "Data Scientist at Meta. PhD in Statistics from Stanford.",
    thumbnail: "",
    category: "Data Science",
    rating: 4.6,
    reviewCount: 5430,
    studentCount: 38000,
    price: 13.99,
    originalPrice: 84.99,
    duration: "32 hours",
    lessonCount: 110,
    level: "Intermediate",
    tags: ["Python", "Pandas", "Data Analysis"],
    isBestseller: true,
    lessons: [
      { id: "4-1", title: "Introduction to Data Analytics", duration: "12:00", videoUrl: "", order: 1, isPreview: true },
      { id: "4-2", title: "NumPy Fundamentals", duration: "25:00", videoUrl: "", order: 2 },
      { id: "4-3", title: "Pandas DataFrames", duration: "30:00", videoUrl: "", order: 3 },
      { id: "4-4", title: "Data Cleaning Techniques", duration: "28:00", videoUrl: "", order: 4 },
      { id: "4-5", title: "Data Visualization with Matplotlib", duration: "22:00", videoUrl: "", order: 5 },
    ],
  },
  {
    id: "5",
    title: "Artificial Intelligence & Machine Learning A-Z",
    slug: "ai-machine-learning",
    description: "Learn AI & ML from scratch. Build neural networks, train models, and deploy AI solutions.",
    longDescription: "Comprehensive AI and Machine Learning course covering supervised learning, unsupervised learning, deep learning, NLP, and computer vision with real-world projects.",
    instructor: "Prof. Alex Turner",
    instructorAvatar: "",
    instructorBio: "AI Research Lead at OpenAI. Published 50+ papers on deep learning.",
    thumbnail: "",
    category: "AI & ML",
    rating: 4.8,
    reviewCount: 9870,
    studentCount: 72000,
    price: 18.99,
    originalPrice: 129.99,
    duration: "48 hours",
    lessonCount: 180,
    level: "Intermediate",
    tags: ["AI", "Machine Learning", "Deep Learning"],
    lessons: [
      { id: "5-1", title: "What is AI?", duration: "15:00", videoUrl: "", order: 1, isPreview: true },
      { id: "5-2", title: "Python for ML", duration: "20:00", videoUrl: "", order: 2 },
      { id: "5-3", title: "Linear Regression", duration: "35:00", videoUrl: "", order: 3 },
      { id: "5-4", title: "Classification Algorithms", duration: "40:00", videoUrl: "", order: 4 },
      { id: "5-5", title: "Neural Networks Intro", duration: "45:00", videoUrl: "", order: 5 },
    ],
  },
  {
    id: "6",
    title: "React & TypeScript: Building Modern Web Apps",
    slug: "react-typescript",
    description: "Build production-ready web applications with React 18, TypeScript, and modern tooling.",
    longDescription: "Master React and TypeScript to build scalable, maintainable web applications. Covers hooks, context, routing, state management, testing, and deployment.",
    instructor: "Lisa Chang",
    instructorAvatar: "",
    instructorBio: "Staff Engineer at Vercel. React core contributor.",
    thumbnail: "",
    category: "Web Development",
    rating: 4.7,
    reviewCount: 7650,
    studentCount: 55000,
    price: 15.99,
    originalPrice: 94.99,
    duration: "38 hours",
    lessonCount: 135,
    level: "Intermediate",
    tags: ["React", "TypeScript", "Frontend"],
    isBestseller: true,
    lessons: [
      { id: "6-1", title: "React Fundamentals", duration: "18:00", videoUrl: "", order: 1, isPreview: true },
      { id: "6-2", title: "TypeScript Basics", duration: "22:00", videoUrl: "", order: 2 },
      { id: "6-3", title: "Components & Props", duration: "25:00", videoUrl: "", order: 3 },
      { id: "6-4", title: "State Management with Hooks", duration: "30:00", videoUrl: "", order: 4 },
      { id: "6-5", title: "React Router", duration: "20:00", videoUrl: "", order: 5 },
    ],
  },
  {
    id: "7",
    title: "AWS Cloud Practitioner Certification",
    slug: "aws-cloud-practitioner",
    description: "Prepare for the AWS Cloud Practitioner exam with hands-on labs and practice tests.",
    longDescription: "Complete preparation for the AWS Cloud Practitioner certification. Learn cloud computing concepts, AWS services, security, pricing, and architecture best practices.",
    instructor: "David Kim",
    instructorAvatar: "",
    instructorBio: "AWS Solutions Architect Professional. Cloud consultant for Fortune 500 companies.",
    thumbnail: "",
    category: "Cloud Computing",
    rating: 4.5,
    reviewCount: 4320,
    studentCount: 31000,
    price: 11.99,
    originalPrice: 69.99,
    duration: "22 hours",
    lessonCount: 85,
    level: "Beginner",
    tags: ["AWS", "Cloud", "Certification"],
    lessons: [
      { id: "7-1", title: "Cloud Computing Fundamentals", duration: "15:00", videoUrl: "", order: 1, isPreview: true },
      { id: "7-2", title: "AWS Global Infrastructure", duration: "20:00", videoUrl: "", order: 2 },
      { id: "7-3", title: "IAM & Security", duration: "25:00", videoUrl: "", order: 3 },
      { id: "7-4", title: "EC2 & Compute", duration: "30:00", videoUrl: "", order: 4 },
    ],
  },
  {
    id: "8",
    title: "Ethical Hacking & Cybersecurity",
    slug: "ethical-hacking",
    description: "Learn ethical hacking, penetration testing, and cybersecurity fundamentals.",
    longDescription: "Become a cybersecurity professional. Learn network security, vulnerability assessment, penetration testing, and ethical hacking techniques used by industry experts.",
    instructor: "Rachel Foster",
    instructorAvatar: "",
    instructorBio: "CISSP certified. Former cybersecurity analyst at the NSA.",
    thumbnail: "",
    category: "Cybersecurity",
    rating: 4.6,
    reviewCount: 3890,
    studentCount: 28000,
    price: 17.99,
    originalPrice: 109.99,
    duration: "40 hours",
    lessonCount: 145,
    level: "Advanced",
    tags: ["Cybersecurity", "Hacking", "Pentesting"],
    lessons: [
      { id: "8-1", title: "Intro to Ethical Hacking", duration: "12:00", videoUrl: "", order: 1, isPreview: true },
      { id: "8-2", title: "Networking Fundamentals", duration: "25:00", videoUrl: "", order: 2 },
      { id: "8-3", title: "Reconnaissance Techniques", duration: "30:00", videoUrl: "", order: 3 },
      { id: "8-4", title: "Vulnerability Scanning", duration: "28:00", videoUrl: "", order: 4 },
    ],
  },
];

export const enrolledCourses: EnrolledCourse[] = [
  { courseId: "1", progress: 65, completedLessons: ["1-1", "1-2", "1-3", "1-4", "1-5"], enrolledAt: "2024-01-15" },
  { courseId: "3", progress: 40, completedLessons: ["3-1", "3-2"], enrolledAt: "2024-02-01" },
  { courseId: "5", progress: 20, completedLessons: ["5-1"], enrolledAt: "2024-02-20" },
];

export const stats = [
  { label: "Students", value: "250K+" },
  { label: "Courses", value: "500+" },
  { label: "Instructors", value: "120+" },
  { label: "Countries", value: "80+" },
];
