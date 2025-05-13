
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCRM } from "@/context/CRMContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UrgencyLevel, EvictionReason, CaseStage, LeadSource } from "@/types";

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
  onSubmit: (formData: LeadIntakeFormProps['initialFormData']) => void;
}

const LeadIntakeForm: React.FC<LeadIntakeFormProps> = ({
  isEditMode,
  currentCaseId,
  initialFormData,
  onSubmit,
}) => {
  const navigate = useNavigate();
  const { properties, owners, tenants } = useCRM();
  const [formData, setFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div>
        <Label htmlFor="propertySelect">Property</Label>
        <Select
          value={formData.propertyId}
          onValueChange={(value) => setFormData(prevData => ({ ...prevData, propertyId: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a property" />
          </SelectTrigger>
          <SelectContent>
            {properties.map(property => (
              <SelectItem key={property.id} value={property.id}>{property.address}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="propertyOwnerSelect">Property Owner</Label>
        <Select
          value={formData.propertyOwnerId}
          onValueChange={(value) => setFormData(prevData => ({ ...prevData, propertyOwnerId: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a property owner" />
          </SelectTrigger>
          <SelectContent>
            {owners.map(owner => (
              <SelectItem key={owner.id} value={owner.id}>{owner.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="tenantSelect">Tenant</Label>
        <Select
          value={formData.tenantId}
          onValueChange={(value) => setFormData(prevData => ({ ...prevData, tenantId: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a tenant" />
          </SelectTrigger>
          <SelectContent>
            {tenants.map(tenant => (
              <SelectItem key={tenant.id} value={tenant.id}>{tenant.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="evictionReasonSelect">Eviction Reason</Label>
        <Select
          value={formData.evictionReason}
          onValueChange={(value) => setFormData(prevData => ({ 
            ...prevData, 
            evictionReason: value as EvictionReason 
          }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select eviction reason" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="non_payment">Non-Payment</SelectItem>
            <SelectItem value="lease_violation">Lease Violation</SelectItem>
            <SelectItem value="property_damage">Property Damage</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="urgencyLevelSelect">Urgency Level</Label>
        <Select
          value={formData.urgencyLevel}
          onValueChange={(value) => setFormData(prevData => ({ 
            ...prevData, 
            urgencyLevel: value as UrgencyLevel
          }))}
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
      
      <div>
        <Label htmlFor="leadSourceSelect">Lead Source</Label>
        <Select
          value={formData.leadSource}
          onValueChange={(value) => setFormData(prevData => ({ 
            ...prevData, 
            leadSource: value as LeadSource
          }))}
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
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter case description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => navigate('/cases')}>Cancel</Button>
        <Button type="submit">{isEditMode ? "Update Case" : "Create Case"}</Button>
      </div>
    </form>
  );
};

export default LeadIntakeForm;
