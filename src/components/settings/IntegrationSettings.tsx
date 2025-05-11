
import React from "react";
import { Button } from "@/components/ui/button";
import { Mail, Calendar, FileText, Bell } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface IntegrationSettingsProps {
  handleSaveSettings: () => void;
}

const IntegrationSettings: React.FC<IntegrationSettingsProps> = ({ handleSaveSettings }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
        <CardDescription>
          Connect your CRM with other services
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Email Integration */}
        <div className="flex items-center justify-between p-4 border rounded-md">
          <div className="flex items-center">
            <div className="h-10 w-10 mr-4 bg-blue-100 rounded-md flex items-center justify-center">
              <Mail size={24} className="text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium">Email Integration</h4>
              <p className="text-sm text-muted-foreground">
                Sync with Gmail or Outlook to track communication
              </p>
            </div>
          </div>
          <Button variant="outline">Connect</Button>
        </div>
        
        {/* Calendar Integration */}
        <div className="flex items-center justify-between p-4 border rounded-md">
          <div className="flex items-center">
            <div className="h-10 w-10 mr-4 bg-green-100 rounded-md flex items-center justify-center">
              <Calendar size={24} className="text-green-600" />
            </div>
            <div>
              <h4 className="font-medium">Calendar Integration</h4>
              <p className="text-sm text-muted-foreground">
                Sync court dates with Google Calendar or Outlook
              </p>
            </div>
          </div>
          <Button variant="outline">Connect</Button>
        </div>
        
        {/* Document Storage */}
        <div className="flex items-center justify-between p-4 border rounded-md">
          <div className="flex items-center">
            <div className="h-10 w-10 mr-4 bg-yellow-100 rounded-md flex items-center justify-center">
              <FileText size={24} className="text-yellow-600" />
            </div>
            <div>
              <h4 className="font-medium">Document Storage</h4>
              <p className="text-sm text-muted-foreground">
                Connect to Dropbox, Google Drive, or OneDrive
              </p>
            </div>
          </div>
          <Button variant="outline">Connect</Button>
        </div>
        
        {/* SMS API */}
        <div className="flex items-center justify-between p-4 border rounded-md">
          <div className="flex items-center">
            <div className="h-10 w-10 mr-4 bg-purple-100 rounded-md flex items-center justify-center">
              <Bell size={24} className="text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium">SMS Notifications</h4>
              <p className="text-sm text-muted-foreground">
                Connect Twilio to send automated SMS alerts
              </p>
            </div>
          </div>
          <Button variant="outline">Connect</Button>
        </div>
        
        {/* Payment Integration */}
        <div className="flex items-center justify-between p-4 border rounded-md">
          <div className="flex items-center">
            <div className="h-10 w-10 mr-4 bg-green-100 rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">Payment Processing</h4>
              <p className="text-sm text-muted-foreground">
                Connect Stripe or Square for invoice payments
              </p>
            </div>
          </div>
          <Button variant="outline">Connect</Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveSettings}>Save Settings</Button>
      </CardFooter>
    </Card>
  );
};

export default IntegrationSettings;
