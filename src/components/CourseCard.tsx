import { Link } from "react-router-dom";
import { Star, Users, Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/data/mockData";

const levelColors: Record<string, string> = {
  Beginner: "bg-lms-success/10 text-lms-success",
  Intermediate: "bg-lms-warning/10 text-lms-warning",
  Advanced: "bg-accent/10 text-accent",
};

const CourseCard = ({ course }: { course: Course }) => {
  const placeholderImg = `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop`;

  return (
    <Link to={`/courses/${course.slug}`} className="group block">
      <div className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="relative h-44 overflow-hidden bg-muted">
          <img
            src={course.thumbnail || placeholderImg}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              if (img.src !== placeholderImg) {
                img.src = placeholderImg;
              }
            }}
          />
          {course.isBestseller && (
            <Badge className="absolute top-3 left-3 bg-lms-warning text-foreground font-semibold text-xs">
              Bestseller
            </Badge>
          )}
          <div className="absolute top-3 right-3">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${levelColors[course.level]}`}>
              {course.level}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs font-medium text-primary mb-1">{course.category}</p>
          <h3 className="font-bold text-card-foreground text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <img
              src={course.instructorAvatar}
              alt={course.instructor}
              className="w-5 h-5 rounded-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <p className="text-xs text-muted-foreground">{course.instructor}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <span className="text-sm font-bold text-lms-star">{course.rating}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${i < Math.floor(course.rating) ? "fill-lms-star text-lms-star" : "text-muted-foreground/30"}`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({course.reviewCount.toLocaleString()})</span>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.duration}</span>
            <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{course.lessonCount} lessons</span>
            <span className="flex items-center gap-1"><Users className="h-3 w-3" />{course.studentCount.toLocaleString()}</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-extrabold text-card-foreground">${course.price}</span>
            <span className="text-sm text-muted-foreground line-through">${course.originalPrice}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
