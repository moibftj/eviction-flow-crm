
import React, { useState } from "react";
import { Calendar, Clock, FileText, Plus } from "lucide-react";
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns";
import { useCRM } from "@/context/CRMContext";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Example calendar events
const mockEvents = [
  {
    id: "event1",
    title: "Court Hearing - Smith",
    date: addDays(new Date(), 3),
    type: "court",
    caseId: "case2",
    description: "Eviction hearing for Maria Rodriguez's property case",
  },
  {
    id: "event2",
    title: "Notice Delivery - Williams",
    date: addDays(new Date(), 1),
    type: "notice",
    caseId: "case1",
    description: "Deliver 3-day notice to tenant",
  },
  {
    id: "event3",
    title: "Client Meeting - Johnson",
    date: addDays(new Date(), 5),
    type: "meeting",
    caseId: "case3",
    description: "Discuss case progress with client",
  },
  {
    id: "event4",
    title: "Filing Deadline - Davis",
    date: new Date(),
    type: "deadline",
    caseId: "case2",
    description: "Submit court documents by end of day",
  },
];

// Event type badge colors
const eventTypeColors: Record<string, string> = {
  court: "bg-red-100 text-red-800",
  notice: "bg-yellow-100 text-yellow-800",
  meeting: "bg-blue-100 text-blue-800",
  deadline: "bg-purple-100 text-purple-800",
};

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  
  // Get all days in the current month
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get events for selected date
  const eventsForSelectedDate = mockEvents.filter(event => 
    isSameDay(new Date(event.date), selectedDate)
  );
  
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };
  
  const handleViewEventDetails = (event: any) => {
    setSelectedEvent(event);
  };
  
  const handleCloseEventDetails = () => {
    setSelectedEvent(null);
  };
  
  // Calculate week days for week view (simplified for example)
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(selectedDate, i - selectedDate.getDay()));
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Calendar" 
        subtitle="Manage court dates, deadlines, and events" 
        icon={<Calendar size={24} />}
        actionLabel="Add Event"
        onAction={() => {}}
      />
      
      {/* Calendar Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              >
                ← Prev
              </Button>
              <h3 className="text-lg font-medium">
                {format(currentDate, "MMMM yyyy")}
              </h3>
              <Button
                variant="outline"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              >
                Next →
              </Button>
              <Button
                variant="ghost"
                onClick={() => setCurrentDate(new Date())}
                className="ml-2"
              >
                Today
              </Button>
            </div>
            
            <div className="flex items-center gap-3">
              <Select
                value={viewMode}
                onValueChange={(value) => setViewMode(value as "month" | "week" | "day")}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="View" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="day">Day</SelectItem>
                </SelectContent>
              </Select>
              
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-4">
              {/* Month View */}
              {viewMode === "month" && (
                <>
                  {/* Days of week header */}
                  <div className="grid grid-cols-7 mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="h-10 flex items-center justify-center font-medium">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {/* Empty cells for days before the first of month */}
                    {Array.from({ length: monthStart.getDay() }).map((_, index) => (
                      <div key={`empty-start-${index}`} className="h-24 bg-gray-50 rounded-md"></div>
                    ))}
                    
                    {/* Calendar days */}
                    {calendarDays.map((day) => {
                      const isToday = isSameDay(day, new Date());
                      const isSelected = isSameDay(day, selectedDate);
                      const dayEvents = mockEvents.filter(event => isSameDay(new Date(event.date), day));
                      
                      return (
                        <div
                          key={day.toString()}
                          className={`h-24 p-1 rounded-md border overflow-hidden ${
                            isToday ? "bg-blue-50 border-blue-200" : 
                            isSelected ? "bg-gray-100 border-gray-300" : "border-gray-200"
                          } hover:bg-gray-50 cursor-pointer`}
                          onClick={() => handleDateClick(day)}
                        >
                          <div className="flex justify-between items-start">
                            <span className={`text-sm font-medium ${isToday ? "text-blue-600" : ""}`}>
                              {format(day, "d")}
                            </span>
                          </div>
                          
                          <div className="mt-1 space-y-1">
                            {dayEvents.slice(0, 2).map((event) => (
                              <div 
                                key={event.id} 
                                className={`text-xs p-1 rounded truncate ${eventTypeColors[event.type]}`}
                              >
                                {event.title}
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-gray-500 pl-1">
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* Empty cells for days after the end of month */}
                    {Array.from({ length: 6 - monthEnd.getDay() }).map((_, index) => (
                      <div key={`empty-end-${index}`} className="h-24 bg-gray-50 rounded-md"></div>
                    ))}
                  </div>
                </>
              )}
              
              {/* Week View */}
              {viewMode === "week" && (
                <>
                  <div className="grid grid-cols-7 mb-2">
                    {weekDays.map((day, index) => (
                      <div key={index} className="text-center">
                        <div className="font-medium">{format(day, "EEE")}</div>
                        <div className={`text-sm ${isSameDay(day, new Date()) ? "bg-blue-100 rounded-full w-6 h-6 mx-auto flex items-center justify-center" : ""}`}>
                          {format(day, "d")}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                    {weekDays.map((day, index) => {
                      const dayEvents = mockEvents.filter(event => isSameDay(new Date(event.date), day));
                      
                      return (
                        <div key={index} className="min-h-[300px] border rounded-md p-2">
                          {dayEvents.map((event) => (
                            <div 
                              key={event.id} 
                              className={`mb-2 p-2 rounded text-sm cursor-pointer ${eventTypeColors[event.type]}`}
                              onClick={() => handleViewEventDetails(event)}
                            >
                              <div className="font-medium truncate">{event.title}</div>
                              <div className="text-xs flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                {format(new Date(event.date), "h:mm a")}
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              
              {/* Day View */}
              {viewMode === "day" && (
                <>
                  <h3 className="text-lg font-medium mb-4">
                    {format(selectedDate, "EEEE, MMMM d, yyyy")}
                  </h3>
                  
                  <div className="space-y-4">
                    {eventsForSelectedDate.length > 0 ? (
                      eventsForSelectedDate.map((event) => (
                        <Card key={event.id} className={`border-l-4 ${event.type === "court" ? "border-l-red-500" : event.type === "notice" ? "border-l-yellow-500" : event.type === "deadline" ? "border-l-purple-500" : "border-l-blue-500"}`}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <CardTitle>{event.title}</CardTitle>
                              <Badge className={eventTypeColors[event.type]}>
                                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                              </Badge>
                            </div>
                            <CardDescription className="flex items-center">
                              <Clock className="mr-2 h-4 w-4" />
                              {format(new Date(event.date), "h:mm a")}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p>{event.description}</p>
                          </CardContent>
                          <CardFooter className="border-t pt-4 flex justify-between">
                            <Button variant="outline" size="sm">
                              <Calendar className="mr-2 h-4 w-4" />
                              Reschedule
                            </Button>
                            <Button size="sm">
                              <FileText className="mr-2 h-4 w-4" />
                              View Case
                            </Button>
                          </CardFooter>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12 border border-dashed rounded-md">
                        <Calendar className="mx-auto h-12 w-12 text-gray-300" />
                        <h3 className="mt-4 text-lg font-medium">No events scheduled</h3>
                        <p className="mt-1 text-sm text-gray-500">Click "Add Event" to schedule something for this day</p>
                        <Button className="mt-4">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Event
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar - Selected Date Info */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                {format(selectedDate, "MMMM d, yyyy")}
              </CardTitle>
              <CardDescription>
                {eventsForSelectedDate.length} event{eventsForSelectedDate.length !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {eventsForSelectedDate.length > 0 ? (
                <div className="space-y-4">
                  {eventsForSelectedDate.map((event) => (
                    <div 
                      key={event.id} 
                      className="p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                      onClick={() => handleViewEventDetails(event)}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{event.title}</h4>
                        <Badge className={eventTypeColors[event.type]}>
                          {event.type}
                        </Badge>
                      </div>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Clock className="mr-2 h-4 w-4" />
                        {format(new Date(event.date), "h:mm a")}
                      </div>
                      <p className="text-sm mt-2 line-clamp-2">{event.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="mx-auto h-8 w-8 text-gray-300" />
                  <p className="mt-2">No events for this day</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </CardFooter>
          </Card>
          
          {/* Upcoming Events */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockEvents
                  .filter(event => new Date(event.date) >= new Date())
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 5)
                  .map(event => (
                    <div 
                      key={event.id} 
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleViewEventDetails(event)}
                    >
                      <div className={`w-2 h-10 rounded-full ${
                        event.type === "court" ? "bg-red-500" : 
                        event.type === "notice" ? "bg-yellow-500" : 
                        event.type === "deadline" ? "bg-purple-500" : 
                        "bg-blue-500"
                      }`}></div>
                      <div>
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(event.date), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Event Details Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={handleCloseEventDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-between items-start">
              <span>{selectedEvent?.title}</span>
              <Badge className={selectedEvent?.type ? eventTypeColors[selectedEvent.type] : ""}>
                {selectedEvent?.type?.charAt(0).toUpperCase() + selectedEvent?.type?.slice(1)}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              {selectedEvent?.date && format(new Date(selectedEvent.date), "EEEE, MMMM d, yyyy")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Time</h4>
              <p className="flex items-center mt-1">
                <Clock className="mr-2 h-4 w-4" />
                {selectedEvent?.date && format(new Date(selectedEvent.date), "h:mm a")}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Case</h4>
              <p className="flex items-center mt-1">
                <FileText className="mr-2 h-4 w-4" />
                {selectedEvent?.caseId}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Description</h4>
              <p className="mt-1">{selectedEvent?.description}</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseEventDetails}>
              Close
            </Button>
            <Button>
              Edit Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarPage;
