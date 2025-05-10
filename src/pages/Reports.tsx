
import React, { useState } from "react";
import { ChartBar, FileText, Download, Calendar, Clock, ArrowRight } from "lucide-react";
import { mockAnalyticsData } from "@/data/mockData";
import { useCRM } from "@/context/CRMContext";
import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Import recharts components
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Helper function for report dates
const getReportDateRange = (range: string): string => {
  const now = new Date();
  const endDate = now.toLocaleDateString();
  
  switch (range) {
    case "7d":
      const sevenDaysAgo = new Date(now);
      sevenDaysAgo.setDate(now.getDate() - 7);
      return `${sevenDaysAgo.toLocaleDateString()} - ${endDate}`;
    case "30d":
      const thirtyDaysAgo = new Date(now);
      thirtyDaysAgo.setDate(now.getDate() - 30);
      return `${thirtyDaysAgo.toLocaleDateString()} - ${endDate}`;
    case "90d":
      const ninetyDaysAgo = new Date(now);
      ninetyDaysAgo.setDate(now.getDate() - 90);
      return `${ninetyDaysAgo.toLocaleDateString()} - ${endDate}`;
    case "ytd":
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      return `${startOfYear.toLocaleDateString()} - ${endDate}`;
    default:
      return `${endDate}`;
  }
};

// Colors for charts
const COLORS = ['#3B82F6', '#8B5CF6', '#F59E0B', '#10B981', '#EF4444', '#6366F1', '#EC4899', '#14B8A6', '#F97316'];

