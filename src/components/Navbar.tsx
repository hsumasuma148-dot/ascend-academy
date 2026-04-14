import { useState } from "react";
import { toast } from "sonner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Menu, X, BookOpen, LogIn, ShoppingCart, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Courses" },
    { to: "/mentors", label: "Mentors" },
    { to: "/ai-lab", label: "AI Lab" },
    { to: "/dashboard", label: "My Learning" },
    { to: "/instructor", label: "Teach" },
  ];

  const handleLogout = () => {
    logout();
    toast.success("You have successfully logged out");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-lms-nav border-b border-border/10 shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-lms-nav-text tracking-tight">LearnHub</span>
        </Link>

        <div className="hidden md:flex flex-1 max-w-lg mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-foreground/10 border-none text-lms-nav-text placeholder:text-muted-foreground/60 focus-visible:ring-primary"
            />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.to ? "text-primary" : "text-lms-nav-text/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 ml-2">
            <Link to="/payment" className="relative">
              <Button variant="ghost" size="icon" className="text-lms-nav-text/80 hover:text-primary hover:bg-foreground/10">
                <ShoppingCart className="h-4 w-4" />
              </Button>
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-accent text-accent-foreground border-none">
                  {itemCount}
                </Badge>
              )}
            </Link>
            {isAuthenticated ? (
              <>
                <span className="text-xs text-lms-nav-text/60 hidden lg:block">{user?.name}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-lms-nav-text/80 hover:text-primary hover:bg-foreground/10">
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-lms-nav-text/80 hover:text-primary hover:bg-foreground/10">
                    <LogIn className="h-4 w-4 mr-1" />
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="gradient-primary text-primary-foreground font-semibold">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        <button className="md:hidden text-lms-nav-text" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-lms-nav border-t border-border/10 p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search courses..." className="pl-10 bg-foreground/10 border-none text-lms-nav-text placeholder:text-muted-foreground/60" />
          </div>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="block py-2 text-sm font-medium text-lms-nav-text/80 hover:text-primary" onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            {isAuthenticated ? (
              <Button variant="outline" size="sm" className="flex-1 border-primary/30 text-lms-nav-text" onClick={() => { handleLogout(); setMobileOpen(false); }}>
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full border-primary/30 text-lms-nav-text">Log In</Button>
                </Link>
                <Link to="/signup" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full gradient-primary text-primary-foreground">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
