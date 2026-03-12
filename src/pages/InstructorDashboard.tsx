import { useState } from "react";
import { Plus, BookOpen, Users, DollarSign, BarChart3, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { courses as allCourses } from "@/data/mockData";
import { toast } from "sonner";

const InstructorDashboard = () => {
  const [myCourses, setMyCourses] = useState(allCourses.slice(0, 3));
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: "", description: "", category: "", level: "" });

  const handleCreate = () => {
    if (!newCourse.title || !newCourse.description) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Course created successfully!");
    setDialogOpen(false);
    setNewCourse({ title: "", description: "", category: "", level: "" });
  };

  const stats = [
    { icon: BookOpen, label: "Total Courses", value: myCourses.length },
    { icon: Users, label: "Total Students", value: "194K" },
    { icon: DollarSign, label: "Revenue", value: "$12,450" },
    { icon: BarChart3, label: "Avg Rating", value: "4.8" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground mb-1">Instructor Dashboard</h1>
            <p className="text-muted-foreground">Manage your courses and track performance</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary text-primary-foreground font-semibold">
                <Plus className="h-4 w-4 mr-2" /> Create Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Course</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Course Title *</Label>
                  <Input
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                    placeholder="e.g., Advanced Python Programming"
                  />
                </div>
                <div>
                  <Label>Description *</Label>
                  <Textarea
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    placeholder="Describe your course..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <Select onValueChange={(v) => setNewCourse({ ...newCourse, category: v })}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Programming">Programming</SelectItem>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                        <SelectItem value="DevOps">DevOps</SelectItem>
                        <SelectItem value="AI & ML">AI & ML</SelectItem>
                        <SelectItem value="Web Development">Web Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Level</Label>
                    <Select onValueChange={(v) => setNewCourse({ ...newCourse, level: v })}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleCreate} className="w-full gradient-primary text-primary-foreground font-semibold">
                  Create Course
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-xl p-5">
              <stat.icon className="h-5 w-5 text-primary mb-2" />
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Course List */}
        <h2 className="text-xl font-bold text-foreground mb-4">Your Courses</h2>
        <div className="space-y-3">
          {myCourses.map((course) => (
            <div key={course.id} className="bg-card border border-border rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-16 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-5 w-5 text-primary-foreground/50" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm">{course.title}</h3>
                <p className="text-xs text-muted-foreground">{course.studentCount.toLocaleString()} students · {course.lessonCount} lessons · ⭐ {course.rating}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline"><Edit className="h-3 w-3 mr-1" />Edit</Button>
                <Button size="sm" variant="outline" className="text-destructive hover:text-destructive"><Trash2 className="h-3 w-3" /></Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InstructorDashboard;
