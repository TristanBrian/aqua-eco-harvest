
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
  Eye 
} from "lucide-react";

// Mock invoice data
const invoices = [
  { id: "INV-2024-001", date: "Mar 15, 2024", client: "Nairobi Fisheries", amount: 125000, status: "Paid" },
  { id: "INV-2024-002", date: "Mar 20, 2024", client: "Mombasa Restaurants Ltd", amount: 87500, status: "Pending" },
  { id: "INV-2024-003", date: "Mar 25, 2024", client: "Lake Victoria Exports", amount: 240000, status: "Paid" },
  { id: "INV-2024-004", date: "Apr 02, 2024", client: "Nyeri Markets Association", amount: 67000, status: "Overdue" },
  { id: "INV-2024-005", date: "Apr 10, 2024", client: "Kisumu Fish Processors", amount: 183000, status: "Pending" },
  { id: "INV-2024-006", date: "Apr 15, 2024", client: "Nakuru Wholesale Foods", amount: 92500, status: "Paid" },
];

const InvoiceManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
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
        <Button>
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
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" /> Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Printer className="mr-2 h-4 w-4" /> Print
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
    </div>
  );
};

export default InvoiceManagement;
