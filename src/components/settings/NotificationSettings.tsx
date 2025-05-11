
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface NotificationSettingsProps {
  handleSaveSettings: () => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ handleSaveSettings }) => {
  return (
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
            <Switch defaultChecked={true} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Case Updates</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications when cases are updated
              </p>
            </div>
            <Switch defaultChecked={true} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Court Date Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Receive reminders about upcoming court dates
              </p>
            </div>
            <Switch defaultChecked={true} />
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
            <Switch defaultChecked={false} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Deadline Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Receive SMS reminders for approaching deadlines
              </p>
            </div>
            <Switch defaultChecked={false} />
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
            <Switch defaultChecked={true} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Document Updates</Label>
              <p className="text-sm text-muted-foreground">
                Be notified when documents are uploaded or changed
              </p>
            </div>
            <Switch defaultChecked={true} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Reminder Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications for task reminders
              </p>
            </div>
            <Switch defaultChecked={true} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveSettings}>Save Preferences</Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationSettings;
