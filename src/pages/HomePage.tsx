import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IssueCard } from "@/components/IssueCard";
import { Link } from "react-router-dom";
import { MapPin, Users, CheckCircle, Clock, Plus } from "lucide-react";
import heroImage from "@/assets/civic-hero.jpg";

// Mock data - will be replaced with real data from Supabase
const mockIssues = [
  {
    id: "1",
    title: "Broken Street Light on Main St",
    description: "The street light at the intersection of Main St and Oak Ave has been out for 3 days, creating a safety hazard for pedestrians.",
    category: "Street Lighting",
    status: "PENDING" as const,
    location: "Main St & Oak Ave",
    createdAt: "2024-01-15",
    reportedBy: "John Doe"
  },
  {
    id: "2", 
    title: "Pothole on First Avenue",
    description: "Large pothole causing vehicle damage near the school zone. Multiple cars have reported tire damage.",
    category: "Road Maintenance",
    status: "IN_PROGRESS" as const,
    location: "First Avenue, School Zone",
    createdAt: "2024-01-14",
    reportedBy: "Sarah Wilson"
  },
  {
    id: "3",
    title: "Overflowing Trash Bin",
    description: "Public trash bin in Central Park is overflowing and attracting pests.",
    category: "Waste Management", 
    status: "RESOLVED" as const,
    location: "Central Park",
    createdAt: "2024-01-12",
    reportedBy: "Mike Johnson"
  }
];

const stats = [
  { icon: MapPin, label: "Issues Reported", value: "1,247", color: "text-civic-blue" },
  { icon: Clock, label: "In Progress", value: "23", color: "text-civic-orange" },
  { icon: CheckCircle, label: "Resolved", value: "1,156", color: "text-civic-green" },
  { icon: Users, label: "Active Citizens", value: "892", color: "text-civic-blue" }
];

export default function HomePage() {
  const handleViewIssue = (issue: any) => {
    console.log("View issue:", issue);
    // Will navigate to issue detail page
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-secondary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Make Your City
                <span className="block text-transparent bg-gradient-to-r from-white to-white/80 bg-clip-text">
                  Better Together
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-white/90 max-w-lg">
                Report civic issues, track their progress, and help build a stronger community. 
                Your voice matters in creating positive change.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="hero" asChild>
                  <Link to="/report">
                    <Plus className="w-5 h-5 mr-2" />
                    Report an Issue
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Browse Issues
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Modern city illustration representing civic engagement"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-sm">
                <CardContent className="pt-6">
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Issues */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Recent Issues</h2>
              <p className="text-muted-foreground mt-2">
                See what your community is working on
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/issues">View All Issues</Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockIssues.map((issue) => (
              <IssueCard 
                key={issue.id} 
                issue={issue} 
                onView={handleViewIssue}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-accent to-accent/50">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-2xl mx-auto border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Make a Difference?</CardTitle>
              <CardDescription className="text-lg">
                Join thousands of citizens working together to improve our community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="civic" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}