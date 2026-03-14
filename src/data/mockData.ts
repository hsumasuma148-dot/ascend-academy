export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  instructor: string;
  instructorId: string;
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

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  expertise: string[];
  bio: string;
  longBio: string;
  courseCount: number;
  studentCount: number;
  rating: number;
  reviewCount: number;
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

export const instructors: Instructor[] = [
  {
    id: "ins-1",
    name: "Rahul Sharma",
    avatar: "https://i.pravatar.cc/150?img=11",
    expertise: ["Python", "Programming", "OOP"],
    bio: "Senior Python developer with 12+ years of experience. Passionate about teaching clean code and software design.",
    longBio: "Rahul Sharma is a senior Python developer who has trained over 50,000 students worldwide. With 12+ years of industry experience at top tech companies, he makes complex programming concepts simple and practical.",
    courseCount: 5,
    studentCount: 89000,
    rating: 4.8,
    reviewCount: 12450,
  },
  {
    id: "ins-2",
    name: "Priya Verma",
    avatar: "https://i.pravatar.cc/150?img=5",
    expertise: ["Data Science", "Python", "Pandas"],
    bio: "Data Scientist at Google. PhD in Statistics from IIT Delhi.",
    longBio: "Priya Verma is a Data Scientist at Google with a PhD in Statistics. She specializes in data analytics and machine learning, helping thousands of students transform raw data into actionable insights.",
    courseCount: 4,
    studentCount: 65000,
    rating: 4.7,
    reviewCount: 8920,
  },
  {
    id: "ins-3",
    name: "Arjun Patel",
    avatar: "https://i.pravatar.cc/150?img=12",
    expertise: ["React", "TypeScript", "Web Development"],
    bio: "Full-stack developer and open-source contributor. 10+ years building modern web apps.",
    longBio: "Arjun Patel is a full-stack developer and open-source contributor with over a decade of experience building scalable web applications using React, Node.js, and TypeScript.",
    courseCount: 4,
    studentCount: 55000,
    rating: 4.9,
    reviewCount: 7650,
  },
  {
    id: "ins-4",
    name: "Sneha Reddy",
    avatar: "https://i.pravatar.cc/150?img=9",
    expertise: ["AI", "Machine Learning", "Deep Learning"],
    bio: "AI Research Lead with 50+ published papers on deep learning and neural networks.",
    longBio: "Sneha Reddy leads AI research and has published over 50 peer-reviewed papers on deep learning. Her courses bridge the gap between cutting-edge research and practical implementation.",
    courseCount: 6,
    studentCount: 72000,
    rating: 4.8,
    reviewCount: 9870,
  },
  {
    id: "ins-5",
    name: "Vikram Singh",
    avatar: "https://i.pravatar.cc/150?img=53",
    expertise: ["Docker", "Kubernetes", "DevOps"],
    bio: "DevOps lead at a major tech company. Kubernetes contributor and conference speaker.",
    longBio: "Vikram Singh is a DevOps Lead and active contributor to the Kubernetes open-source project. He teaches container orchestration and modern deployment practices with clarity and depth.",
    courseCount: 3,
    studentCount: 42000,
    rating: 4.7,
    reviewCount: 6780,
  },
  {
    id: "ins-6",
    name: "Anita Desai",
    avatar: "https://i.pravatar.cc/150?img=23",
    expertise: ["SQL", "Database", "Data Engineering"],
    bio: "Senior Database Architect with 10+ years in data engineering and analytics.",
    longBio: "Anita Desai is a Senior Database Architect with a passion for teaching SQL and data engineering. She helps students master databases from fundamentals to advanced optimization.",
    courseCount: 3,
    studentCount: 38000,
    rating: 4.6,
    reviewCount: 5430,
  },
  {
    id: "ins-7",
    name: "Karan Mehta",
    avatar: "https://i.pravatar.cc/150?img=59",
    expertise: ["AWS", "Cloud Computing", "DevOps"],
    bio: "AWS Solutions Architect Professional. Cloud consultant for Fortune 500 companies.",
    longBio: "Karan Mehta is an AWS Solutions Architect Professional and a cloud consultant who has helped Fortune 500 companies migrate to the cloud.",
    courseCount: 3,
    studentCount: 31000,
    rating: 4.5,
    reviewCount: 4320,
  },
  {
    id: "ins-8",
    name: "Meera Joshi",
    avatar: "https://i.pravatar.cc/150?img=32",
    expertise: ["Cybersecurity", "Ethical Hacking", "Pentesting"],
    bio: "CISSP certified cybersecurity expert and ethical hacking instructor.",
    longBio: "Meera Joshi is a CISSP-certified cybersecurity expert who teaches ethical hacking and penetration testing with real-world scenarios, preparing students for careers in cybersecurity.",
    courseCount: 2,
    studentCount: 28000,
    rating: 4.6,
    reviewCount: 3890,
  },
];

