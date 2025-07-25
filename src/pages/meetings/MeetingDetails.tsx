import { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Edit,
  Download,
  Video,
  FileText,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

export default function MeetingDetails() {
  const [minutes, setMinutes] = useState("");
  const navigate = useNavigate();

  const meeting = {
    id: "1",
    title: "Q4 Board Review Meeting",
    type: "Board Meeting",
    date: "2024-03-15",
    time: "09:00",
    duration: "2 hours",
    location: "Conference Room A",
    videoLink: "https://meet.company.com/board-q4",
    status: "pending" as const,
    description:
      "Quarterly review of financial performance and strategic initiatives for Q4 2024.",
    chairperson: { name: "John Doe", role: "Chairman" },
    secretary: { name: "Sarah Chen", role: "Secretary" },
  };

  const agenda = [
    {
      id: 1,
      title: "Call to Order",
      duration: "5 min",
      presenter: "John Doe",
      status: "pending" as const,
    },
    {
      id: 2,
      title: "Approval of Previous Minutes",
      duration: "10 min",
      presenter: "Sarah Chen",
      status: "pending" as const,
    },
    {
      id: 3,
      title: "Financial Review Q4",
      duration: "30 min",
      presenter: "Lisa Garcia",
      status: "pending" as const,
    },
    {
      id: 4,
      title: "Strategic Initiatives",
      duration: "45 min",
      presenter: "Michael Brown",
      status: "pending" as const,
    },
  ];

  const attendees = [
    { id: "1", name: "John Doe", role: "Chairman", status: "active" as const },
    {
      id: "2",
      name: "Sarah Chen",
      role: "Secretary",
      status: "active" as const,
    },
    {
      id: "3",
      name: "Michael Brown",
      role: "Director",
      status: "pending" as const,
    },
    {
      id: "4",
      name: "Emma Wilson",
      role: "Director",
      status: "active" as const,
    },
  ];

  const documents = [
    {
      id: "1",
      name: "Financial Report Q4 2024.pdf",
      type: "Financial",
      size: "2.5 MB",
    },
    {
      id: "2",
      name: "Board Resolution Draft.docx",
      type: "Legal",
      size: "1.2 MB",
    },
    {
      id: "3",
      name: "Strategic Plan 2025.pptx",
      type: "Strategy",
      size: "5.8 MB",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={meeting.title}
        description={`${meeting.type} • ${meeting.date} at ${meeting.time}`}
      >
        <div className="flex gap-3">
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Edit Meeting
          </Button>
          <Button>
            <Video className="w-4 h-4 mr-2" />
            Join Meeting
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Meeting Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Meeting Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Date & Time
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4" />
                    {meeting.date} at {meeting.time}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Duration
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4" />
                    {meeting.duration}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Location
                  </div>
                  <div className="mt-1">{meeting.location}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Status
                  </div>
                  <div className="mt-1">
                    <StatusBadge status={meeting.status} />
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Description
                </div>
                <p className="mt-1 text-sm">{meeting.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Agenda */}
          <Card>
            <CardHeader>
              <CardTitle>Meeting Agenda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {agenda.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 border border-border rounded-lg"
                  >
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.presenter} • {item.duration}
                      </div>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Minutes */}
          <Card>
            <CardHeader>
              <CardTitle>Meeting Minutes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter meeting minutes here..."
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                rows={8}
              />
              <div className="flex gap-2">
                <Button size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Save Minutes
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Meeting Roles */}
          <Card>
            <CardHeader>
              <CardTitle>Meeting Roles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Chairperson
                </div>
                <div className="mt-1">{meeting.chairperson.name}</div>
                <div className="text-xs text-muted-foreground">
                  {meeting.chairperson.role}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Secretary
                </div>
                <div className="mt-1">{meeting.secretary.name}</div>
                <div className="text-xs text-muted-foreground">
                  {meeting.secretary.role}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attendees */}
          <Card>
            <CardHeader>
              <CardTitle>Attendees ({attendees.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {attendees.map((attendee) => (
                <div key={attendee.id} className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={`/avatars/${attendee.id}.jpg`} />
                    <AvatarFallback>
                      {attendee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{attendee.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {attendee.role}
                    </div>
                  </div>
                  <StatusBadge status={attendee.status} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Attached Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 p-2 border border-border rounded"
                >
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {doc.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {doc.type} • {doc.size}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
