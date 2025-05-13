
import React, { useState } from "react";
import { FileText, Search, Filter, Plus, Upload } from "lucide-react";
import { useCRM } from "@/context/CRMContext";
import PageHeader from "@/components/common/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DocumentManager from "@/components/documents/DocumentManager";

const Documents: React.FC = () => {
  const { documents } = useCRM();
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Documents" 
        subtitle="Manage all case documents" 
        icon={<FileText size={24} />}
        actionLabel="Upload Documents"
        onAction={() => {
          document.getElementById("document-uploader")?.scrollIntoView({ behavior: "smooth" });
        }}
      />
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Button className="w-full md:w-auto">
          <Upload className="mr-2 h-4 w-4" /> Batch Upload
        </Button>
      </div>
      
      {/* Document Manager */}
      <DocumentManager />
      
      {/* Upload Area */}
      <div id="document-uploader" className="pt-8">
        <h2 className="text-lg font-semibold mb-4">Upload New Documents</h2>
        <DocumentManager showUploader={true} />
      </div>
    </div>
  );
};

export default Documents;
