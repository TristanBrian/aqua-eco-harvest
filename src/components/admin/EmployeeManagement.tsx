
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Search, Plus, FileText, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock employee data
const employees = [
  { id: 1, name: "John Doe", position: "Fish Farm Manager", department: "Production", status: "Active", joined: "Jan 2022" },
  { id: 2, name: "Jane Smith", position: "HR Specialist", department: "Human Resources", status: "Active", joined: "Mar 2022" },
  { id: 3, name: "Robert Johnson", position: "Marketing Coordinator", department: "Marketing", status: "Active", joined: "Jun 2022" },
  { id: 4, name: "Emily Brown", position: "Accountant", department: "Finance", status: "On Leave", joined: "Feb 2023" },
  { id: 5, name: "Michael Wilson", position: "Sales Representative", department: "Sales", status: "Active", joined: "Apr 2022" },
  { id: 6, name: "Sarah Davis", position: "Quality Control", department: "Production", status: "Active", joined: "Aug 2022" },
  { id: 7, name: "David Miller", position: "Logistics Coordinator", department: "Operations", status: "Inactive", joined: "Oct 2022" },
  { id: 8, name: "Lisa Anderson", position: "Customer Service", department: "Sales", status: "Active", joined: "Dec 2022" }
];

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredEmployees = employees.filter(
    (employee) => 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Employee
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Employee Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${
                        employee.status === "Active" 
                          ? "bg-green-100 text-green-800" 
                          : employee.status === "On Leave" 
                          ? "bg-yellow-100 text-yellow-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </TableCell>
                  <TableCell>{employee.joined}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Payroll</DropdownMenuItem>
                        <DropdownMenuItem>Schedule</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeManagement;
