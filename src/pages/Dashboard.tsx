import {
  Calendar,
  FileText,
  Vote,
  CheckSquare,
  Users,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const stats = [
    {
      title: "Upcoming Meetings",
      value: "3",
      change: "+2 this week",
      icon: Calendar,
      color: "text-primary",
    },
    {
      title: "Pending Votes",
      value: "5",
      change: "2 urgent",
      icon: Vote,
      color: "text-warning",
    },
    {
      title: "Open Tasks",
      value: "12",
      change: "+4 today",
      icon: CheckSquare,
      color: "text-info",
    },
    {
      title: "Compliance Score",
      value: "94%",
      change: "+2% this month",
      icon: TrendingUp,
      color: "text-success",
    },
  ];

  const upcomingMeetings = [
    {
      id: 1,
      title: "Q4 Board Review",
      date: "Tomorrow, 2:00 PM",
      attendees: 8,
      status: "active" as const,
    },
    {
      id: 2,
      title: "Audit Committee",
      date: "Dec 15, 10:00 AM",
      attendees: 5,
      status: "pending" as const,
    },
    {
      id: 3,
      title: "Strategic Planning",
      date: "Dec 18, 1:00 PM",
      attendees: 12,
      status: "draft" as const,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Document uploaded",
      item: "Financial Report Q4 2024.pdf",
      user: "Sarah Chen",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "Vote completed",
      item: "Budget Approval Motion",
      user: "System",
      time: "4 hours ago",
    },
    {
      id: 3,
      action: "Meeting scheduled",
      item: "Emergency Board Meeting",
      user: "John Doe",
      time: "1 day ago",
    },
    {
      id: 4,
      action: "Task assigned",
      item: "Review compliance documents",
      user: "Michael Brown",
      time: "2 days ago",
    },
  ];

  const pendingVotes = [
    {
      id: 1,
      title: "Approve Q1 2025 Budget",
      deadline: "Dec 12, 2024",
      votes: { yes: 4, no: 1, abstain: 0, total: 8 },
      status: "open" as const,
    },
    {
      id: 2,
      title: "New Board Member Appointment",
      deadline: "Dec 15, 2024",
      votes: { yes: 2, no: 0, abstain: 1, total: 8 },
      status: "open" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back, John. Here's what's happening with your board."
      >
        <Button
          onClick={() => {
            navigate("/meetings/create");
          }}
        >
          Schedule Meeting
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Meetings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Meetings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-center justify-between p-3 border border-border rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-medium">{meeting.title}</h4>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {meeting.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {meeting.attendees} attendees
                    </span>
                  </div>
                </div>
                <StatusBadge status={meeting.status} />
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                navigate("/meetings");
              }}
            >
              View All Meetings
            </Button>
          </CardContent>
        </Card>

        {/* Pending Votes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Vote className="w-5 h-5" />
              Pending Votes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingVotes.map((vote) => (
              <div
                key={vote.id}
                className="p-3 border border-border rounded-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">{vote.title}</h4>
                  <StatusBadge status={vote.status} />
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <span>Deadline: {vote.deadline}</span>
                  <span>
                    {vote.votes.yes + vote.votes.no + vote.votes.abstain}/
                    {vote.votes.total} votes
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    Vote
                  </Button>
                  <Button size="sm" variant="outline">
                    Details
                  </Button>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                navigate("/voting");
              }}
            >
              View All Votes
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-3 hover:bg-background-subtle rounded-lg transition-colors"
              >
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{activity.action}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">
                      {activity.item}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    by {activity.user} • {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
