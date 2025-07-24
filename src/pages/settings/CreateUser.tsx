import { useState } from "react";
import { Save, ArrowLeft, User, Mail, Shield, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/shared/PageHeader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CreateUser() {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const userRoles = [
    { value: "chairman", label: "Chairman", description: "Board chairman with full access" },
    { value: "director", label: "Director", description: "Board member with standard access" },
    { value: "independent-director", label: "Independent Director", description: "Independent board member" },
    { value: "secretary", label: "Secretary", description: "Board secretary with administrative access" },
    { value: "observer", label: "Observer", description: "Read-only access to meetings" },
    { value: "admin", label: "Administrator", description: "System administrator" }
  ];

  const permissions = [
    { id: "meetings-create", label: "Create Meetings", description: "Can schedule new meetings" },
    { id: "meetings-edit", label: "Edit Meetings", description: "Can modify meeting details" },
    { id: "documents-upload", label: "Upload Documents", description: "Can upload new documents" },
    { id: "documents-delete", label: "Delete Documents", description: "Can remove documents" },
    { id: "voting-create", label: "Create Votes", description: "Can initiate voting items" },
    { id: "voting-results", label: "View Vote Results", description: "Can see detailed voting results" },
    { id: "tasks-assign", label: "Assign Tasks", description: "Can assign tasks to others" },
    { id: "governance-manage", label: "Manage Governance", description: "Can manage evaluation forms and policies" },
    { id: "users-manage", label: "Manage Users", description: "Can add/edit user accounts" },
    { id: "audit-view", label: "View Audit Logs", description: "Can access system audit logs" }
  ];

  const departments = [
    "Board of Directors", "Executive Committee", "Audit Committee", 
    "Compensation Committee", "Governance Committee", "Finance", "Legal", "Other"
  ];

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Add New User" 
        description="Create a new user account for the board management system"
      >
        <div className="flex gap-3">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Users
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Create User
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Profile Picture */}
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={profileImage || undefined} />
                  <AvatarFallback className="text-lg">
                    <User className="w-8 h-8" />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    Upload Photo
                  </Button>
                  <div className="text-xs text-muted-foreground">
                    Recommended: 400x400px, max 2MB
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john.doe@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input id="title" placeholder="e.g., Chief Executive Officer" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biography (Optional)</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Brief professional background and expertise..." 
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* System Access */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                System Access & Role
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Primary Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {userRoles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          <div>
                            <div className="font-medium">{role.label}</div>
                            <div className="text-xs text-muted-foreground">{role.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept.toLowerCase().replace(' ', '-')}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="term-end">Term End Date (Optional)</Label>
                  <Input id="term-end" type="date" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="active">Account Active</Label>
                    <div className="text-sm text-muted-foreground">
                      User can log in and access the system
                    </div>
                  </div>
                  <Switch id="active" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <div className="text-sm text-muted-foreground">
                      Send system notifications via email
                    </div>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="force-password">Force Password Change</Label>
                    <div className="text-sm text-muted-foreground">
                      Require password change on first login
                    </div>
                  </div>
                  <Switch id="force-password" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Permissions */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Permissions</CardTitle>
              <div className="text-sm text-muted-foreground">
                Customize specific permissions for this user
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {permissions.map((permission) => (
                  <div key={permission.id} className="flex items-start space-x-3 p-3 border border-border rounded">
                    <Checkbox
                      id={permission.id}
                      checked={selectedPermissions.includes(permission.id)}
                      onCheckedChange={() => togglePermission(permission.id)}
                    />
                    <div className="flex-1">
                      <Label htmlFor={permission.id} className="text-sm font-medium">
                        {permission.label}
                      </Label>
                      <div className="text-xs text-muted-foreground">
                        {permission.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="alt-email">Alternative Email</Label>
                <Input id="alt-email" type="email" placeholder="personal@email.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Phone</Label>
                <Input id="mobile" type="tel" placeholder="+1 (555) 987-6543" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Street address..." rows={3} />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="New York" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal">Postal Code</Label>
                  <Input id="postal" placeholder="10001" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="temp-password">Temporary Password</Label>
                <Input id="temp-password" type="password" placeholder="Auto-generated" />
                <div className="text-xs text-muted-foreground">
                  Leave blank to auto-generate and send via email
                </div>
              </div>

              <div className="space-y-2">
                <Label>Two-Factor Authentication</Label>
                <Select defaultValue="optional">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="disabled">Disabled</SelectItem>
                    <SelectItem value="optional">Optional</SelectItem>
                    <SelectItem value="required">Required</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Session Timeout</Label>
                <Select defaultValue="8-hours">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30-minutes">30 minutes</SelectItem>
                    <SelectItem value="1-hour">1 hour</SelectItem>
                    <SelectItem value="4-hours">4 hours</SelectItem>
                    <SelectItem value="8-hours">8 hours</SelectItem>
                    <SelectItem value="24-hours">24 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employee-id">Employee ID</Label>
                <Input id="employee-id" placeholder="EMP001" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cost-center">Cost Center</Label>
                <Input id="cost-center" placeholder="CC-BOD-001" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Internal Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Internal notes about this user..." 
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}