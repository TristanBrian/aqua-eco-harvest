
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for employees
const initialEmployees = [
  {
    id: 1,
    name: "John Kamau",
    position: "Farm Manager",
    department: "Management",
    status: "Active",
    joinDate: "01/04/2021",
  },
  {
    id: 2,
    name: "Mary Wanjiku",
    position: "HR Officer",
    department: "Human Resources",
    status: "Active",
    joinDate: "15/07/2021",
  },
  {
    id: 3,
    name: "James Omondi",
    position: "Fish Technician",
    department: "Production",
    status: "Active",
    joinDate: "03/10/2021",
  },
  {
    id: 4,
    name: "Alice Muthoni",
    position: "Sales Representative",
    department: "Sales",
    status: "Active",
    joinDate: "22/01/2022",
  },
  {
    id: 5,
    name: "David Mwangi",
    position: "Quality Control",
    department: "Production",
    status: "On Leave",
    joinDate: "10/05/2022",
  },
  {
    id: 6,
    name: "Sarah Achieng",
    position: "Accountant",
    department: "Finance",
    status: "Active",
    joinDate: "14/08/2022",
  },
];

const HRManagement = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<any>(null);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    position: "",
    department: "",
    status: "Active",
    joinDate: new Date().toLocaleDateString("en-GB"),
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = () => {
    setEmployees([
      ...employees,
      {
        id: employees.length + 1,
        ...newEmployee,
      },
    ]);
    setNewEmployee({
      name: "",
      position: "",
      department: "",
      status: "Active",
      joinDate: new Date().toLocaleDateString("en-GB"),
    });
    setIsAddDialogOpen(false);
  };

  const handleEditEmployee = () => {
    if (!currentEmployee) return;
    
    setEmployees(
      employees.map((emp) =>
        emp.id === currentEmployee.id ? currentEmployee : emp
      )
    );
    setIsEditDialogOpen(false);
  };

  const startEdit = (employee: any) => {
    setCurrentEmployee({ ...employee });
    setIsEditDialogOpen(true);
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 w-full md:w-80"
          />
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Employee
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        employee.status === "Active" && "bg-green-100 text-green-800 hover:bg-green-100",
                        employee.status === "On Leave" && "bg-amber-100 text-amber-800 hover:bg-amber-100",
                        employee.status === "Inactive" && "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      )}
                    >
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{employee.joinDate}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => startEdit(employee)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteEmployee(employee.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No employees found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Employee Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={newEmployee.name}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, name: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={newEmployee.position}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, position: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={newEmployee.department}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      department: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={newEmployee.status}
                onValueChange={(value) =>
                  setNewEmployee({ ...newEmployee, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleAddEmployee}>Add Employee</Button>
        </DialogContent>
      </Dialog>

      {/* Edit Employee Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
          </DialogHeader>
          {currentEmployee && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={currentEmployee.name}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-position">Position</Label>
                  <Input
                    id="edit-position"
                    value={currentEmployee.position}
                    onChange={(e) =>
                      setCurrentEmployee({
                        ...currentEmployee,
                        position: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-department">Department</Label>
                  <Input
                    id="edit-department"
                    value={currentEmployee.department}
                    onChange={(e) =>
                      setCurrentEmployee({
                        ...currentEmployee,
                        department: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={currentEmployee.status}
                  onValueChange={(value) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      status: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <Button onClick={handleEditEmployee}>Save Changes</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HRManagement;
