
import { useState } from "react";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { 
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Initial services data
const initialServices = [
  {
    id: 1,
    name: "Fish Farm Setup Consultation",
    description: "Expert guidance on setting up efficient fish farming operations",
    price: 15000,
    duration: "2 weeks",
    status: "Active"
  },
  {
    id: 2,
    name: "Water Quality Testing",
    description: "Comprehensive testing of water parameters for optimal fish health",
    price: 5000,
    duration: "3 days",
    status: "Active"
  },
  {
    id: 3,
    name: "Aquaculture Training",
    description: "Hands-on training for staff and new fish farmers",
    price: 20000,
    duration: "1 month",
    status: "Active"
  },
  {
    id: 4,
    name: "Pond Maintenance",
    description: "Regular cleaning and maintenance of fish ponds and equipment",
    price: 8000,
    duration: "Bi-weekly",
    status: "Active"
  },
  {
    id: 5,
    name: "Disease Management",
    description: "Identification and treatment of fish diseases",
    price: 10000,
    duration: "As needed",
    status: "Inactive"
  }
];

const ServicesManagement = () => {
  const [services, setServices] = useState(initialServices);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<any>(null);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: 0,
    duration: "",
    status: "Active"
  });
  const { toast } = useToast();

  const handleAddService = () => {
    setServices([
      ...services,
      {
        id: services.length + 1,
        ...newService
      }
    ]);
    setNewService({
      name: "",
      description: "",
      price: 0,
      duration: "",
      status: "Active"
    });
    setIsAddDialogOpen(false);
    toast({
      title: "Service Added",
      description: "The new service has been added successfully.",
    });
  };

  const handleEditService = () => {
    if (!currentService) return;
    
    setServices(
      services.map((service) =>
        service.id === currentService.id ? currentService : service
      )
    );
    setIsEditDialogOpen(false);
    toast({
      title: "Service Updated",
      description: "The service has been updated successfully.",
    });
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter((service) => service.id !== id));
    toast({
      title: "Service Deleted",
      description: "The service has been deleted successfully.",
      variant: "destructive"
    });
  };

  const startEdit = (service: any) => {
    setCurrentService({ ...service });
    setIsEditDialogOpen(true);
  };

  const toggleServiceStatus = (id: number) => {
    setServices(
      services.map((service) =>
        service.id === id
          ? { ...service, status: service.status === "Active" ? "Inactive" : "Active" }
          : service
      )
    );
    toast({
      title: "Status Updated",
      description: "Service status has been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Services</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Service
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Services</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price (KSh)</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{service.description}</TableCell>
                  <TableCell>{service.price.toLocaleString()}</TableCell>
                  <TableCell>{service.duration}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        service.status === "Active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                      onClick={() => toggleServiceStatus(service.id)}
                    >
                      {service.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => startEdit(service)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Service Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Service Name</Label>
              <Input
                id="name"
                value={newService.name}
                onChange={(e) =>
                  setNewService({ ...newService, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newService.description}
                onChange={(e) =>
                  setNewService({ ...newService, description: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (KSh)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newService.price}
                  onChange={(e) =>
                    setNewService({ ...newService, price: Number(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={newService.duration}
                  onChange={(e) =>
                    setNewService({ ...newService, duration: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddService}>Add Service</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Service Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          {currentService && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Service Name</Label>
                <Input
                  id="edit-name"
                  value={currentService.name}
                  onChange={(e) =>
                    setCurrentService({
                      ...currentService,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={currentService.description}
                  onChange={(e) =>
                    setCurrentService({
                      ...currentService,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Price (KSh)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={currentService.price}
                    onChange={(e) =>
                      setCurrentService({
                        ...currentService,
                        price: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-duration">Duration</Label>
                  <Input
                    id="edit-duration"
                    value={currentService.duration}
                    onChange={(e) =>
                      setCurrentService({
                        ...currentService,
                        duration: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditService}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesManagement;
