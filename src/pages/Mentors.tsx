import { useState } from "react";
import { Star, Users, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { instructors, courses } from "@/data/mockData";

const MentorCard = ({ mentor }: { mentor: typeof instructors[0] }) => {
  const mentorCourses = courses.filter((c) => c.instructorId === mentor.id);
  const initials = mentor.name.split(" ").map((n) => n[0]).join("");
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex flex-col items-center text-center">
        {/* Profile Image with fallback */}
        {mentor.avatar && !imgError ? (
          <img
            src={mentor.avatar}
            alt={mentor.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-primary/20 mb-4"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-2xl mb-4">
            {initials}
          </div>
        )}

        <h3 className="font-bold text-foreground text-lg">{mentor.name}</h3>
        <div className="flex flex-wrap justify-center gap-1 mt-2 mb-3">
          {mentor.expertise.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{mentor.bio}</p>

        <div className="w-full grid grid-cols-3 gap-2 text-center border-t border-border pt-4">
          <div>
            <div className="flex items-center justify-center gap-1 text-sm font-bold text-foreground">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              {mentorCourses.length}
            </div>
            <p className="text-xs text-muted-foreground">Courses</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-sm font-bold text-foreground">
              <Users className="h-3.5 w-3.5 text-primary" />
              {(mentor.studentCount / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground">Students</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-sm font-bold text-lms-star">
              <Star className="h-3.5 w-3.5 fill-lms-star" />
              {mentor.rating}
            </div>
            <p className="text-xs text-muted-foreground">Rating</p>
          </div>
        </div>

        {mentorCourses.length > 0 && (
          <div className="w-full mt-4 pt-4 border-t border-border space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Courses</p>
            {mentorCourses.map((c) => (
              <Link
                key={c.id}
                to={`/courses/${c.slug}`}
                className="block text-sm text-primary hover:underline truncate"
              >
                {c.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Mentors = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="gradient-hero py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-3">Our Expert Mentors</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Learn from industry leaders and experienced professionals who are passionate about teaching.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {instructors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Mentors;