const Reports: React.FC = () => {
  const { cases } = useCRM();
  const [timeRange, setTimeRange] = useState("30d");
  
  // Prepare data for stage distribution chart
  const stageDistributionData = Object.entries(mockAnalyticsData.casesByStage).map(([stage, count]) => ({
    name: `Stage ${stage}`,
    value: count
  }));
  
  // Prepare data for source distribution chart
  const sourceDistributionData = Object.entries(mockAnalyticsData.casesBySource).map(([source, count]) => ({
    name: source.replace('_', ' '),
    value: count
  }));
  
  // Prepare data for case duration chart (mock data)
  const caseDurationData = [
    { name: "Non-payment", duration: 42 },
    { name: "Lease Violation", duration: 56 },
    { name: "Unauthorized Occupant", duration: 47 },
    { name: "Property Damage", duration: 61 },
    { name: "Illegal Activity", duration: 38 },
  ];
  
  // Prepare data for monthly cases trend (mock data)
  const monthlyTrendData = [
    { name: "Jan", cases: 8 },
    { name: "Feb", cases: 12 },
    { name: "Mar", cases: 15 },
    { name: "Apr", cases: 10 },
    { name: "May", cases: 14 },
    { name: "Jun", cases: 18 },
    { name: "Jul", cases: 16 },
    { name: "Aug", cases: 21 },
    { name: "Sep", cases: 17 },
    { name: "Oct", cases: 19 },
    { name: "Nov", cases: 23 },
    { name: "Dec", cases: 18 },
  ];
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Reports & Analytics" 
        subtitle="View insights and performance metrics" 
        icon={<ChartBar size={24} />}
      />
      
      {/* Date Range Selector */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Report Period</h3>
              <p className="text-sm text-gray-500">
                {getReportDateRange(timeRange)}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Select
                defaultValue={timeRange}
                onValueChange={setTimeRange}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
                  <SelectItem value="ytd">Year to Date</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Cases</p>
                <p className="text-3xl font-bold mt-1">{mockAnalyticsData.totalCases}</p>
                <p className="text-xs text-green-600 mt-1">↑ 14% from previous period</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-3xl font-bold mt-1">{mockAnalyticsData.successRate}%</p>
                <p className="text-xs text-green-600 mt-1">↑ 2% from previous period</p>
              </div>
              <ChartBar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Case Duration</p>
                <p className="text-3xl font-bold mt-1">{mockAnalyticsData.avgCaseDuration} days</p>
                <p className="text-xs text-red-600 mt-1">↑ 3 days from previous period</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Cases</p>
                <p className="text-3xl font-bold mt-1">{
                  Object.entries(mockAnalyticsData.casesByStage)
                    .filter(([stage]) => parseInt(stage) < 9)
                    .reduce((sum, [_, count]) => sum + count, 0)
                }</p>
                <p className="text-xs text-green-600 mt-1">↑ 5 from previous period</p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Reports Tabs */}
      <Tabs defaultValue="cases">
        <TabsList className="mb-4">
          <TabsTrigger value="cases">Cases Analysis</TabsTrigger>
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          <TabsTrigger value="trends">Trends & Forecasts</TabsTrigger>
        </TabsList>
        
        {/* Cases Analysis Tab */}
        <TabsContent value="cases" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case Stage Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Case Stage Distribution</CardTitle>
                <CardDescription>
                  Breakdown of cases by current stage
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stageDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {stageDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full">
                  View Detailed Report
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            {/* Lead Source Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Lead Source Distribution</CardTitle>
                <CardDescription>
                  Where your eviction cases are coming from
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={sourceDistributionData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45} 
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Cases" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full">
                  View Detailed Report
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Case Duration by Reason */}
          <Card>
            <CardHeader>
              <CardTitle>Case Duration by Eviction Reason</CardTitle>
              <CardDescription>
                Average days to resolve cases by eviction reason
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={caseDurationData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="duration" name="Average Days" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" className="w-full">
                View Detailed Report
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Performance Metrics Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Case Volume Trend</CardTitle>
              <CardDescription>
                Number of new cases each month
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyTrendData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="cases" 
                      name="Cases" 
                      stroke="#3B82F6" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Success Rate by Case Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Non-payment</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Lease Violation</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Illegal Activity</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Property Damage</span>
                      <span className="text-sm font-medium">73%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '73%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Unauthorized Occupant</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Court Performance by County</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">County A</span>
                      <span className="text-sm font-medium">28 days avg</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">County B</span>
                      <span className="text-sm font-medium">42 days avg</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">County C</span>
                      <span className="text-sm font-medium">35 days avg</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">County D</span>
                      <span className="text-sm font-medium">52 days avg</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">County E</span>
                      <span className="text-sm font-medium">31 days avg</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Case Volume Forecast (Next 6 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: 'Jan', actual: 18, forecast: null },
                      { month: 'Feb', actual: 22, forecast: null },
                      { month: 'Mar', actual: 20, forecast: null },
                      { month: 'Apr', actual: 24, forecast: null },
                      { month: 'May', actual: 28, forecast: null },
                      { month: 'Jun', actual: 32, forecast: null },
                      { month: 'Jul', actual: null, forecast: 35 },
                      { month: 'Aug', actual: null, forecast: 38 },
                      { month: 'Sep', actual: null, forecast: 42 },
                      { month: 'Oct', actual: null, forecast: 40 },
                      { month: 'Nov', actual: null, forecast: 45 },
                      { month: 'Dec', actual: null, forecast: 48 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      name="Actual Cases" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="forecast" 
                      name="Forecast" 
                      stroke="#9333EA" 
                      strokeDasharray="5 5"
                      strokeWidth={2} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Seasonal Patterns</CardTitle>
                <CardDescription>
                  Historical case volume by month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Q1 (Jan-Mar)</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">58 cases</span>
                      <span className="text-xs text-green-600">↑ 4%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Q2 (Apr-Jun)</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">84 cases</span>
                      <span className="text-xs text-green-600">↑ 12%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Q3 (Jul-Sep)</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">76 cases</span>
                      <span className="text-xs text-red-600">↓ 3%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Q4 (Oct-Dec)</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">92 cases</span>
                      <span className="text-xs text-green-600">↑ 18%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Market Indicators</CardTitle>
                <CardDescription>
                  Factors affecting eviction case volume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Rent Prices</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">+8.4% YoY</span>
                      <span className="text-xs text-red-600">↑ High Risk</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Unemployment Rate</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">3.9%</span>
                      <span className="text-xs text-green-600">↓ Low Risk</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Housing Regulation</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Increasing</span>
                      <span className="text-xs text-yellow-600">→ Medium Risk</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Rental Vacancy Rate</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">4.2%</span>
                      <span className="text-xs text-green-600">↓ Low Risk</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
