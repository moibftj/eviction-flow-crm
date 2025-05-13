
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCRM } from "@/context/CRMContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UrgencyLevel, EvictionReason, CaseStage, LeadSource } from "@/types";
import { Calendar, Clock, AlertTriangle, FileText, Check, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import DocumentUploader from "@/components/documents/DocumentUploader";
import SignaturePad from "@/components/ui/signature-pad";
import { format } from "date-fns";

interface LeadIntakeFormProps {
  isEditMode: boolean;
  currentCaseId?: string;
  initialFormData: {
    propertyId: string;
    propertyOwnerId: string;
    tenantId: string;
    evictionReason: EvictionReason;
    urgencyLevel: UrgencyLevel;
    stage: CaseStage;
    description: string;
    leadSource: LeadSource;
  };
  onSubmit: (formData: any) => void;
}

const LeadIntakeForm: React.FC<LeadIntakeFormProps> = ({
  isEditMode,
  currentCaseId,
  initialFormData,
  onSubmit,
}) => {
  const navigate = useNavigate();
  const { properties, owners, tenants } = useCRM();
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState({
    ...initialFormData,
    preferredDate: "",
    preferredTime: "",
    additionalTenants: "",
    rentOwed: "",
    pastEvictions: false,
    legalNoticeServed: false,
    legalNoticeDateServed: "",
    signature: "",
    documentIds: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Basic validation
    if (!formData.propertyId) newErrors.propertyId = "Property is required";
    if (!formData.propertyOwnerId) newErrors.propertyOwnerId = "Property owner is required";
    if (!formData.tenantId) newErrors.tenantId = "Tenant is required";
    if (!formData.evictionReason) newErrors.evictionReason = "Eviction reason is required";
    
    // Additional validation for financial tab
    if (activeTab === "financial" && formData.rentOwed && isNaN(parseFloat(formData.rentOwed))) {
      newErrors.rentOwed = "Rent owed must be a valid number";
    }
    
    // Legal tab validation
    if (formData.legalNoticeServed && !formData.legalNoticeDateServed) {
      newErrors.legalNoticeDateServed = "Notice date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    } else {
      // Find the first tab with an error
      const hasBasicError = ["propertyId", "propertyOwnerId", "tenantId", "evictionReason"].some(field => errors[field]);
      const hasFinancialError = ["rentOwed"].some(field => errors[field]);
      const hasLegalError = ["legalNoticeDateServed"].some(field => errors[field]);
      
      if (hasBasicError) {
        setActiveTab("basic");
      } else if (hasFinancialError) {
        setActiveTab("financial");
      } else if (hasLegalError) {
        setActiveTab("legal");
      }
      
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form",
        variant: "destructive",
      });
    }
  };

  const handleSaveSignature = (signatureData: string) => {
    setFormData(prevData => ({
      ...prevData,
      signature: signatureData,
    }));
    
    toast({
      title: "Signature Saved",
      description: "Your electronic signature has been saved"
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="basic">Basic Details</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="legal">Legal</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Basic Details Tab */}
        <TabsContent value="basic" className="space-y-4 mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="propertySelect" className={errors.propertyId ? "text-destructive" : ""}>
                Property <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.propertyId}
                onValueChange={(value) => handleSelectChange("propertyId", value)}
              >
                <SelectTrigger className={errors.propertyId ? "border-destructive ring-destructive" : ""}>
                  <SelectValue placeholder="Select a property" />
                </SelectTrigger>
                <SelectContent>
                  {properties.map(property => (
                    <SelectItem key={property.id} value={property.id}>{property.address}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.propertyId && <p className="text-sm text-destructive">{errors.propertyId}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="propertyOwnerSelect" className={errors.propertyOwnerId ? "text-destructive" : ""}>
                Property Owner <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.propertyOwnerId}
                onValueChange={(value) => handleSelectChange("propertyOwnerId", value)}
              >
                <SelectTrigger className={errors.propertyOwnerId ? "border-destructive ring-destructive" : ""}>
                  <SelectValue placeholder="Select a property owner" />
                </SelectTrigger>
                <SelectContent>
                  {owners.map(owner => (
                    <SelectItem key={owner.id} value={owner.id}>{owner.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.propertyOwnerId && <p className="text-sm text-destructive">{errors.propertyOwnerId}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tenantSelect" className={errors.tenantId ? "text-destructive" : ""}>
                Primary Tenant <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.tenantId}
                onValueChange={(value) => handleSelectChange("tenantId", value)}
              >
                <SelectTrigger className={errors.tenantId ? "border-destructive ring-destructive" : ""}>
                  <SelectValue placeholder="Select a tenant" />
                </SelectTrigger>
                <SelectContent>
                  {tenants.map(tenant => (
                    <SelectItem key={tenant.id} value={tenant.id}>{tenant.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.tenantId && <p className="text-sm text-destructive">{errors.tenantId}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="additionalTenants">Additional Tenants</Label>
              <Input
                id="additionalTenants"
                name="additionalTenants"
                placeholder="Enter additional tenants (comma separated)"
                value={formData.additionalTenants}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="evictionReasonSelect" className={errors.evictionReason ? "text-destructive" : ""}>
                Eviction Reason <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.evictionReason}
                onValueChange={(value) => handleSelectChange("evictionReason", value as EvictionReason)}
              >
                <SelectTrigger className={errors.evictionReason ? "border-destructive ring-destructive" : ""}>
                  <SelectValue placeholder="Select eviction reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="non_payment">Non-Payment</SelectItem>
                  <SelectItem value="lease_violation">Lease Violation</SelectItem>
                  <SelectItem value="property_damage">Property Damage</SelectItem>
                  <SelectItem value="illegal_activity">Illegal Activity</SelectItem>
                  <SelectItem value="unauthorized_occupant">Unauthorized Occupant</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.evictionReason && <p className="text-sm text-destructive">{errors.evictionReason}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="urgencyLevelSelect">Urgency Level</Label>
              <Select
                value={formData.urgencyLevel}
                onValueChange={(value) => handleSelectChange("urgencyLevel", value as UrgencyLevel)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="asap">ASAP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="leadSourceSelect">Lead Source</Label>
              <Select
                value={formData.leadSource}
                onValueChange={(value) => handleSelectChange("leadSource", value as LeadSource)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select lead source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website_form">Website Form</SelectItem>
                  <SelectItem value="phone_call">Phone Call</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="ad_campaign">Ad Campaign</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="col-span-1 md:col-span-2 space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter case description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
              />
            </div>
          </div>
        </TabsContent>

        {/* Financial Tab */}
        <TabsContent value="financial" className="space-y-6 mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Financial Details</CardTitle>
              <CardDescription>
                Enter financial information related to the eviction case
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rentOwed" className={errors.rentOwed ? "text-destructive" : ""}>
                    Rent Owed ($)
                  </Label>
                  <Input
                    id="rentOwed"
                    name="rentOwed"
                    type="text"
                    placeholder="Amount owed"
                    value={formData.rentOwed}
                    onChange={handleChange}
                    className={errors.rentOwed ? "border-destructive" : ""}
                  />
                  {errors.rentOwed && (
                    <p className="text-sm text-destructive">{errors.rentOwed}</p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pastEvictions"
                    checked={formData.pastEvictions}
                    onCheckedChange={(checked) => handleCheckboxChange("pastEvictions", checked === true)}
                  />
                  <Label htmlFor="pastEvictions" className="text-sm font-normal">
                    Tenant has past evictions
                  </Label>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredDate">Preferred Court Date (if any)</Label>
                  <div className="flex">
                    <Input
                      id="preferredDate"
                      name="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="rounded-r-none"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-l-none border-l-0"
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="preferredTime">Preferred Time</Label>
                  <div className="flex">
                    <Input
                      id="preferredTime"
                      name="preferredTime"
                      type="time"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="rounded-r-none"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-l-none border-l-0"
                    >
                      <Clock className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Legal Tab */}
        <TabsContent value="legal" className="space-y-6 mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Legal Information</CardTitle>
              <CardDescription>
                Enter legal details related to the eviction process
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4 rounded-md border p-4">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Legal Notice Required</h4>
                  <p className="text-sm text-muted-foreground">
                    Most states require a formal legal notice before eviction proceedings can begin.
                    Please ensure all required notices have been properly served.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="legalNoticeServed"
                    checked={formData.legalNoticeServed}
                    onCheckedChange={(checked) => handleCheckboxChange("legalNoticeServed", checked === true)}
                  />
                  <Label htmlFor="legalNoticeServed" className="text-sm font-normal">
                    Legal notice has been served to tenant
                  </Label>
                </div>
                
                {formData.legalNoticeServed && (
                  <div className="space-y-2">
                    <Label htmlFor="legalNoticeDateServed" className={errors.legalNoticeDateServed ? "text-destructive" : ""}>
                      Date Notice Was Served <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex">
                      <Input
                        id="legalNoticeDateServed"
                        name="legalNoticeDateServed"
                        type="date"
                        value={formData.legalNoticeDateServed}
                        onChange={handleChange}
                        className={`rounded-r-none ${errors.legalNoticeDateServed ? "border-destructive" : ""}`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-l-none border-l-0"
                      >
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                    {errors.legalNoticeDateServed && (
                      <p className="text-sm text-destructive">{errors.legalNoticeDateServed}</p>
                    )}
                  </div>
                )}
              </div>
              
              <div className="space-y-4 pt-4">
                <Label>Electronic Signature</Label>
                <p className="text-sm text-muted-foreground mb-4">
                  By signing below, you confirm that all information provided is accurate 
                  to the best of your knowledge.
                </p>
                
                <SignaturePad onSave={handleSaveSignature} className="max-w-lg" />
                
                {formData.signature && (
                  <div className="flex items-center text-sm text-green-600 mt-2">
                    <Check className="h-4 w-4 mr-2" />
                    Signature saved
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="mt-0">
          <DocumentUploader 
            caseId={currentCaseId}
            onUploadComplete={(documents) => {
              setFormData(prev => ({
                ...prev,
                documentIds: [...prev.documentIds, ...documents.map(d => d.id)]
              }));
            }}
          />
        </TabsContent>
      </Tabs>

      <div className="flex flex-wrap justify-between items-center gap-4 mt-6">
        <div className="space-x-2">
          {activeTab !== "basic" && (
            <Button 
              type="button" 
              variant="outline"
              onClick={() => {
                const tabs = ["basic", "financial", "legal", "documents"];
                const currentIndex = tabs.indexOf(activeTab);
                if (currentIndex > 0) {
                  setActiveTab(tabs[currentIndex - 1]);
                }
              }}
            >
              Previous
            </Button>
          )}
          
          {activeTab !== "documents" && (
            <Button 
              type="button"
              onClick={() => {
                const tabs = ["basic", "financial", "legal", "documents"];
                const currentIndex = tabs.indexOf(activeTab);
                if (currentIndex < tabs.length - 1) {
                  setActiveTab(tabs[currentIndex + 1]);
                }
              }}
            >
              Next
            </Button>
          )}
        </div>
        
        <div className="space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/cases')}
          >
            <X className="h-4 w-4 mr-2" /> Cancel
          </Button>
          <Button type="submit">
            <Check className="h-4 w-4 mr-2" /> 
            {isEditMode ? "Update Case" : "Create Case"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LeadIntakeForm;
