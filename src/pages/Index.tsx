import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CourseCard from "@/components/CourseCard";
import CategoryFilter from "@/components/CategoryFilter";
import Footer from "@/components/Footer";
import { courses } from "@/data/mockData";

const Index = () => {
  const [category, setCategory] = useState("All");
  const filtered = category === "All" ? courses : courses.filter((c) => c.category === category);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      {/* Popular Courses */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-foreground mb-2">
              Popular Courses
            </h2>
            <p className="text-muted-foreground">Choose from 500+ courses taught by world-class instructors</p>
          </div>
          <Link to="/courses">
            <Button variant="ghost" className="text-primary font-semibold">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <CategoryFilter selected={category} onSelect={setCategory} />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
          layout
        >
          {filtered.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              layout
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
            Become an Instructor
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Share your knowledge and earn money. Join 120+ expert instructors on LearnHub.
          </p>
          <Link to="/instructor">
            <Button size="lg" className="bg-primary-foreground text-foreground font-bold hover:bg-primary-foreground/90">
              Start Teaching Today
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
