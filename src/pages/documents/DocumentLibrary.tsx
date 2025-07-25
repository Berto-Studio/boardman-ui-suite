import { useState } from "react";
import {
  Folder,
  FileText,
  Upload,
  Search,
  Filter,
  Download,
  Share,
  MoreHorizontal,
  Eye,
  Tag,
  Calendar,
  User,
} from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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

export default function DocumentLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const navigate = useNavigate();

  const folders = [
    { id: "all", name: "All Documents", count: 45 },
    { id: "meetings", name: "Meeting Documents", count: 18 },
    { id: "financial", name: "Financial Reports", count: 12 },
    { id: "legal", name: "Legal & Compliance", count: 8 },
    { id: "governance", name: "Governance", count: 7 },
  ];

  const documents = [
    {
      id: 1,
      name: "Q4 Financial Report 2024.pdf",
      type: "PDF",
      category: "Financial",
      size: "2.5 MB",
      uploadedBy: "Sarah Chen",
      uploadedAt: "2024-12-10",
      lastAccessed: "2024-12-11",
      accessCount: 15,
      tags: ["Q4", "Financial", "Board"],
      folder: "financial",
      isConfidential: true,
    },
    {
      id: 2,
      name: "Board Resolution Draft.docx",
      type: "DOCX",
      category: "Legal",
      size: "1.2 MB",
      uploadedBy: "Michael Brown",
      uploadedAt: "2024-12-09",
      lastAccessed: "2024-12-11",
      accessCount: 8,
      tags: ["Legal", "Resolution", "Draft"],
      folder: "legal",
      isConfidential: true,
    },
    {
      id: 3,
      name: "Strategic Plan 2025.pptx",
      type: "PPTX",
      category: "Strategy",
      size: "5.8 MB",
      uploadedBy: "John Doe",
      uploadedAt: "2024-12-08",
      lastAccessed: "2024-12-10",
      accessCount: 22,
      tags: ["Strategy", "2025", "Planning"],
      folder: "governance",
      isConfidential: false,
    },
    {
      id: 4,
      name: "Audit Committee Report.pdf",
      type: "PDF",
      category: "Audit",
      size: "1.8 MB",
      uploadedBy: "Emma Wilson",
      uploadedAt: "2024-12-07",
      lastAccessed: "2024-12-09",
      accessCount: 12,
      tags: ["Audit", "Committee", "Report"],
      folder: "meetings",
      isConfidential: true,
    },
    {
      id: 5,
      name: "Meeting Minutes - Nov 2024.pdf",
      type: "PDF",
      category: "Minutes",
      size: "890 KB",
      uploadedBy: "Sarah Chen",
      uploadedAt: "2024-12-01",
      lastAccessed: "2024-12-05",
      accessCount: 18,
      tags: ["Minutes", "November", "Board"],
      folder: "meetings",
      isConfidential: false,
    },
  ];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesFolder =
      selectedFolder === "all" || doc.folder === selectedFolder;
    const matchesType =
      selectedType === "all" ||
      doc.type.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesFolder && matchesType;
  });

  const getFileIcon = (type: string) => {
    return <FileText className="w-4 h-4 text-primary" />;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Document Library"
        description="Centralized repository for all board documents and files"
      >
        <Button
          onClick={() => {
            navigate("/documents/create");
          }}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Documents
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Folders */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Folder className="w-5 h-5" />
                Folders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                    selectedFolder === folder.id
                      ? "bg-primary-light text-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  <span className="text-sm font-medium">{folder.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {folder.count}
                  </Badge>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search documents and tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="docx">Word Document</SelectItem>
                    <SelectItem value="pptx">PowerPoint</SelectItem>
                    <SelectItem value="xlsx">Excel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Documents Table */}
          <Card>
            <CardHeader>
              <CardTitle>
                Documents ({filteredDocuments.length})
                {selectedFolder !== "all" && (
                  <span className="text-muted-foreground font-normal">
                    {" "}
                    in {folders.find((f) => f.id === selectedFolder)?.name}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead>Access</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow
                      key={doc.id}
                      className="cursor-pointer hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-start gap-3">
                          {getFileIcon(doc.type)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{doc.name}</span>
                              {doc.isConfidential && (
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-warning-light text-warning"
                                >
                                  Confidential
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {doc.size} • {doc.type}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {doc.tags.slice(0, 3).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  <Tag className="w-3 h-3 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                              {doc.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{doc.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{doc.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3 text-muted-foreground" />
                            {doc.uploadedBy}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {doc.uploadedAt}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3 text-muted-foreground" />
                            {doc.accessCount} views
                          </div>
                          <div className="text-muted-foreground">
                            Last: {doc.lastAccessed}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share className="w-4 h-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit Properties</DropdownMenuItem>
                            <DropdownMenuItem>Version History</DropdownMenuItem>
                            <DropdownMenuItem>Access Logs</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-danger">
                              Delete
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
      </div>
    </div>
  );
}
