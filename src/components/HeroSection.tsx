import { motion } from "framer-motion";
import { ArrowRight, Play, Users, BookOpen, Award, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { stats } from "@/data/mockData";
import { useState } from "react";

const iconMap: Record<string, React.ReactNode> = {
  Students: <Users className="h-5 w-5" />,
  Courses: <BookOpen className="h-5 w-5" />,
  Instructors: <Award className="h-5 w-5" />,
  Countries: <Play className="h-5 w-5" />,
};

const HeroSection = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/courses?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero" />
      {/* Decorative blobs */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-primary-foreground/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm">
              🎓 Start learning today — 85% off select courses
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground leading-[1.1] mb-6">
              Learn Skills for{" "}
              <span className="font-display italic">Your Future</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed max-w-2xl">
              Access 500+ expert-led courses in tech, data science, and more.
              Build real skills with hands-on projects and earn certificates.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            className="flex gap-2 max-w-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="What do you want to learn?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-14 text-base bg-primary-foreground/95 border-none text-foreground placeholder:text-muted-foreground/70 rounded-xl shadow-lg focus-visible:ring-2 focus-visible:ring-primary-foreground/40"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-14 px-8 bg-primary-foreground text-foreground font-bold hover:bg-primary-foreground/90 rounded-xl shadow-lg"
            >
              Search
            </Button>
          </motion.form>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/courses">
              <Button
                size="lg"
                className="bg-primary-foreground text-foreground font-bold hover:bg-primary-foreground/90 shadow-lg text-base px-8"
              >
                Explore Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/mentors">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8"
              >
                Meet Our Mentors
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-primary-foreground/10 backdrop-blur-md rounded-2xl p-5 text-center border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-colors"
            >
              <div className="flex justify-center mb-2 text-primary-foreground/80">
                {iconMap[stat.label]}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-primary-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-primary-foreground/70">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
