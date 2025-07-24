import { useState } from "react";
import { FileSearch, Download, Filter, Calendar, User, Activity, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [dateRange, setDateRange] = useState("7days");

  const auditLogs = [
    {
      id: 1,
      timestamp: "2024-12-11 14:23:15",
      user: "John Doe",
      userRole: "Chairman",
      action: "Document Viewed",
      resource: "Q4 Financial Report.pdf",
      resourceType: "Document",
      ipAddress: "192.168.1.100",
      userAgent: "Chrome 120.0.0.0",
      details: "Opened financial report for review",
      riskLevel: "low"
    },
    {
      id: 2,
      timestamp: "2024-12-11 13:45:32",
      user: "Sarah Chen",
      userRole: "Secretary",
      action: "Vote Cast",
      resource: "Budget Approval Motion",
      resourceType: "Vote",
      ipAddress: "192.168.1.101",
      userAgent: "Safari 17.0",
      details: "Voted 'Yes' on Q1 2025 budget allocation",
      riskLevel: "medium"
    },
    {
      id: 3,
      timestamp: "2024-12-11 12:17:08",
      user: "Michael Brown",
      userRole: "Director",
      action: "Document Downloaded",
      resource: "Board Resolution Draft.docx",
      resourceType: "Document",
      ipAddress: "192.168.1.102",
      userAgent: "Firefox 120.0",
      details: "Downloaded document for offline review",
      riskLevel: "medium"
    },
    {
      id: 4,
      timestamp: "2024-12-11 11:32:45",
      user: "Emma Wilson",
      userRole: "Director",
      action: "Meeting Scheduled",
      resource: "Emergency Board Meeting",
      resourceType: "Meeting",
      ipAddress: "192.168.1.103",
      userAgent: "Chrome 120.0.0.0",
      details: "Scheduled emergency meeting for Dec 15",
      riskLevel: "high"
    },
    {
      id: 5,
      timestamp: "2024-12-11 10:15:22",
      user: "Robert Johnson",
      userRole: "Independent Director",
      action: "User Login",
      resource: "BoardMan System",
      resourceType: "System",
      ipAddress: "192.168.1.104",
      userAgent: "Edge 120.0.0.0",
      details: "Successful login to BoardMan platform",
      riskLevel: "low"
    },
    {
      id: 6,
      timestamp: "2024-12-11 09:58:13",
      user: "Lisa Garcia",
      userRole: "CFO",
      action: "Document Uploaded",
      resource: "Audit Committee Report.pdf",
      resourceType: "Document",
      ipAddress: "192.168.1.105",
      userAgent: "Chrome 120.0.0.0",
      details: "Uploaded new audit committee report",
      riskLevel: "medium"
    },
    {
      id: 7,
      timestamp: "2024-12-10 16:42:18",
      user: "David Kim",
      userRole: "Director",
      action: "Policy Acknowledged",
      resource: "Code of Conduct v3.0",
      resourceType: "Policy",
      ipAddress: "192.168.1.106",
      userAgent: "Safari 17.0",
      details: "Acknowledged updated code of conduct policy",
      riskLevel: "low"
    },
    {
      id: 8,
      timestamp: "2024-12-10 15:28:44",
      user: "Maria Rodriguez",
      userRole: "Director",
      action: "COI Disclosure",
      resource: "Financial Interest Declaration",
      resourceType: "Disclosure",
      ipAddress: "192.168.1.107",
      userAgent: "Chrome 120.0.0.0",
      details: "Updated conflict of interest disclosure",
      riskLevel: "high"
    }
  ];

  const users = [
    "John Doe", "Sarah Chen", "Michael Brown", "Emma Wilson", 
    "Robert Johnson", "Lisa Garcia", "David Kim", "Maria Rodriguez"
  ];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = actionFilter === "all" || log.action.toLowerCase().includes(actionFilter.toLowerCase());
    const matchesUser = userFilter === "all" || log.user === userFilter;
    return matchesSearch && matchesAction && matchesUser;
  });

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

  const getActionIcon = (action: string) => {
    if (action.includes("Login")) return <User className="w-4 h-4 text-info" />;
    if (action.includes("Vote")) return <Activity className="w-4 h-4 text-primary" />;
    if (action.includes("Document")) return <FileSearch className="w-4 h-4 text-success" />;
    if (action.includes("Meeting")) return <Calendar className="w-4 h-4 text-warning" />;
    return <Activity className="w-4 h-4 text-muted-foreground" />;
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Audit Logs" 
        description="Complete audit trail of all user actions and system events"
      >
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </Button>
      </PageHeader>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="login">User Login</SelectItem>
                <SelectItem value="document">Document Actions</SelectItem>
                <SelectItem value="vote">Vote Actions</SelectItem>
                <SelectItem value="meeting">Meeting Actions</SelectItem>
                <SelectItem value="policy">Policy Actions</SelectItem>
              </SelectContent>
            </Select>

            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                {users.map((user) => (
                  <SelectItem key={user} value={user}>
                    {user}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24hours">Last 24 Hours</SelectItem>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Trail ({filteredLogs.length} entries)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="text-sm">
                      <div>{log.timestamp.split(' ')[0]}</div>
                      <div className="text-muted-foreground">{log.timestamp.split(' ')[1]}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{log.user}</div>
                      <div className="text-sm text-muted-foreground">{log.userRole}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getActionIcon(log.action)}
                      <span className="font-medium">{log.action}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{log.resource}</div>
                      <Badge variant="outline" className="text-xs mt-1">
                        {log.resourceType}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRiskLevelColor(log.riskLevel)}>
                      {log.riskLevel.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <div className="text-sm">{log.details}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        IP: {log.ipAddress} • {log.userAgent.split(' ')[0]}
                      </div>
                    </div>
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