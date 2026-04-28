import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Upload, Cpu, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CourseCard from "@/components/CourseCard";
import CategoryFilter from "@/components/CategoryFilter";
import Footer from "@/components/Footer";
import { courses, instructors } from "@/data/mockData";

const aiSteps = [
  {
    icon: Upload,
    title: "User Input",
    description: "Enter text, upload an image, or provide data to the AI model.",
  },
  {
    icon: Cpu,
    title: "AI Model Processing",
    description: "The model analyzes your input using deep learning algorithms.",
  },
  {
    icon: Monitor,
    title: "Output Display",
    description: "Results are rendered instantly — text, visuals, or predictions.",
  },
];

const Index = () => {
  const [category, setCategory] = useState("All");
  const filtered = category === "All" ? courses : courses.filter((c) => c.category === category);
  const displayCourses = filtered.slice(0, 8);
  const topMentors = instructors.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      {/* Popular Courses */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-foreground mb-2">Popular Courses</h2>
            <p className="text-muted-foreground">Choose from 500+ courses taught by world-class instructors</p>
          </div>
          <Link to="/courses">
            <Button variant="ghost" className="text-primary font-semibold">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <CategoryFilter selected={category} onSelect={setCategory} />

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8" layout>
          {displayCourses.map((course, i) => (
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

        {filtered.length > 8 && (
          <div className="text-center mt-10">
            <Link to="/courses">
              <Button variant="outline" size="lg" className="font-semibold px-8">
                See All {filtered.length} Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </section>

      {/* How AI Works */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-extrabold text-foreground mb-3">How AI Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Experience AI in action — see how a Hugging Face model takes your input, processes it, and delivers results in real time.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            {aiSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-primary/60 uppercase tracking-wider">Step {i + 1}</span>
                  <h3 className="font-bold text-foreground text-lg mt-1 mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-primary/40" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Top Mentors */}
      <section className="bg-lms-surface py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-foreground mb-2">Learn from the Best</h2>
              <p className="text-muted-foreground">Our top instructors with years of industry experience</p>
            </div>
            <Link to="/mentors">
              <Button variant="ghost" className="text-primary font-semibold">
                View All Mentors <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topMentors.map((mentor, i) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-4 ring-primary/10"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <h3 className="font-bold text-foreground text-lg">{mentor.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{mentor.expertise.slice(0, 2).join(" · ")}</p>
                <div className="flex items-center justify-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-lms-star text-lms-star" />
                  <span className="font-bold text-foreground">{mentor.rating}</span>
                  <span className="text-muted-foreground">· {(mentor.studentCount / 1000).toFixed(0)}K students</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4">
            Become an Instructor
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Share your knowledge and earn money. Join 120+ expert instructors on LearnHub.
          </p>
          <Link to="/instructor">
            <Button
              size="lg"
              className="bg-primary-foreground text-foreground font-bold hover:bg-primary-foreground/90 px-10 text-base"
            >
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
