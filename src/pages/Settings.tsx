
import React from "react";
import { Settings as SettingsIcon, User, Bell, Lock, Database, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/common/PageHeader";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Import refactored components
import AccountSettings from "@/components/settings/AccountSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import IntegrationSettings from "@/components/settings/IntegrationSettings";
import SupportSettings from "@/components/settings/SupportSettings";

const Settings: React.FC = () => {
  const { toast } = useToast();
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Settings" 
        subtitle="Configure your CRM preferences" 
        icon={<SettingsIcon size={24} />}
      />
      
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="account">
            <User className="mr-2 h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Database className="mr-2 h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="support">
            <HelpCircle className="mr-2 h-4 w-4" />
            Support
          </TabsTrigger>
        </TabsList>
        
        {/* Account Settings */}
        <TabsContent value="account">
          <AccountSettings handleSaveSettings={handleSaveSettings} />
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications">
          <NotificationSettings handleSaveSettings={handleSaveSettings} />
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security">
          <SecuritySettings handleSaveSettings={handleSaveSettings} />
        </TabsContent>
        
        {/* Integrations Settings */}
        <TabsContent value="integrations">
          <IntegrationSettings handleSaveSettings={handleSaveSettings} />
        </TabsContent>
        
        {/* Support */}
        <TabsContent value="support">
          <SupportSettings handleSaveSettings={handleSaveSettings} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
