import { BarChart3, TrendingUp, AlertCircle, CheckCircle, FileCheck, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/PageHeader";

export default function ComplianceDashboard() {
  const complianceScore = 94;
  
  const metrics = [
    {
      title: "Overall Compliance Score",
      value: `${complianceScore}%`,
      change: "+2% this month",
      icon: BarChart3,
      color: "text-success"
    },
    {
      title: "Board Evaluations",
      value: "100%",
      change: "All completed",
      icon: CheckCircle,
      color: "text-success"
    },
    {
      title: "Policy Acknowledgments",
      value: "87%",
      change: "3 pending",
      icon: FileCheck,
      color: "text-warning"
    },
    {
      title: "COI Disclosures",
      value: "100%",
      change: "All up to date",
      icon: Users,
      color: "text-success"
    }
  ];

  const evaluationStatus = [
    { name: "John Doe", role: "Chairman", status: "completed", score: 98 },
    { name: "Sarah Chen", role: "Secretary", status: "completed", score: 96 },
    { name: "Michael Brown", role: "Director", status: "completed", score: 94 },
    { name: "Emma Wilson", role: "Director", status: "completed", score: 95 },
    { name: "Robert Johnson", role: "Independent Director", status: "completed", score: 92 },
    { name: "Lisa Garcia", role: "CFO", status: "completed", score: 97 },
    { name: "David Kim", role: "Director", status: "completed", score: 93 },
    { name: "Maria Rodriguez", role: "Director", status: "completed", score: 91 }
  ];

  const policyStatus = [
    { name: "Board Charter", acknowledged: 8, required: 8, percentage: 100 },
    { name: "Conflict of Interest Policy", acknowledged: 7, required: 8, percentage: 87.5 },
    { name: "Code of Conduct", acknowledged: 8, required: 8, percentage: 100 },
    { name: "Risk Management Framework", acknowledged: 6, required: 8, percentage: 75 },
    { name: "Whistleblower Policy", acknowledged: 8, required: 8, percentage: 100 }
  ];

  const documentAccess = [
    { category: "Meeting Minutes", accessed: 156, total: 160, percentage: 97.5 },
    { category: "Financial Reports", accessed: 89, total: 92, percentage: 96.7 },
    { category: "Policy Documents", accessed: 72, total: 80, percentage: 90 },
    { category: "Governance Materials", accessed: 45, total: 48, percentage: 93.8 }
  ];

  const recentActivity = [
    {
      action: "Policy acknowledged",
      item: "Code of Conduct",
      member: "Maria Rodriguez",
      timestamp: "2 hours ago"
    },
    {
      action: "Evaluation completed",
      item: "Board Effectiveness Assessment",
      member: "David Kim",
      timestamp: "1 day ago"
    },
    {
      action: "COI disclosure updated",
      item: "Financial Interest Declaration",
      member: "Michael Brown",
      timestamp: "2 days ago"
    },
    {
      action: "Document accessed",
      item: "Q4 Financial Report",
      member: "Lisa Garcia",
      timestamp: "3 days ago"
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Compliance Dashboard" 
        description="Monitor governance compliance, evaluations, and policy acknowledgments"
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className={`w-4 h-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Board Evaluation Completion */}
        <Card>
          <CardHeader>
            <CardTitle>Board Evaluation Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {evaluationStatus.map((member) => (
                <div key={member.name} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.role}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium">{member.score}%</div>
                    <Badge className="bg-success-light text-success">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Policy Acknowledgments */}
        <Card>
          <CardHeader>
            <CardTitle>Policy Acknowledgment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {policyStatus.map((policy) => (
                <div key={policy.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{policy.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {policy.acknowledged}/{policy.required} ({policy.percentage}%)
                    </span>
                  </div>
                  <Progress value={policy.percentage} />
                  {policy.percentage < 100 && (
                    <div className="flex items-center gap-1 text-xs text-warning">
                      <AlertCircle className="w-3 h-3" />
                      {policy.required - policy.acknowledged} pending
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Document Access Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Document Access Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documentAccess.map((category) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.category}</span>
                    <span className="text-sm text-muted-foreground">
                      {category.accessed}/{category.total} ({category.percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <Progress value={category.percentage} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Compliance Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Compliance Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 hover:bg-background-subtle rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">{activity.action}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{activity.item}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      by {activity.member} • {activity.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Score Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Score Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Board Evaluations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning mb-2">87%</div>
              <div className="text-sm text-muted-foreground">Policy Acknowledgments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">100%</div>
              <div className="text-sm text-muted-foreground">COI Disclosures</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-info mb-2">94%</div>
              <div className="text-sm text-muted-foreground">Document Access</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}