
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Case, CaseStage } from "@/types";
import CaseStageCard from "@/components/common/CaseStageCard";
import { getStageColor, stageTitles } from "@/utils/caseUtils";

interface CasesByStageProps {
  casesByStage: Record<CaseStage, Case[]>;
  onViewCase: (caseItem: Case) => void;
}

const CasesByStage: React.FC<CasesByStageProps> = ({ 
  casesByStage, 
  onViewCase 
}) => {
  return (
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
                  onClick={onViewCase}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CasesByStage;
