import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Users, MapPin, BarChart3, CheckCircle, Clock, AlertTriangle } from "lucide-react";

// Mock data - will be replaced with real data from Supabase
const mockUsers = [
  { id: "1", name: "Rakesh Gupta", email: "rg688407@gmail.com", role: "CITIZEN", issuesReported: 5, joinedAt: "2024-01-10" },
  { id: "2", name: "Chetan Uniyal", email: "sarah@example.com", role: "CITIZEN", issuesReported: 12, joinedAt: "2024-01-08" },
  { id: "3", name: "Sameera Javed", email: "mike@city.gov", role: "STAFF", issuesReported: 3, joinedAt: "2024-01-05" }
];

const mockIssues = [
  {
    id: "1",
    title: "Broken Street Light on Main St",
    description: "The street light at the intersection has been out for 3 days",
    category: "Street Lighting",
    status: "PENDING",
    location: "Main St & Oak Ave",
    createdAt: "2024-01-15",
    reportedBy: "Rakesh Gupta",
    priority: "HIGH"
  },
  {
    id: "2",
    title: "Pothole on First Avenue", 
    description: "Large pothole causing vehicle damage near school zone",
    category: "Road Maintenance",
    status: "IN_PROGRESS",
    location: "First Avenue",
    createdAt: "2024-01-14", 
    reportedBy: "Chetan Uniyal",
    priority: "MEDIUM"
  }
];

const statusColors = {
  PENDING: "bg-civic-orange text-white",
  IN_PROGRESS: "bg-civic-blue text-white",
  RESOLVED: "bg-civic-green text-white", 
  REJECTED: "bg-civic-red text-white"
};

const priorityColors = {
  LOW: "bg-green-100 text-green-800",
  MEDIUM: "bg-yellow-100 text-yellow-800",
  HIGH: "bg-red-100 text-red-800"
};

export default function AdminPage() {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  const handleStatusChange = (issueId: string, newStatus: string) => {
    console.log("Changing status for issue", issueId, "to", newStatus);
    // Will update issue status in Supabase
  };

  const handleUserRoleChange = (userId: string, newRole: string) => {
    console.log("Changing role for user", userId, "to", newRole);
    // Will update user role in Supabase
  };

  const stats = [
    { icon: MapPin, label: "Total Issues", value: "1,247", trend: "+12%" },
    { icon: Clock, label: "Pending", value: "23", trend: "-5%" },
    { icon: CheckCircle, label: "Resolved This Month", value: "89", trend: "+18%" },
    { icon: Users, label: "Active Users", value: "892", trend: "+8%" }
  ];

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-civic-blue" />
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage civic issues and users</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-xs ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.trend} from last month
                    </p>
                  </div>
                  <stat.icon className="w-8 h-8 text-civic-blue" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="issues" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="issues">Issues Management</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Issues Management */}
          <TabsContent value="issues" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Issue Management</CardTitle>
                <CardDescription>
                  Review and update the status of reported issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockIssues.map((issue) => (
                    <div key={issue.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="font-semibold">{issue.title}</h3>
                          <p className="text-sm text-muted-foreground">{issue.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>📍 {issue.location}</span>
                            <span>👤 {issue.reportedBy}</span>
                            <span>📅 {new Date(issue.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge className={statusColors[issue.status as keyof typeof statusColors]}>
                            {issue.status.replace('_', ' ')}
                          </Badge>
                          <Badge className={priorityColors[issue.priority as keyof typeof priorityColors]}>
                            {issue.priority}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 pt-2 border-t">
                        <Select onValueChange={(value) => handleStatusChange(issue.id, value)}>
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Update Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                            <SelectItem value="RESOLVED">Resolved</SelectItem>
                            <SelectItem value="REJECTED">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Add Note
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage user accounts and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUsers.map((user) => (
                    <div key={user.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <p className="text-xs text-muted-foreground">
                            {user.issuesReported} issues reported • Joined {new Date(user.joinedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">{user.role}</Badge>
                          <Select onValueChange={(value) => handleUserRoleChange(user.id, value)}>
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Change Role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="CITIZEN">Citizen</SelectItem>
                              <SelectItem value="STAFF">Staff</SelectItem>
                              <SelectItem value="ADMIN">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Issue Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Road Maintenance</span>
                      <span className="text-sm font-medium">34%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Street Lighting</span>
                      <span className="text-sm font-medium">22%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Waste Management</span>
                      <span className="text-sm font-medium">18%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Public Safety</span>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Other</span>
                      <span className="text-sm font-medium">11%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Response Times
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Response</span>
                      <span className="text-sm font-medium">2.3 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">High Priority</span>
                      <span className="text-sm font-medium">4.2 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Medium Priority</span>
                      <span className="text-sm font-medium">1.8 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Low Priority</span>
                      <span className="text-sm font-medium">5.2 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}