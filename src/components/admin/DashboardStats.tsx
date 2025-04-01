
import { 
  Users, Fish, DollarSign, TrendingUp, 
  Activity, ShoppingBag, Clock, Calendar
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const statItems = [
  {
    title: "Total Employees",
    value: "32",
    icon: Users,
    change: "+2",
    trend: "up",
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Fish Production",
    value: "1,240 kg",
    icon: Fish,
    change: "+15%",
    trend: "up",
    color: "bg-green-100 text-green-600"
  },
  {
    title: "Monthly Revenue",
    value: "KSh 842,500",
    icon: DollarSign,
    change: "+7.2%",
    trend: "up",
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "Growth Rate",
    value: "24.8%",
    icon: TrendingUp,
    change: "+2.4%",
    trend: "up",
    color: "bg-amber-100 text-amber-600"
  },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{item.title}</p>
                <h3 className="text-2xl font-bold">{item.value}</h3>
                <div className="flex items-center mt-1">
                  <span className={cn(
                    "text-xs font-medium",
                    item.trend === "up" ? "text-green-600" : "text-red-600"
                  )}>
                    {item.change}
                  </span>
                  <span className="text-xs text-slate-500 ml-1">from last month</span>
                </div>
              </div>
              <div className={cn("rounded-full p-3", item.color)}>
                <item.icon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