export const courses: Course[] = [
  {
    id: "1",
    title: "Complete Python Bootcamp: From Zero to Hero",
    slug: "complete-python-bootcamp",
    description: "Learn Python like a professional. Start from the basics and go all the way to creating your own applications.",
    longDescription: "This comprehensive Python course takes you from absolute beginner to professional developer. You'll learn core Python concepts, object-oriented programming, web scraping, data analysis, and much more. With hands-on projects and real-world examples, you'll be coding confidently in no time.",
    instructor: "Rahul Sharma",
    instructorId: "ins-1",
    instructorAvatar: "https://i.pravatar.cc/150?img=11",
    instructorBio: "Senior Python developer with 12+ years of experience. Passionate about teaching clean code and software design.",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
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
      { id: "1-1", title: "Welcome & Course Overview", duration: "5:30", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8", order: 1, isPreview: true },
      { id: "1-2", title: "Installing Python & Setup", duration: "12:00", videoUrl: "https://www.youtube.com/embed/YYXdXT2l-Gg", order: 2, isPreview: true },
      { id: "1-3", title: "Variables and Data Types", duration: "18:45", videoUrl: "https://www.youtube.com/embed/cQT33yu9pY8", order: 3 },
      { id: "1-4", title: "Strings and String Methods", duration: "22:10", videoUrl: "https://www.youtube.com/embed/k9TUPpGqYTo", order: 4 },
      { id: "1-5", title: "Numbers and Math Operations", duration: "15:30", videoUrl: "https://www.youtube.com/embed/khKv-8q7YmY", order: 5 },
      { id: "1-6", title: "Lists and Tuples", duration: "25:00", videoUrl: "https://www.youtube.com/embed/W8KRzm-HUcc", order: 6 },
      { id: "1-7", title: "Dictionaries and Sets", duration: "20:15", videoUrl: "https://www.youtube.com/embed/daefaLgNkw0", order: 7 },
      { id: "1-8", title: "Control Flow: If Statements", duration: "18:00", videoUrl: "https://www.youtube.com/embed/DZwmZ8Usvnk", order: 8 },
    ],
  },
  {
    id: "2",
    title: "SQL Masterclass: Database Management",
    slug: "sql-masterclass",
    description: "Master SQL from scratch. Learn to query databases, join tables, and write complex queries.",
    longDescription: "Become a SQL expert with this hands-on course. From basic SELECT statements to advanced window functions, CTEs, and performance optimization.",
    instructor: "Anita Desai",
    instructorId: "ins-6",
    instructorAvatar: "https://i.pravatar.cc/150?img=23",
    instructorBio: "Senior Database Architect with 10+ years in data engineering and analytics.",
    thumbnail: "https://picsum.photos/seed/sql/400/250",
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
      { id: "2-1", title: "Introduction to Databases", duration: "8:00", videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY", order: 1, isPreview: true },
      { id: "2-2", title: "Your First SQL Query", duration: "15:00", videoUrl: "https://www.youtube.com/embed/7S_tz1z_5bA", order: 2, isPreview: true },
      { id: "2-3", title: "WHERE Clause & Filtering", duration: "20:00", videoUrl: "https://www.youtube.com/embed/nWeW3sCmD2k", order: 3 },
      { id: "2-4", title: "ORDER BY and LIMIT", duration: "12:00", videoUrl: "https://www.youtube.com/embed/swR33jGWvmg", order: 4 },
      { id: "2-5", title: "Aggregate Functions", duration: "22:00", videoUrl: "https://www.youtube.com/embed/G3e-cpL7ofc", order: 5 },
      { id: "2-6", title: "GROUP BY and HAVING", duration: "18:00", videoUrl: "https://www.youtube.com/embed/QpdhBUYk7Kk", order: 6 },
    ],
  },
  {
    id: "3",
    title: "Docker & Kubernetes: The Complete Guide",
    slug: "docker-kubernetes-guide",
    description: "Build, test, and deploy Docker applications with Kubernetes. Master container orchestration.",
    longDescription: "Learn Docker and Kubernetes from the ground up. This course covers containerization, Docker Compose, Kubernetes deployments, services, and production-ready configurations.",
    instructor: "Vikram Singh",
    instructorId: "ins-5",
    instructorAvatar: "https://i.pravatar.cc/150?img=53",
    instructorBio: "DevOps lead at a major tech company. Kubernetes contributor and conference speaker.",
    thumbnail: "https://picsum.photos/seed/docker/400/250",
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
      { id: "3-1", title: "What is Docker?", duration: "10:00", videoUrl: "https://www.youtube.com/embed/Gjnup-PuquQ", order: 1, isPreview: true },
      { id: "3-2", title: "Installing Docker", duration: "8:00", videoUrl: "https://www.youtube.com/embed/pTFZFxd4hOI", order: 2 },
      { id: "3-3", title: "Your First Container", duration: "20:00", videoUrl: "https://www.youtube.com/embed/gAkwW2tuIqE", order: 3 },
      { id: "3-4", title: "Dockerfile Deep Dive", duration: "25:00", videoUrl: "https://www.youtube.com/embed/WmcdMiyqfZs", order: 4 },
      { id: "3-5", title: "Docker Compose", duration: "30:00", videoUrl: "https://www.youtube.com/embed/HG6yIjZapSA", order: 5 },
    ],
  },
  {
    id: "4",
    title: "Data Analytics with Python & Pandas",
    slug: "data-analytics-python",
    description: "Analyze real-world datasets using Python, Pandas, NumPy, and Matplotlib.",
    longDescription: "Master data analytics with Python. Learn to clean, transform, visualize, and derive insights from data using industry-standard tools.",
    instructor: "Priya Verma",
    instructorId: "ins-2",
    instructorAvatar: "https://i.pravatar.cc/150?img=5",
    instructorBio: "Data Scientist at Google. PhD in Statistics from IIT Delhi.",
    thumbnail: "https://picsum.photos/seed/datascience/400/250",
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
      { id: "4-1", title: "Introduction to Data Analytics", duration: "12:00", videoUrl: "https://www.youtube.com/embed/r-uOLxNrNk8", order: 1, isPreview: true },
      { id: "4-2", title: "NumPy Fundamentals", duration: "25:00", videoUrl: "https://www.youtube.com/embed/QUT1VHiLmmI", order: 2 },
      { id: "4-3", title: "Pandas DataFrames", duration: "30:00", videoUrl: "https://www.youtube.com/embed/vmEHCJofslg", order: 3 },
      { id: "4-4", title: "Data Cleaning Techniques", duration: "28:00", videoUrl: "https://www.youtube.com/embed/bDhvCp3_lYw", order: 4 },
      { id: "4-5", title: "Data Visualization with Matplotlib", duration: "22:00", videoUrl: "https://www.youtube.com/embed/3Xc3CA655Y4", order: 5 },
    ],
  },
  {
    id: "5",
    title: "Artificial Intelligence & Machine Learning A-Z",
    slug: "ai-machine-learning",
    description: "Learn AI & ML from scratch. Build neural networks, train models, and deploy AI solutions.",
    longDescription: "Comprehensive AI and Machine Learning course covering supervised learning, unsupervised learning, deep learning, NLP, and computer vision with real-world projects.",
    instructor: "Sneha Reddy",
    instructorId: "ins-4",
    instructorAvatar: "https://i.pravatar.cc/150?img=9",
    instructorBio: "AI Research Lead with 50+ published papers on deep learning and neural networks.",
    thumbnail: "https://picsum.photos/seed/deeplearning/400/250",
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
      { id: "5-1", title: "What is AI?", duration: "15:00", videoUrl: "https://www.youtube.com/embed/ad79nYk2keg", order: 1, isPreview: true },
      { id: "5-2", title: "Python for ML", duration: "20:00", videoUrl: "https://www.youtube.com/embed/7eh4d6sabA0", order: 2 },
      { id: "5-3", title: "Linear Regression", duration: "35:00", videoUrl: "https://www.youtube.com/embed/nk2CQITm_eo", order: 3 },
      { id: "5-4", title: "Classification Algorithms", duration: "40:00", videoUrl: "https://www.youtube.com/embed/yIYKR4sgzI8", order: 4 },
      { id: "5-5", title: "Neural Networks Intro", duration: "45:00", videoUrl: "https://www.youtube.com/embed/aircAruvnKk", order: 5 },
    ],
  },
  {
    id: "6",
    title: "React & TypeScript: Building Modern Web Apps",
    slug: "react-typescript",
    description: "Build production-ready web applications with React 18, TypeScript, and modern tooling.",
    longDescription: "Master React and TypeScript to build scalable, maintainable web applications. Covers hooks, context, routing, state management, testing, and deployment.",
    instructor: "Arjun Patel",
    instructorId: "ins-3",
    instructorAvatar: "https://i.pravatar.cc/150?img=12",
    instructorBio: "Full-stack developer and open-source contributor. 10+ years building modern web apps.",
    thumbnail: "https://picsum.photos/seed/react/400/250",
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
      { id: "6-1", title: "React Fundamentals", duration: "18:00", videoUrl: "https://www.youtube.com/embed/Tn6-PIqc4UM", order: 1, isPreview: true },
      { id: "6-2", title: "TypeScript Basics", duration: "22:00", videoUrl: "https://www.youtube.com/embed/BwuLxPH8IDs", order: 2 },
      { id: "6-3", title: "Components & Props", duration: "25:00", videoUrl: "https://www.youtube.com/embed/PHaECbrKgs0", order: 3 },
      { id: "6-4", title: "State Management with Hooks", duration: "30:00", videoUrl: "https://www.youtube.com/embed/O6P86uwfdR0", order: 4 },
      { id: "6-5", title: "React Router", duration: "20:00", videoUrl: "https://www.youtube.com/embed/Law7wfdg_ls", order: 5 },
    ],
  },
  {
    id: "7",
    title: "AWS Cloud Practitioner Certification",
    slug: "aws-cloud-practitioner",
    description: "Prepare for the AWS Cloud Practitioner exam with hands-on labs and practice tests.",
    longDescription: "Complete preparation for the AWS Cloud Practitioner certification. Learn cloud computing concepts, AWS services, security, pricing, and architecture best practices.",
    instructor: "Karan Mehta",
    instructorId: "ins-7",
    instructorAvatar: "https://i.pravatar.cc/150?img=59",
    instructorBio: "AWS Solutions Architect Professional. Cloud consultant for Fortune 500 companies.",
    thumbnail: "https://picsum.photos/seed/aws/400/250",
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
      { id: "7-1", title: "Cloud Computing Fundamentals", duration: "15:00", videoUrl: "https://www.youtube.com/embed/3hLmDS179YE", order: 1, isPreview: true },
      { id: "7-2", title: "AWS Global Infrastructure", duration: "20:00", videoUrl: "https://www.youtube.com/embed/r4YIdn2eTm4", order: 2 },
      { id: "7-3", title: "IAM & Security", duration: "25:00", videoUrl: "https://www.youtube.com/embed/iF9fs8Rby4U", order: 3 },
      { id: "7-4", title: "EC2 & Compute", duration: "30:00", videoUrl: "https://www.youtube.com/embed/TsRBftzZsQo", order: 4 },
    ],
  },
  {
    id: "8",
    title: "Ethical Hacking & Cybersecurity",
    slug: "ethical-hacking",
    description: "Learn ethical hacking, penetration testing, and cybersecurity fundamentals.",
    longDescription: "Become a cybersecurity professional. Learn network security, vulnerability assessment, penetration testing, and ethical hacking techniques used by industry experts.",
    instructor: "Meera Joshi",
    instructorId: "ins-8",
    instructorAvatar: "https://i.pravatar.cc/150?img=32",
    instructorBio: "CISSP certified cybersecurity expert and ethical hacking instructor.",
    thumbnail: "https://picsum.photos/seed/security/400/250",
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
      { id: "8-1", title: "Intro to Ethical Hacking", duration: "12:00", videoUrl: "https://www.youtube.com/embed/3Kq1MIfTWCE", order: 1, isPreview: true },
      { id: "8-2", title: "Networking Fundamentals", duration: "25:00", videoUrl: "https://www.youtube.com/embed/qiQR5rTSshw", order: 2 },
      { id: "8-3", title: "Reconnaissance Techniques", duration: "30:00", videoUrl: "https://www.youtube.com/embed/vhCaa2FWJJo", order: 3 },
      { id: "8-4", title: "Vulnerability Scanning", duration: "28:00", videoUrl: "https://www.youtube.com/embed/mB8MPvl2wx4", order: 4 },
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
