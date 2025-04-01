
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    activity: "Production target achieved",
    timestamp: "Today, 9:45 AM",
    type: "production",
    status: "success"
  },
  {
    id: 2,
    activity: "New employee onboarded",
    timestamp: "Today, 11:30 AM",
    type: "hr",
    status: "success"
  },
  {
    id: 3,
    activity: "Monthly report generated",
    timestamp: "Yesterday, 4:23 PM",
    type: "admin",
    status: "success"
  },
  {
    id: 4,
    activity: "Water quality alert",
    timestamp: "Yesterday, 2:15 PM",
    type: "production",
    status: "warning"
  },
  {
    id: 5,
    activity: "New customer inquiry",
    timestamp: "Sep 20, 10:12 AM",
    type: "sales",
    status: "info"
  },
];

const ActivityList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div 
                className={cn(
                  "w-2 h-2 rounded-full mt-2 mr-3",
                  activity.status === "success" && "bg-green-500",
                  activity.status === "warning" && "bg-amber-500",
                  activity.status === "info" && "bg-blue-500",
                  activity.status === "error" && "bg-red-500",
                )}
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{activity.activity}</p>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      activity.type === "production" && "border-green-200 text-green-700 bg-green-50",
                      activity.type === "hr" && "border-blue-200 text-blue-700 bg-blue-50",
                      activity.type === "admin" && "border-purple-200 text-purple-700 bg-purple-50",
                      activity.type === "sales" && "border-amber-200 text-amber-700 bg-amber-50",
                    )}
                  >
                    {activity.type}
                  </Badge>
                </div>
                <p className="text-sm text-slate-500">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityList;
