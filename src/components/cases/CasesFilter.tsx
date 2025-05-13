
import React from "react";
import { Filter, Search, Plus } from "lucide-react";
import { CaseStage } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { stageTitles } from "@/utils/caseUtils";

interface CasesFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStage: string | null;
  setSelectedStage: (stage: string | null) => void;
  filterUrgent: boolean;
  setFilterUrgent: (urgent: boolean) => void;
  onNewCase: () => void;
  onResetFilters: () => void;
}

const CasesFilter: React.FC<CasesFilterProps> = ({
  searchQuery,
  setSearchQuery,
  selectedStage,
  setSelectedStage,
  filterUrgent,
  setFilterUrgent,
  onNewCase,
  onResetFilters
}) => {
  return (
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
            <Select 
              onValueChange={setSelectedStage} 
              defaultValue={selectedStage || "all"}
            >
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
          
          <Button onClick={onNewCase} className="ml-auto">
            <Plus className="mr-2 h-4 w-4" /> New Case
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CasesFilter;
