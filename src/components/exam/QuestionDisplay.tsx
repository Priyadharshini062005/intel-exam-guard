import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle } from "lucide-react";

interface Question {
  id: number;
  type: "mcq" | "coding" | "descriptive";
  question: string;
  options?: string[];
  points: number;
}

const QuestionDisplay = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Sample questions
  const questions: Question[] = [
    {
      id: 1,
      type: "mcq",
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      points: 2,
    },
    {
      id: 2,
      type: "coding",
      question: "Write a function to reverse a string in Python.",
      points: 10,
    },
    {
      id: 3,
      type: "descriptive",
      question: "Explain the concept of polymorphism in object-oriented programming with examples.",
      points: 5,
    },
  ];

  const question = questions[currentQuestion];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const renderQuestionContent = () => {
    switch (question.type) {
      case "mcq":
        return (
          <RadioGroup 
            value={answers[question.id]} 
            onValueChange={(value) => setAnswers({ ...answers, [question.id]: value })}
            className="space-y-3"
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted transition-smooth">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case "coding":
        return (
          <div className="space-y-3">
            <div className="bg-muted p-3 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-2">Code Editor (Python)</p>
              <Textarea 
                placeholder="def reverse_string(s):\n    # Write your code here\n    pass"
                className="font-mono text-sm min-h-[200px] bg-background"
                value={answers[question.id] || ""}
                onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
              />
            </div>
            <p className="text-xs text-muted-foreground">Your code will be tested against hidden test cases</p>
          </div>
        );
      
      case "descriptive":
        return (
          <Textarea 
            placeholder="Write your answer here..."
            className="min-h-[200px]"
            value={answers[question.id] || ""}
            onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
          />
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Question navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            {questions.map((q, index) => (
              <Button
                key={q.id}
                variant={index === currentQuestion ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentQuestion(index)}
                className="min-w-[40px]"
              >
                {answers[q.id] ? (
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                ) : (
                  <Circle className="w-4 h-4 mr-1" />
                )}
                {index + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current question */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="uppercase">
                  {question.type}
                </Badge>
                <Badge variant="secondary">
                  {question.points} points
                </Badge>
              </div>
              <CardTitle className="text-xl">
                Question {currentQuestion + 1} of {questions.length}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg">{question.question}</p>
          
          {renderQuestionContent()}

          <div className="flex items-center justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            
            {currentQuestion === questions.length - 1 ? (
              <Button variant="success" size="lg">
                Submit Exam
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next Question
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionDisplay;
