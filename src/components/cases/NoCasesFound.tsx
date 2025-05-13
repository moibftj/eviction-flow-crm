
import React from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoCasesFoundProps {
  onResetFilters: () => void;
}

const NoCasesFound: React.FC<NoCasesFoundProps> = ({ onResetFilters }) => {
  return (
    <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
      <FileText className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-4 text-lg font-semibold text-gray-900">No cases found</h3>
      <p className="mt-1 text-sm text-gray-500">No cases match your current filters.</p>
      <div className="mt-6">
        <Button onClick={onResetFilters}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default NoCasesFound;
