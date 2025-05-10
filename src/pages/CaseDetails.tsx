import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FileText, 
  ChevronLeft, 
  User, 
  Home, 
  Calendar, 
  Clock, 
  AlertCircle, 
  Paperclip,
  MessageCircle,
  Bell,
  Check,
  ArrowRight,
  Edit,
} from "lucide-react";
import { format } from "date-fns";
import { useCRM } from "@/context/CRMContext";
import PageHeader from "@/components/common/PageHeader";
import ReminderItem from "@/components/common/ReminderItem";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CaseStage, Note } from "@/types";

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

const CaseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cases, updateCaseStage, addNote, completeReminder } = useCRM();
  const [noteContent, setNoteContent] = useState("");
  const [advanceStageOpen, setAdvanceStageOpen] = useState(false);
  
  // Find the case by ID
  const caseItem = cases.find(caseItem => caseItem.id === id);
  
  if (!caseItem) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
        <h2 className="mt-2 text-lg font-semibold">Case Not Found</h2>
        <p className="mt-1 text-gray-500">The case you're looking for doesn't exist.</p>
        <Button className="mt-4" onClick={() => navigate('/cases')}>
          Back to Cases
        </Button>
      </div>
    );
  }
  
  // Since getMock methods don't exist in context, we'll safely handle this
  const property = caseItem.propertyId ? cases.find(c => c.id === id)?.property : undefined;
  const owner = caseItem.propertyOwnerId ? cases.find(c => c.id === id)?.owner : undefined;
  const tenant = caseItem.tenantId ? cases.find(c => c.id === id)?.tenant : undefined;
  
  const handleAddNote = () => {
    if (noteContent.trim()) {
      addNote({
        content: noteContent,
        createdBy: "Admin User"
      });
      setNoteContent("");
      toast({
        title: "Note Added",
        description: "Your note has been added to the case.",
      });
    }
  };
  
  const handleAdvanceStage = () => {
    if (caseItem.stage < 9) {
      updateCaseStage(caseItem.id, (caseItem.stage + 1) as CaseStage);
      setAdvanceStageOpen(false);
      toast({
        title: "Case Stage Advanced",
        description: `Case has been moved to ${stageTitles[(caseItem.stage + 1) as CaseStage]}.`,
      });
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/cases">Cases</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Case #{id?.slice(-5)}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <PageHeader 
        title={`Case #${id?.slice(-5)}`} 
        subtitle={`${property?.address || 'Unknown Property'}`} 
        icon={<FileText size={24} />}
        actionLabel="Edit Case"
        onAction={() => navigate(`/cases/${id}/edit`)}
      />
      
      {/* Case Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left column - Case Info */}
        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Case Overview</CardTitle>
                  <CardDescription>
                    Created on {format(new Date(caseItem.createdAt), 'MMM d, yyyy')}
                  </CardDescription>
                </div>
                <Badge className={stageStyles[caseItem.stage]}>
                  {stageTitles[caseItem.stage]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-2">
                <div className="flex items-center space-x-2">
                  <User size={16} className="text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Property Owner</p>
                    <p className="text-sm text-gray-500">{owner?.name || 'Unknown'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <User size={16} className="text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Tenant</p>
                    <p className="text-sm text-gray-500">{tenant?.name || 'Unknown'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Home size={16} className="text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Property</p>
                    <p className="text-sm text-gray-500">
                      {property?.address || 'Unknown'}
                      {property?.unit ? `, ${property.unit}` : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle size={16} className="text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Reason</p>
                    <p className="text-sm text-gray-500">
                      {caseItem.evictionReason.replace(/_/g, ' ')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} className="text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Urgency</p>
                    <p className="text-sm text-gray-500">
                      {caseItem.urgencyLevel.replace(/_/g, ' ')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={16} className="text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(caseItem.updatedAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </div>
              
              {caseItem.description && (
                <div className="mt-4 border-t pt-4">
                  <p className="text-sm font-medium">Description</p>
                  <p className="text-sm text-gray-500 mt-1">{caseItem.description}</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button variant="outline" onClick={() => navigate('/cases')}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Cases
              </Button>
              
              {caseItem.stage < 9 && (
                <Dialog open={advanceStageOpen} onOpenChange={setAdvanceStageOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      Advance to {stageTitles[(caseItem.stage + 1) as CaseStage]}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Advance Case Stage</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to advance this case from {stageTitles[caseItem.stage]} to {stageTitles[(caseItem.stage + 1) as CaseStage]}?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm text-gray-500">
                        Advancing the case stage will update the timeline and may trigger notifications to relevant parties.
                      </p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setAdvanceStageOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAdvanceStage}>
                        <Check className="mr-2 h-4 w-4" />
                        Confirm Advance
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </CardFooter>
          </Card>
          
          {/* Case Details Tabs */}
          <Tabs defaultValue="notes">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="notes">
                <MessageCircle className="h-4 w-4 mr-2" />
                Notes
              </TabsTrigger>
              <TabsTrigger value="documents">
                <Paperclip className="h-4 w-4 mr-2" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="timeline">
                <Calendar className="h-4 w-4 mr-2" />
                Timeline
              </TabsTrigger>
              <TabsTrigger value="contacts">
                <User className="h-4 w-4 mr-2" />
                Contacts
              </TabsTrigger>
            </TabsList>
            
            {/* Notes Tab */}
            <TabsContent value="notes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Case Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Textarea 
                      placeholder="Add a note about this case..." 
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleAddNote}>Add Note</Button>
                  </div>
                  
                  <div className="space-y-4 mt-6">
                    {caseItem.notes.map(note => (
                      <Card key={note.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm text-gray-500">
                                {format(new Date(note.createdAt), 'MMM d, yyyy h:mm a')} by {note.createdBy}
                              </p>
                              <p className="mt-2">{note.content}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {caseItem.notes.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <MessageCircle className="mx-auto h-8 w-8 text-gray-300" />
                        <p className="mt-2">No notes yet. Add your first note above.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Documents Tab */}
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Case Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {caseItem.documents.map(doc => (
                      <Card key={doc.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                              <FileText size={20} className="text-blue-500" />
                              <div>
                                <p className="font-medium">{doc.name}</p>
                                <p className="text-sm text-gray-500">
                                  {format(new Date(doc.uploadedAt), 'MMM d, yyyy')} • {doc.type.replace('_', ' ')}
                                </p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                Download
                              </Button>
                              {doc.signatureStatus && (
                                <Badge variant="outline" className={
                                  doc.signatureStatus === 'signed' ? 'bg-green-100 text-green-800' :
                                  doc.signatureStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100'
                                }>
                                  {doc.signatureStatus.charAt(0).toUpperCase() + doc.signatureStatus.slice(1)}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {caseItem.documents.length === 0 && (
                      <div className="text-center py-10 text-gray-500">
                        <Paperclip className="mx-auto h-8 w-8 text-gray-300" />
                        <p className="mt-2">No documents uploaded yet.</p>
                        <Button variant="outline" className="mt-4">
                          Upload Document
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full">
                    <Paperclip className="mr-2 h-4 w-4" />
                    Upload New Document
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Timeline Tab */}
            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Case Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative pl-6 border-l border-gray-200 space-y-8">
                    {/* Case Creation */}
                    <div className="relative">
                      <div className="absolute -left-[25px] bg-blue-500 rounded-full h-4 w-4 mt-1.5"></div>
                      <div>
                        <p className="text-sm text-gray-500">
                          {format(new Date(caseItem.createdAt), 'MMM d, yyyy')}
                        </p>
                        <h4 className="font-medium">Case Created</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          New eviction case was created for property {property?.address}.
                        </p>
                      </div>
                    </div>
                    
                    {/* Stage Changes - would be dynamic in a real application */}
                    <div className="relative">
                      <div className="absolute -left-[25px] bg-yellow-500 rounded-full h-4 w-4 mt-1.5"></div>
                      <div>
                        <p className="text-sm text-gray-500">
                          {format(new Date(caseItem.updatedAt), 'MMM d, yyyy')}
                        </p>
                        <h4 className="font-medium">Stage Updated</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Case advanced to stage: {stageTitles[caseItem.stage]}.
                        </p>
                      </div>
                    </div>
                    
                    {/* Document Added - if we had real data, we could show this */}
                    {caseItem.documents.length > 0 && (
                      <div className="relative">
                        <div className="absolute -left-[25px] bg-green-500 rounded-full h-4 w-4 mt-1.5"></div>
                        <div>
                          <p className="text-sm text-gray-500">
                            {format(new Date(caseItem.documents[0].uploadedAt), 'MMM d, yyyy')}
                          </p>
                          <h4 className="font-medium">Document Added</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {caseItem.documents[0].name} was uploaded to the case.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Contacts Tab */}
            <TabsContent value="contacts">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Case Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Owner */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center text-base">
                          <User className="mr-2 h-4 w-4" />
                          Property Owner
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {owner ? (
                          <div className="space-y-2">
                            <p className="font-medium">{owner.name}</p>
                            <div className="text-sm text-gray-500 space-y-1">
                              <p>Phone: {owner.phone}</p>
                              <p>Email: {owner.email}</p>
                              {owner.address && <p>Address: {owner.address}</p>}
                              <p>Preferred Contact: {owner.communicationPreference}</p>
                            </div>
                            <Button variant="outline" size="sm" className="mt-2">
                              View Full Profile
                            </Button>
                          </div>
                        ) : (
                          <p className="text-gray-500">Owner information not available</p>
                        )}
                      </CardContent>
                    </Card>
                    
                    {/* Tenant */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center text-base">
                          <User className="mr-2 h-4 w-4" />
                          Tenant
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {tenant ? (
                          <div className="space-y-2">
                            <p className="font-medium">{tenant.name}</p>
                            <div className="text-sm text-gray-500 space-y-1">
                              {tenant.phone && <p>Phone: {tenant.phone}</p>}
                              {tenant.email && <p>Email: {tenant.email}</p>}
                              {tenant.leaseStartDate && (
                                <p>Lease Start: {format(new Date(tenant.leaseStartDate), 'MMM d, yyyy')}</p>
                              )}
                            </div>
                            <Button variant="outline" size="sm" className="mt-2">
                              View Full Profile
                            </Button>
                          </div>
                        ) : (
                          <p className="text-gray-500">Tenant information not available</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Case Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Case Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start">
                <Edit className="mr-2 h-4 w-4" />
                Edit Case Details
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Paperclip className="mr-2 h-4 w-4" />
                Add Document
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="mr-2 h-4 w-4" />
                Set Reminder
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Contact Owner
              </Button>
            </CardContent>
          </Card>
          
          {/* Reminders */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reminders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {caseItem.reminders.map(reminder => (
                  <ReminderItem 
                    key={reminder.id} 
                    reminder={reminder}
                    onComplete={completeReminder}
                  />
                ))}
                
                {caseItem.reminders.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    <Bell className="mx-auto h-6 w-6 text-gray-300" />
                    <p className="mt-2">No reminders set</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" className="w-full">
                <Bell className="mr-2 h-4 w-4" />
                Add Reminder
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;
