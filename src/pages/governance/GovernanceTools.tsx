import { useState } from "react";
import { Shield, FileCheck, Users, AlertTriangle, TrendingUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function GovernanceTools() {
  const evaluations = [
    {
      id: 1,
      title: "Board Effectiveness Assessment 2024",
      type: "Board Evaluation",
      status: "active" as const,
      dueDate: "2024-12-31",
      completionRate: 75,
      participants: 8,
      totalParticipants: 8,
      lastUpdated: "2024-12-11"
    },
    {
      id: 2,
      title: "CEO Performance Review",
      type: "Individual Evaluation",
      status: "pending" as const,
      dueDate: "2024-12-20",
      completionRate: 25,
      participants: 2,
      totalParticipants: 8,
      lastUpdated: "2024-12-08"
    },
    {
      id: 3,
      title: "Committee Performance Review",
      type: "Committee Evaluation",
      status: "completed" as const,
      dueDate: "2024-11-30",
      completionRate: 100,
      participants: 5,
      totalParticipants: 5,
      lastUpdated: "2024-11-29"
    }
  ];

  const conflictDisclosures = [
    {
      id: 1,
      member: "John Doe",
      type: "Financial Interest",
      description: "Investment in TechCorp Ltd (potential supplier)",
      status: "disclosed" as const,
      dateDisclosed: "2024-12-01",
      reviewStatus: "approved",
      riskLevel: "medium"
    },
    {
      id: 2,
      member: "Sarah Chen",
      type: "Professional Relationship",
      description: "Former colleague now works at competing firm",
      status: "pending" as const,
      dateDisclosed: "2024-12-10",
      reviewStatus: "under-review",
      riskLevel: "low"
    },
    {
      id: 3,
      member: "Michael Brown",
      type: "Family Interest",
      description: "Spouse employed by company subsidiary",
      status: "disclosed" as const,
      dateDisclosed: "2024-11-15",
      reviewStatus: "approved",
      riskLevel: "high"
    }
  ];

  const policies = [
    {
      id: 1,
      title: "Board Charter",
      version: "v2.1",
      lastUpdated: "2024-09-15",
      nextReview: "2025-09-15",
      status: "current" as const,
      acknowledgments: 8,
      totalRequired: 8,
      category: "Governance"
    },
    {
      id: 2,
      title: "Conflict of Interest Policy",
      version: "v1.3",
      lastUpdated: "2024-06-20",
      nextReview: "2025-06-20",
      status: "current" as const,
      acknowledgments: 7,
      totalRequired: 8,
      category: "Ethics"
    },
    {
      id: 3,
      title: "Code of Conduct",
      version: "v3.0",
      lastUpdated: "2024-01-10",
      nextReview: "2025-01-10",
      status: "pending" as const,
      acknowledgments: 3,
      totalRequired: 8,
      category: "Ethics"
    },
    {
      id: 4,
      title: "Risk Management Framework",
      version: "v1.0",
      lastUpdated: "2023-12-01",
      nextReview: "2024-12-01",
      status: "draft" as const,
      acknowledgments: 0,
      totalRequired: 8,
      category: "Risk"
    }
  ];

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-danger-light text-danger";
      case "medium":
        return "bg-warning-light text-warning";
      case "low":
        return "bg-success-light text-success";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Governance Tools" 
        description="Manage board evaluations, conflicts of interest, and governance policies"
      />

      <Tabs defaultValue="evaluations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
          <TabsTrigger value="conflicts">Conflicts of Interest</TabsTrigger>
          <TabsTrigger value="policies">Policy Management</TabsTrigger>
        </TabsList>

        {/* Evaluations Tab */}
        <TabsContent value="evaluations" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Board & Individual Evaluations</h3>
            <Button>
              <Shield className="w-4 h-4 mr-2" />
              Create Evaluation
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {evaluations.map((evaluation) => (
              <Card key={evaluation.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{evaluation.title}</CardTitle>
                      <Badge variant="outline" className="mt-2">
                        {evaluation.type}
                      </Badge>
                    </div>
                    <StatusBadge status={evaluation.status} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completion</span>
                      <span>{evaluation.completionRate}%</span>
                    </div>
                    <Progress value={evaluation.completionRate} />
                    <div className="text-xs text-muted-foreground">
                      {evaluation.participants}/{evaluation.totalParticipants} participants
                    </div>
                  </div>
                  
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Due Date:</span>
                      <span>{evaluation.dueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Updated:</span>
                      <span>{evaluation.lastUpdated}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      {evaluation.status === "completed" ? "View Results" : "Continue"}
                    </Button>
                    <Button size="sm" variant="outline">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Conflicts of Interest Tab */}
        <TabsContent value="conflicts" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Conflict of Interest Disclosures</h3>
            <Button>
              <AlertTriangle className="w-4 h-4 mr-2" />
              New Disclosure
            </Button>
          </div>

          <div className="space-y-4">
            {conflictDisclosures.map((disclosure) => (
              <Card key={disclosure.id}>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                    <div>
                      <h4 className="font-medium">{disclosure.member}</h4>
                      <Badge variant="outline" className="mt-1">
                        {disclosure.type}
                      </Badge>
                    </div>
                    
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground">
                        {disclosure.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">
                          Disclosed: {disclosure.dateDisclosed}
                        </span>
                        <Badge className={getRiskLevelColor(disclosure.riskLevel)}>
                          {disclosure.riskLevel.toUpperCase()} RISK
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <StatusBadge 
                        status={disclosure.status === "disclosed" ? "completed" : "pending"} 
                      />
                      <div className="text-xs text-muted-foreground">
                        {disclosure.reviewStatus}
                      </div>
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Policy Management Tab */}
        <TabsContent value="policies" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Governance Policies & Documents</h3>
            <Button>
              <FileCheck className="w-4 h-4 mr-2" />
              Upload Policy
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {policies.map((policy) => (
              <Card key={policy.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{policy.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{policy.category}</Badge>
                        <Badge variant="outline">{policy.version}</Badge>
                      </div>
                    </div>
                    <StatusBadge status={policy.status === "current" ? "active" : policy.status as any} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Acknowledgments</span>
                      <span>{policy.acknowledgments}/{policy.totalRequired}</span>
                    </div>
                    <Progress value={(policy.acknowledgments / policy.totalRequired) * 100} />
                  </div>
                  
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Updated:</span>
                      <span>{policy.lastUpdated}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Next Review:</span>
                      <span>{policy.nextReview}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      View Policy
                    </Button>
                    <Button size="sm" variant="outline">
                      {policy.acknowledgments < policy.totalRequired ? "Acknowledge" : "Acknowledged"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}