import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-lms-nav text-lms-nav-text/70 py-12 mt-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-lms-nav-text">LearnHub</span>
          </div>
          <p className="text-sm leading-relaxed">Empowering learners worldwide with expert-led courses and hands-on projects.</p>
        </div>
        <div>
          <h4 className="font-semibold text-lms-nav-text mb-3 text-sm">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/courses" className="hover:text-primary transition-colors">All Courses</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary transition-colors">My Learning</Link></li>
            <li><Link to="/instructor" className="hover:text-primary transition-colors">Teach on LearnHub</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lms-nav-text mb-3 text-sm">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li>Programming</li>
            <li>Data Science</li>
            <li>AI & ML</li>
            <li>DevOps</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lms-nav-text mb-3 text-sm">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>Help Center</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-lms-nav-text/10 pt-6 text-center text-xs">
        © 2026 LearnHub. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
