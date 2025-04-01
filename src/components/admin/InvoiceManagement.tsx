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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MoreHorizontal, 
  Search, 
  Plus, 
  FileText, 
  Download, 
  Printer,
  Eye,
  Calendar as CalendarIcon,
  Trash2,
  Share2,
  Mail,
  Link as LinkIcon,
  Copy
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

const initialInvoices = [
  { id: "INV-2024-001", date: "Mar 15, 2024", client: "Nairobi Fisheries", amount: 125000, status: "Paid" },
  { id: "INV-2024-002", date: "Mar 20, 2024", client: "Mombasa Restaurants Ltd", amount: 87500, status: "Pending" },
  { id: "INV-2024-003", date: "Mar 25, 2024", client: "Lake Victoria Exports", amount: 240000, status: "Paid" },
  { id: "INV-2024-004", date: "Apr 02, 2024", client: "Nyeri Markets Association", amount: 67000, status: "Overdue" },
  { id: "INV-2024-005", date: "Apr 10, 2024", client: "Kisumu Fish Processors", amount: 183000, status: "Pending" },
  { id: "INV-2024-006", date: "Apr 15, 2024", client: "Nakuru Wholesale Foods", amount: 92500, status: "Paid" },
];

const clients = [
  "Nairobi Fisheries",
  "Mombasa Restaurants Ltd",
  "Lake Victoria Exports",
  "Nyeri Markets Association",
  "Kisumu Fish Processors",
  "Nakuru Wholesale Foods",
  "Eldoret Fish Suppliers",
  "Malindi Seafood Market",
];

