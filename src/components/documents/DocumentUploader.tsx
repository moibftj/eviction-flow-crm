
import React, { useState, useRef } from "react";
import { Trash, Upload, FileText, X, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useCRM } from "@/context/CRMContext";
import { Document } from "@/types";

interface DocumentUploaderProps {
  caseId?: string;
  maxFiles?: number;
  onUploadComplete?: (documents: Document[]) => void;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  caseId,
  maxFiles = 10,
  onUploadComplete
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addDocument } = useCRM();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    
    setErrors([]);
    
    // Check if adding these files would exceed max files
    if (files.length + fileList.length > maxFiles) {
      setErrors([`You can only upload a maximum of ${maxFiles} files at once.`]);
      return;
    }
    
    // Convert FileList to array and append to existing files
    const newFiles = Array.from(fileList);
    setFiles([...files, ...newFiles]);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select files to upload.",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    setErrors([]);
    
    try {
      const uploadedDocuments: Document[] = [];
      
      // Process each file
      for (const file of files) {
        // In a real app, this would be an actual upload to a server/storage
        // For now we'll simulate the upload and create document entries
        
        // Create a document object (simulate upload)
        const document: Omit<Document, "id" | "uploadedAt"> & { caseId?: string } = {
          name: file.name,
          type: getDocumentType(file),
          url: URL.createObjectURL(file), // In real app, this would be the uploaded file URL
          notes: `Uploaded on ${new Date().toLocaleDateString()}`,
          ...(caseId && { caseId })
        };
        
        // Add the document to the CRM context
        addDocument(document);
        
        uploadedDocuments.push({
          ...document,
          id: "temp-id", // This would be replaced by the real ID
          uploadedAt: new Date()
        } as Document);
      }
      
      toast({
        title: "Files uploaded successfully",
        description: `${files.length} file(s) have been uploaded.`
      });
      
      // Clear files after successful upload
      setFiles([]);
      
      if (onUploadComplete) {
        onUploadComplete(uploadedDocuments);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      setErrors(["An error occurred during upload. Please try again."]);
      
      toast({
        title: "Upload failed",
        description: "There was an error uploading your files.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };
  
  const getDocumentType = (file: File): "lease" | "notice" | "court_filing" | "correspondence" | "other" => {
    const name = file.name.toLowerCase();
    if (name.includes("lease")) return "lease";
    if (name.includes("notice")) return "notice";
    if (name.includes("court") || name.includes("filing")) return "court_filing";
    if (name.includes("letter") || name.includes("email")) return "correspondence";
    return "other";
  };

  return (
    <div className="space-y-4">
      {errors.length > 0 && (
        <div className="bg-destructive/10 p-3 rounded-md border border-destructive">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-destructive mr-2 mt-0.5" />
            <div className="space-y-1">
              {errors.map((error, i) => (
                <p key={i} className="text-sm text-destructive">
                  {error}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
        />
        
        <div className="space-y-2">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium">Upload Documents</h3>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Drag and drop files here or click to browse
          </p>
          <Button 
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            Select Files
          </Button>
          <p className="text-xs text-muted-foreground">
            Maximum {maxFiles} files. PDF, Word, Text, and Image files accepted.
          </p>
        </div>
      </div>
      
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Selected Files ({files.length})</h4>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li 
                key={index}
                className="flex items-center justify-between p-2 border rounded-md bg-background hover:bg-accent/50"
              >
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(0)} KB
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  disabled={uploading}
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </Button>
              </li>
            ))}
          </ul>
          
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setFiles([])}
              disabled={uploading}
            >
              Clear All
            </Button>
            <Button
              type="button"
              onClick={uploadFiles}
              disabled={uploading}
            >
              {uploading ? (
                <>Uploading...</>
              ) : (
                <>Upload {files.length} file{files.length !== 1 ? "s" : ""}</>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUploader;
