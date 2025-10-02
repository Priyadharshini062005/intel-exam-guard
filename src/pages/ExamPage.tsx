import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import WebcamPreview from "@/components/exam/WebcamPreview";
import QuestionDisplay from "@/components/exam/QuestionDisplay";
import ProctoringMonitor from "@/components/exam/ProctoringMonitor";
import { Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ExamPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-lg font-bold">Data Structures Final Exam</h1>
              <p className="text-sm text-muted-foreground">CS101 - Spring 2024</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                <Clock className="w-4 h-4 text-warning" />
                <span className="font-mono font-semibold">45:32</span>
              </div>
              <Link to="/">
                <Button variant="ghost" size="sm">Exit</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column - Questions */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-warning/10 border-warning/20">
              <CardContent className="p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Exam in Progress</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Keep your camera on and stay in the exam tab. Tab switching will be recorded.
                  </p>
                </div>
              </CardContent>
            </Card>

            <QuestionDisplay />
          </div>

          {/* Right column - Proctoring */}
          <div className="space-y-4">
            <WebcamPreview />
            <ProctoringMonitor />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
