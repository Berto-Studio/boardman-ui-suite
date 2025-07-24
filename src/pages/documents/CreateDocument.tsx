import { useState } from "react";
import { Upload, File, Save, ArrowLeft, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/shared/PageHeader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export default function CreateDocument() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [accessUsers, setAccessUsers] = useState<string[]>([]);

  const documentTypes = [
    "Financial Report", "Legal Document", "Strategy", "Policy", "Meeting Minutes", 
    "Board Resolution", "Audit Report", "Compliance", "Other"
  ];

  const users = [
    { id: "1", name: "John Doe", role: "Chairman" },
    { id: "2", name: "Sarah Chen", role: "Secretary" },
    { id: "3", name: "Michael Brown", role: "Director" },
    { id: "4", name: "Emma Wilson", role: "Director" }
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

  const toggleUserAccess = (userId: string) => {
    setAccessUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Upload New Document" 
        description="Add a new document to the document library"
      >
        <div className="flex gap-3">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Library
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Document
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Document Upload</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                {selectedFile ? (
                  <div className="space-y-2">
                    <File className="w-12 h-12 mx-auto text-primary" />
                    <div className="font-medium">{selectedFile.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedFile(null)}
                    >
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                    <div className="text-lg font-medium">Drop your file here or click to browse</div>
                    <div className="text-sm text-muted-foreground">
                      Supports PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX (Max 50MB)
                    </div>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Document Details */}
          <Card>
            <CardHeader>
              <CardTitle>Document Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Document Title</Label>
                <Input id="title" placeholder="e.g., Q4 Financial Report 2024" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Document Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="version">Version</Label>
                  <Input id="version" placeholder="e.g., 1.0" defaultValue="1.0" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Brief description of the document content and purpose..." 
                  rows={3}
                />
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
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Access Control */}
          <Card>
            <CardHeader>
              <CardTitle>Access Permissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Visibility</Label>
                <Select defaultValue="board">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">All Board Members</SelectItem>
                    <SelectItem value="board">Board Only</SelectItem>
                    <SelectItem value="committee">Committee Only</SelectItem>
                    <SelectItem value="restricted">Restricted Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Specific User Access</Label>
                {users.map((user) => (
                  <div key={user.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={user.id}
                      checked={accessUsers.includes(user.id)}
                      onCheckedChange={() => toggleUserAccess(user.id)}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Document Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="effective-date">Effective Date</Label>
                <Input id="effective-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiry-date">Expiry Date (Optional)</Label>
                <Input id="expiry-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confidentiality">Confidentiality Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="internal">Internal</SelectItem>
                    <SelectItem value="confidential">Confidential</SelectItem>
                    <SelectItem value="restricted">Restricted</SelectItem>
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