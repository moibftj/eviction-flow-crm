
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCRM } from "@/context/CRMContext";
import { useToast } from "@/hooks/use-toast";
import { UrgencyLevel, EvictionReason, CaseStage, LeadSource } from "@/types";
import LeadIntakeHeader from "@/components/cases/LeadIntakeHeader";
import LeadIntakeForm from "@/components/cases/LeadIntakeForm";

const NewLeadIntake = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cases, addCase, updateCase } = useCRM();
  const isEditMode = Boolean(id);
  const { toast } = useToast();
  
  // Initialize with the case data if in edit mode
  const currentCase = id ? cases.find(c => c.id === id) : null;

  // Form state
  const initialFormData = {
    propertyId: currentCase?.propertyId || "",
    propertyOwnerId: currentCase?.propertyOwnerId || "",
    tenantId: currentCase?.tenantId || "",
    evictionReason: currentCase?.evictionReason || "non_payment" as EvictionReason,
    urgencyLevel: currentCase?.urgencyLevel || "normal" as UrgencyLevel,
    stage: currentCase?.stage || 1 as CaseStage,
    description: currentCase?.description || "",
    leadSource: currentCase?.leadSource || "website_form" as LeadSource 
  };

  const handleSubmit = (formData) => {
    if (isEditMode && currentCase) {
      // Update existing case
      updateCase({
        ...currentCase,
        ...formData,
      });
      toast({
        title: "Case Updated",
        description: "The case has been successfully updated.",
      });
    } else {
      // Add new case
      addCase(formData);
      toast({
        title: "New Case Created",
        description: "The new case has been successfully created.",
      });
    }

    // Navigate back to cases page
    navigate('/cases');
  };

  return (
    <div className="space-y-6">
      <LeadIntakeHeader 
        isEditMode={isEditMode} 
        caseId={id} 
      />
      
      <LeadIntakeForm
        isEditMode={isEditMode}
        currentCaseId={id}
        initialFormData={initialFormData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default NewLeadIntake;
