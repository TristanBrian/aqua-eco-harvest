
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, ArrowUpRight } from "lucide-react";

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
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-aqua-950">Our Products</h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-slate-700">
              Discover our premium range of sustainably farmed fish products.
            </p>
          </div>
          
          <Tabs defaultValue="all" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="all">All Products</TabsTrigger>
                <TabsTrigger value="tilapia">Tilapia</TabsTrigger>
                <TabsTrigger value="catfish">Catfish</TabsTrigger>
                <TabsTrigger value="ornamental">Ornamental</TabsTrigger>
                <TabsTrigger value="fingerlings">Fingerlings</TabsTrigger>
              </TabsList>
              
              <div className="hidden md:flex items-center text-sm">
                <Filter className="h-4 w-4 mr-2 text-slate-500" />
                <span className="text-slate-500">Sort by: </span>
                <select className="ml-2 bg-transparent border-none text-primary font-medium focus:ring-0 focus:outline-none cursor-pointer">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>
            
            <TabsContent value="all">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="tilapia">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.filter(p => p.category === 'tilapia').map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="catfish">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.filter(p => p.category === 'catfish').map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="ornamental">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.filter(p => p.category === 'ornamental').map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="fingerlings">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.filter(p => p.category === 'fingerlings').map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="max-w-4xl mx-auto mt-16 bg-aqua-50 rounded-xl p-8">
            <h2 className="text-2xl font-semibold mb-4 text-aqua-900">Bulk Orders & Special Requests</h2>
            <p className="text-slate-700 mb-6">
              Looking for large quantities or have special requirements? We offer competitive pricing for bulk orders and can accommodate custom requests.
            </p>
            <p className="text-slate-700 mb-6">
              Contact our sales team at <span className="text-primary font-medium">sales@kamuthanga-farm.com</span> or call us at <span className="text-primary font-medium">+254 722 522169</span> to discuss your specific needs.
            </p>
            <div className="bg-white p-4 rounded-lg text-slate-700">
              <p className="font-medium">Note: Prices may vary slightly based on season and availability. Please contact us for the most current pricing.</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    category: string;
    image: string;
    description: string;
    features: string[];
    price: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="h-56 overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 text-xs font-medium text-slate-700">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-aqua-900 flex items-center justify-between">
          {product.name}
          <span className="text-primary hover:text-primary/80 transition-colors cursor-pointer">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </h3>
        <p className="text-slate-600 mb-4 text-sm">{product.description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-slate-500 mb-2">Features:</h4>
          <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
            {product.features.map((feature, idx) => (
              <li key={idx} className="text-xs text-slate-600 flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-slate-100">
          <span className="font-bold text-primary">{product.price}</span>
          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">In Stock</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsPage;
