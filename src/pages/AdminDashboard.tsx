
import AdminLayout from "@/components/admin/AdminLayout";
import DashboardStats from "@/components/admin/DashboardStats";
import ActivityList from "@/components/admin/ActivityList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

// Mock data for charts
const productionData = [
  { month: 'Jan', tilapia: 420, catfish: 320 },
  { month: 'Feb', tilapia: 460, catfish: 340 },
  { month: 'Mar', tilapia: 510, catfish: 360 },
  { month: 'Apr', tilapia: 480, catfish: 350 },
  { month: 'May', tilapia: 520, catfish: 380 },
  { month: 'Jun', tilapia: 540, catfish: 390 },
  { month: 'Jul', tilapia: 580, catfish: 410 },
  { month: 'Aug', tilapia: 600, catfish: 430 },
  { month: 'Sep', tilapia: 650, catfish: 450 },
];

const revenueData = [
  { month: 'Jan', revenue: 720000 },
  { month: 'Feb', revenue: 680000 },
  { month: 'Mar', revenue: 740000 },
  { month: 'Apr', revenue: 780000 },
  { month: 'May', revenue: 810000 },
  { month: 'Jun', revenue: 790000 },
  { month: 'Jul', revenue: 830000 },
  { month: 'Aug', revenue: 860000 },
  { month: 'Sep', revenue: 900000 },
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Fish Production (kg)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="tilapia" name="Tilapia" fill="#0ea5e9" />
                    <Bar dataKey="catfish" name="Catfish" fill="#14b8a6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue (KSh)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`KSh ${value.toLocaleString()}`, 'Revenue']} />
                    <Area type="monotone" dataKey="revenue" stroke="#0369a1" fill="#bae6fd" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActivityList />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-medium text-amber-800">Water Quality Check</h3>
                  <p className="text-sm text-amber-700">Today, 2:00 PM</p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-medium text-blue-800">Employee Payroll</h3>
                  <p className="text-sm text-blue-700">Tomorrow, 10:00 AM</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-medium text-green-800">Fish Harvesting</h3>
                  <p className="text-sm text-green-700">Sep 25, 9:00 AM</p>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h3 className="font-medium text-purple-800">Supplier Meeting</h3>
                  <p className="text-sm text-purple-700">Sep 26, 1:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
