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
  const discount = Math.round((1 - course.price / course.originalPrice) * 100);

  return (
    <Link to={`/courses/${course.slug}`} className="group block">
      <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative h-44 overflow-hidden bg-muted">
          <img
            src={course.thumbnail || placeholderImg}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              if (img.src !== placeholderImg) img.src = placeholderImg;
            }}
          />
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {course.isBestseller && (
            <Badge className="absolute top-3 left-3 bg-lms-warning text-foreground font-semibold text-xs shadow-sm">
              Bestseller
            </Badge>
          )}
          <div className="absolute top-3 right-3">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm ${levelColors[course.level]}`}>
              {course.level}
            </span>
          </div>
          {/* Discount badge */}
          {discount > 0 && (
            <div className="absolute bottom-3 right-3">
              <span className="text-xs font-bold px-2 py-1 rounded-md bg-accent text-accent-foreground shadow-sm">
                {discount}% OFF
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <p className="text-xs font-semibold text-primary mb-1.5 uppercase tracking-wide">{course.category}</p>
          <h3 className="font-bold text-card-foreground text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>

          {/* Instructor */}
          <div className="flex items-center gap-2 mb-3">
            <img
              src={course.instructorAvatar}
              alt={course.instructor}
              className="w-6 h-6 rounded-full object-cover ring-2 ring-border"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <p className="text-xs text-muted-foreground font-medium">{course.instructor}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <span className="text-sm font-bold text-lms-star">{course.rating}</span>
            <div className="flex gap-0.5">
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
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.duration}</span>
            <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{course.lessonCount}</span>
            <span className="flex items-center gap-1"><Users className="h-3 w-3" />{(course.studentCount / 1000).toFixed(0)}K</span>
          </div>

          {/* Price — pushed to bottom */}
          <div className="flex items-center gap-2 mt-auto pt-3 border-t border-border">
            <span className="text-lg font-extrabold text-card-foreground">${course.price}</span>
            <span className="text-sm text-muted-foreground line-through">${course.originalPrice}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
