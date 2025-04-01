
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Printer, Download, Share2, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, ArrowUpRight, ArrowDownRight, Users, DollarSign, ShoppingCart, Activity } from "lucide-react";

// Sample data for charts
const salesData = [
  { month: 'Jan', sales: 65000, expenses: 45000, profit: 20000 },
  { month: 'Feb', sales: 59000, expenses: 40000, profit: 19000 },
  { month: 'Mar', sales: 80000, expenses: 55000, profit: 25000 },
  { month: 'Apr', sales: 81000, expenses: 54000, profit: 27000 },
  { month: 'May', sales: 56000, expenses: 35000, profit: 21000 },
  { month: 'Jun', sales: 55000, expenses: 36000, profit: 19000 },
  { month: 'Jul', sales: 67000, expenses: 40000, profit: 27000 },
  { month: 'Aug', sales: 73000, expenses: 45000, profit: 28000 },
  { month: 'Sep', sales: 84000, expenses: 55000, profit: 29000 },
];

const customerData = [
  { name: 'Individual', value: 65 },
  { name: 'Business', value: 25 },
  { name: 'Government', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const revenueByProduct = [
  { name: 'Tilapia', value: 45 },
  { name: 'Catfish', value: 30 },
  { name: 'Fingerlings', value: 15 },
  { name: 'Other', value: 10 },
];

const visitorData = [
  { date: '01/09', visitors: 1200 },
  { date: '02/09', visitors: 1300 },
  { date: '03/09', visitors: 1400 },
  { date: '04/09', visitors: 1100 },
  { date: '05/09', visitors: 1500 },
  { date: '06/09', visitors: 1700 },
  { date: '07/09', visitors: 1600 },
  { date: '08/09', visitors: 1800 },
  { date: '09/09', visitors: 2000 },
  { date: '10/09', visitors: 2200 },
  { date: '11/09', visitors: 1900 },
  { date: '12/09', visitors: 2100 },
  { date: '13/09', visitors: 2300 },
  { date: '14/09', visitors: 2400 },
];

const AnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  const handlePrintReport = () => {
    toast({
      title: "Printing report...",
      description: "Your analytics report is being sent to the printer."
    });
    window.print();
  };

  const handleDownloadReport = () => {
    toast({
      title: "Downloading report...",
      description: "Your analytics report is being downloaded."
    });
  };

  const handleShareReport = () => {
    toast({
      title: "Share report",
      description: "Your analytics report link has been copied to clipboard."
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6 print:m-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Insights</h1>
          <div className="flex gap-2 print:hidden">
            <Button onClick={handlePrintReport} className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" onClick={handleDownloadReport} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" onClick={handleShareReport} className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-700">Revenue (MTD)</p>
                <div className="flex items-center">
                  <h3 className="text-2xl font-bold text-blue-900">KSh 840,000</h3>
                  <span className="flex items-center text-green-600 text-xs ml-2">
                    <ArrowUpRight className="h-3 w-3" />
                    12.5%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-700">New Customers</p>
                <div className="flex items-center">
                  <h3 className="text-2xl font-bold text-green-900">128</h3>
                  <span className="flex items-center text-green-600 text-xs ml-2">
                    <ArrowUpRight className="h-3 w-3" />
                    8.3%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <ShoppingCart className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-700">Orders</p>
                <div className="flex items-center">
                  <h3 className="text-2xl font-bold text-amber-900">356</h3>
                  <span className="flex items-center text-red-600 text-xs ml-2">
                    <ArrowDownRight className="h-3 w-3" />
                    2.1%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Activity className="h-6 w-6 text-purple-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-purple-700">Website Visits</p>
                <div className="flex items-center">
                  <h3 className="text-2xl font-bold text-purple-900">23,521</h3>
                  <span className="flex items-center text-green-600 text-xs ml-2">
                    <ArrowUpRight className="h-3 w-3" />
                    15.7%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 print:hidden">
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center gap-1">
              <LineChartIcon className="h-4 w-4" />
              Sales
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              Customers
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-1">
              <PieChartIcon className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="website" className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              Website
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">Revenue vs Expenses</CardTitle>
                  <Button variant="outline" size="sm" className="print:hidden">
                    <Download className="h-4 w-4 mr-2" /> Export
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`KSh ${value.toLocaleString()}`, undefined]}
                          labelFormatter={(label) => `Month: ${label}`}
                        />
                        <Legend />
                        <Bar dataKey="sales" name="Sales" fill="#8884d8" />
                        <Bar dataKey="expenses" name="Expenses" fill="#82ca9d" />
                        <Bar dataKey="profit" name="Profit" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">Customer Segments</CardTitle>
                  <Button variant="outline" size="sm" className="print:hidden">
                    <Download className="h-4 w-4 mr-2" /> Export
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={customerData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {customerData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, undefined]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="sales">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Sales Trends (Last 9 Months)</CardTitle>
                <Button variant="outline" size="sm" className="print:hidden">
                  <Download className="h-4 w-4 mr-2" /> Export Data
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`KSh ${value.toLocaleString()}`, undefined]} />
                      <Legend />
                      <Line type="monotone" dataKey="sales" name="Sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="profit" name="Profit" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="customers">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">Customer Demographics</CardTitle>
                  <Button variant="outline" size="sm" className="print:hidden">
                    <Download className="h-4 w-4 mr-2" /> Export
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={customerData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {customerData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, undefined]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Top Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Nairobi Fish Markets Ltd", revenue: 125000, orders: 15 },
                      { name: "Coastal Restaurants Group", revenue: 98000, orders: 12 },
                      { name: "Lake Region Fish Suppliers", revenue: 87000, orders: 10 },
                      { name: "KenFish Distributors", revenue: 76000, orders: 8 },
                      { name: "Mombasa Seafood Exports", revenue: 65000, orders: 7 }
                    ].map((customer, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-lg hover:bg-slate-50">
                        <div>
                          <h3 className="font-medium">{customer.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {customer.orders} orders
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">KSh {customer.revenue.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">
                            Avg: KSh {Math.round(customer.revenue / customer.orders).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="products">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">Revenue by Product</CardTitle>
                  <Button variant="outline" size="sm" className="print:hidden">
                    <Download className="h-4 w-4 mr-2" /> Export
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={revenueByProduct}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {revenueByProduct.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, undefined]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Top Selling Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Fresh Tilapia (500g-1kg)", sold: 2500, revenue: 375000 },
                      { name: "Catfish (1kg+)", sold: 1800, revenue: 306000 },
                      { name: "Tilapia Fingerlings", sold: 10000, revenue: 150000 },
                      { name: "Smoked Fish", sold: 950, revenue: 142500 },
                      { name: "Fish Feed (20kg)", sold: 450, revenue: 112500 }
                    ].map((product, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-lg hover:bg-slate-50">
                        <div>
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {product.sold.toLocaleString()} units sold
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">KSh {product.revenue.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">
                            Unit: KSh {Math.round(product.revenue / product.sold).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="website">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Website Visitors (Last 14 Days)</CardTitle>
                <Button variant="outline" size="sm" className="print:hidden">
                  <Download className="h-4 w-4 mr-2" /> Export Data
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={visitorData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="visitors" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { source: "Direct", visits: 9420, percentage: 40 },
                      { source: "Organic Search", visits: 7050, percentage: 30 },
                      { source: "Social Media", visits: 4700, percentage: 20 },
                      { source: "Referrals", visits: 1410, percentage: 6 },
                      { source: "Email", visits: 940, percentage: 4 }
                    ].map((source, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{source.source}</span>
                          <span className="text-sm text-muted-foreground">{source.visits.toLocaleString()} visits</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full" 
                            style={{ width: `${source.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Top Pages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { page: "Homepage", visits: 7850, avgTime: "2m 15s" },
                      { page: "Products", visits: 5320, avgTime: "3m 42s" },
                      { page: "Marketplace", visits: 4120, avgTime: "4m 10s" },
                      { page: "About Us", visits: 2340, avgTime: "1m 55s" },
                      { page: "Contact", visits: 1980, avgTime: "1m 30s" }
                    ].map((page, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-lg hover:bg-slate-50">
                        <div>
                          <h3 className="font-medium">{page.page}</h3>
                          <p className="text-sm text-muted-foreground">
                            {page.visits.toLocaleString()} visits
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Avg. time</p>
                          <p className="text-sm text-muted-foreground">{page.avgTime}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AnalyticsPage;
