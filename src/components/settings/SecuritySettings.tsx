
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SecuritySettingsProps {
  handleSaveSettings: () => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ handleSaveSettings }) => {
  return (
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
  );
};

export default SecuritySettings;
