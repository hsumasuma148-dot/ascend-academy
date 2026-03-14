import { useState } from "react";
import { Plus, BookOpen, Users, DollarSign, BarChart3, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { courses as allCourses, Course } from "@/data/mockData";
import { toast } from "sonner";

const InstructorDashboard = () => {
  const [myCourses, setMyCourses] = useState<Course[]>(allCourses.slice(0, 3));
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState({ title: "", description: "", category: "", level: "" });

  const handleCreate = () => {
    if (!newCourse.title || !newCourse.description) {
      toast.error("Please fill in all required fields");
      return;
    }
    const created: Course = {
      id: crypto.randomUUID(),
      title: newCourse.title,
      slug: newCourse.title.toLowerCase().replace(/\s+/g, "-"),
      description: newCourse.description,
      longDescription: newCourse.description,
      instructor: "You",
      instructorId: "self",
      instructorAvatar: "https://i.pravatar.cc/150?img=68",
      instructorBio: "",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
      category: newCourse.category || "Programming",
      rating: 0,
      reviewCount: 0,
      studentCount: 0,
      price: 0,
      originalPrice: 0,
      duration: "0 hours",
      lessonCount: 0,
      level: (newCourse.level as Course["level"]) || "Beginner",
      tags: [],
      lessons: [],
    };
    setMyCourses((prev) => [...prev, created]);
    toast.success("Course created successfully!");
    setCreateOpen(false);
    setNewCourse({ title: "", description: "", category: "", level: "" });
  };

  const handleEdit = (course: Course) => {
    setEditingCourse({ ...course });
    setEditOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingCourse) return;
    setMyCourses((prev) => prev.map((c) => (c.id === editingCourse.id ? editingCourse : c)));
    toast.success("Course updated successfully!");
    setEditOpen(false);
    setEditingCourse(null);
  };

  const handleDelete = (courseId: string) => {
    setMyCourses((prev) => prev.filter((c) => c.id !== courseId));
    toast.success("Course deleted successfully!");
  };

  const stats = [
    { icon: BookOpen, label: "Total Courses", value: myCourses.length },
    { icon: Users, label: "Total Students", value: myCourses.reduce((a, c) => a + c.studentCount, 0).toLocaleString() },
    { icon: DollarSign, label: "Revenue", value: "$12,450" },
    { icon: BarChart3, label: "Avg Rating", value: myCourses.length > 0 ? (myCourses.reduce((a, c) => a + c.rating, 0) / myCourses.length).toFixed(1) : "0" },
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
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
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
                  <Input value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} placeholder="e.g., Advanced Python Programming" />
                </div>
                <div>
                  <Label>Description *</Label>
                  <Textarea value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} placeholder="Describe your course..." rows={3} />
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
                <Button onClick={handleCreate} className="w-full gradient-primary text-primary-foreground font-semibold">Create Course</Button>
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
              <img
                src={course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=80&h=60&fit=crop"}
                alt={course.title}
                className="w-16 h-12 rounded-lg object-cover flex-shrink-0"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=80&h=60&fit=crop"; }}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm">{course.title}</h3>
                <p className="text-xs text-muted-foreground">{course.studentCount.toLocaleString()} students · {course.lessonCount} lessons · ⭐ {course.rating}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(course)}>
                  <Edit className="h-3 w-3 mr-1" />Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to delete this course?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently remove "{course.title}" from your course list. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(course.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>

        {myCourses.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No courses yet. Create your first course!</p>
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
          </DialogHeader>
          {editingCourse && (
            <div className="space-y-4 mt-4">
              <div>
                <Label>Course Title</Label>
                <Input value={editingCourse.title} onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })} />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={editingCourse.description} onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })} rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Price ($)</Label>
                  <Input type="number" value={editingCourse.price} onChange={(e) => setEditingCourse({ ...editingCourse, price: parseFloat(e.target.value) || 0 })} />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={editingCourse.category} onValueChange={(v) => setEditingCourse({ ...editingCourse, category: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Programming">Programming</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="DevOps">DevOps</SelectItem>
                      <SelectItem value="AI & ML">AI & ML</SelectItem>
                      <SelectItem value="Web Development">Web Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Thumbnail URL</Label>
                <Input value={editingCourse.thumbnail} onChange={(e) => setEditingCourse({ ...editingCourse, thumbnail: e.target.value })} />
              </div>
              <Button onClick={handleSaveEdit} className="w-full gradient-primary text-primary-foreground font-semibold">Save Changes</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default InstructorDashboard;
