import { useState } from "react";
import { Save, ArrowLeft, Calendar, User, Flag, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/shared/PageHeader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CreateTask() {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [subtasks, setSubtasks] = useState([{ id: 1, title: "", completed: false }]);

  const users = [
    { id: "1", name: "John Doe", role: "Chairman" },
    { id: "2", name: "Sarah Chen", role: "Secretary" },
    { id: "3", name: "Michael Brown", role: "Director" },
    { id: "4", name: "Emma Wilson", role: "Director" },
    { id: "5", name: "Robert Johnson", role: "Independent Director" },
    { id: "6", name: "Lisa Garcia", role: "CFO" }
  ];

  const taskTypes = [
    "Document Review", "Meeting Preparation", "Policy Update", "Compliance Check",
    "Financial Analysis", "Strategic Planning", "Board Communication", "Other"
  ];

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const addSubtask = () => {
    setSubtasks([...subtasks, { id: Date.now(), title: "", completed: false }]);
  };

  const updateSubtask = (id: number, title: string) => {
    setSubtasks(subtasks.map(st => st.id === id ? { ...st, title } : st));
  };

  const removeSubtask = (id: number) => {
    if (subtasks.length > 1) {
      setSubtasks(subtasks.filter(st => st.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Create New Task" 
        description="Create a new task for board members"
      >
        <div className="flex gap-3">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tasks
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Create Task
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Task Details */}
          <Card>
            <CardHeader>
              <CardTitle>Task Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input id="title" placeholder="e.g., Review Q4 Financial Reports" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Task Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {taskTypes.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Detailed description of the task requirements and objectives..." 
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="due-date">Due Date</Label>
                  <Input id="due-date" type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimated-hours">Estimated Hours</Label>
                <Input id="estimated-hours" type="number" min="0" step="0.5" placeholder="e.g., 2.5" />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button variant="outline" onClick={addTag}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subtasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Subtasks
                <Button variant="outline" size="sm" onClick={addSubtask}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Subtask
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {subtasks.map((subtask) => (
                <div key={subtask.id} className="flex items-center gap-3">
                  <Input
                    placeholder="Subtask description..."
                    value={subtask.title}
                    onChange={(e) => updateSubtask(subtask.id, e.target.value)}
                    className="flex-1"
                  />
                  {subtasks.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSubtask(subtask.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Assignment */}
          <Card>
            <CardHeader>
              <CardTitle>Assignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Assigned To</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={`/avatars/${user.id}.jpg`} />
                            <AvatarFallback className="text-xs">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.role}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Reviewer (Optional)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reviewer" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} - {user.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Dependencies */}
          <Card>
            <CardHeader>
              <CardTitle>Dependencies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Depends On</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select dependent task" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="task-1">Prepare financial documents</SelectItem>
                    <SelectItem value="task-2">Schedule board meeting</SelectItem>
                    <SelectItem value="task-3">Review compliance checklist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Related Meeting</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Link to meeting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting-1">Q4 Board Review</SelectItem>
                    <SelectItem value="meeting-2">Audit Committee Meeting</SelectItem>
                    <SelectItem value="meeting-3">Strategic Planning Session</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Attachments */}
          <Card>
            <CardHeader>
              <CardTitle>Attachments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Attach Files
              </Button>
              <div className="text-xs text-muted-foreground">
                Attach relevant documents or resources for this task
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label>Reminder</Label>
                <Select defaultValue="1-day">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No reminder</SelectItem>
                    <SelectItem value="1-hour">1 hour before</SelectItem>
                    <SelectItem value="1-day">1 day before</SelectItem>
                    <SelectItem value="3-days">3 days before</SelectItem>
                    <SelectItem value="1-week">1 week before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}