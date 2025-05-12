import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCRM } from "@/context/CRMContext";
import { FileText } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const NewLeadIntake = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cases, properties, owners, tenants, addCase, updateCase } = useCRM();
  const isEditMode = Boolean(id);
  const { toast } = useToast();
  
  // Initialize with the case data if in edit mode
  const currentCase = id ? cases.find(c => c.id === id) : null;

  // Form state
  const [formData, setFormData] = useState({
    propertyId: currentCase?.propertyId || "",
    propertyOwnerId: currentCase?.propertyOwnerId || "",
    tenantId: currentCase?.tenantId || "",
    evictionReason: currentCase?.evictionReason || "non_payment",
    urgencyLevel: currentCase?.urgencyLevel || "normal",
    stage: currentCase?.stage || 1,
    description: currentCase?.description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditMode && currentCase) {
      // Update existing case
      updateCase({
        ...currentCase,
        ...formData,
      });
      toast({
        title: "Case Updated",
        description: "The case has been successfully updated.",
      });
    } else {
      // Add new case
      addCase(formData);
      toast({
        title: "New Case Created",
        description: "The new case has been successfully created.",
      });
    }

    // Navigate back to cases page
    navigate('/cases');
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title={isEditMode ? "Edit Case" : "New Lead Intake"} 
        subtitle={isEditMode ? `Editing case #${id?.slice(-5)}` : "Create a new eviction case"}
        icon={<FileText size={24} />}
      />
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="propertyId">Property</Label>
          <Select
            id="propertyId"
            name="propertyId"
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
          <Label htmlFor="propertyOwnerId">Property Owner</Label>
          <Select
            id="propertyOwnerId"
            name="propertyOwnerId"
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
          <Label htmlFor="tenantId">Tenant</Label>
          <Select
            id="tenantId"
            name="tenantId"
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
          <Label htmlFor="evictionReason">Eviction Reason</Label>
          <Select
            id="evictionReason"
            name="evictionReason"
            value={formData.evictionReason}
            onValueChange={(value) => setFormData(prevData => ({ ...prevData, evictionReason: value }))}
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
          <Label htmlFor="urgencyLevel">Urgency Level</Label>
          <Select
            id="urgencyLevel"
            name="urgencyLevel"
            value={formData.urgencyLevel}
            onValueChange={(value) => setFormData(prevData => ({ ...prevData, urgencyLevel: value }))}
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
    </div>
  );
};

export default NewLeadIntake;
