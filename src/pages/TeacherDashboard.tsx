import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  FileText, 
  Users, 
  AlertTriangle, 
  TrendingUp,
  Clock,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  const exams = [
    { id: 1, title: "Data Structures Final", course: "CS101", students: 45, status: "active", flagged: 3 },
    { id: 2, title: "Algorithms Midterm", course: "CS201", students: 38, status: "completed", flagged: 1 },
    { id: 3, title: "Database Quiz", course: "CS301", students: 52, status: "scheduled", flagged: 0 },
  ];

  const recentActivity = [
    { student: "John Doe", exam: "Data Structures Final", event: "Tab switch detected", time: "2 min ago", severity: "medium" },
    { student: "Jane Smith", exam: "Data Structures Final", event: "Multiple faces detected", time: "5 min ago", severity: "high" },
    { student: "Mike Johnson", exam: "Data Structures Final", event: "Exam submitted", time: "8 min ago", severity: "info" },
  ];

  const stats = [
    { label: "Active Exams", value: "1", icon: Clock, color: "text-primary" },
    { label: "Total Students", value: "135", icon: Users, color: "text-secondary" },
    { label: "Flagged Events", value: "4", icon: AlertTriangle, color: "text-warning" },
    { label: "Completed", value: "12", icon: CheckCircle2, color: "text-success" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-xl font-bold">Teacher Dashboard</h1>
              <p className="text-sm text-muted-foreground">Prof. Sarah Williams</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="default">
                <Plus className="w-4 h-4 mr-2" />
                Create Exam
              </Button>
              <Link to="/">
                <Button variant="ghost">Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-smooth">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardDescription>{stat.label}</CardDescription>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main content */}
        <Tabs defaultValue="exams" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="exams">Exams</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="exams" className="space-y-4">
            {exams.map((exam) => (
              <Card key={exam.id} className="hover:shadow-md transition-smooth">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{exam.title}</CardTitle>
                      <CardDescription className="text-base">
                        {exam.course} • {exam.students} students
                      </CardDescription>
                    </div>
                    <Badge 
                      variant={exam.status === "active" ? "default" : "outline"}
                      className={exam.status === "active" ? "bg-success" : ""}
                    >
                      {exam.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {exam.students} enrolled
                      </span>
                      {exam.flagged > 0 && (
                        <span className="flex items-center gap-1 text-warning">
                          <AlertTriangle className="w-4 h-4" />
                          {exam.flagged} flagged
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button size="sm">Proctoring Report</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Proctoring Events</CardTitle>
                <CardDescription>Real-time monitoring alerts and student activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-smooth">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.severity === "high" ? "bg-destructive" :
                        activity.severity === "medium" ? "bg-warning" :
                        "bg-success"
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium">{activity.student}</p>
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.exam}</p>
                        <p className="text-sm mt-1">{activity.event}</p>
                      </div>
                      <Button variant="ghost" size="sm">Review</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                  <CardDescription>Average scores across all exams</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                    <TrendingUp className="w-16 h-16 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Proctoring Summary</CardTitle>
                  <CardDescription>Integrity metrics and flagged behaviors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">Clean Sessions</span>
                      <span className="font-semibold">87%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">Tab Switches</span>
                      <span className="font-semibold">24</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">Face Issues</span>
                      <span className="font-semibold">8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherDashboard;
