import { Button } from "@/components/ui/button";
import { Shield, Brain, BarChart3 } from "lucide-react";
import heroImage from "@/assets/hero-proctoring.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      <div 
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
            AI-Powered Exam Proctoring
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
            Secure, scalable online examinations with intelligent monitoring and automated grading
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Button variant="hero" size="xl">
              Start Free Trial
            </Button>
            <Button variant="outline" size="xl" className="bg-background/95 hover:bg-background border-2">
              Watch Demo
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-card/95 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-glow transition-smooth">
              <Shield className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="text-lg font-semibold mb-2">AI Proctoring</h3>
              <p className="text-muted-foreground text-sm">
                Face recognition, liveness detection & behavior analysis
              </p>
            </div>
            
            <div className="bg-card/95 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-glow transition-smooth">
              <Brain className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="text-lg font-semibold mb-2">Auto Grading</h3>
              <p className="text-muted-foreground text-sm">
                Instant evaluation for MCQs, coding & descriptive answers
              </p>
            </div>
            
            <div className="bg-card/95 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-glow transition-smooth">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="text-lg font-semibold mb-2">Smart Analytics</h3>
              <p className="text-muted-foreground text-sm">
                Detailed insights & proctoring reports with suspicion scoring
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
