
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Case, CaseStage } from "@/types";

interface CaseStageCardProps {
  caseItem: Case;
  onClick?: (caseItem: Case) => void;
}

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

const stageStyles: Record<CaseStage, string> = {
  1: "bg-blue-100 text-blue-800",
  2: "bg-purple-100 text-purple-800",
  3: "bg-yellow-100 text-yellow-800",
  4: "bg-amber-100 text-amber-800",
  5: "bg-orange-100 text-orange-800",
  6: "bg-red-100 text-red-800",
  7: "bg-green-100 text-green-800",
  8: "bg-emerald-100 text-emerald-800",
  9: "bg-teal-100 text-teal-800",
};

const urgencyStyles: Record<string, string> = {
  asap: "bg-red-100 text-red-800",
  "30_days": "bg-orange-100 text-orange-800",
  "60_days": "bg-yellow-100 text-yellow-800",
  "90_days": "bg-blue-100 text-blue-800",
  not_urgent: "bg-green-100 text-green-800",
};

const urgencyLabels: Record<string, string> = {
  asap: "ASAP",
  "30_days": "30 Days",
  "60_days": "60 Days",
  "90_days": "90 Days",
  not_urgent: "Not Urgent",
};

const CaseStageCard: React.FC<CaseStageCardProps> = ({ caseItem, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(caseItem);
    }
  };

  return (
    <Card 
      className={`case-stage case-stage-${caseItem.stage} cursor-pointer hover:shadow-md transition-shadow`} 
      onClick={handleClick}
    >
      <CardHeader className="pb-2 pt-4">
        <div className="flex flex-wrap justify-between items-start">
          <CardTitle className="text-lg">Property #{caseItem.propertyId.slice(-4)}</CardTitle>
          <Badge className={stageStyles[caseItem.stage]}>
            {stageTitles[caseItem.stage]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col gap-1">
          <div className="text-sm">
            <span className="font-medium">Tenant:</span> {caseItem.tenantId}
          </div>
          <div className="text-sm">
            <span className="font-medium">Reason:</span> {caseItem.evictionReason.replace(/_/g, " ")}
          </div>
          <div className="flex gap-2 mt-2">
            <Badge variant="outline" className={urgencyStyles[caseItem.urgencyLevel]}>
              {urgencyLabels[caseItem.urgencyLevel]}
            </Badge>
            <Badge variant="outline">
              {new Date(caseItem.createdAt).toLocaleDateString()}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseStageCard;
