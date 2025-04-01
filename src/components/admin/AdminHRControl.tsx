
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Plus, Shield, UserCog, Users, X } from "lucide-react";

// Mock HR users data
const initialHRUsers = [
  { id: 1, name: "John Mwangi", email: "john@kamuthanga-farm.com", role: "HR Manager", status: "Active" },
  { id: 2, name: "Mary Wanjiku", email: "mary@kamuthanga-farm.com", role: "HR Assistant", status: "Active" },
  { id: 3, name: "Samuel Ochieng", email: "samuel@kamuthanga-farm.com", role: "HR Specialist", status: "Inactive" },
];

const AdminHRControl = () => {
  const [hrUsers, setHRUsers] = useState(initialHRUsers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "HR Assistant",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { toast } = useToast();

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (newUser.password !== newUser.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    const newId = hrUsers.length > 0 ? Math.max(...hrUsers.map(user => user.id)) + 1 : 1;
    
    setHRUsers([
      ...hrUsers,
      {
        id: newId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: "Active",
      }
    ]);

    toast({
      title: "HR User Added",
      description: `${newUser.name} has been added as ${newUser.role}.`,
    });

    setNewUser({
      name: "",
      email: "",
      role: "HR Assistant",
      password: "",
      confirmPassword: "",
    });
    
    setIsAddDialogOpen(false);
  };

  const handleToggleStatus = (id: number) => {
    setHRUsers(hrUsers.map(user => 
      user.id === id ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } : user
    ));

    const user = hrUsers.find(user => user.id === id);
    const newStatus = user?.status === "Active" ? "Inactive" : "Active";
    
    toast({
      title: "Status Updated",
      description: `${user?.name}'s status is now ${newStatus}.`,
    });
  };

  const startEdit = (user: any) => {
    setCurrentUser({
      ...user,
      password: "",
      confirmPassword: "",
    });
    setIsEditDialogOpen(true);
  };

  const handleEditUser = () => {
    if (!currentUser) return;

    // Only validate password if it's being changed
    if (currentUser.password && currentUser.password !== currentUser.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setHRUsers(
      hrUsers.map((user) =>
        user.id === currentUser.id ? {
          ...currentUser,
          // Don't include password in the state that's displayed
          password: undefined,
          confirmPassword: undefined
        } : user
      )
    );

    toast({
      title: "HR User Updated",
      description: `${currentUser.name}'s information has been updated.`,
    });

    setIsEditDialogOpen(false);
  };

  const handleDeleteUser = (id: number) => {
    const user = hrUsers.find(user => user.id === id);
    
    setHRUsers(hrUsers.filter(user => user.id !== id));
    
    toast({
      title: "HR User Removed",
      description: `${user?.name} has been removed from the system.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-amber-600" />
          <h2 className="text-xl font-semibold">Admin HR Control Panel</h2>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add HR User
        </Button>
      </div>

      <Tabs defaultValue="hr-users">
        <TabsList>
          <TabsTrigger value="hr-users">HR Users</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hr-users" className="space-y-4">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <UserCog className="h-5 w-5 text-slate-600" />
                HR Staff Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hrUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Badge
                          className={user.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-slate-100 text-slate-800 hover:bg-slate-100"}
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleStatus(user.id)}
                          >
                            {user.status === "Active" ? "Deactivate" : "Activate"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startEdit(user)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-lg">Administrative Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm">
                As an administrator, you have full control over HR user accounts. You can add new HR staff, edit their details, 
                and control their access. All actions are logged in the system for accountability.
              </p>
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
                <p className="text-amber-800 text-sm font-medium">Important Security Notice</p>
                <p className="text-amber-700 text-sm mt-1">
                  Regularly review HR account access and promptly deactivate accounts that are no longer needed. 
                  Ensure HR staff use strong, unique passwords.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>HR Permission Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">HR Manager</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center mr-2">
                            <div className="h-2.5 w-2.5 bg-green-500 rounded-full"></div>
                          </div>
                          <span>Full employee management</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center mr-2">
                            <div className="h-2.5 w-2.5 bg-green-500 rounded-full"></div>
                          </div>
                          <span>Payroll processing</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center mr-2">
                            <div className="h-2.5 w-2.5 bg-green-500 rounded-full"></div>
                          </div>
                          <span>Performance reviews</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center mr-2">
                            <div className="h-2.5 w-2.5 bg-green-500 rounded-full"></div>
                          </div>
                          <span>Recruitment control</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">HR Specialist</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center mr-2">
                            <div className="h-2.5 w-2.5 bg-green-500 rounded-full"></div>
                          </div>
                          <span>View employee profiles</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center mr-2">
                            <div className="h-2.5 w-2.5 bg-green-500 rounded-full"></div>
                          </div>
                          <span>Edit employee details</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center mr-2">
                            <div className="h-2.5 w-2.5 bg-green-500 rounded-full"></div>
                          </div>
                          <span>Process attendance</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 bg-amber-100 rounded-full flex items-center justify-center mr-2">
                            <div className="h-2.5 w-2.5 bg-amber-500 rounded-full"></div>
                          </div>
                          <span>Limited payroll access</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">HR Assistant</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center mr-2">
                            <div className="h-2.5 w-2.5 bg-green-500 rounded-full"></div>
                          </div>
                          <span>View employee profiles</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center mr-2">
                            <div className="h-2.5 w-2.5 bg-green-500 rounded-full"></div>
                          </div>
                          <span>Record attendance</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 bg-red-100 rounded-full flex items-center justify-center mr-2">
                            <div className="h-2.5 w-2.5 bg-red-500 rounded-full"></div>
                          </div>
                          <span>No payroll access</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 bg-red-100 rounded-full flex items-center justify-center mr-2">
                            <div className="h-2.5 w-2.5 bg-red-500 rounded-full"></div>
                          </div>
                          <span>No employee creation</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <Button variant="outline" className="mt-4">
                  Customize Role Permissions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: 1, datetime: "2023-09-25 14:32", user: "Admin User", action: "Created Account", details: "Created HR account for Mary Wanjiku" },
                    { id: 2, datetime: "2023-09-25 10:15", user: "John Mwangi", action: "Login", details: "Successful login from 196.21.XX.XX" },
                    { id: 3, datetime: "2023-09-24 16:45", user: "Admin User", action: "Permission Change", details: "Updated permissions for Samuel Ochieng" },
                    { id: 4, datetime: "2023-09-24 11:30", user: "Mary Wanjiku", action: "Employee Update", details: "Updated contact information for James Kariuki" },
                    { id: 5, datetime: "2023-09-23 15:20", user: "Admin User", action: "Status Change", details: "Deactivated account for Samuel Ochieng" },
                  ].map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-sm font-mono">{log.datetime}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal">
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{log.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button variant="outline" className="mt-4 w-full">
                View Full Activity Log
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add HR User Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New HR User</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="Enter full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="email@kamuthanga-farm.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select 
                value={newUser.role} 
                onValueChange={(value) => setNewUser({ ...newUser, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HR Manager">HR Manager</SelectItem>
                  <SelectItem value="HR Specialist">HR Specialist</SelectItem>
                  <SelectItem value="HR Assistant">HR Assistant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  placeholder="Create a strong password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={newUser.confirmPassword}
                onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                placeholder="Confirm password"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddUser}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit HR User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit HR User</DialogTitle>
          </DialogHeader>
          {currentUser && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={currentUser.name}
                  onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select 
                  value={currentUser.role} 
                  onValueChange={(value) => setCurrentUser({ ...currentUser, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HR Manager">HR Manager</SelectItem>
                    <SelectItem value="HR Specialist">HR Specialist</SelectItem>
                    <SelectItem value="HR Assistant">HR Assistant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="reset-password">Reset Password (Optional)</Label>
                <div className="relative">
                  <Input
                    id="reset-password"
                    type={showPassword ? "text" : "password"}
                    value={currentUser.password || ""}
                    onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
                    placeholder="Leave blank to keep current password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              {currentUser.password && (
                <div className="space-y-2">
                  <Label htmlFor="edit-confirm-password">Confirm New Password</Label>
                  <Input
                    id="edit-confirm-password"
                    type="password"
                    value={currentUser.confirmPassword || ""}
                    onChange={(e) => setCurrentUser({ ...currentUser, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                  />
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminHRControl;
