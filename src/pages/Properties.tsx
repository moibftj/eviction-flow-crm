
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Database, Search, Plus, MapPin, User, Building } from "lucide-react";
import { useCRM } from "@/context/CRMContext";
import PageHeader from "@/components/common/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Properties: React.FC = () => {
  const navigate = useNavigate();
  const { properties, owners } = useCRM();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter properties based on search query
  const filteredProperties = properties.filter(property => 
    searchQuery === "" || 
    property.address.toLowerCase().includes(searchQuery.toLowerCase()) || 
    property.city.toLowerCase().includes(searchQuery.toLowerCase()) || 
    property.state.toLowerCase().includes(searchQuery.toLowerCase()) || 
    property.zipCode.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get owner for a property
  const getOwnerName = (ownerId: string) => {
    const owner = owners.find(o => o.id === ownerId);
    return owner ? owner.name : 'Unknown';
  };
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Properties" 
        subtitle="Manage your eviction properties" 
        icon={<Database size={24} />}
        actionLabel="Add Property"
        onAction={() => navigate("/properties/new")}
      />
      
      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by address, city, state, or zip..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => navigate("/properties/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Property
        </Button>
      </div>
      
      {/* Properties Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map(property => (
            <Card 
              key={property.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/properties/${property.id}`)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-start justify-between">
                  <div className="flex items-center">
                    <Building className="mr-2 h-5 w-5 text-primary" />
                    <span>
                      {property.address}
                      {property.unit && <span className="text-sm ml-1">({property.unit})</span>}
                    </span>
                  </div>
                  <Badge variant="outline" className="ml-2 text-xs">
                    ID: {property.id.slice(-5)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm">
                        {property.city}, {property.state} {property.zipCode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Owner:</p>
                      <p className="text-sm">{getOwnerName(property.ownerId)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button size="sm">
                  Create Case
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed">
          <Database className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900">No properties found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding a new property.</p>
          <div className="mt-6">
            <Button onClick={() => navigate("/properties/new")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;
