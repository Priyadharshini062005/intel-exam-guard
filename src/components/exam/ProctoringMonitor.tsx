import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Eye, Monitor } from "lucide-react";

const ProctoringMonitor = () => {
  const proctoringStatus = [
    { label: "Face Detection", status: "active", icon: Eye },
    { label: "Tab Focus", status: "active", icon: Monitor },
    { label: "Multiple Faces", status: "clear", icon: CheckCircle2 },
    { label: "Audio Level", status: "clear", icon: CheckCircle2 },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Proctoring Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {proctoringStatus.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{item.label}</span>
              </div>
              <Badge 
                variant={item.status === "active" ? "default" : "outline"}
                className={item.status === "active" ? "bg-success" : ""}
              >
                {item.status === "active" ? "Active" : "Clear"}
              </Badge>
            </div>
          );
        })}

        <div className="mt-4 p-3 bg-muted rounded-lg border border-border">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Behavior Monitoring</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your actions are being monitored for exam integrity. Suspicious behavior will be flagged for review.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Suspicion Score</span>
            <Badge variant="outline" className="text-success border-success">
              Low (12%)
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProctoringMonitor;
