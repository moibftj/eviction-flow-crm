
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  UserPlus,
  AlertCircle,
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Clock,
  Building,
} from "lucide-react";
import { useCRM } from "@/context/CRMContext";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";
import { 
  LeadSource, 
  UrgencyLevel, 
  EvictionReason, 
  CommunicationPreference 
} from "@/types";

const formSchema = z.object({
  // Property Owner Info
  ownerName: z.string().min(1, "Owner name is required"),
  ownerPhone: z.string().min(7, "Valid phone number is required"),
  ownerEmail: z.string().email("Valid email is required"),
  communicationPreference: z.enum([
    "email", "phone", "text", "mail"
  ] as const),

  // Property Info
  propertyAddress: z.string().min(1, "Property address is required"),
  propertyUnit: z.string().optional(),
  propertyCity: z.string().min(1, "City is required"),
  propertyState: z.string().min(1, "State is required"),
  propertyZipCode: z.string().min(5, "Valid zip code is required"),

  // Tenant Info
  tenantName: z.string().min(1, "Tenant name is required"),
  tenantPhone: z.string().optional(),
  tenantEmail: z.string().optional(),
  leaseStartDate: z.string().optional(),

  // Case Info
  evictionReason: z.enum([
    "non_payment", "lease_violation", "illegal_activity", 
    "property_damage", "unauthorized_occupant", "other"
  ] as const),
  urgencyLevel: z.enum([
    "asap", "30_days", "60_days", "90_days", "not_urgent"
  ] as const),
  caseDescription: z.string().optional(),
  leadSource: z.enum([
    "website_form", "phone_call", "referral", "ad_campaign", "other"
  ] as const),
});

type FormValues = z.infer<typeof formSchema>;

