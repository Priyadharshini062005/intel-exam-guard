import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Camera, 
  Code, 
  FileText, 
  Shield, 
  Zap, 
  Users,
  Lock,
  TrendingUp
} from "lucide-react";
import aiProctoringImg from "@/assets/feature-ai-proctoring.jpg";
import autoGradingImg from "@/assets/feature-auto-grading.jpg";
import analyticsImg from "@/assets/feature-analytics.jpg";

const Features = () => {
  const features = [
    {
      icon: Camera,
      title: "Multi-Layer Proctoring",
      description: "Face recognition, liveness detection, multiple face detection, tab-switch monitoring, and audio anomaly analysis",
      image: aiProctoringImg,
    },
    {
      icon: Code,
      title: "Multi-Format Questions",
      description: "Support for MCQs, coding challenges with sandboxed execution, and descriptive answers with NLP evaluation",
      image: autoGradingImg,
    },
    {
      icon: TrendingUp,
      title: "Intelligent Analytics",
      description: "Risk-based proctoring reports, suspicion scoring with evidence, and detailed performance insights",
      image: analyticsImg,
    },
  ];

  const additionalFeatures = [
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "HTTPS encryption, JWT authentication, and privacy-aware data handling",
    },
    {
      icon: Zap,
      title: "Real-Time Monitoring",
      description: "Live proctoring events streaming via WebSockets with instant alerts",
    },
    {
      icon: Users,
      title: "Role-Based Access",
      description: "Separate interfaces for students, teachers, and administrators",
    },
    {
      icon: Lock,
      title: "Sandbox Execution",
      description: "Safe code evaluation with Docker-based isolated environments",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Comprehensive Exam Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need for secure, scalable online examinations
          </p>
        </div>

        {/* Main features with images */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-smooth overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover hover:scale-105 transition-smooth"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Additional features grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {additionalFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-smooth">
                <CardHeader>
                  <div className="mb-3">
                    <div className="p-3 bg-primary/10 rounded-lg inline-block">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-lg mb-2">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
