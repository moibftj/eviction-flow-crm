
import { CaseStage } from "@/types";

// Stage title mapping
export const stageTitles: Record<CaseStage, string> = {
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

// Helper function to get color for a stage
export function getStageColor(stage: number): string {
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