const NewLeadIntake: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState("owner-info");
  const { addOwner, addTenant, addProperty, addCase } = useCRM();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerName: "",
      ownerPhone: "",
      ownerEmail: "",
      communicationPreference: "email",
      propertyAddress: "",
      propertyUnit: "",
      propertyCity: "",
      propertyState: "",
      propertyZipCode: "",
      tenantName: "",
      tenantPhone: "",
      tenantEmail: "",
      leaseStartDate: "",
      evictionReason: "non_payment",
      urgencyLevel: "asap",
      caseDescription: "",
      leadSource: "website_form",
    },
  });
  
  const onSubmit = (data: FormValues) => {
    try {
      // Create owner record
      const ownerId = crypto.randomUUID();
      addOwner({
        id: ownerId,
        name: data.ownerName,
        phone: data.ownerPhone,
        email: data.ownerEmail,
        communicationPreference: data.communicationPreference as CommunicationPreference,
      });

      // Create tenant record
      const tenantId = crypto.randomUUID();
      addTenant({
        id: tenantId,
        name: data.tenantName,
        phone: data.tenantPhone || undefined,
        email: data.tenantEmail || undefined,
        leaseStartDate: data.leaseStartDate ? new Date(data.leaseStartDate) : undefined,
      });

      // Create property record
      const propertyId = crypto.randomUUID();
      addProperty({
        id: propertyId,
        address: data.propertyAddress,
        unit: data.propertyUnit,
        city: data.propertyCity,
        state: data.propertyState,
        zipCode: data.propertyZipCode,
        ownerId,
      });

      // Create case record
      addCase({
        propertyId,
        propertyOwnerId: ownerId,
        tenantId,
        evictionReason: data.evictionReason as EvictionReason,
        urgencyLevel: data.urgencyLevel as UrgencyLevel,
        stage: 1, // New Lead
        description: data.caseDescription,
        leadSource: data.leadSource as LeadSource,
      });

      // Show success message and redirect
      toast({
        title: "Lead created successfully",
        description: "New eviction case has been created.",
      });
      navigate("/cases");
    } catch (error) {
      console.error("Error creating lead:", error);
      toast({
        title: "Error creating lead",
        description: "There was an error creating the lead. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTabChange = (tab: string) => {
    // Validate current tab before proceeding
    let canProceed = true;
    const formValues = form.getValues();

    switch (currentTab) {
      case "owner-info":
        if (!formValues.ownerName || !formValues.ownerPhone || !formValues.ownerEmail) {
          form.trigger(["ownerName", "ownerPhone", "ownerEmail"]);
          canProceed = false;
        }
        break;
      case "property-info":
        if (!formValues.propertyAddress || !formValues.propertyCity || !formValues.propertyState || !formValues.propertyZipCode) {
          form.trigger(["propertyAddress", "propertyCity", "propertyState", "propertyZipCode"]);
          canProceed = false;
        }
        break;
      case "tenant-info":
        if (!formValues.tenantName) {
          form.trigger(["tenantName"]);
          canProceed = false;
        }
        break;
    }

    if (canProceed) {
      setCurrentTab(tab);
    }
  };

  return (
    <div>
      <PageHeader 
        title="New Lead Intake" 
        subtitle="Create a new eviction case for a client" 
        icon={<UserPlus size={24} />}
      />

      <div className="max-w-4xl mx-auto">
        <Card className="border-t-4 border-t-primary">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Tabs defaultValue="owner-info" value={currentTab} onValueChange={handleTabChange}>
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="owner-info">
                    1. Owner Info
                  </TabsTrigger>
                  <TabsTrigger value="property-info">
                    2. Property
                  </TabsTrigger>
                  <TabsTrigger value="tenant-info">
                    3. Tenant
                  </TabsTrigger>
                  <TabsTrigger value="case-info">
                    4. Case Details
                  </TabsTrigger>
                </TabsList>

                {/* Owner Information */}
                <TabsContent value="owner-info">
                  <CardContent className="space-y-4 pt-6">
                    <div className="flex items-center space-x-2 text-primary">
                      <User size={20} />
                      <h3 className="text-lg font-medium">Property Owner Information</h3>
                    </div>
                    <FormField
                      control={form.control}
                      name="ownerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="ownerPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Phone size={16} className="mr-2 text-muted-foreground" />
                                <Input placeholder="555-123-4567" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="ownerEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Mail size={16} className="mr-2 text-muted-foreground" />
                                <Input placeholder="john.smith@example.com" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="communicationPreference"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Communication Method</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select preference" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="phone">Phone</SelectItem>
                              <SelectItem value="text">Text Message</SelectItem>
                              <SelectItem value="mail">Mail</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                      <ArrowLeft className="mr-2" size={16} />
                      Cancel
                    </Button>
                    <Button type="button" onClick={() => handleTabChange("property-info")}>
                      Next: Property Info
                    </Button>
                  </CardFooter>
                </TabsContent>

                {/* Property Information */}
                <TabsContent value="property-info">
                  <CardContent className="space-y-4 pt-6">
                    <div className="flex items-center space-x-2 text-primary">
                      <Building size={20} />
                      <h3 className="text-lg font-medium">Property Information</h3>
                    </div>
                    <FormField
                      control={form.control}
                      name="propertyAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <MapPin size={16} className="mr-2 text-muted-foreground" />
                              <Input placeholder="123 Eviction St." {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="propertyUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit/Apt # (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Apt 100" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="propertyCity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="propertyState"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="State" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="propertyZipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl>
                              <Input placeholder="12345" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => handleTabChange("owner-info")}>
                      Back
                    </Button>
                    <Button type="button" onClick={() => handleTabChange("tenant-info")}>
                      Next: Tenant Info
                    </Button>
                  </CardFooter>
                </TabsContent>

                {/* Tenant Information */}
                <TabsContent value="tenant-info">
                  <CardContent className="space-y-4 pt-6">
                    <div className="flex items-center space-x-2 text-primary">
                      <User size={20} />
                      <h3 className="text-lg font-medium">Tenant Information</h3>
                    </div>
                    <FormField
                      control={form.control}
                      name="tenantName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tenant Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="tenantPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number (Optional)</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Phone size={16} className="mr-2 text-muted-foreground" />
                                <Input placeholder="555-987-6543" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="tenantEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address (Optional)</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Mail size={16} className="mr-2 text-muted-foreground" />
                                <Input placeholder="tenant@example.com" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="leaseStartDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lease Start Date (Optional)</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Calendar size={16} className="mr-2 text-muted-foreground" />
                              <Input type="date" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => handleTabChange("property-info")}>
                      Back
                    </Button>
                    <Button type="button" onClick={() => handleTabChange("case-info")}>
                      Next: Case Details
                    </Button>
                  </CardFooter>
                </TabsContent>

                {/* Case Details */}
                <TabsContent value="case-info">
                  <CardContent className="space-y-4 pt-6">
                    <div className="flex items-center space-x-2 text-primary">
                      <FileText size={20} />
                      <h3 className="text-lg font-medium">Case Details</h3>
                    </div>
                    <FormField
                      control={form.control}
                      name="evictionReason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reason for Eviction</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select reason" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="non_payment">Non-payment of Rent</SelectItem>
                              <SelectItem value="lease_violation">Lease Violation</SelectItem>
                              <SelectItem value="illegal_activity">Illegal Activity</SelectItem>
                              <SelectItem value="property_damage">Property Damage</SelectItem>
                              <SelectItem value="unauthorized_occupant">Unauthorized Occupant</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="urgencyLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Urgency Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="flex items-center">
                                <Clock size={16} className="mr-2 text-muted-foreground" />
                                <SelectValue placeholder="Select urgency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="asap">ASAP (Immediate)</SelectItem>
                              <SelectItem value="30_days">Within 30 days</SelectItem>
                              <SelectItem value="60_days">Within 60 days</SelectItem>
                              <SelectItem value="90_days">Within 90 days</SelectItem>
                              <SelectItem value="not_urgent">Not Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="caseDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Details (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter any additional details about the case..." 
                              className="min-h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="leadSource"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lead Source</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select source" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="website_form">Website Form</SelectItem>
                              <SelectItem value="phone_call">Phone Call</SelectItem>
                              <SelectItem value="referral">Referral</SelectItem>
                              <SelectItem value="ad_campaign">Ad Campaign</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => handleTabChange("tenant-info")}>
                      Back
                    </Button>
                    <Button type="submit" className="bg-primary hover:bg-primary-dark">
                      Submit Intake Form
                    </Button>
                  </CardFooter>
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default NewLeadIntake;
