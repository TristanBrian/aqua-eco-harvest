
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Package, CreditCard, Truck, Minus, Plus, Trash2, Info, Phone, ArrowRight, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface CartItem {
  id: number;
  name: string;
  category: string;
  image: string;
  price: string;
  quantity: number;
}

const MarketplacePage = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 1,
      name: "Fresh Tilapia",
      category: "tilapia",
      image: "https://images.unsplash.com/photo-1600803907087-f56d462fd26b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      price: "KSh 850",
      quantity: 2
    },
    {
      id: 2,
      name: "Tilapia Fillets",
      category: "tilapia",
      image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      price: "KSh 1,200",
      quantity: 1
    }
  ]);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [showMpesaDialog, setShowMpesaDialog] = useState(false);
  const [mpesaCode, setMpesaCode] = useState("");
  const [orderComplete, setOrderComplete] = useState(false);

  const updateQuantity = (id: number, change: number) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeItem = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "The item has been removed from your cart.",
      duration: 3000,
    });
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
  };

  const validateMpesaNumber = (number: string) => {
    // Simple validation for Kenyan phone numbers
    const kenyanRegex = /^(?:254|\+254|0)?(7[0-9]{8})$/;
    return kenyanRegex.test(number);
  };

  const processMpesaPayment = () => {
    if (!validateMpesaNumber(mpesaNumber)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid Kenyan phone number.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setShowMpesaDialog(true);
  };

  const verifyMpesaPayment = () => {
    if (!mpesaCode || mpesaCode.length < 5) {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid M-Pesa transaction code.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    // In a real app, you would verify this code with your backend
    setShowMpesaDialog(false);
    setOrderComplete(true);
    
    // Send notification to HR
    notifyHR();
  };

  const notifyHR = () => {
    // In a real app, this would make an API call to your backend
    // to notify HR about the new order
    
    console.log("HR notification sent for order");
    
    // Show success toast
    toast({
      title: "HR Notified",
      description: "Order has been sent to HR for processing.",
      duration: 5000,
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Please add items before checking out.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (paymentMethod === "mpesa") {
      if (!mpesaNumber) {
        toast({
          title: "M-Pesa Number Required",
          description: "Please enter your M-Pesa phone number to proceed.",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }
      processMpesaPayment();
    } else {
      // Handle other payment methods
      setOrderComplete(true);
      notifyHR();
    }
  };

  const resetOrder = () => {
    // Reset all states for a new order
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      notes: ""
    });
    setCart([]);
    setMpesaNumber("");
    setMpesaCode("");
    setOrderComplete(false);
    setPaymentMethod("mpesa");
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 10000 ? 0 : 500;
  const total = subtotal + shipping;

  // If order is complete, show success screen
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-aqua-50">
        <Navbar />
        
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-white shadow-md rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-4 text-green-600">Order Successful!</h1>
              <p className="mb-6 text-gray-600">
                Your order has been placed successfully. The HR department has been notified and will process your order shortly.
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Order Total:</span>
                    <span className="font-bold">KSh {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span>{paymentMethod === "mpesa" ? "M-Pesa" : "Cash On Delivery"}</span>
                  </div>
                  {paymentMethod === "mpesa" && mpesaCode && (
                    <div className="flex justify-between">
                      <span>Transaction Code:</span>
                      <span className="font-bold">{mpesaCode}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <Button className="w-full" onClick={resetOrder}>
                  Place Another Order
                </Button>
                <Button variant="outline" asChild>
                  <a href="/products">Browse More Products</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-aqua-50">
      <Navbar />
      
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-aqua-950">Marketplace</h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-slate-700">
              Order our premium fish products directly from our farm to your table
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="cart" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="cart">Shopping Cart</TabsTrigger>
                  <TabsTrigger value="checkout">Checkout</TabsTrigger>
                </TabsList>
                
                <TabsContent value="cart" className="border rounded-lg p-6 bg-white shadow-sm">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center">
                    <ShoppingCart className="mr-2 h-6 w-6 text-primary" />
                    Your Cart
                  </h2>
                  
                  {cart.length === 0 ? (
                    <div className="text-center py-10">
                      <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-slate-600">Your cart is empty</h3>
                      <p className="text-slate-500 mt-2 mb-6">Add some products from our catalog</p>
                      <Button asChild>
                        <a href="/products">Browse Products</a>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center p-4 border rounded-lg">
                          <div className="h-20 w-20 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-4 flex-grow">
                            <h3 className="font-medium">{item.name}</h3>
                            <Badge variant="secondary" className="mt-1">
                              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                            </Badge>
                            <div className="text-primary font-bold mt-1">{item.price} per kg</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              size="icon" 
                              variant="outline" 
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              size="icon" 
                              variant="outline" 
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-8 w-8 ml-2 text-red-500"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <div className="pt-4 border-t mt-6">
                        <div className="flex justify-between font-medium">
                          <span>Subtotal</span>
                          <span>KSh {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                          <span>Shipping</span>
                          <span>{shipping > 0 ? `KSh ${shipping.toLocaleString()}` : 'Free'}</span>
                        </div>
                        <div className="flex justify-between mt-4 text-lg font-bold">
                          <span>Total</span>
                          <span>KSh {total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="checkout" className="border rounded-lg p-6 bg-white shadow-sm">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center">
                    <CreditCard className="mr-2 h-6 w-6 text-primary" />
                    Checkout
                  </h2>
                  
                  <div className="grid gap-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input 
                          id="firstName" 
                          name="firstName" 
                          value={formData.firstName} 
                          onChange={handleInputChange} 
                          placeholder="John" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input 
                          id="lastName" 
                          name="lastName" 
                          value={formData.lastName} 
                          onChange={handleInputChange} 
                          placeholder="Doe" 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email} 
                          onChange={handleInputChange} 
                          placeholder="john@example.com" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone *</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleInputChange} 
                          placeholder="+254 722 XXX XXX" 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Input 
                        id="address" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleInputChange} 
                        placeholder="123 Main St, Apartment 4B" 
                        required 
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City/Town *</Label>
                        <Input 
                          id="city" 
                          name="city" 
                          value={formData.city} 
                          onChange={handleInputChange} 
                          placeholder="Nairobi" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input 
                          id="postalCode" 
                          name="postalCode" 
                          value={formData.postalCode} 
                          onChange={handleInputChange} 
                          placeholder="00100" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="notes">Order Notes (Optional)</Label>
                      <Input 
                        id="notes" 
                        name="notes" 
                        value={formData.notes} 
                        onChange={handleInputChange} 
                        placeholder="Special instructions for delivery" 
                      />
                    </div>
                    
                    <div className="border-t pt-4 mt-2">
                      <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                      <RadioGroup 
                        value={paymentMethod} 
                        onValueChange={handlePaymentMethodChange}
                        className="space-y-4"
                      >
                        <div className="flex items-center space-x-2 border p-4 rounded-md">
                          <RadioGroupItem value="mpesa" id="mpesa" />
                          <Label htmlFor="mpesa" className="flex items-center">
                            <Phone className="h-5 w-5 text-green-600 mr-2" />
                            M-Pesa
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 border p-4 rounded-md">
                          <RadioGroupItem value="cod" id="cod" />
                          <Label htmlFor="cod" className="flex items-center">
                            <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
                            Cash On Delivery
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    {paymentMethod === "mpesa" && (
                      <div className="bg-green-50 p-4 rounded-md">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-green-800">M-Pesa Payment Details</p>
                            <p className="text-sm text-green-700 mt-1">Paybill Number: <span className="font-bold">555123</span></p>
                            <p className="text-sm text-green-700">Account Number: <span className="font-bold">FISH{Math.floor(1000 + Math.random() * 9000)}</span></p>
                          </div>
                          <div className="bg-white p-2 rounded-md">
                            <Phone className="h-8 w-8 text-green-600" />
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <Label htmlFor="mpesaNumber" className="text-green-800">Your M-Pesa Phone Number *</Label>
                          <Input 
                            id="mpesaNumber" 
                            value={mpesaNumber} 
                            onChange={(e) => setMpesaNumber(e.target.value)} 
                            placeholder="e.g. 0712345678 or +254712345678" 
                            className="mt-1"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="bg-aqua-50 p-4 rounded-lg flex items-start">
                      <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 mr-2" />
                      <p className="text-sm text-slate-700">
                        {paymentMethod === "mpesa" 
                          ? "Complete your payment through M-Pesa and enter the transaction code during checkout."
                          : "Payment will be processed upon delivery. We accept cash and mobile payments."}
                      </p>
                    </div>
                    
                    <Button 
                      className="w-full mt-4" 
                      size="lg" 
                      onClick={handleCheckout}
                    >
                      Complete Order
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>
                    {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} × {item.quantity}</span>
                        <span className="font-medium">
                          KSh {parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity}
                        </span>
                      </div>
                    ))}
                    
                    <div className="pt-4 border-t mt-6">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>KSh {subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span>Shipping</span>
                        <span>{shipping > 0 ? `KSh ${shipping.toLocaleString()}` : 'Free'}</span>
                      </div>
                      <div className="flex justify-between mt-4 text-lg font-bold">
                        <span>Total</span>
                        <span>KSh {total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex-col space-y-4">
                  <div className="bg-green-50 p-3 rounded-lg w-full">
                    <div className="flex items-center text-green-700 font-medium mb-1">
                      <Truck className="h-4 w-4 mr-2" />
                      Delivery Information
                    </div>
                    <p className="text-sm text-green-800">
                      Free delivery on orders above KSh 10,000 within Nairobi. 
                      Standard delivery fee is KSh 500.
                    </p>
                  </div>
                  <div className="text-xs text-slate-500">
                    All prices include VAT where applicable
                  </div>
                </CardFooter>
              </Card>
              
              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 mb-4">
                      Our customer service team is available to assist you with your order.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <span className="font-medium w-20">Phone:</span>
                        <a href="tel:+254722522169" className="text-primary">+254 722 522169</a>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium w-20">Email:</span>
                        <a href="mailto:sales@kamuthanga-farm.com" className="text-primary">
                          sales@kamuthanga-farm.com
                        </a>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium w-20">Hours:</span>
                        <span>Mon-Sat: 8AM - 6PM</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* M-Pesa Payment Confirmation Dialog */}
      <Dialog open={showMpesaDialog} onOpenChange={setShowMpesaDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm M-Pesa Payment</DialogTitle>
            <DialogDescription>
              Enter the M-Pesa transaction code sent to your phone.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="transaction-code" className="text-green-700">Transaction Code</Label>
              <Input 
                id="transaction-code" 
                value={mpesaCode} 
                onChange={(e) => setMpesaCode(e.target.value)} 
                placeholder="e.g. QK7HITSNX2" 
                className="uppercase"
              />
            </div>
            <div className="bg-green-50 p-3 rounded-md text-sm text-green-800">
              <p>Follow these steps:</p>
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>Open M-Pesa on your phone</li>
                <li>Select Lipa na M-Pesa</li>
                <li>Select Pay Bill</li>
                <li>Enter Business Number: <span className="font-bold">555123</span></li>
                <li>Enter Account Number: <span className="font-bold">FISH{Math.floor(1000 + Math.random() * 9000)}</span></li>
                <li>Enter Amount: <span className="font-bold">KSh {total.toLocaleString()}</span></li>
                <li>Enter your M-Pesa PIN and confirm</li>
                <li>Enter the transaction code received via SMS</li>
              </ol>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMpesaDialog(false)}>Cancel</Button>
            <Button onClick={verifyMpesaPayment}>Verify Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default MarketplacePage;
