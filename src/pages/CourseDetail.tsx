import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, Clock, Users, Award, Play, Lock, CheckCircle2, ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseQuizSection from "@/components/CourseQuizSection";
import CourseCertificate from "@/components/CourseCertificate";
import { courses, enrolledCourses } from "@/data/mockData";
import { getQuizForCourse } from "@/data/quizData";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";

const CourseDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.slug === slug);
  const { addToCart, isInCart, isPurchased } = useCart();
  const { user } = useAuth();
  const enrollment = course ? enrolledCourses.find((e) => e.courseId === course.id) : null;
  const purchased = course ? isPurchased(course.id) : false;
  const enrolled = purchased || !!enrollment;

  // Per-user completion state
  const storageKey = course && user ? `lms_lessons_${user.id}_${course.id}` : null;
  const quizKey = course && user ? `lms_quiz_${user.id}_${course.id}` : null;

  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    if (storageKey) {
      const stored = localStorage.getItem(storageKey);
      if (stored) return JSON.parse(stored);
    }
    return enrollment?.completedLessons || [];
  });

  const [quizPassed, setQuizPassed] = useState(() => {
    if (quizKey) return localStorage.getItem(quizKey) === "true";
    return false;
  });

  const [activeLesson, setActiveLesson] = useState<NonNullable<typeof course>["lessons"][0] | null>(
    course ? course.lessons[0] : null
  );

  // Persist completed lessons
  useEffect(() => {
    if (storageKey) localStorage.setItem(storageKey, JSON.stringify(completedLessons));
  }, [completedLessons, storageKey]);

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">Course not found</h1>
          <Link to="/courses"><Button className="mt-4">Back to Courses</Button></Link>
        </div>
      </div>
    );
  }

  const quizQuestions = getQuizForCourse(course.id);
  const progress = enrolled ? Math.round((completedLessons.length / course.lessons.length) * 100) : 0;
  const allLessonsComplete = completedLessons.length === course.lessons.length;
  const courseFullyComplete = allLessonsComplete && quizPassed;

  const handleBuyNow = () => {
    addToCart(course);
    navigate("/payment");
  };

  const handleAddToCart = () => {
    addToCart(course);
    toast.success("Added to cart!");
  };

  const markLessonComplete = (lessonId: string) => {
    if (!enrolled) return;
    setCompletedLessons((prev) => {
      if (prev.includes(lessonId)) return prev;
      const updated = [...prev, lessonId];
      toast.success("Lesson marked as completed!");
      return updated;
    });
  };

  const canPlayLesson = (lesson: typeof course.lessons[0]) => enrolled || lesson.isPreview;

  const handleLessonClick = (lesson: typeof course.lessons[0]) => {
    if (canPlayLesson(lesson)) setActiveLesson(lesson);
  };

  const handleContinueLearning = () => {
    const nextLesson = course.lessons.find((l) => !completedLessons.includes(l.id));
    setActiveLesson(nextLesson || course.lessons[0]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuizPass = () => {
    setQuizPassed(true);
    if (quizKey) localStorage.setItem(quizKey, "true");
    toast.success("🎉 Course Completed Successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <div className="gradient-hero">
        <div className="container mx-auto px-4 py-8">
          <Link to="/courses" className="inline-flex items-center text-primary-foreground/70 hover:text-primary-foreground text-sm mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Courses
          </Link>
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-primary-foreground/20 text-primary-foreground border-none">{course.category}</Badge>
              {course.isBestseller && <Badge className="bg-lms-warning text-foreground">Bestseller</Badge>}
              <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground">{course.level}</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-3">{course.title}</h1>
            <p className="text-primary-foreground/80 mb-3">{course.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-lms-star text-lms-star" />
                <strong className="text-primary-foreground">{course.rating}</strong> ({course.reviewCount.toLocaleString()} reviews)
              </span>
              <span className="flex items-center gap-1"><Users className="h-4 w-4" />{course.studentCount.toLocaleString()} students</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{course.duration}</span>
              <span>Created by <strong className="text-primary-foreground">{course.instructor}</strong></span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player */}
            {activeLesson && canPlayLesson(activeLesson) && activeLesson.videoUrl && (
              <div className="space-y-3">
                <div className="relative w-full rounded-xl overflow-hidden border border-border bg-foreground/5" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={activeLesson.videoUrl}
                    title={activeLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Lesson {activeLesson.order}: {activeLesson.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{activeLesson.duration}</p>
                  </div>
                  {enrolled && !completedLessons.includes(activeLesson.id) && (
                    <Button
                      size="sm"
                      onClick={() => markLessonComplete(activeLesson.id)}
                      className="bg-lms-success hover:bg-lms-success/90 text-primary-foreground flex-shrink-0"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1" /> Mark as Completed
                    </Button>
                  )}
                  {enrolled && completedLessons.includes(activeLesson.id) && (
                    <Badge className="bg-lms-success/10 text-lms-success border-none flex-shrink-0">
                      <CheckCircle2 className="h-3 w-3 mr-1" /> Completed
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Lessons List */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">
                Course Content · {course.lessons.length} lessons · {completedLessons.length} completed
              </h2>
              <div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
                {course.lessons.map((lesson) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isActive = activeLesson?.id === lesson.id;
                  const playable = canPlayLesson(lesson);
                  return (
                    <div key={lesson.id} className={`flex items-center gap-3 p-4 transition-colors ${isCompleted ? "bg-lms-success/5" : ""} ${isActive ? "bg-primary/5 border-l-4 border-l-primary" : ""}`}>
                      <button
                        onClick={() => handleLessonClick(lesson)}
                        disabled={!playable}
                        className="flex items-center gap-3 flex-1 min-w-0 text-left"
                      >
                        <div className="flex-shrink-0">
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5 text-lms-success" />
                          ) : playable ? (
                            <Play className="h-5 w-5 text-primary" />
                          ) : (
                            <Lock className="h-5 w-5 text-muted-foreground/40" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${isCompleted ? "text-lms-success" : isActive ? "text-primary" : "text-foreground"}`}>
                            {lesson.order}. {lesson.title}
                          </p>
                          {lesson.isPreview && !enrolled && <span className="text-xs text-primary">Preview</span>}
                        </div>
                        <span className="text-xs text-muted-foreground flex-shrink-0">{lesson.duration}</span>
                      </button>
                      {enrolled && !isCompleted && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markLessonComplete(lesson.id)}
                          className="text-xs text-muted-foreground hover:text-lms-success flex-shrink-0"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quiz Section - only show when enrolled and all lessons done */}
            {enrolled && allLessonsComplete && (
              <div id="quiz-section">
                <CourseQuizSection
                  questions={quizQuestions}
                  onPass={handleQuizPass}
                  passed={quizPassed}
                />
              </div>
            )}

            {/* Certificate */}
            {enrolled && courseFullyComplete && (
              <CourseCertificate
                studentName={user?.name || "Student"}
                courseName={course.title}
                instructorName={course.instructor}
              />
            )}

            {/* About */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">About This Course</h2>
              <p className="text-muted-foreground leading-relaxed">{course.longDescription}</p>
            </div>

            {/* Course Includes */}
            <div className="bg-lms-surface rounded-xl p-6">
              <h2 className="text-xl font-bold text-foreground mb-3">This course includes</h2>
              <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                {[
                  `${course.duration} of video content`,
                  `${course.lessonCount} lessons`,
                  "Downloadable resources",
                  "Assignments & quizzes",
                  "Certificate of completion",
                  "Lifetime access",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-lms-success flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor */}
            <div className="bg-lms-surface rounded-xl p-6">
              <h2 className="text-xl font-bold text-foreground mb-3">Instructor</h2>
              <div className="flex items-start gap-4">
                <img
                  src={course.instructorAvatar}
                  alt={course.instructor}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/20 flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="w-14 h-14 rounded-full gradient-primary items-center justify-center text-primary-foreground font-bold text-lg flex-shrink-0 hidden">
                  {course.instructor.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{course.instructor}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{course.instructorBio}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-20 bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-foreground">${course.price}</span>
                <span className="text-lg text-muted-foreground line-through">${course.originalPrice}</span>
                <Badge className="bg-accent/10 text-accent border-none ml-auto">
                  {Math.round((1 - course.price / course.originalPrice) * 100)}% off
                </Badge>
              </div>

              {enrolled ? (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold text-foreground">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {completedLessons.length}/{course.lessons.length} lessons completed
                    </p>
                  </div>

                  {courseFullyComplete && (
                    <div className="bg-lms-success/10 rounded-lg p-4 text-center">
                      <Award className="h-8 w-8 text-lms-success mx-auto mb-2" />
                      <p className="font-semibold text-lms-success text-sm">Course Completed!</p>
                      <p className="text-xs text-muted-foreground mt-1">Certificate available below</p>
                    </div>
                  )}

                  {allLessonsComplete && !quizPassed && (
                    <div className="bg-lms-warning/10 rounded-lg p-3 text-center space-y-2">
                      <p className="text-sm font-medium text-lms-warning">Complete the quiz to get your certificate!</p>
                      <Button
                        size="sm"
                        className="bg-lms-warning hover:bg-lms-warning/90 text-foreground font-semibold"
                        onClick={() => document.getElementById("quiz-section")?.scrollIntoView({ behavior: "smooth" })}
                      >
                        📝 Take Quiz Now
                      </Button>
                    </div>
                  )}

                  <Button onClick={handleContinueLearning} className="w-full gradient-primary text-primary-foreground font-semibold">
                    {allLessonsComplete ? "Review Lessons" : "Continue Learning"}
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={handleBuyNow} className="w-full gradient-primary text-primary-foreground font-bold text-base py-6">
                    Buy Now
                  </Button>
                  <Button onClick={handleAddToCart} variant="outline" className="w-full font-semibold" disabled={isInCart(course.id)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {isInCart(course.id) ? "In Cart" : "Add to Cart"}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">30-day money-back guarantee</p>
                </>
              )}

              <div className="space-y-3 pt-4 border-t border-border text-sm text-muted-foreground">
                <div className="flex justify-between"><span>Duration</span><span className="font-medium text-foreground">{course.duration}</span></div>
                <div className="flex justify-between"><span>Lessons</span><span className="font-medium text-foreground">{course.lessonCount}</span></div>
                <div className="flex justify-between"><span>Level</span><span className="font-medium text-foreground">{course.level}</span></div>
                <div className="flex justify-between"><span>Instructor</span><span className="font-medium text-foreground">{course.instructor}</span></div>
                <div className="flex justify-between"><span>Certificate</span><span className="font-medium text-foreground">Yes</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetail;
