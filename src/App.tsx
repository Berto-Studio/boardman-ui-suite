import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import MeetingsList from "./pages/meetings/MeetingsList";
import CreateMeeting from "./pages/meetings/CreateMeeting";
import DocumentLibrary from "./pages/documents/DocumentLibrary";
import VotingDashboard from "./pages/voting/VotingDashboard";
import TaskBoard from "./pages/tasks/TaskBoard";
import GovernanceTools from "./pages/governance/GovernanceTools";
import ComplianceDashboard from "./pages/compliance/ComplianceDashboard";
import AuditLogs from "./pages/audit/AuditLogs";
import AdminSettings from "./pages/settings/AdminSettings";
import NotFound from "./pages/NotFound";
import CreateDocument from "./pages/documents/CreateDocument";
import CreateVote from "./pages/voting/CreateVote";
import CreateTask from "./pages/tasks/CreateTask";
import CreateEvaluation from "./pages/governance/CreateEvaluation";
import CreateUser from "./pages/settings/CreateUser";
import MeetingDetails from "./pages/meetings/MeetingDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/meetings" element={<MeetingsList />} />
            <Route path="/meetings/create" element={<CreateMeeting />} />
            <Route path="/meetings/details/1" element={<MeetingDetails />} />
            <Route path="/documents" element={<DocumentLibrary />} />
            <Route path="/documents/create" element={<CreateDocument />} />
            <Route path="/voting" element={<VotingDashboard />} />
            <Route path="/voting/create" element={<CreateVote />} />
            <Route path="/tasks" element={<TaskBoard />} />
            <Route path="/tasks/create" element={<CreateTask />} />
            <Route path="/governance" element={<GovernanceTools />} />
            <Route path="/governance/create" element={<CreateEvaluation />} />
            <Route path="/compliance" element={<ComplianceDashboard />} />
            <Route path="/audit" element={<AuditLogs />} />
            <Route path="/settings" element={<AdminSettings />} />
            <Route path="/settings/create" element={<CreateUser />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
