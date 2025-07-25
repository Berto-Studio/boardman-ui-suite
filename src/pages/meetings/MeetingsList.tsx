import { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Plus,
  Filter,
  Search,
  Video,
  FileText,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

export default function MeetingsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const meetings = [
    {
      id: 1,
      title: "Q4 Board Review",
      type: "Board Meeting",
      date: "2024-12-12",
      time: "14:00",
      duration: "2 hours",
      attendees: 8,
      location: "Conference Room A",
      videoLink: "https://meet.company.com/q4-review",
      status: "active" as const,
      documentsCount: 5,
      chairperson: "John Doe",
      secretary: "Sarah Chen",
    },
    {
      id: 2,
      title: "Audit Committee Meeting",
      type: "Committee",
      date: "2024-12-15",
      time: "10:00",
      duration: "1.5 hours",
      attendees: 5,
      location: "Virtual",
      videoLink: "https://meet.company.com/audit-committee",
      status: "pending" as const,
      documentsCount: 3,
      chairperson: "Michael Brown",
      secretary: "Emma Wilson",
    },
    {
      id: 3,
      title: "Strategic Planning Session",
      type: "Planning",
      date: "2024-12-18",
      time: "13:00",
      duration: "3 hours",
      attendees: 12,
      location: "Executive Boardroom",
      videoLink: null,
      status: "draft" as const,
      documentsCount: 8,
      chairperson: "John Doe",
      secretary: "Sarah Chen",
    },
    {
      id: 4,
      title: "Emergency Board Meeting",
      type: "Emergency",
      date: "2024-12-08",
      time: "16:00",
      duration: "1 hour",
      attendees: 8,
      location: "Virtual",
      videoLink: "https://meet.company.com/emergency",
      status: "completed" as const,
      documentsCount: 2,
      chairperson: "John Doe",
      secretary: "Sarah Chen",
    },
  ];

  const filteredMeetings = meetings.filter((meeting) => {
    const matchesSearch =
      meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || meeting.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Meetings"
        description="Schedule and manage board meetings and committee sessions"
      >
        <Button
          onClick={() => {
            navigate("/meetings/create");
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Schedule Meeting
        </Button>
      </PageHeader>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search meetings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Meetings Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Meetings ({filteredMeetings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Meeting</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Attendees</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMeetings.map((meeting) => (
                <TableRow
                  key={meeting.id}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell>
                    <div>
                      <div className="font-medium">{meeting.title}</div>
                      <div className="text-sm text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          {meeting.type}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{meeting.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>
                        {meeting.time} ({meeting.duration})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{meeting.attendees}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {meeting.location === "Virtual" ? (
                        <Video className="w-4 h-4 text-primary" />
                      ) : (
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className="text-sm">{meeting.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={meeting.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            navigate("/meetings/details/1");
                          }}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Meeting</DropdownMenuItem>
                        {meeting.videoLink && (
                          <DropdownMenuItem>
                            <Video className="w-4 h-4 mr-2" />
                            Join Meeting
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <FileText className="w-4 h-4 mr-2" />
                          Documents ({meeting.documentsCount})
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-danger">
                          Cancel Meeting
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
