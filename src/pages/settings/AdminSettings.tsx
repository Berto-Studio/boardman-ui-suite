import { Settings, Users, Shield, Database, Mail, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function AdminSettings() {
  const users = [
    { id: 1, name: "John Doe", email: "john@company.com", role: "Chairman", status: "active", lastLogin: "2024-12-11" },
    { id: 2, name: "Sarah Chen", email: "sarah@company.com", role: "Secretary", status: "active", lastLogin: "2024-12-11" },
    { id: 3, name: "Michael Brown", email: "michael@company.com", role: "Director", status: "active", lastLogin: "2024-12-10" },
    { id: 4, name: "Emma Wilson", email: "emma@company.com", role: "Director", status: "active", lastLogin: "2024-12-11" },
    { id: 5, name: "Robert Johnson", email: "robert@company.com", role: "Independent Director", status: "active", lastLogin: "2024-12-11" },
    { id: 6, name: "Lisa Garcia", email: "lisa@company.com", role: "CFO", status: "active", lastLogin: "2024-12-11" },
    { id: 7, name: "David Kim", email: "david@company.com", role: "Director", status: "inactive", lastLogin: "2024-12-05" },
    { id: 8, name: "Maria Rodriguez", email: "maria@company.com", role: "Director", status: "active", lastLogin: "2024-12-10" }
  ];

  const permissions = [
    { module: "Dashboard", view: true, edit: false, admin: false },
    { module: "Meetings", view: true, edit: true, admin: true },
    { module: "Documents", view: true, edit: true, admin: false },
    { module: "Voting", view: true, edit: true, admin: false },
    { module: "Tasks", view: true, edit: true, admin: false },
    { module: "Governance", view: true, edit: false, admin: true },
    { module: "Compliance", view: true, edit: false, admin: true },
    { module: "Audit Logs", view: false, edit: false, admin: true },
    { module: "Settings", view: false, edit: false, admin: true }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Admin Settings" 
        description="Manage users, permissions, and system configuration"
      />

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {/* User Management */}
        <TabsContent value="users" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">User Management</h3>
            <Button>
              <Users className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center text-primary font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{user.role}</Badge>
                      <Badge className={user.status === "active" ? "bg-success-light text-success" : "bg-muted text-muted-foreground"}>
                        {user.status}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        Last login: {user.lastLogin}
                      </div>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissions */}
        <TabsContent value="permissions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Permission Matrix</h3>
            <Button variant="outline">
              <Shield className="w-4 h-4 mr-2" />
              Reset to Default
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3">Module</th>
                      <th className="text-center p-3">View</th>
                      <th className="text-center p-3">Edit</th>
                      <th className="text-center p-3">Admin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissions.map((permission) => (
                      <tr key={permission.module} className="border-b border-border">
                        <td className="p-3 font-medium">{permission.module}</td>
                        <td className="text-center p-3">
                          <Switch checked={permission.view} />
                        </td>
                        <td className="text-center p-3">
                          <Switch checked={permission.edit} />
                        </td>
                        <td className="text-center p-3">
                          <Switch checked={permission.admin} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Organization Settings */}
        <TabsContent value="organization" className="space-y-6">
          <h3 className="text-lg font-semibold">Organization Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Organization Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input id="org-name" defaultValue="Acme Corporation" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-domain">Email Domain</Label>
                  <Input id="org-domain" defaultValue="company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-timezone">Timezone</Label>
                  <Input id="org-timezone" defaultValue="UTC-8 (Pacific Time)" />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="meeting-reminders">Meeting Reminders</Label>
                  <Switch id="meeting-reminders" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="vote-notifications">Vote Notifications</Label>
                  <Switch id="vote-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="document-notifications">Document Notifications</Label>
                  <Switch id="document-notifications" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <h3 className="text-lg font-semibold">System Configuration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="two-factor">Require Two-Factor Authentication</Label>
                  <Switch id="two-factor" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="session-timeout">Auto Logout (30 min)</Label>
                  <Switch id="session-timeout" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="audit-logging">Enhanced Audit Logging</Label>
                  <Switch id="audit-logging" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-policy">Password Policy</Label>
                  <Input id="password-policy" defaultValue="Minimum 8 characters, uppercase, number" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data & Backup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-backup">Automatic Backups</Label>
                  <Switch id="auto-backup" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retention-period">Data Retention Period</Label>
                  <Input id="retention-period" defaultValue="7 years" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Backup Frequency</Label>
                  <Input id="backup-frequency" defaultValue="Daily at 2:00 AM" />
                </div>
                <Button variant="outline">
                  <Database className="w-4 h-4 mr-2" />
                  Run Backup Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}