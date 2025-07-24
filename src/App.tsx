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
            <Route path="/documents" element={<DocumentLibrary />} />
            <Route path="/voting" element={<VotingDashboard />} />
            <Route path="/tasks" element={<TaskBoard />} />
            <Route path="/governance" element={<GovernanceTools />} />
            <Route path="/compliance" element={<ComplianceDashboard />} />
            <Route path="/audit" element={<AuditLogs />} />
            <Route path="/settings" element={<AdminSettings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
