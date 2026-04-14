import { Link, Navigate } from "react-router-dom";
import { BookOpen, Clock, Award, TrendingUp, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { courses, enrolledCourses } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  const { purchasedCourseIds } = useCart();

  // Merge pre-enrolled + purchased courses
  const allEnrolledIds = [...new Set([...enrolledCourses.map((e) => e.courseId), ...purchasedCourseIds])];

  const enrolled = allEnrolledIds
    .map((id) => {
      const course = courses.find((c) => c.id === id);
      if (!course) return null;
      const ec = enrolledCourses.find((e) => e.courseId === id);

      // Read localStorage-aware completed lessons
      const storageKey = user ? `lms_lessons_${user.id}_${id}` : null;
      let completedLessons: string[] = ec?.completedLessons ?? [];
      if (storageKey) {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          try {
            completedLessons = JSON.parse(stored);
          } catch { /* use default */ }
        }
      }

      const progress = course.lessons.length > 0
        ? Math.round((completedLessons.length / course.lessons.length) * 100)
        : ec?.progress ?? 0;

      return {
        course,
        progress,
        completedLessons,
        enrolledAt: ec?.enrolledAt ?? new Date().toISOString().split("T")[0],
      };
    })
    .filter(Boolean) as {
    course: (typeof courses)[0];
    progress: number;
    completedLessons: string[];
    enrolledAt: string;
  }[];

  const totalProgress =
    enrolled.length > 0
      ? Math.round(enrolled.reduce((a, b) => a + b.progress, 0) / enrolled.length)
      : 0;
  const completedCount = enrolled.filter((e) => e.progress === 100).length;
  const inProgressCount = enrolled.filter((e) => e.progress > 0 && e.progress < 100).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <div className="gradient-hero">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-2">
            Welcome back, {user?.name || "Learner"} 👋
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            Track your progress and continue where you left off
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-16 mb-10">
          {[
            { icon: BookOpen, label: "Enrolled", value: enrolled.length, color: "text-primary" },
            { icon: TrendingUp, label: "Avg Progress", value: `${totalProgress}%`, color: "text-lms-info" },
            { icon: Award, label: "Completed", value: completedCount, color: "text-lms-success" },
            { icon: Clock, label: "In Progress", value: inProgressCount, color: "text-lms-warning" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} />
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Continue Learning */}
        {enrolled.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-foreground mb-5">Continue Learning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {enrolled
                .filter((e) => e.progress < 100)
                .map(({ course, progress, completedLessons }) => (
                  <Link
                    key={course.id}
                    to={`/courses/${course.slug}`}
                    className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="flex">
                      <div className="w-32 h-28 flex-shrink-0 overflow-hidden">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=150&fit=crop";
                          }}
                        />
                      </div>
                      <div className="flex-1 p-4 min-w-0">
                        <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {course.instructor} · {completedLessons.length}/{course.lessons.length} lessons
                        </p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-semibold text-foreground">{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </>
        )}

        {/* Completed Courses */}
        {completedCount > 0 && (
          <>
            <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-lms-success" /> Completed
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {enrolled
                .filter((e) => e.progress === 100)
                .map(({ course }) => (
                  <Link
                    key={course.id}
                    to={`/courses/${course.slug}`}
                    className="flex items-center gap-4 bg-card border border-border rounded-2xl p-4 hover:shadow-md transition-shadow"
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-16 h-16 rounded-xl object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm line-clamp-1">{course.title}</h3>
                      <p className="text-xs text-muted-foreground">{course.instructor}</p>
                    </div>
                    <Badge className="bg-lms-success/10 text-lms-success border-none flex-shrink-0">
                      <CheckCircle2 className="h-3 w-3 mr-1" /> Done
                    </Badge>
                  </Link>
                ))}
            </div>
          </>
        )}

        {enrolled.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">No courses yet</h3>
            <p className="text-muted-foreground mb-6">
              You haven't enrolled in any courses yet. Start exploring!
            </p>
            <Link to="/courses">
              <Button className="gradient-primary text-primary-foreground font-semibold px-8">
                Browse Courses
              </Button>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
