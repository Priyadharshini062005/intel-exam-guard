import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-smooth">
            <GraduationCap className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">ExamSecure</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground/80 hover:text-foreground transition-smooth">
              Features
            </a>
            <a href="#pricing" className="text-foreground/80 hover:text-foreground transition-smooth">
              Pricing
            </a>
            <a href="#about" className="text-foreground/80 hover:text-foreground transition-smooth">
              About
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/exam">
              <Button variant="ghost">Student Portal</Button>
            </Link>
            <Link to="/teacher">
              <Button>Teacher Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
