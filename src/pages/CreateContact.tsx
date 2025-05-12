
import React from "react";
import { useParams } from "react-router-dom";
import { UserPlus } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import ContactForm from "@/components/contacts/ContactForm";

const CreateContact: React.FC = () => {
  const { type } = useParams<{ type: "owners" | "tenants" }>();
  
  const contactType = type === "owners" ? "owner" : "tenant";
  const title = `New ${contactType === "owner" ? "Property Owner" : "Tenant"}`;
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title={title}
        subtitle={`Add a new ${contactType} to your contacts`}
        icon={<UserPlus size={24} />}
      />
      
      <div className="bg-white shadow rounded-lg p-6">
        <ContactForm type={contactType} />
      </div>
    </div>
  );
};

export default CreateContact;
