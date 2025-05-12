
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Search, UserPlus, Building, Phone, Mail } from "lucide-react";
import { useCRM } from "@/context/CRMContext";
import PageHeader from "@/components/common/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Contacts: React.FC = () => {
  const navigate = useNavigate();
  const { owners, tenants } = useCRM();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("owners");
  
  // Filter owners and tenants based on search query
  const filteredOwners = owners.filter(owner => 
    searchQuery === "" || 
    owner.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    owner.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    owner.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredTenants = tenants.filter(tenant => 
    searchQuery === "" || 
    tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (tenant.email && tenant.email.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (tenant.phone && tenant.phone.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleAddContact = () => {
    navigate(`/contacts/new/${activeTab}`);
  };
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Contacts" 
        subtitle="Manage property owners and tenants" 
        icon={<Users size={24} />}
        actionLabel="New Contact"
        onAction={handleAddContact}
      />
      
      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={handleAddContact}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="owners" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="owners">
            <Building className="mr-2 h-4 w-4" />
            Property Owners ({filteredOwners.length})
          </TabsTrigger>
          <TabsTrigger value="tenants">
            <Users className="mr-2 h-4 w-4" />
            Tenants ({filteredTenants.length})
          </TabsTrigger>
        </TabsList>
        
        {/* Property Owners */}
        <TabsContent value="owners" className="mt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Information</TableHead>
                  <TableHead>Communication Preference</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOwners.map(owner => (
                  <TableRow key={owner.id}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{owner.name}</span>
                        <span className="text-xs text-gray-500">
                          Owner ID: {owner.id.slice(-5)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Phone size={14} className="mr-2 text-gray-400" />
                          {owner.phone}
                        </div>
                        <div className="flex items-center text-sm">
                          <Mail size={14} className="mr-2 text-gray-400" />
                          {owner.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {owner.communicationPreference}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/contacts/owners/${owner.id}`)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/contacts/owners/${owner.id}/edit`)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Add Case
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredOwners.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No property owners found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        {/* Tenants */}
        <TabsContent value="tenants" className="mt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Information</TableHead>
                  <TableHead>Lease Start</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTenants.map(tenant => (
                  <TableRow key={tenant.id}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{tenant.name}</span>
                        <span className="text-xs text-gray-500">
                          Tenant ID: {tenant.id.slice(-5)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {tenant.phone && (
                          <div className="flex items-center text-sm">
                            <Phone size={14} className="mr-2 text-gray-400" />
                            {tenant.phone}
                          </div>
                        )}
                        {tenant.email && (
                          <div className="flex items-center text-sm">
                            <Mail size={14} className="mr-2 text-gray-400" />
                            {tenant.email}
                          </div>
                        )}
                        {!tenant.phone && !tenant.email && (
                          <span className="text-sm text-gray-500">No contact info available</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {tenant.leaseStartDate ? (
                        <span className="text-sm">
                          {new Date(tenant.leaseStartDate).toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">Not specified</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/contacts/tenants/${tenant.id}`)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/contacts/tenants/${tenant.id}/edit`)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            View Cases
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredTenants.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No tenants found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Contacts;
