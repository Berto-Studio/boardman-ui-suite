import { useState } from "react";
import { Calendar, Clock, Users, Plus, Link, FileText, Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export default function CreateMeeting() {
  const [agendaItems, setAgendaItems] = useState([
    { id: 1, title: "Call to Order", duration: "5 min", presenter: "" },
    { id: 2, title: "Approval of Previous Minutes", duration: "10 min", presenter: "" }
  ]);

  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);

  const attendees = [
    { id: "1", name: "John Doe", role: "Chairman", email: "john@company.com" },
    { id: "2", name: "Sarah Chen", role: "Secretary", email: "sarah@company.com" },
    { id: "3", name: "Michael Brown", role: "Director", email: "michael@company.com" },
    { id: "4", name: "Emma Wilson", role: "Director", email: "emma@company.com" },
    { id: "5", name: "Robert Johnson", role: "Independent Director", email: "robert@company.com" },
    { id: "6", name: "Lisa Garcia", role: "CFO", email: "lisa@company.com" }
  ];

  const documents = [
    { id: "1", name: "Financial Report Q4 2024.pdf", type: "Financial" },
    { id: "2", name: "Board Resolution Draft.docx", type: "Legal" },
    { id: "3", name: "Strategic Plan 2025.pptx", type: "Strategy" },
    { id: "4", name: "Audit Committee Report.pdf", type: "Audit" }
  ];

  const addAgendaItem = () => {
    const newItem = {
      id: Date.now(),
      title: "",
      duration: "15 min",
      presenter: ""
    };
    setAgendaItems([...agendaItems, newItem]);
  };

  const updateAgendaItem = (id: number, field: string, value: string) => {
    setAgendaItems(items =>
      items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeAgendaItem = (id: number) => {
    setAgendaItems(items => items.filter(item => item.id !== id));
  };

  const toggleAttendee = (attendeeId: string) => {
    setSelectedAttendees(prev =>
      prev.includes(attendeeId)
        ? prev.filter(id => id !== attendeeId)
        : [...prev, attendeeId]
    );
  };

  const toggleDocument = (docId: string) => {
    setSelectedDocuments(prev =>
      prev.includes(docId)
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Schedule New Meeting" 
        description="Create and schedule a new board meeting or committee session"
      >
        <div className="flex gap-3">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Meetings
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Meeting
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Meeting Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Meeting Title</Label>
                  <Input id="title" placeholder="e.g., Q4 Board Review" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Meeting Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="board">Board Meeting</SelectItem>
                      <SelectItem value="committee">Committee Meeting</SelectItem>
                      <SelectItem value="emergency">Emergency Meeting</SelectItem>
                      <SelectItem value="planning">Planning Session</SelectItem>
                      <SelectItem value="review">Review Meeting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Start Time</Label>
                  <Input id="time" type="time" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="180">3 hours</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Conference Room A or Virtual" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="video-link">Video Conference Link</Label>
                  <Input id="video-link" placeholder="https://meet.company.com/..." />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Brief description of the meeting purpose and key topics..." 
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Agenda Builder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Meeting Agenda
                <Button variant="outline" size="sm" onClick={addAgendaItem}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {agendaItems.map((item, index) => (
                <div key={item.id} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                  <div className="w-8 h-8 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Input
                      placeholder="Agenda item title"
                      value={item.title}
                      onChange={(e) => updateAgendaItem(item.id, 'title', e.target.value)}
                    />
                    <Select value={item.duration} onValueChange={(value) => updateAgendaItem(item.id, 'duration', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5 min">5 minutes</SelectItem>
                        <SelectItem value="10 min">10 minutes</SelectItem>
                        <SelectItem value="15 min">15 minutes</SelectItem>
                        <SelectItem value="30 min">30 minutes</SelectItem>
                        <SelectItem value="45 min">45 minutes</SelectItem>
                        <SelectItem value="60 min">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Presenter"
                      value={item.presenter}
                      onChange={(e) => updateAgendaItem(item.id, 'presenter', e.target.value)}
                    />
                  </div>
                  {agendaItems.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAgendaItem(item.id)}
                      className="text-danger hover:text-danger"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Roles Assignment */}
          <Card>
            <CardHeader>
              <CardTitle>Meeting Roles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Chairperson</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select chairperson" />
                  </SelectTrigger>
                  <SelectContent>
                    {attendees.map((attendee) => (
                      <SelectItem key={attendee.id} value={attendee.id}>
                        {attendee.name} - {attendee.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Secretary</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select secretary" />
                  </SelectTrigger>
                  <SelectContent>
                    {attendees.map((attendee) => (
                      <SelectItem key={attendee.id} value={attendee.id}>
                        {attendee.name} - {attendee.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Attendees */}
          <Card>
            <CardHeader>
              <CardTitle>Attendees ({selectedAttendees.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {attendees.map((attendee) => (
                <div key={attendee.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={attendee.id}
                    checked={selectedAttendees.includes(attendee.id)}
                    onCheckedChange={() => toggleAttendee(attendee.id)}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{attendee.name}</div>
                    <div className="text-xs text-muted-foreground">{attendee.role}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Attach Documents ({selectedDocuments.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={doc.id}
                    checked={selectedDocuments.includes(doc.id)}
                    onCheckedChange={() => toggleDocument(doc.id)}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{doc.name}</div>
                    <Badge variant="outline" className="text-xs">
                      {doc.type}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Upload New Document
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}