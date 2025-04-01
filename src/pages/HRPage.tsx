import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployeeManagement from "@/components/admin/EmployeeManagement";
import InvoiceManagement from "@/components/admin/InvoiceManagement";
import TaskManagement from "@/components/admin/TaskManagement";
import AdminSettings from "@/components/admin/AdminSettings";
import ServicesManagement from "@/components/admin/ServicesManagement";
import { Card, CardContent } from "@/components/ui/card";
import { Users, FileText, Calendar, Award, Printer, Share2, Shield, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AdminHRControl from "@/components/admin/AdminHRControl";
import { useAuth } from "@/contexts/AuthContext";
import AddProductForm from "@/components/admin/AddProductForm";

const HRPage = () => {
  const [activeTab, setActiveTab] = useState("employees");
  const { toast } = useToast();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  
  const handlePrintReport = () => {
    toast({
      title: "Printing report...",
      description: "Your report is being sent to the printer."
    });
    window.print();
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-gray-900">HR Management</h1>
            {isAdmin && (
              <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full border border-amber-200">
                Admin Access
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handlePrintReport} className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Print Report
            </Button>
            {activeTab === "invoices" && (
              <Button variant="outline" onClick={() => document.getElementById('create-invoice-btn')?.click()} className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share Invoices
              </Button>
            )}
            {isAdmin && (
              <Button variant="outline" className="flex items-center gap-2" onClick={() => setActiveTab("admin-controls")}>
                <Shield className="h-4 w-4" />
                Admin Controls
              </Button>
            )}
          </div>
        </div>
        
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
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="invoices">Invoices & Payroll</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            {isAdmin && <TabsTrigger value="admin-controls">Admin Controls</TabsTrigger>}
            {isAdmin && <TabsTrigger value="add-product">Add Products</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="employees">
            <EmployeeManagement />
          </TabsContent>
          
          <TabsContent value="services">
            <ServicesManagement />
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
          
          <TabsContent value="tasks">
            <TaskManagement />
          </TabsContent>
          
          <TabsContent value="performance">
            <div className="p-10 text-center bg-slate-50 rounded-lg border border-slate-200">
              <h3 className="text-xl font-medium text-slate-600">Performance Management</h3>
              <p className="text-slate-500 mt-2">Evaluate employee performance, set goals, and track progress.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="inquiries">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Customer Inquiries</h2>
                <Button onClick={() => window.print()} className="flex items-center gap-2">
                  <Printer className="h-4 w-4" />
                  Print Inquiries
                </Button>
              </div>
              <Card>
                <div className="p-6 space-y-4">
                  {[
                    {id: 1, name: "James Mwangi", email: "james@example.com", subject: "Fish Quality", date: "2023-09-20", status: "Pending"},
                    {id: 2, name: "Sarah Kamau", email: "sarah@example.com", subject: "Bulk Order", date: "2023-09-18", status: "Resolved"},
                    {id: 3, name: "Michael Omondi", email: "michael@example.com", subject: "Delivery Schedule", date: "2023-09-15", status: "In Progress"}
                  ].map(inquiry => (
                    <div key={inquiry.id} className="border rounded-md p-4 hover:bg-slate-50">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{inquiry.subject}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          inquiry.status === "Pending" ? "bg-amber-100 text-amber-700" :
                          inquiry.status === "Resolved" ? "bg-green-100 text-green-700" :
                          "bg-blue-100 text-blue-700"
                        }`}>
                          {inquiry.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">From: {inquiry.name} ({inquiry.email})</p>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-gray-500">{inquiry.date}</span>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">Respond</Button>
                          <Button variant="outline" size="sm">Mark Resolved</Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <AdminSettings />
          </TabsContent>
          
          {isAdmin && (
            <TabsContent value="admin-controls">
              <AdminHRControl />
            </TabsContent>
          )}
          
          {isAdmin && (
            <TabsContent value="add-product">
              <AddProductForm />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default HRPage;
