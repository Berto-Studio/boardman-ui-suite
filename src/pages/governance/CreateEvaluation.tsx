import { useState } from "react";
import { Save, ArrowLeft, Plus, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/shared/PageHeader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

export default function CreateEvaluation() {
  const [evaluationType, setEvaluationType] = useState("");
  const [questions, setQuestions] = useState([
    { id: 1, type: "rating", question: "Overall board effectiveness", required: true },
    { id: 2, type: "text", question: "Areas for improvement", required: false }
  ]);
  const [selectedEvaluees, setSelectedEvaluees] = useState<string[]>([]);

  const evaluationTypes = [
    "Board Self-Evaluation", "Individual Director Evaluation", "Chairman Evaluation",
    "Committee Evaluation", "CEO Evaluation", "Secretary Evaluation"
  ];

  const questionTypes = [
    { value: "rating", label: "Rating Scale (1-5)" },
    { value: "text", label: "Text Response" },
    { value: "multiple-choice", label: "Multiple Choice" },
    { value: "yes-no", label: "Yes/No" },
    { value: "slider", label: "Slider (0-100)" }
  ];

  const boardMembers = [
    { id: "1", name: "John Doe", role: "Chairman" },
    { id: "2", name: "Sarah Chen", role: "Secretary" },
    { id: "3", name: "Michael Brown", role: "Director" },
    { id: "4", name: "Emma Wilson", role: "Director" },
    { id: "5", name: "Robert Johnson", role: "Independent Director" }
  ];

  const addQuestion = () => {
    setQuestions([...questions, {
      id: Date.now(),
      type: "rating",
      question: "",
      required: false
    }]);
  };

  const updateQuestion = (id: number, field: string, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const removeQuestion = (id: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const toggleEvaluee = (memberId: string) => {
    setSelectedEvaluees(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Create Evaluation Form" 
        description="Create a new evaluation form for board members"
      >
        <div className="flex gap-3">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Governance
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Create Evaluation
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Evaluation Details */}
          <Card>
            <CardHeader>
              <CardTitle>Evaluation Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Evaluation Title</Label>
                <Input id="title" placeholder="e.g., Q4 2024 Board Performance Evaluation" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Evaluation Type</Label>
                  <Select value={evaluationType} onValueChange={setEvaluationType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {evaluationTypes.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="period">Evaluation Period</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="q1">Q1 2024</SelectItem>
                      <SelectItem value="q2">Q2 2024</SelectItem>
                      <SelectItem value="q3">Q3 2024</SelectItem>
                      <SelectItem value="q4">Q4 2024</SelectItem>
                      <SelectItem value="annual">Annual 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Purpose and scope of this evaluation..." 
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Evaluation Opens</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">Evaluation Closes</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Questions Builder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Evaluation Questions
                <Button variant="outline" size="sm" onClick={addQuestion}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Question
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {questions.map((question, index) => (
                <div key={question.id} className="border border-border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-muted-foreground">
                      Question {index + 1}
                    </div>
                    {questions.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQuestion(question.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Question Text</Label>
                      <Input
                        placeholder="Enter your question..."
                        value={question.question}
                        onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Question Type</Label>
                      <Select 
                        value={question.type} 
                        onValueChange={(value) => updateQuestion(question.id, 'type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {questionTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`required-${question.id}`}
                      checked={question.required}
                      onCheckedChange={(checked) => updateQuestion(question.id, 'required', checked)}
                    />
                    <Label htmlFor={`required-${question.id}`}>Required question</Label>
                  </div>

                  {/* Question Preview */}
                  <div className="p-3 bg-muted rounded border-l-4 border-l-primary">
                    <div className="text-sm font-medium mb-2">Preview:</div>
                    <div className="text-sm mb-2">{question.question || "Question text will appear here"}</div>
                    
                    {question.type === 'rating' && (
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 text-muted-foreground" />
                        ))}
                      </div>
                    )}
                    
                    {question.type === 'text' && (
                      <Textarea placeholder="Response will be entered here..." rows={2} disabled />
                    )}
                    
                    {question.type === 'yes-no' && (
                      <RadioGroup>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="yes" disabled />
                          <Label htmlFor="yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="no" disabled />
                          <Label htmlFor="no">No</Label>
                        </div>
                      </RadioGroup>
                    )}
                    
                    {question.type === 'slider' && (
                      <div className="space-y-2">
                        <Slider defaultValue={[50]} max={100} step={1} disabled />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>0</span>
                          <span>100</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Participants */}
          <Card>
            <CardHeader>
              <CardTitle>Evaluation Participants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Who should be evaluated?</Label>
                <div className="space-y-2">
                  {boardMembers.map((member) => (
                    <div key={member.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={member.id}
                        checked={selectedEvaluees.includes(member.id)}
                        onCheckedChange={() => toggleEvaluee(member.id)}
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{member.name}</div>
                        <div className="text-xs text-muted-foreground">{member.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Evaluation Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Anonymous Responses</Label>
                <Select defaultValue="yes">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes, keep responses anonymous</SelectItem>
                    <SelectItem value="no">No, track respondents</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Results Visibility</Label>
                <Select defaultValue="chairman">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chairman">Chairman only</SelectItem>
                    <SelectItem value="board">All board members</SelectItem>
                    <SelectItem value="committee">Committee only</SelectItem>
                    <SelectItem value="admin">Admin only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Reminder Schedule</Label>
                <Select defaultValue="weekly">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No reminders</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Instructions for Participants</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Provide instructions for how to complete this evaluation..."
                rows={4}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}