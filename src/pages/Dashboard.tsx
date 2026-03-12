import { Link } from "react-router-dom";
import { BookOpen, Clock, Award, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { courses, enrolledCourses } from "@/data/mockData";

const Dashboard = () => {
  const enrolled = enrolledCourses.map((ec) => {
    const course = courses.find((c) => c.id === ec.courseId)!;
    return { ...ec, course };
  });

  const totalProgress = Math.round(enrolled.reduce((a, b) => a + b.progress, 0) / enrolled.length);
  const completedCount = enrolled.filter((e) => e.progress === 100).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-foreground mb-2">My Learning</h1>
        <p className="text-muted-foreground mb-8">Track your progress and continue where you left off</p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: BookOpen, label: "Enrolled Courses", value: enrolled.length },
            { icon: TrendingUp, label: "Avg Progress", value: `${totalProgress}%` },
            { icon: Award, label: "Completed", value: completedCount },
            { icon: Clock, label: "Total Hours", value: "42h" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-xl p-5">
              <stat.icon className="h-5 w-5 text-primary mb-2" />
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Enrolled Courses */}
        <h2 className="text-xl font-bold text-foreground mb-4">Continue Learning</h2>
        <div className="space-y-4">
          {enrolled.map(({ course, progress, completedLessons, enrolledAt }) => (
            <Link
              key={course.id}
              to={`/courses/${course.slug}`}
              className="block bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="w-full md:w-20 h-14 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-primary-foreground/50" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm mb-1">{course.title}</h3>
                  <p className="text-xs text-muted-foreground">{course.instructor} · {completedLessons.length}/{course.lessons.length} lessons</p>
                </div>
                <div className="w-full md:w-48 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold text-foreground">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                <Button size="sm" variant="outline" className="flex-shrink-0">
                  Continue
                </Button>
              </div>
            </Link>
          ))}
        </div>

        {enrolled.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">You haven't enrolled in any courses yet</p>
            <Link to="/courses"><Button className="gradient-primary text-primary-foreground">Browse Courses</Button></Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
