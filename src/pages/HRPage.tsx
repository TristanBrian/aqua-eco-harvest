
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployeeManagement from "@/components/admin/EmployeeManagement";
import InvoiceManagement from "@/components/admin/InvoiceManagement";
import { Card, CardContent } from "@/components/ui/card";
import { Users, FileText, Calendar, Award } from "lucide-react";

const HRPage = () => {
  const [activeTab, setActiveTab] = useState("employees");
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">HR Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-700">Total Employees</p>
                <h3 className="text-2xl font-bold text-blue-900">24</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-700">Active Payroll</p>
                <h3 className="text-2xl font-bold text-green-900">22</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-yellow-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-yellow-700">On Leave</p>
                <h3 className="text-2xl font-bold text-yellow-900">2</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Award className="h-6 w-6 text-purple-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-purple-700">Performance</p>
                <h3 className="text-2xl font-bold text-purple-900">92%</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="employees" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="invoices">Invoices & Payroll</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="employees">
            <EmployeeManagement />
          </TabsContent>
          
          <TabsContent value="invoices">
            <InvoiceManagement />
          </TabsContent>
          
          <TabsContent value="attendance">
            <div className="p-10 text-center bg-slate-50 rounded-lg border border-slate-200">
              <h3 className="text-xl font-medium text-slate-600">Attendance Tracking</h3>
              <p className="text-slate-500 mt-2">Track employee attendance, shifts, and time off.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="performance">
            <div className="p-10 text-center bg-slate-50 rounded-lg border border-slate-200">
              <h3 className="text-xl font-medium text-slate-600">Performance Management</h3>
              <p className="text-slate-500 mt-2">Evaluate employee performance, set goals, and track progress.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default HRPage;
