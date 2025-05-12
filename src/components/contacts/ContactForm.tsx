
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCRM } from "@/context/CRMContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CommunicationPreference } from "@/types";

type ContactType = "owner" | "tenant";

interface ContactFormProps {
  type: ContactType;
  editMode?: boolean;
  existingData?: any;
}

const ContactForm: React.FC<ContactFormProps> = ({
  type,
  editMode = false,
  existingData = null,
}) => {
  const navigate = useNavigate();
  const { addOwner, addTenant, updateOwner, updateTenant } = useCRM();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: existingData?.name || "",
    phone: existingData?.phone || "",
    email: existingData?.email || "",
    address: existingData?.address || "",
    communicationPreference: 
      existingData?.communicationPreference as CommunicationPreference || "email",
    leaseStartDate: existingData?.leaseStartDate 
      ? new Date(existingData.leaseStartDate).toISOString().split("T")[0]
      : "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (type === "owner") {
      const ownerData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        communicationPreference: formData.communicationPreference as CommunicationPreference,
      };

      if (editMode && existingData) {
        updateOwner({ ...existingData, ...ownerData });
        toast({
          title: "Success",
          description: "Property owner updated successfully",
        });
      } else {
        addOwner(ownerData);
        toast({
          title: "Success",
          description: "Property owner added successfully",
        });
      }
    } else {
      // Handle tenant
      const tenantData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        leaseStartDate: formData.leaseStartDate ? new Date(formData.leaseStartDate) : undefined,
      };

      if (editMode && existingData) {
        updateTenant({ ...existingData, ...tenantData });
        toast({
          title: "Success",
          description: "Tenant updated successfully",
        });
      } else {
        addTenant(tenantData);
        toast({
          title: "Success",
          description: "Tenant added successfully",
        });
      }
    }

    navigate("/contacts");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
          required
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          required={type === "owner"}
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          required={type === "owner"}
        />
      </div>

      {type === "owner" && (
        <>
          <div>
            <Label htmlFor="address">Address (Optional)</Label>
            <Input
              id="address"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </div>

          <div>
            <Label htmlFor="communicationPreference">Communication Preference</Label>
            <Select
              value={formData.communicationPreference}
              onValueChange={(value) =>
                handleSelectChange("communicationPreference", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="mail">Mail</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {type === "tenant" && (
        <div>
          <Label htmlFor="leaseStartDate">Lease Start Date (Optional)</Label>
          <Input
            id="leaseStartDate"
            name="leaseStartDate"
            type="date"
            value={formData.leaseStartDate}
            onChange={handleChange}
          />
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => navigate("/contacts")}>
          Cancel
        </Button>
        <Button type="submit">{editMode ? "Update" : "Create"}</Button>
      </div>
    </form>
  );
};

export default ContactForm;
