import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Trash, Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useCRM } from "@/context/CRMContext";
import { Document } from "@/types";
import DocumentUploader from "./DocumentUploader";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface DocumentManagerProps {
  caseId?: string;
  showUploader?: boolean;
}

const DocumentManager: React.FC<DocumentManagerProps> = ({
  caseId,
  showUploader = true
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewingDocument, setViewingDocument] = useState<Document | null>(null);
  const { documents, updateDocument } = useCRM();
  const { toast } = useToast();

  // Filter documents by case ID if provided
  const caseDocuments = caseId
    ? documents.filter(doc => {
        const caseMatch = doc.caseId === caseId;
        const searchMatch = searchQuery === "" ||
          doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.notes?.toLowerCase().includes(searchQuery.toLowerCase());
        return caseMatch && searchMatch;
      })
    : documents.filter(doc => 
        searchQuery === "" ||
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.notes?.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleDeleteDocument = (docId: string) => {
    try {
      // In a real app, this would call an API to delete the document
      // For now, we'll just update the document's status
      updateDocument({ 
        ...documents.find(d => d.id === docId)!,
        deleted: true
      });
      
      toast({
        title: "Document deleted",
        description: "The document has been successfully deleted."
      });
    } catch (error) {
      console.error("Error deleting document:", error);
      toast({
        title: "Delete failed",
        description: "There was an error deleting the document.",
        variant: "destructive"
      });
    }
  };

  // Updated download logic to actually open/download the file
  const handleDownloadDocument = (doc: Document) => {
    try {
      if (doc.url) {
        window.open(doc.url, '_blank', 'noopener,noreferrer');
      }
      toast({
        title: "Download started",
        description: `Downloading ${doc.name}`
      });
    } catch (error) {
      console.error("Error downloading document:", error);
      toast({
        title: "Download failed",
        description: "There was an error downloading the document.",
        variant: "destructive"
      });
    }
  };

  const getDocumentTypeBadge = (type: string) => {
    const typeColors: Record<string, string> = {
      lease: "bg-blue-100 text-blue-800",
      notice: "bg-yellow-100 text-yellow-800",
      court_filing: "bg-red-100 text-red-800",
      correspondence: "bg-green-100 text-green-800",
      other: "bg-gray-100 text-gray-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${typeColors[type] || typeColors.other}`}>
        {type.replace("_", " ")}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <TabsList>
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="leases">Leases</TabsTrigger>
            <TabsTrigger value="notices">Notices</TabsTrigger>
            <TabsTrigger value="court_filings">Court Filings</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <DocumentList 
            documents={caseDocuments.filter(d => !d.deleted)} 
            onDelete={handleDeleteDocument} 
            onDownload={handleDownloadDocument}
            onView={setViewingDocument}
          />
        </TabsContent>
        
        <TabsContent value="leases" className="mt-0">
          <DocumentList 
            documents={caseDocuments.filter(d => d.type === "lease" && !d.deleted)} 
            onDelete={handleDeleteDocument} 
            onDownload={handleDownloadDocument}
            onView={setViewingDocument}
          />
        </TabsContent>
        
        <TabsContent value="notices" className="mt-0">
          <DocumentList 
            documents={caseDocuments.filter(d => d.type === "notice" && !d.deleted)} 
            onDelete={handleDeleteDocument} 
            onDownload={handleDownloadDocument}
            onView={setViewingDocument}
          />
        </TabsContent>
        
        <TabsContent value="court_filings" className="mt-0">
          <DocumentList 
            documents={caseDocuments.filter(d => d.type === "court_filing" && !d.deleted)} 
            onDelete={handleDeleteDocument} 
            onDownload={handleDownloadDocument}
            onView={setViewingDocument}
          />
        </TabsContent>
        
        <TabsContent value="other" className="mt-0">
          <DocumentList 
            documents={caseDocuments.filter(d => (d.type !== "lease" && d.type !== "notice" && d.type !== "court_filing") && !d.deleted)} 
            onDelete={handleDeleteDocument} 
            onDownload={handleDownloadDocument}
            onView={setViewingDocument}
          />
        </TabsContent>
      </Tabs>
      
      {viewingDocument && (
        <Dialog open={!!viewingDocument} onOpenChange={() => setViewingDocument(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{viewingDocument.name}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-muted/30 min-h-[400px]">
              <FileText className="h-16 w-16 text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">
                Document preview would appear here in a real implementation.
              </p>
              <div className="mt-4">
                <Button onClick={() => handleDownloadDocument(viewingDocument)}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <p><strong>Type:</strong> {viewingDocument.type.replace("_", " ")}</p>
              {viewingDocument.signatureStatus && (
                <p><strong>Signature Status:</strong> {viewingDocument.signatureStatus}</p>
              )}
              <p><strong>Uploaded:</strong> {new Date(viewingDocument.uploadedAt).toLocaleDateString()}</p>
              {viewingDocument.notes && (
                <p><strong>Notes:</strong> {viewingDocument.notes}</p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {showUploader && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Documents</CardTitle>
            <CardDescription>
              Upload up to 10 documents at once related to this case
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DocumentUploader caseId={caseId} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const DocumentList: React.FC<{
  documents: Document[];
  onDelete: (id: string) => void;
  onDownload: (doc: Document) => void;
  onView: (doc: Document) => void;
}> = ({ documents, onDelete, onDownload, onView }) => {
  if (documents.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed rounded-md">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No Documents Found</h3>
        <p className="text-sm text-muted-foreground">
          There are no documents that match your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {documents.map((doc) => (
        <Card key={doc.id} className="overflow-hidden hover:border-primary transition-colors">
          <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
            <div className="space-y-1">
              <CardTitle className="text-base truncate max-w-[200px]">
                {doc.name}
              </CardTitle>
              <CardDescription>
                <span className="text-xs">
                  {new Date(doc.uploadedAt).toLocaleDateString()}
                </span>
                <Badge 
                  variant="outline" 
                  className="ml-2 text-xs"
                >
                  {doc.type.replace("_", " ")}
                </Badge>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            {doc.notes && (
              <p className="text-sm text-muted-foreground truncate mb-4">{doc.notes}</p>
            )}
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onView(doc)}
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onDownload(doc)}
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="text-destructive hover:bg-destructive/10"
                onClick={() => onDelete(doc.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DocumentManager;
