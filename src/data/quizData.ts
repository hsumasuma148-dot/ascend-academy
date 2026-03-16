export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface CourseQuiz {
  courseId: string;
  questions: QuizQuestion[];
}

const quizzes: CourseQuiz[] = [
  {
    courseId: "1",
    questions: [
      { id: "q1-1", question: "What is the correct file extension for Python files?", options: [".py", ".python", ".pt", ".pn"], correctIndex: 0 },
      { id: "q1-2", question: "Which keyword is used to define a function in Python?", options: ["function", "func", "def", "define"], correctIndex: 2 },
      { id: "q1-3", question: "What data type is the result of: type(3.14)?", options: ["int", "float", "str", "double"], correctIndex: 1 },
      { id: "q1-4", question: "Which of these is a mutable data structure?", options: ["Tuple", "String", "List", "Frozenset"], correctIndex: 2 },
      { id: "q1-5", question: "How do you start a comment in Python?", options: ["//", "/*", "#", "--"], correctIndex: 2 },
    ],
  },
  {
    courseId: "2",
    questions: [
      { id: "q2-1", question: "Which SQL statement is used to retrieve data?", options: ["GET", "FETCH", "SELECT", "RETRIEVE"], correctIndex: 2 },
      { id: "q2-2", question: "Which clause filters rows in SQL?", options: ["FILTER", "WHERE", "HAVING", "MATCH"], correctIndex: 1 },
      { id: "q2-3", question: "What does COUNT(*) return?", options: ["Sum of values", "Number of rows", "Average", "Max value"], correctIndex: 1 },
      { id: "q2-4", question: "Which JOIN returns all rows from both tables?", options: ["INNER JOIN", "LEFT JOIN", "FULL OUTER JOIN", "CROSS JOIN"], correctIndex: 2 },
      { id: "q2-5", question: "What keyword sorts results in descending order?", options: ["SORT DESC", "ORDER DESC", "DESC", "DESCENDING"], correctIndex: 2 },
    ],
  },
  {
    courseId: "3",
    questions: [
      { id: "q3-1", question: "What is a Docker container?", options: ["A virtual machine", "A lightweight isolated process", "A database", "A network"], correctIndex: 1 },
      { id: "q3-2", question: "Which file defines a Docker image?", options: ["docker.yaml", "Dockerfile", "container.json", "image.xml"], correctIndex: 1 },
      { id: "q3-3", question: "What command runs a Docker container?", options: ["docker start", "docker run", "docker exec", "docker build"], correctIndex: 1 },
      { id: "q3-4", question: "What does Kubernetes primarily manage?", options: ["Databases", "Containers", "Networks", "Storage"], correctIndex: 1 },
      { id: "q3-5", question: "What is a Kubernetes Pod?", options: ["A cluster", "A service", "Smallest deployable unit", "A volume"], correctIndex: 2 },
    ],
  },
  {
    courseId: "4",
    questions: [
      { id: "q4-1", question: "Which library is used for DataFrames in Python?", options: ["NumPy", "Matplotlib", "Pandas", "SciPy"], correctIndex: 2 },
      { id: "q4-2", question: "What does df.head() do?", options: ["Shows last 5 rows", "Shows first 5 rows", "Shows all rows", "Shows column names"], correctIndex: 1 },
      { id: "q4-3", question: "Which function creates a NumPy array?", options: ["np.list()", "np.array()", "np.create()", "np.make()"], correctIndex: 1 },
      { id: "q4-4", question: "What does df.dropna() do?", options: ["Fills missing values", "Removes duplicates", "Removes rows with missing values", "Sorts data"], correctIndex: 2 },
      { id: "q4-5", question: "Which library is used for plotting?", options: ["Pandas", "NumPy", "Matplotlib", "Scikit-learn"], correctIndex: 2 },
    ],
  },
  {
    courseId: "5",
    questions: [
      { id: "q5-1", question: "What does ML stand for?", options: ["Meta Learning", "Machine Logic", "Machine Learning", "Model Learning"], correctIndex: 2 },
      { id: "q5-2", question: "Which is a supervised learning algorithm?", options: ["K-Means", "Linear Regression", "PCA", "Autoencoders"], correctIndex: 1 },
      { id: "q5-3", question: "What is overfitting?", options: ["Model too simple", "Model too complex for training data", "Model not trained", "Data is clean"], correctIndex: 1 },
      { id: "q5-4", question: "What activation function outputs 0 or 1?", options: ["ReLU", "Sigmoid", "Tanh", "Softmax"], correctIndex: 1 },
      { id: "q5-5", question: "What is a neural network layer that connects every neuron?", options: ["Convolutional", "Recurrent", "Dense/Fully Connected", "Pooling"], correctIndex: 2 },
    ],
  },
  {
    courseId: "6",
    questions: [
      { id: "q6-1", question: "What hook manages state in React?", options: ["useEffect", "useState", "useRef", "useMemo"], correctIndex: 1 },
      { id: "q6-2", question: "What is JSX?", options: ["A database", "JavaScript XML syntax", "A CSS framework", "A test tool"], correctIndex: 1 },
      { id: "q6-3", question: "What does useEffect do?", options: ["Manages state", "Handles side effects", "Creates refs", "Optimizes renders"], correctIndex: 1 },
      { id: "q6-4", question: "What is TypeScript?", options: ["A CSS preprocessor", "A typed superset of JavaScript", "A database", "A bundler"], correctIndex: 1 },
      { id: "q6-5", question: "How do you pass data to a child component?", options: ["State", "Props", "Context only", "Refs"], correctIndex: 1 },
    ],
  },
];

// Fallback generic quiz for courses without specific quizzes
const genericQuiz: QuizQuestion[] = [
  { id: "qg-1", question: "What is the main purpose of this course?", options: ["Entertainment", "Learning new skills", "Social media", "Gaming"], correctIndex: 1 },
  { id: "qg-2", question: "What is the best way to learn effectively?", options: ["Watch only", "Practice hands-on", "Skip lessons", "Read summaries only"], correctIndex: 1 },
  { id: "qg-3", question: "Why are projects important in learning?", options: ["Not important", "Apply knowledge practically", "Waste of time", "Only for grades"], correctIndex: 1 },
  { id: "qg-4", question: "What should you do when stuck on a concept?", options: ["Give up", "Skip it forever", "Review and practice again", "Ignore it"], correctIndex: 2 },
  { id: "qg-5", question: "What indicates course mastery?", options: ["Watching videos", "Completing quizzes and projects", "Bookmarking pages", "Sharing links"], correctIndex: 1 },
];

export const getQuizForCourse = (courseId: string): QuizQuestion[] => {
  const found = quizzes.find((q) => q.courseId === courseId);
  return found ? found.questions : genericQuiz;
};
