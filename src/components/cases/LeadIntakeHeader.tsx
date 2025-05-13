
import React from "react";
import { FileText } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";

interface LeadIntakeHeaderProps {
  isEditMode: boolean;
  caseId?: string;
}

const LeadIntakeHeader: React.FC<LeadIntakeHeaderProps> = ({ isEditMode, caseId }) => {
  return (
    <PageHeader 
      title={isEditMode ? "Edit Case" : "New Lead Intake"} 
      subtitle={isEditMode ? `Editing case #${caseId?.slice(-5)}` : "Create a new eviction case"}
      icon={<FileText size={24} />}
    />
  );
};

export default LeadIntakeHeader;