const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<any>(null);
  const [shareMethod, setShareMethod] = useState<string>("email");
  const [shareEmail, setShareEmail] = useState<string>("");
  const [newInvoice, setNewInvoice] = useState({
    client: "",
    amount: "",
    description: "",
    status: "Pending",
    items: [{ description: "", quantity: 1, unitPrice: 0 }]
  });
  const [date, setDate] = useState<Date>(new Date());
  const { toast } = useToast();
  
  const filteredInvoices = invoices.filter(
    (invoice) => 
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', { 
      style: 'currency', 
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const addInvoiceItem = () => {
    setNewInvoice({
      ...newInvoice,
      items: [
        ...newInvoice.items,
        { description: "", quantity: 1, unitPrice: 0 }
      ]
    });
  };

  const removeInvoiceItem = (index: number) => {
    const updatedItems = [...newInvoice.items];
    updatedItems.splice(index, 1);
    setNewInvoice({
      ...newInvoice,
      items: updatedItems
    });
  };

  const updateInvoiceItem = (index: number, field: string, value: string | number) => {
    const updatedItems = [...newInvoice.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === "quantity" || field === "unitPrice" ? Number(value) : value
    };
    setNewInvoice({
      ...newInvoice,
      items: updatedItems
    });
  };

  const calculateTotal = () => {
    return newInvoice.items.reduce((total, item) => {
      return total + (item.quantity * item.unitPrice);
    }, 0);
  };

  const handleCreateInvoice = () => {
    const lastInvoiceNumber = parseInt(invoices[invoices.length - 1].id.split("-")[2]);
    const newInvoiceNumber = `INV-2024-${(lastInvoiceNumber + 1).toString().padStart(3, '0')}`;
    
    const invoiceTotal = calculateTotal();
    
    const invoice = {
      id: newInvoiceNumber,
      date: format(date, "MMM dd, yyyy"),
      client: newInvoice.client,
      amount: invoiceTotal,
      status: newInvoice.status
    };
    
    setInvoices([...invoices, invoice]);
    
    toast({
      title: "Invoice Created",
      description: `Invoice ${newInvoiceNumber} has been created successfully.`
    });
    
    setNewInvoice({
      client: "",
      amount: "",
      description: "",
      status: "Pending",
      items: [{ description: "", quantity: 1, unitPrice: 0 }]
    });
    setDate(new Date());
    setIsCreateInvoiceOpen(false);
  };

  const handleShareInvoice = (invoice: any) => {
    setCurrentInvoice(invoice);
    setIsShareDialogOpen(true);
  };

  const shareViaEmail = () => {
    if (!shareEmail) {
      toast({
        title: "Email Required",
        description: "Please enter a valid email address to share the invoice.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Invoice Shared",
      description: `Invoice ${currentInvoice.id} has been shared with ${shareEmail}`,
    });
    setIsShareDialogOpen(false);
    setShareEmail("");
  };

  const copyInvoiceLink = () => {
    const shareableLink = `${window.location.origin}/invoices/${currentInvoice.id}`;
    
    navigator.clipboard.writeText(shareableLink).then(() => {
      toast({
        title: "Link Copied",
        description: "Shareable invoice link has been copied to clipboard",
      });
    }).catch(err => {
      toast({
        title: "Copy Failed",
        description: "Failed to copy link to clipboard.",
        variant: "destructive",
      });
    });
    
    setIsShareDialogOpen(false);
  };

  const downloadInvoicePdf = (invoice: any) => {
    toast({
      title: "Download Started",
      description: `Invoice ${invoice.id} is being downloaded as PDF.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsCreateInvoiceOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Invoice
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-green-600">Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(invoices.filter(inv => inv.status === "Paid").reduce((acc, inv) => acc + inv.amount, 0))}</div>
            <p className="text-sm text-muted-foreground">{invoices.filter(inv => inv.status === "Paid").length} invoices</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-yellow-600">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(invoices.filter(inv => inv.status === "Pending").reduce((acc, inv) => acc + inv.amount, 0))}</div>
            <p className="text-sm text-muted-foreground">{invoices.filter(inv => inv.status === "Pending").length} invoices</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-red-600">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(invoices.filter(inv => inv.status === "Overdue").reduce((acc, inv) => acc + inv.amount, 0))}</div>
            <p className="text-sm text-muted-foreground">{invoices.filter(inv => inv.status === "Overdue").length} invoices</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${
                        invoice.status === "Paid" 
                          ? "bg-green-100 text-green-800" 
                          : invoice.status === "Pending" 
                          ? "bg-yellow-100 text-yellow-800" 
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => downloadInvoicePdf(invoice)}>
                          <Download className="mr-2 h-4 w-4" /> Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Printer className="mr-2 h-4 w-4" /> Print
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShareInvoice(invoice)}>
                          <Share2 className="mr-2 h-4 w-4" /> Share
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isCreateInvoiceOpen} onOpenChange={setIsCreateInvoiceOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Select 
                  value={newInvoice.client} 
                  onValueChange={(value) => setNewInvoice({...newInvoice, client: value})}
                >
                  <SelectTrigger id="client">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client} value={client}>{client}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoice-date">Invoice Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate: Date | undefined) => selectedDate && setDate(selectedDate)}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="invoice-status">Status</Label>
              <Select 
                value={newInvoice.status} 
                onValueChange={(value) => setNewInvoice({...newInvoice, status: value})}
              >
                <SelectTrigger id="invoice-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <Label>Invoice Items</Label>
                <Button type="button" size="sm" variant="outline" onClick={addInvoiceItem}>
                  <Plus className="h-4 w-4 mr-1" /> Add Item
                </Button>
              </div>
              
              <div className="space-y-4">
                {newInvoice.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-6">
                      <Label htmlFor={`item-desc-${index}`} className="text-xs">Description</Label>
                      <Input
                        id={`item-desc-${index}`}
                        value={item.description}
                        onChange={(e) => updateInvoiceItem(index, "description", e.target.value)}
                        placeholder="Item description"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor={`item-qty-${index}`} className="text-xs">Qty</Label>
                      <Input
                        id={`item-qty-${index}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateInvoiceItem(index, "quantity", e.target.value)}
                      />
                    </div>
                    <div className="col-span-3">
                      <Label htmlFor={`item-price-${index}`} className="text-xs">Unit Price (KES)</Label>
                      <Input
                        id={`item-price-${index}`}
                        type="number"
                        min="0"
                        value={item.unitPrice}
                        onChange={(e) => updateInvoiceItem(index, "unitPrice", e.target.value)}
                      />
                    </div>
                    <div className="col-span-1">
                      {index > 0 && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeInvoiceItem(index)}
                          className="h-9 w-9"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <div className="text-right">
                <p className="text-sm font-medium text-muted-foreground">Total:</p>
                <p className="text-lg font-bold">{formatCurrency(calculateTotal())}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="invoice-notes">Notes</Label>
              <Textarea
                id="invoice-notes"
                placeholder="Additional notes or payment instructions"
                rows={3}
                value={newInvoice.description}
                onChange={(e) => setNewInvoice({...newInvoice, description: e.target.value})}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsCreateInvoiceOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateInvoice}>Create Invoice</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Share Invoice {currentInvoice?.id}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Share Method</Label>
              <div className="flex space-x-2">
                <Button 
                  variant={shareMethod === "email" ? "default" : "outline"} 
                  onClick={() => setShareMethod("email")}
                  className="flex-1"
                >
                  <Mail className="mr-2 h-4 w-4" /> Email
                </Button>
                <Button 
                  variant={shareMethod === "link" ? "default" : "outline"} 
                  onClick={() => setShareMethod("link")}
                  className="flex-1"
                >
                  <LinkIcon className="mr-2 h-4 w-4" /> Link
                </Button>
              </div>
            </div>
            
            {shareMethod === "email" && (
              <div className="space-y-2">
                <Label htmlFor="share-email">Recipient Email</Label>
                <Input
                  id="share-email"
                  type="email"
                  placeholder="client@example.com"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  The invoice will be sent as a PDF attachment to this email address.
                </p>
              </div>
            )}
            
            {shareMethod === "link" && (
              <div className="space-y-2">
                <Label>Shareable Link</Label>
                <div className="flex items-center space-x-2">
                  <Input 
                    readOnly 
                    value={`${window.location.origin}/invoices/${currentInvoice?.id}`}
                  />
                  <Button variant="outline" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Anyone with this link can view the invoice details. The link is valid for 30 days.
                </p>
              </div>
            )}
            
            <div className="pt-4 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsShareDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={shareMethod === "email" ? shareViaEmail : copyInvoiceLink}
              >
                {shareMethod === "email" ? "Send Email" : "Copy Link"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoiceManagement;
