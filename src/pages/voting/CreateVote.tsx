import { useState } from "react";
import { Vote, Users, Calendar, Save, ArrowLeft, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/shared/PageHeader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function CreateVote() {
  const [selectedVoters, setSelectedVoters] = useState<string[]>([]);
  const [options, setOptions] = useState(["Yes", "No", "Abstain"]);
  const [newOption, setNewOption] = useState("");
  const [allowAbstain, setAllowAbstain] = useState(true);

  const boardMembers = [
    { id: "1", name: "John Doe", role: "Chairman", eligible: true },
    { id: "2", name: "Sarah Chen", role: "Secretary", eligible: true },
    { id: "3", name: "Michael Brown", role: "Director", eligible: true },
    { id: "4", name: "Emma Wilson", role: "Director", eligible: true },
    { id: "5", name: "Robert Johnson", role: "Independent Director", eligible: true },
    { id: "6", name: "Lisa Garcia", role: "CFO", eligible: false }
  ];

  const voteTypes = [
    "Board Resolution", "Policy Approval", "Budget Approval", "Strategic Decision", 
    "Director Election", "Committee Formation", "Emergency Decision", "Other"
  ];

  const toggleVoter = (voterId: string) => {
    setSelectedVoters(prev =>
      prev.includes(voterId)
        ? prev.filter(id => id !== voterId)
        : [...prev, voterId]
    );
  };

  const addOption = () => {
    if (newOption.trim() && !options.includes(newOption.trim())) {
      setOptions([...options, newOption.trim()]);
      setNewOption("");
    }
  };

  const removeOption = (optionToRemove: string) => {
    if (options.length > 2) {
      setOptions(options.filter(option => option !== optionToRemove));
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Create New Vote" 
        description="Create a new voting item for board approval"
      >
        <div className="flex gap-3">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Voting
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Create Vote
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vote Details */}
          <Card>
            <CardHeader>
              <CardTitle>Vote Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Vote Title</Label>
                <Input id="title" placeholder="e.g., Approval of Q4 Budget Proposal" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Vote Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {voteTypes.map((type) => (
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
                <Label htmlFor="description">Motion/Resolution Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Detailed description of the motion or resolution being voted on..." 
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rationale">Rationale</Label>
                <Textarea 
                  id="rationale" 
                  placeholder="Background information and reasoning for this vote..." 
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Vote Options */}
          <Card>
            <CardHeader>
              <CardTitle>Vote Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="allow-abstain"
                  checked={allowAbstain}
                  onCheckedChange={setAllowAbstain}
                />
                <Label htmlFor="allow-abstain">Allow abstain votes</Label>
              </div>

              <div className="space-y-2">
                <Label>Voting Options</Label>
                <div className="space-y-2">
                  {options.map((option, index) => (
                    <div key={option} className="flex items-center gap-2">
                      <Badge variant="outline" className="flex-1 justify-between">
                        {option}
                        {options.length > 2 && (
                          <X 
                            className="w-3 h-3 cursor-pointer ml-2" 
                            onClick={() => removeOption(option)}
                          />
                        )}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add custom option..."
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addOption()}
                  />
                  <Button variant="outline" onClick={addOption}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Voting Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Voting Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Voting Opens</Label>
                  <Input id="start-date" type="datetime-local" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">Voting Closes</Label>
                  <Input id="end-date" type="datetime-local" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quorum">Quorum Required (%)</Label>
                <Input id="quorum" type="number" min="1" max="100" defaultValue="50" />
                <div className="text-xs text-muted-foreground">
                  Minimum percentage of eligible voters required for valid vote
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Eligible Voters */}
          <Card>
            <CardHeader>
              <CardTitle>Eligible Voters ({selectedVoters.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {boardMembers.map((member) => (
                <div key={member.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={member.id}
                    checked={selectedVoters.includes(member.id)}
                    onCheckedChange={() => toggleVoter(member.id)}
                    disabled={!member.eligible}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{member.name}</div>
                    <div className="text-xs text-muted-foreground">{member.role}</div>
                  </div>
                  {!member.eligible && (
                    <Badge variant="outline" className="text-xs">
                      Ineligible
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Vote Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Vote Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="anonymous">Anonymous Voting</Label>
                <Switch id="anonymous" />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="public-results">Public Results</Label>
                <Switch id="public-results" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="change-vote">Allow Vote Changes</Label>
                <Switch id="change-vote" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Send Notifications</Label>
                <Switch id="notifications" defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Associated Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Supporting Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Attach Documents
              </Button>
              <div className="text-xs text-muted-foreground">
                Attach relevant documents that voters should review before voting
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}