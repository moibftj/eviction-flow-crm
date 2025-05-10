
import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, FileText, Users, Calendar, Bell, ChartBar } from "lucide-react";
import { useCRM } from "@/context/CRMContext";
import PageHeader from "@/components/common/PageHeader";
import StatsCard from "@/components/common/StatsCard";
import CaseStageCard from "@/components/common/CaseStageCard";
import ReminderItem from "@/components/common/ReminderItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockAnalyticsData } from "@/data/mockData";

const Dashboard = () => {
  const navigate = useNavigate();
  const { cases, reminders, completeReminder } = useCRM();
  
  // Get upcoming reminders (not completed, due within 7 days)
  const upcomingReminders = reminders
    .filter(reminder => !reminder.completed && 
      new Date(reminder.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);
  
  // Get recent cases (created within last 30 days)
  const recentCases = cases
    .filter(caseItem => 
      new Date(caseItem.createdAt) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    .slice(0, 3);
  
  // Calculate case stats
  const totalActiveCases = cases.filter(caseItem => caseItem.stage < 9).length;
  const casesByStage = cases.reduce((acc, caseItem) => {
    acc[caseItem.stage] = (acc[caseItem.stage] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const handleViewCase = (caseItem: any) => {
    navigate(`/cases/${caseItem.id}`);
  };

  return (
    <div>
      <PageHeader 
        title="Dashboard" 
        subtitle="Overview of your eviction consultation cases" 
        icon={<Home size={24} />}
      />
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard 
          title="Active Cases" 
          value={totalActiveCases} 
          icon={<FileText size={24} />} 
          trend={{ direction: "up", value: "14%" }}
        />
        <StatsCard 
          title="Clients" 
          value={mockAnalyticsData.totalCases} 
          icon={<Users size={24} />} 
          trend={{ direction: "up", value: "5%" }}
        />
        <StatsCard 
          title="Avg. Case Duration" 
          value={`${mockAnalyticsData.avgCaseDuration} days`} 
          icon={<Calendar size={24} />}
        />
        <StatsCard 
          title="Success Rate" 
          value={`${mockAnalyticsData.successRate}%`}
          icon={<ChartBar size={24} />}
          trend={{ direction: "up", value: "2%" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Cases */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Cases</CardTitle>
              <Button variant="outline" onClick={() => navigate('/cases')}>View All</Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentCases.map(caseItem => (
                  <CaseStageCard 
                    key={caseItem.id} 
                    caseItem={caseItem}
                    onClick={handleViewCase}
                  />
                ))}
                {recentCases.length === 0 && (
                  <p className="text-gray-500 col-span-2 text-center py-8">No recent cases found.</p>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Cases by Stage */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Cases by Stage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <StatsCard 
                  title="New Leads" 
                  value={casesByStage[1] || 0} 
                  className="bg-blue-50"
                />
                <StatsCard 
                  title="Under Review" 
                  value={casesByStage[2] || 0} 
                  className="bg-purple-50"
                />
                <StatsCard 
                  title="Notice Served" 
                  value={casesByStage[3] || 0} 
                  className="bg-yellow-50"
                />
                <StatsCard 
                  title="Waiting Period" 
                  value={casesByStage[4] || 0} 
                  className="bg-amber-50"
                />
                <StatsCard 
                  title="Court Filing" 
                  value={casesByStage[5] || 0} 
                  className="bg-orange-50"
                />
                <StatsCard 
                  title="Hearing" 
                  value={casesByStage[6] || 0} 
                  className="bg-red-50"
                />
                <StatsCard 
                  title="Judgment" 
                  value={casesByStage[7] || 0} 
                  className="bg-green-50"
                />
                <StatsCard 
                  title="Enforcement" 
                  value={casesByStage[8] || 0} 
                  className="bg-emerald-50"
                />
                <StatsCard 
                  title="Closed" 
                  value={casesByStage[9] || 0} 
                  className="bg-teal-50"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Reminders */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Reminders</CardTitle>
              <Button variant="outline" onClick={() => navigate('/reminders')}>View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingReminders.map(reminder => (
                  <ReminderItem 
                    key={reminder.id} 
                    reminder={reminder}
                    onComplete={completeReminder}
                  />
                ))}
                {upcomingReminders.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No upcoming reminders.</p>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" onClick={() => navigate('/new-lead')}>
                <FileText className="mr-2" size={16} />
                New Lead Intake
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/contacts/new')}>
                <Users className="mr-2" size={16} />
                Add Contact
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/reminders/new')}>
                <Bell className="mr-2" size={16} />
                Set Reminder
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/calendar')}>
                <Calendar className="mr-2" size={16} />
                View Calendar
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/reports')}>
                <ChartBar className="mr-2" size={16} />
                View Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
