import { useState } from "react";
import {
  Plus,
  Calendar,
  User,
  MessageSquare,
  Paperclip,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/PageHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface Task {
  id: number;
  title: string;
  description: string;
  assignee: {
    id: string;
    name: string;
    avatar?: string;
    initials: string;
  };
  dueDate: string;
  priority: "low" | "medium" | "high";
  comments: number;
  attachments: number;
  tags: string[];
  status: "todo" | "inprogress" | "done";
}

export default function TaskBoard() {
  const navigate = useNavigate();
  const [tasks] = useState<Task[]>([
    {
      id: 1,
      title: "Review Q4 Financial Statements",
      description:
        "Complete review of quarterly financial statements before board meeting",
      assignee: { id: "1", name: "Sarah Chen", initials: "SC" },
      dueDate: "2024-12-15",
      priority: "high",
      comments: 3,
      attachments: 2,
      tags: ["Financial", "Review"],
      status: "todo",
    },
    {
      id: 2,
      title: "Prepare Governance Report",
      description: "Compile governance compliance report for annual review",
      assignee: { id: "2", name: "Michael Brown", initials: "MB" },
      dueDate: "2024-12-18",
      priority: "medium",
      comments: 1,
      attachments: 0,
      tags: ["Governance", "Compliance"],
      status: "todo",
    },
    {
      id: 3,
      title: "Update Board Policies",
      description:
        "Review and update board policies in accordance with new regulations",
      assignee: { id: "3", name: "Emma Wilson", initials: "EW" },
      dueDate: "2024-12-20",
      priority: "medium",
      comments: 5,
      attachments: 3,
      tags: ["Policy", "Legal"],
      status: "inprogress",
    },
    {
      id: 4,
      title: "Finalize Audit Committee Charter",
      description: "Complete the final draft of the audit committee charter",
      assignee: { id: "4", name: "Robert Johnson", initials: "RJ" },
      dueDate: "2024-12-12",
      priority: "high",
      comments: 2,
      attachments: 1,
      tags: ["Audit", "Charter"],
      status: "inprogress",
    },
    {
      id: 5,
      title: "Board Meeting Minutes - November",
      description: "Draft and distribute November board meeting minutes",
      assignee: { id: "5", name: "Lisa Garcia", initials: "LG" },
      dueDate: "2024-12-05",
      priority: "low",
      comments: 0,
      attachments: 1,
      tags: ["Minutes", "Documentation"],
      status: "done",
    },
    {
      id: 6,
      title: "Strategic Plan Review",
      description:
        "Annual review of 5-year strategic plan with recommendations",
      assignee: { id: "1", name: "Sarah Chen", initials: "SC" },
      dueDate: "2024-12-10",
      priority: "medium",
      comments: 8,
      attachments: 4,
      tags: ["Strategy", "Planning"],
      status: "done",
    },
  ]);

  const columns = [
    { id: "todo", title: "To Do", status: "todo" as const },
    { id: "inprogress", title: "In Progress", status: "inprogress" as const },
    { id: "done", title: "Done", status: "done" as const },
  ];

  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter((task) => task.status === status);
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "text-danger";
      case "medium":
        return "text-warning";
      case "low":
        return "text-success";
      default:
        return "text-muted-foreground";
    }
  };

  const getPriorityIcon = (priority: Task["priority"]) => {
    return <Flag className={`w-4 h-4 ${getPriorityColor(priority)}`} />;
  };

  const isOverdue = (dueDate: string) => {
    return (
      new Date(dueDate) < new Date() &&
      new Date(dueDate).toDateString() !== new Date().toDateString()
    );
  };

  const isDueSoon = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const timeDiff = due.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff <= 2 && daysDiff >= 0;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Task Board"
        description="Track and manage board-related tasks and assignments"
      >
        <Button
          onClick={() => {
            navigate("/tasks/create");
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Task
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.status);

          return (
            <div key={column.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{column.title}</h3>
                <Badge variant="outline">{columnTasks.length}</Badge>
              </div>

              <div className="space-y-3">
                {columnTasks.map((task) => (
                  <Card
                    key={task.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4 space-y-3">
                      {/* Task Header */}
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm leading-tight">
                          {task.title}
                        </h4>
                        {getPriorityIcon(task.priority)}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {task.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {task.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Due Date */}
                      <div
                        className={`flex items-center gap-1 text-xs ${
                          isOverdue(task.dueDate)
                            ? "text-danger"
                            : isDueSoon(task.dueDate)
                            ? "text-warning"
                            : "text-muted-foreground"
                        }`}
                      >
                        <Calendar className="w-3 h-3" />
                        Due: {task.dueDate}
                        {isOverdue(task.dueDate) && (
                          <Badge className="ml-1 text-xs bg-danger text-danger-foreground">
                            Overdue
                          </Badge>
                        )}
                        {isDueSoon(task.dueDate) &&
                          !isOverdue(task.dueDate) && (
                            <Badge className="ml-1 text-xs bg-warning text-warning-foreground">
                              Due Soon
                            </Badge>
                          )}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={task.assignee.avatar} />
                            <AvatarFallback className="text-xs">
                              {task.assignee.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">
                            {task.assignee.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          {task.comments > 0 && (
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />
                              {task.comments}
                            </span>
                          )}
                          {task.attachments > 0 && (
                            <span className="flex items-center gap-1">
                              <Paperclip className="w-3 h-3" />
                              {task.attachments}
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add Task Button */}
                <Button
                  variant="outline"
                  className="w-full border-dashed"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
