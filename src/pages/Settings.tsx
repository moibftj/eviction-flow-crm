
import React from "react";
import { Settings as SettingsIcon, User, Bell, Lock, Database, Mail, HelpCircle } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/toast";

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
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value="Admin User" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value="admin@evictioncrm.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" value="Eviction Consultation Services" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value="555-123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <select 
                  id="timezone" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option>Eastern Time (ET) UTC-05:00</option>
                  <option>Central Time (CT) UTC-06:00</option>
                  <option>Mountain Time (MT) UTC-07:00</option>
                  <option>Pacific Time (PT) UTC-08:00</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Case Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications when new cases are created
                    </p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Case Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when cases are updated
                    </p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Court Date Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders about upcoming court dates
                    </p>
                  </div>
                  <Switch checked={true} />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">SMS Notifications</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Urgent Case Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive SMS alerts for urgent case matters
                    </p>
                  </div>
                  <Switch checked={false} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Deadline Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive SMS reminders for approaching deadlines
                    </p>
                  </div>
                  <Switch checked={false} />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">In-App Notifications</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>All Case Activities</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for all case activities
                    </p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Document Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Be notified when documents are uploaded or changed
                    </p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Reminder Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for task reminders
                    </p>
                  </div>
                  <Switch checked={true} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant="outline">Set Up</Button>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-medium mb-4">Login History</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-start p-3 border rounded-md">
                    <div>
                      <p className="font-medium">Today, 9:42 AM</p>
                      <p className="text-sm text-muted-foreground">
                        New York, USA • Chrome on Windows
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Current</Badge>
                  </div>
                  <div className="flex justify-between items-start p-3 border rounded-md">
                    <div>
                      <p className="font-medium">Yesterday, 2:15 PM</p>
                      <p className="text-sm text-muted-foreground">
                        New York, USA • Chrome on Windows
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start p-3 border rounded-md">
                    <div>
                      <p className="font-medium">May 8, 2023, 10:30 AM</p>
                      <p className="text-sm text-muted-foreground">
                        New York, USA • Safari on macOS
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Sign Out All Devices</Button>
              <Button onClick={handleSaveSettings}>Update Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Integrations Settings */}
        <TabsContent value="integrations">
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
        </TabsContent>
        
        {/* Support */}
        <TabsContent value="support">
          <Card>
            <CardHeader>
              <CardTitle>Support</CardTitle>
              <CardDescription>
                Get help and contact support
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Documentation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Browse our help documentation for tutorials, guides, and answers to common questions.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Documentation
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contact Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Need help? Our support team is available Monday-Friday, 9am-5pm ET.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Contact Support
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="p-4 border rounded-md bg-gray-50">
                <h3 className="text-lg font-medium mb-2">Submit a Support Ticket</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Enter the subject of your inquiry" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <textarea 
                      id="description" 
                      rows={4} 
                      placeholder="Please provide details about your issue"
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    ></textarea>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <select 
                      id="priority" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                  <Button>Submit Ticket</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
