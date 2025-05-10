
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Search, Filter, Plus } from "lucide-react";
import { useCRM } from "@/context/CRMContext";
import PageHeader from "@/components/common/PageHeader";
import CaseStageCard from "@/components/common/CaseStageCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CaseStage } from "@/types";

const stageTitles: Record<CaseStage, string> = {
  1: "New Lead",
  2: "Under Review",
  3: "Notice Served",
  4: "Waiting Period",
  5: "Court Filing",
  6: "Hearing Scheduled",
  7: "Judgment",
  8: "Enforcement/Lockout",
  9: "Case Closed",
};

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
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Cases" 
        subtitle="Manage your eviction cases" 
        icon={<FileText size={24} />}
        actionLabel="New Case"
        onAction={() => navigate("/new-lead")}
      />
      
      {/* Filters */}
      <Card className="border-t-4 border-t-blue-500">
        <CardHeader className="pb-3">
          <CardTitle>Filters and Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cases..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="w-full md:w-48">
              <Select onValueChange={setSelectedStage} defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Filter by stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(stage => (
                    <SelectItem key={stage} value={stage.toString()}>
                      {stageTitles[stage as CaseStage]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              variant={filterUrgent ? "default" : "outline"} 
              className="flex items-center"
              onClick={() => setFilterUrgent(!filterUrgent)}
            >
              <Filter className="mr-2 h-4 w-4" /> 
              {filterUrgent ? "Urgent Only" : "All Priority"}
            </Button>
            
            <Button onClick={() => navigate("/new-lead")} className="ml-auto">
              <Plus className="mr-2 h-4 w-4" /> New Case
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* No Results */}
      {filteredCases.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900">No cases found</h3>
          <p className="mt-1 text-sm text-gray-500">No cases match your current filters.</p>
          <div className="mt-6">
            <Button onClick={() => {
              setSearchQuery("");
              setSelectedStage(null);
              setFilterUrgent(false);
            }}>
              Reset Filters
            </Button>
          </div>
        </div>
      )}
      
      {/* Display Cases */}
      {filteredCases.length > 0 && selectedStage === null && (
        <div className="space-y-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((stage) => {
            const casesInStage = casesByStage[stage as CaseStage];
            
            if (casesInStage.length === 0) {
              return null;
            }
            
            return (
              <div key={stage} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium flex items-center">
                    <span className={`inline-block w-3 h-3 rounded-full mr-2 bg-${getStageColor(stage)}-500`}></span>
                    {stageTitles[stage as CaseStage]}
                    <Badge variant="outline" className="ml-2">{casesInStage.length}</Badge>
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {casesInStage.map(caseItem => (
                    <CaseStageCard 
                      key={caseItem.id} 
                      caseItem={caseItem} 
                      onClick={handleViewCase}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Display Cases for a single selected stage */}
      {filteredCases.length > 0 && selectedStage !== null && selectedStage !== "all" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {casesByStage[parseInt(selectedStage) as CaseStage].map(caseItem => (
            <CaseStageCard 
              key={caseItem.id} 
              caseItem={caseItem} 
              onClick={handleViewCase}
            />
          ))}
        </div>
      )}
      
      {/* Display All Cases */}
      {filteredCases.length > 0 && selectedStage === "all" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCases.map(caseItem => (
            <CaseStageCard 
              key={caseItem.id} 
              caseItem={caseItem} 
              onClick={handleViewCase}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Helper function to get color for a stage
function getStageColor(stage: number): string {
  switch (stage) {
    case 1: return "blue";
    case 2: return "purple";
    case 3: return "yellow";
    case 4: return "amber";
    case 5: return "orange";
    case 6: return "red";
    case 7: return "green";
    case 8: return "emerald";
    case 9: return "teal";
    default: return "gray";
  }
}

export default Cases;
