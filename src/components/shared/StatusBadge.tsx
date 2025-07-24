import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "active" | "pending" | "completed" | "cancelled" | "draft" | "approved" | "rejected" | "open" | "closed";
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants = {
    active: "bg-success-light text-success border-success/20",
    pending: "bg-warning-light text-warning border-warning/20",
    completed: "bg-success-light text-success border-success/20",
    cancelled: "bg-danger-light text-danger border-danger/20",
    draft: "bg-muted text-muted-foreground border-muted-dark",
    approved: "bg-success-light text-success border-success/20",
    rejected: "bg-danger-light text-danger border-danger/20",
    open: "bg-info-light text-info border-info/20",
    closed: "bg-muted text-muted-foreground border-muted-dark"
  };

  const labels = {
    active: "Active",
    pending: "Pending",
    completed: "Completed", 
    cancelled: "Cancelled",
    draft: "Draft",
    approved: "Approved",
    rejected: "Rejected",
    open: "Open",
    closed: "Closed"
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(variants[status], className)}
    >
      {labels[status]}
    </Badge>
  );
}