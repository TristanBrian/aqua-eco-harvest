import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, ArrowUpRight, Info, Star, Truck, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    id: 1,
    name: "Fresh Tilapia",
    category: "tilapia",
    image: "https://images.unsplash.com/photo-1600803907087-f56d462fd26b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description: "Premium quality tilapia fish, fresh from our sustainable aquaculture system.",
    features: ["100% Sustainable", "Hormone-free", "Rich in protein", "Farm-to-table freshness"],
    price: "KSh 850 per kg"
  },
  {
    id: 2,
    name: "Tilapia Fillets",
    category: "tilapia",
    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description: "Clean, boneless tilapia fillets ready for cooking, perfect for various recipes.",
    features: ["Boneless", "Ready to cook", "Vacuum packed", "High quality"],
    price: "KSh 1,200 per kg"
  },
  {
    id: 3,
    name: "African Catfish",
    category: "catfish",
    image: "https://images.unsplash.com/photo-1528502744867-c69d9c52551e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description: "Nutritious and flavorful catfish, raised in our eco-friendly aquaculture system.",
    features: ["Rich taste", "High protein", "Sustainably raised", "Versatile cooking options"],
    price: "KSh 780 per kg"
  },
  {
    id: 4,
    name: "Catfish Fillets",
    category: "catfish",
    image: "https://images.unsplash.com/photo-1544551763-8dd44758c2dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description: "Premium catfish fillets, cleaned and ready for your favorite recipes.",
    features: ["Boneless", "Clean taste", "Firm texture", "Easy to prepare"],
    price: "KSh 1,100 per kg"
  },
  {
    id: 5,
    name: "Guppy Fish",
    category: "ornamental",
    image: "https://images.unsplash.com/photo-1636553656026-09a78600b024?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description: "Vibrant guppy fish for home aquariums, known for their colorful patterns.",
    features: ["Vibrant colors", "Easy to care for", "Peaceful community fish", "Active swimmers"],
    price: "KSh 250-350 each"
  },
  {
    id: 6,
    name: "Angelfish",
    category: "ornamental",
    image: "https://images.unsplash.com/photo-1535492388307-a5e6ab102910?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description: "Elegant angelfish with striking patterns, perfect for community aquariums.",
    features: ["Graceful swimmers", "Various color patterns", "Semi-aggressive", "Striking appearance"],
    price: "KSh 400-600 each"
  },
  {
    id: 7,
    name: "Tilapia Fingerlings",
    category: "fingerlings",
    image: "https://images.unsplash.com/photo-1545851453-1175fbb9c82c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description: "High-quality tilapia fingerlings for fish farmers, featuring our premium genetics.",
    features: ["Fast growth", "Disease resistant", "90% survival rate", "Superior genetics"],
    price: "KSh 15-25 each"
  },
  {
    id: 8,
    name: "Catfish Fingerlings",
    category: "fingerlings",
    image: "https://images.unsplash.com/photo-1545851726-58a7c480def6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description: "Healthy catfish fingerlings for growing your own sustainable fish stock.",
    features: ["Robust fingerlings", "High survivability", "Fast growth", "Quality genetic stock"],
    price: "KSh 18-30 each"
  },
];

const ProductsPage = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("featured");

  const handleAddToCart = (productName: string) => {
    toast({
      title: "Added to Cart",
      description: `${productName} has been added to your cart.`,
      duration: 3000,
    });
  };

  const sortProducts = (products: any[]) => {
    if (sort === "price-low") {
      return [...products].sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
        return priceA - priceB;
      });
    } else if (sort === "price-high") {
      return [...products].sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
        return priceB - priceA;
      });
    }
    return products; // Default "featured" sorting
  };

  const filteredProducts = filter === "all" 
    ? products 
    : products.filter(p => p.category === filter);

  const sortedProducts = sortProducts(filteredProducts);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-aqua-50">
      <Navbar />
      
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-aqua-950">Our Products</h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-slate-700">
              Discover our premium range of sustainably farmed fish products, fresh from our eco-friendly Recirculating Aquaculture System.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-start gap-8 mb-8">
            <div className="lg:w-1/4 bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2 text-primary" />
                Filter Products
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="all" 
                    name="filter" 
                    className="mr-2" 
                    checked={filter === "all"} 
                    onChange={() => setFilter("all")} 
                  />
                  <label htmlFor="all" className="cursor-pointer">All Products</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="tilapia" 
                    name="filter" 
                    className="mr-2" 
                    checked={filter === "tilapia"} 
                    onChange={() => setFilter("tilapia")} 
                  />
                  <label htmlFor="tilapia" className="cursor-pointer">Tilapia</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="catfish" 
                    name="filter" 
                    className="mr-2" 
                    checked={filter === "catfish"} 
                    onChange={() => setFilter("catfish")} 
                  />
                  <label htmlFor="catfish" className="cursor-pointer">Catfish</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="ornamental" 
                    name="filter" 
                    className="mr-2" 
                    checked={filter === "ornamental"} 
                    onChange={() => setFilter("ornamental")} 
                  />
                  <label htmlFor="ornamental" className="cursor-pointer">Ornamental</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="fingerlings" 
                    name="filter" 
                    className="mr-2" 
                    checked={filter === "fingerlings"} 
                    onChange={() => setFilter("fingerlings")} 
                  />
                  <label htmlFor="fingerlings" className="cursor-pointer">Fingerlings</label>
                </div>
              </div>
              
              <div className="mt-8 bg-aqua-50/70 p-5 rounded-xl">
                <h3 className="text-lg font-semibold mb-3 flex items-center text-aqua-900">
                  <Info className="h-5 w-5 mr-2 text-primary" />
                  Why Choose Our Fish?
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="min-w-4 h-4 bg-primary/20 rounded-full flex items-center justify-center mt-1 mr-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span>100% Sustainably farmed</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-4 h-4 bg-primary/20 rounded-full flex items-center justify-center mt-1 mr-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span>No antibiotics or hormones</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-4 h-4 bg-primary/20 rounded-full flex items-center justify-center mt-1 mr-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span>Eco-certified production</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-4 h-4 bg-primary/20 rounded-full flex items-center justify-center mt-1 mr-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span>Farm-to-table freshness</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="lg:w-3/4">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-aqua-900">
                  {filter === "all" ? "All Products" : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  <span className="ml-2 text-sm font-normal text-slate-500">
                    ({filteredProducts.length} products)
                  </span>
                </h2>
                <Link to="/marketplace">
                  <Button variant="outline" className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Go to Marketplace
                  </Button>
                </Link>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto mt-16 bg-aqua-50/80 backdrop-blur-sm rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-aqua-900">Bulk Orders & Special Requests</h2>
            <p className="text-slate-700 mb-6">
              Looking for large quantities or have special requirements? We offer competitive pricing for bulk orders and can accommodate custom requests.
            </p>
            <p className="text-slate-700 mb-6">
              Contact our sales team at <span className="text-primary font-medium">sales@kamuthanga-farm.com</span> or call us at <span className="text-primary font-medium">+254 722 522169</span> to discuss your specific needs.
            </p>
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg text-slate-700">
              <Truck className="text-primary h-8 w-8 flex-shrink-0" />
              <div>
                <p className="font-medium">We deliver across Kenya</p>
                <p className="text-sm text-slate-500">Free delivery for orders above KSh 10,000 within Nairobi</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
