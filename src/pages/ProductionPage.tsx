import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';
import { Fish, Droplets, Thermometer, RotateCw } from "lucide-react";

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

const waterQualityData = [
  { day: 'Mon', ph: 7.2, oxygen: 6.5, temperature: 25 },
  { day: 'Tue', ph: 7.1, oxygen: 6.3, temperature: 25.5 },
  { day: 'Wed', ph: 7.3, oxygen: 6.6, temperature: 26 },
  { day: 'Thu', ph: 7.4, oxygen: 6.8, temperature: 25.8 },
  { day: 'Fri', ph: 7.2, oxygen: 6.7, temperature: 25.2 },
  { day: 'Sat', ph: 7.0, oxygen: 6.5, temperature: 25 },
  { day: 'Sun', ph: 7.2, oxygen: 6.6, temperature: 25.5 },
];

const pools = [
  { id: 1, name: 'Tilapia Pool A', capacity: 1000, current: 850, status: 'Healthy' },
  { id: 2, name: 'Tilapia Pool B', capacity: 1000, current: 920, status: 'Healthy' },
  { id: 3, name: 'Catfish Pool A', capacity: 800, current: 640, status: 'Attention' },
  { id: 4, name: 'Catfish Pool B', capacity: 800, current: 760, status: 'Healthy' },
  { id: 5, name: 'Breeding Pool', capacity: 500, current: 480, status: 'Healthy' },
  { id: 6, name: 'Fingerling Pool', capacity: 2000, current: 1850, status: 'Healthy' },
];

const ProductionPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Production Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Fish className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-700">Total Fish</p>
                <h3 className="text-2xl font-bold text-blue-900">5,500</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-cyan-50 border-cyan-200">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="bg-cyan-100 p-3 rounded-full">
                <Droplets className="h-6 w-6 text-cyan-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-cyan-700">Water Quality</p>
                <h3 className="text-2xl font-bold text-cyan-900">Good</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Thermometer className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-700">Avg. Temp</p>
                <h3 className="text-2xl font-bold text-amber-900">25.5°C</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="bg-emerald-100 p-3 rounded-full">
                <RotateCw className="h-6 w-6 text-emerald-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-emerald-700">Harvest Cycle</p>
                <h3 className="text-2xl font-bold text-emerald-900">83%</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pools">Pools</TabsTrigger>
            <TabsTrigger value="water">Water Quality</TabsTrigger>
            <TabsTrigger value="feeding">Feeding</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Production Output (kg)</CardTitle>
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
          </TabsContent>
          
          <TabsContent value="pools">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pools.map((pool) => (
                <Card key={pool.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{pool.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Capacity: {pool.current} / {pool.capacity}</span>
                          <span className={`text-xs font-medium ${
                            pool.status === 'Healthy' ? 'text-green-600' : 'text-amber-600'
                          }`}>{pool.status}</span>
                        </div>
                        <Progress value={(pool.current / pool.capacity) * 100} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Avg. Size</p>
                          <p className="font-medium">250g</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Feed Rate</p>
                          <p className="font-medium">3.2%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Feeding</p>
                          <p className="font-medium">2h ago</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Water Change</p>
                          <p className="font-medium">Yesterday</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="water">
            <Card>
              <CardHeader>
                <CardTitle>Water Quality Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={waterQualityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="ph" name="pH Level" stroke="#8884d8" />
                      <Line type="monotone" dataKey="oxygen" name="Dissolved Oxygen (mg/L)" stroke="#0ea5e9" />
                      <Line type="monotone" dataKey="temperature" name="Temperature (°C)" stroke="#ff7300" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="feeding">
            <div className="p-10 text-center bg-slate-50 rounded-lg border border-slate-200">
              <h3 className="text-xl font-medium text-slate-600">Feeding Schedule & Management</h3>
              <p className="text-slate-500 mt-2">Create and manage feeding schedules, track feed consumption, and monitor growth rates.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ProductionPage;
