import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, User, Eye } from "lucide-react";

interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';
  location: string;
  createdAt: string;
  reportedBy: string;
  imageUrl?: string;
}

interface IssueCardProps {
  issue: Issue;
  onView?: (issue: Issue) => void;
}

const statusColors = {
  PENDING: "bg-civic-orange text-white",
  IN_PROGRESS: "bg-civic-blue text-white", 
  RESOLVED: "bg-civic-green text-white",
  REJECTED: "bg-civic-red text-white"
};

const categoryColors = {
  'Road Maintenance': "bg-amber-100 text-amber-800",
  'Street Lighting': "bg-yellow-100 text-yellow-800",
  'Waste Management': "bg-green-100 text-green-800",
  'Public Safety': "bg-red-100 text-red-800",
  'Parks & Recreation': "bg-emerald-100 text-emerald-800",
  'Traffic & Transportation': "bg-blue-100 text-blue-800",
  'Other': "bg-gray-100 text-gray-800"
};

export function IssueCard({ issue, onView }: IssueCardProps) {
  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg leading-tight">{issue.title}</h3>
          <Badge 
            className={statusColors[issue.status]}
          >
            {issue.status.replace('_', ' ')}
          </Badge>
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{issue.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-3">
        {issue.imageUrl && (
          <div className="mb-3">
            <img 
              src={issue.imageUrl} 
              alt={issue.title}
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        )}
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {issue.description}
        </p>
        
        <div className="flex items-center justify-between">
          <Badge 
            variant="secondary"
            className={categoryColors[issue.category as keyof typeof categoryColors] || categoryColors.Other}
          >
            {issue.category}
          </Badge>
          
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <User className="w-3 h-3" />
            <span>{issue.reportedBy}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => onView?.(issue)}
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}