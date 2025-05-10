
import React from "react";
import { Reminder } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Bell, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface ReminderItemProps {
  reminder: Reminder;
  onComplete: (id: string) => void;
}

const ReminderItem: React.FC<ReminderItemProps> = ({ reminder, onComplete }) => {
  const isOverdue = new Date(reminder.dueDate) < new Date();
  
  return (
    <Card className={`mb-3 ${reminder.completed ? "opacity-70" : ""} ${isOverdue && !reminder.completed ? "border-red-300" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`rounded-full p-2 ${reminder.completed ? "bg-green-100" : isOverdue ? "bg-red-100" : "bg-blue-100"}`}>
              <Bell size={16} className={reminder.completed ? "text-green-600" : isOverdue ? "text-red-600" : "text-blue-600"} />
            </div>
            <div>
              <h4 className={`font-medium ${reminder.completed ? "line-through text-gray-500" : ""}`}>{reminder.title}</h4>
              <p className="text-xs text-gray-600">
                {formatDistanceToNow(new Date(reminder.dueDate), { addSuffix: true })}
              </p>
              {reminder.description && (
                <p className="text-sm text-gray-600 mt-1">{reminder.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Switch 
              checked={reminder.completed} 
              onCheckedChange={() => onComplete(reminder.id)} 
              aria-label="Mark as complete"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReminderItem;
