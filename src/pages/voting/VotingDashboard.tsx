import { useState } from "react";
import {
  Vote,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  BarChart3,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

export default function VotingDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const stats = [
    {
      title: "Active Votes",
      value: "5",
      change: "2 ending soon",
      icon: Vote,
      color: "text-warning",
    },
    {
      title: "Completed This Month",
      value: "12",
      change: "100% participation",
      icon: CheckCircle,
      color: "text-success",
    },
    {
      title: "Pending Your Vote",
      value: "3",
      change: "Action required",
      icon: Clock,
      color: "text-danger",
    },
    {
      title: "Average Participation",
      value: "94%",
      change: "+5% this quarter",
      icon: Users,
      color: "text-info",
    },
  ];

  const votes = [
    {
      id: 1,
      title: "Approve Q1 2025 Budget Allocation",
      description:
        "Review and approve the proposed budget allocation for Q1 2025 including departmental allocations and capital expenditures.",
      type: "Budget Approval",
      deadline: "2024-12-15 17:00",
      status: "open" as const,
      quorum: 6,
      totalVoters: 8,
      votes: { yes: 4, no: 1, abstain: 0 },
      hasVoted: false,
      createdBy: "John Doe",
      createdAt: "2024-12-08",
      isUrgent: true,
    },
    {
      id: 2,
      title: "Appoint New Independent Director",
      description:
        "Appointment of Sarah Johnson as Independent Director to the Board of Directors.",
      type: "Appointment",
      deadline: "2024-12-18 12:00",
      status: "open" as const,
      quorum: 6,
      totalVoters: 8,
      votes: { yes: 2, no: 0, abstain: 1 },
      hasVoted: true,
      userVote: "yes",
      createdBy: "Michael Brown",
      createdAt: "2024-12-10",
      isUrgent: false,
    },
    {
      id: 3,
      title: "Strategic Partnership with TechCorp",
      description:
        "Approve strategic partnership agreement with TechCorp Ltd for joint venture in emerging markets.",
      type: "Partnership",
      deadline: "2024-12-20 15:00",
      status: "open" as const,
      quorum: 6,
      totalVoters: 8,
      votes: { yes: 1, no: 0, abstain: 0 },
      hasVoted: false,
      createdBy: "Emma Wilson",
      createdAt: "2024-12-11",
      isUrgent: false,
    },
    {
      id: 4,
      title: "Annual Executive Compensation Review",
      description:
        "Review and approve the annual executive compensation packages and performance bonuses.",
      type: "Compensation",
      deadline: "2024-12-05 17:00",
      status: "closed" as const,
      quorum: 6,
      totalVoters: 8,
      votes: { yes: 6, no: 1, abstain: 1 },
      hasVoted: true,
      userVote: "yes",
      createdBy: "John Doe",
      createdAt: "2024-11-28",
      isUrgent: false,
      result: "approved",
    },
    {
      id: 5,
      title: "Update Company Bylaws - Section 4.2",
      description:
        "Approve amendments to company bylaws regarding board meeting procedures and quorum requirements.",
      type: "Governance",
      deadline: "2024-12-03 12:00",
      status: "closed" as const,
      quorum: 6,
      totalVoters: 8,
      votes: { yes: 7, no: 0, abstain: 1 },
      hasVoted: true,
      userVote: "yes",
      createdBy: "Sarah Chen",
      createdAt: "2024-11-25",
      isUrgent: false,
      result: "approved",
    },
  ];

  const filteredVotes = votes.filter((vote) => {
    const matchesSearch =
      vote.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vote.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || vote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getVotePercentage = (vote: (typeof votes)[0]) => {
    const totalVotes = vote.votes.yes + vote.votes.no + vote.votes.abstain;
    return totalVotes === 0
      ? 0
      : Math.round((vote.votes.yes / totalVotes) * 100);
  };

  const getParticipationPercentage = (vote: (typeof votes)[0]) => {
    const totalVotes = vote.votes.yes + vote.votes.no + vote.votes.abstain;
    return Math.round((totalVotes / vote.totalVoters) * 100);
  };

  const isDeadlineSoon = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const timeDiff = deadlineDate.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);
    return hoursDiff <= 24 && hoursDiff > 0;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Voting & Approvals"
        description="Manage board votes, resolutions, and approval processes"
      >
        <Button
          onClick={() => {
            navigate("/voting/create");
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Vote
        </Button>
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search votes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Votes</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Votes List */}
      <div className="space-y-4">
        {filteredVotes.map((vote) => (
          <Card
            key={vote.id}
            className={`${
              vote.isUrgent && vote.status === "open" ? "border-warning" : ""
            }`}
          >
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{vote.title}</h3>
                      {vote.isUrgent && vote.status === "open" && (
                        <Badge className="bg-warning text-warning-foreground">
                          Urgent
                        </Badge>
                      )}
                      <StatusBadge status={vote.status} />
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">
                      {vote.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Created: {vote.createdAt}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Deadline: {vote.deadline}
                        {isDeadlineSoon(vote.deadline) &&
                          vote.status === "open" && (
                            <span className="text-warning font-medium">
                              (Ending Soon)
                            </span>
                          )}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Badge variant="outline">{vote.type}</Badge>
                    {vote.status === "open" && !vote.hasVoted && (
                      <Button size="sm">
                        <Vote className="w-4 h-4 mr-2" />
                        Vote Now
                      </Button>
                    )}
                    {vote.hasVoted && (
                      <Badge className="bg-success-light text-success">
                        You voted: {vote.userVote?.toUpperCase()}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Voting Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Voting Progress</span>
                    <span>
                      {vote.votes.yes + vote.votes.no + vote.votes.abstain}/
                      {vote.totalVoters} votes cast (
                      {getParticipationPercentage(vote)}%)
                    </span>
                  </div>
                  <Progress
                    value={getParticipationPercentage(vote)}
                    className="h-2"
                  />

                  {/* Vote Breakdown */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center justify-between p-2 bg-success-light rounded">
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        Yes
                      </span>
                      <span className="font-medium">{vote.votes.yes}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-danger-light rounded">
                      <span className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-danger" />
                        No
                      </span>
                      <span className="font-medium">{vote.votes.no}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        Abstain
                      </span>
                      <span className="font-medium">{vote.votes.abstain}</span>
                    </div>
                  </div>

                  {/* Quorum Status */}
                  <div className="flex items-center justify-between text-sm p-2 bg-background-subtle rounded">
                    <span>Quorum Required: {vote.quorum} votes</span>
                    <span
                      className={`font-medium ${
                        vote.votes.yes + vote.votes.no + vote.votes.abstain >=
                        vote.quorum
                          ? "text-success"
                          : "text-warning"
                      }`}
                    >
                      {vote.votes.yes + vote.votes.no + vote.votes.abstain >=
                      vote.quorum
                        ? "Met"
                        : "Not Met"}
                    </span>
                  </div>

                  {/* Result for closed votes */}
                  {vote.status === "closed" && vote.result && (
                    <div
                      className={`flex items-center gap-2 p-2 rounded ${
                        vote.result === "approved"
                          ? "bg-success-light text-success"
                          : "bg-danger-light text-danger"
                      }`}
                    >
                      {vote.result === "approved" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                      <span className="font-medium">
                        Motion{" "}
                        {vote.result === "approved" ? "Approved" : "Rejected"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
