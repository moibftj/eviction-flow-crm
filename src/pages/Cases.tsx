
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Plus } from "lucide-react";
import { useCRM } from "@/context/CRMContext";
import PageHeader from "@/components/common/PageHeader";
import { CaseStage } from "@/types";
import CasesFilter from "@/components/cases/CasesFilter";
import NoCasesFound from "@/components/cases/NoCasesFound";
import CasesByStage from "@/components/cases/CasesByStage";
import CasesGrid from "@/components/cases/CasesGrid";

const Cases: React.FC = () => {
  const navigate = useNavigate();
  const { cases } = useCRM();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [filterUrgent, setFilterUrgent] = useState(false);
  
  // Filter cases based on search query and filters
  const filteredCases = cases.filter(caseItem => {
    // Filter by search query
    const matchesSearch = searchQuery === "" || 
      caseItem.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.propertyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.tenantId.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by stage
    const matchesStage = selectedStage === null || selectedStage === "all" || 
      caseItem.stage.toString() === selectedStage;
    
    // Filter by urgency
    const matchesUrgency = !filterUrgent || caseItem.urgencyLevel === "asap";
    
    return matchesSearch && matchesStage && matchesUrgency;
  });
  
  // Group cases by stage
  const casesByStage: Record<CaseStage, typeof cases> = {} as Record<CaseStage, typeof cases>;
  
  for (let i = 1; i <= 9; i++) {
    casesByStage[i as CaseStage] = filteredCases.filter(caseItem => caseItem.stage === i);
  }

  const handleViewCase = (caseItem: any) => {
    navigate(`/cases/${caseItem.id}`);
  };
  
  const handleCreateNewCase = () => {
    navigate("/new-lead");
  };
  
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedStage(null);
    setFilterUrgent(false);
  };
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Cases" 
        subtitle="Manage your eviction cases" 
        icon={<FileText size={24} />}
        actionLabel="New Case"
        onAction={handleCreateNewCase}
      />
      
      {/* Filters */}
      <CasesFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedStage={selectedStage}
        setSelectedStage={setSelectedStage}
        filterUrgent={filterUrgent}
        setFilterUrgent={setFilterUrgent}
        onNewCase={handleCreateNewCase}
        onResetFilters={handleResetFilters}
      />
      
      {/* No Results */}
      {filteredCases.length === 0 && (
        <NoCasesFound onResetFilters={handleResetFilters} />
      )}
      
      {/* Display Cases */}
      {filteredCases.length > 0 && selectedStage === null && (
        <CasesByStage 
          casesByStage={casesByStage}
          onViewCase={handleViewCase}
        />
      )}
      
      {/* Display Cases for a single selected stage */}
      {filteredCases.length > 0 && selectedStage !== null && selectedStage !== "all" && (
        <CasesGrid 
          cases={casesByStage[parseInt(selectedStage) as CaseStage]}
          onViewCase={handleViewCase}
        />
      )}
      
      {/* Display All Cases */}
      {filteredCases.length > 0 && selectedStage === "all" && (
        <CasesGrid 
          cases={filteredCases}
          onViewCase={handleViewCase}
        />
      )}
    </div>
  );
};

export default Cases;
