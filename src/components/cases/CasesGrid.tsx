
import React from "react";
import { Case } from "@/types";
import CaseStageCard from "@/components/common/CaseStageCard";

interface CasesGridProps {
  cases: Case[];
  onViewCase: (caseItem: Case) => void;
}

const CasesGrid: React.FC<CasesGridProps> = ({ cases, onViewCase }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cases.map(caseItem => (
        <CaseStageCard 
          key={caseItem.id} 
          caseItem={caseItem} 
          onClick={onViewCase}
        />
      ))}
    </div>
  );
};

export default CasesGrid;
