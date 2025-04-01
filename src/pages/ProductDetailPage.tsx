
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, ChevronLeft, Star, CheckCircle, Truck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

// Use the same product data structure from ProductsPage
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

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  
  // Find the product based on the ID
  const product = products.find(p => p.id === Number(id));
  
  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-aqua-50">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/products')}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${quantity} ${quantity === 1 ? 'unit' : 'units'} of ${product.name} added to your cart.`,
      duration: 3000,
    });
  };
  
  // Related products (products in the same category)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);
    
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-aqua-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        {/* Back button */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => navigate('/products')}
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Product image */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          
          {/* Product details */}
          <div>
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </span>
            
            <h1 className="text-3xl font-bold mb-2 text-slate-800">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center bg-amber-50 px-2 py-1 rounded-md">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <span className="text-sm font-medium text-slate-700 ml-1">4.8</span>
              </div>
              <span className="text-sm text-slate-500">(24 reviews)</span>
            </div>
            
            <div className="text-2xl font-bold text-primary mb-6">{product.price}</div>
            
            <p className="text-slate-700 mb-6">{product.description}</p>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="font-medium">Quantity:</div>
                <div className="flex items-center border border-slate-300 rounded-md">
                  <button 
                    className="px-3 py-1 text-lg border-r border-slate-300"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >-</button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button 
                    className="px-3 py-1 text-lg border-l border-slate-300"
                    onClick={() => setQuantity(quantity + 1)}
                  >+</button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => navigate('/marketplace')}
                >
                  Checkout Now
                </Button>
              </div>
            </div>
            
            <div className="border-t border-slate-200 pt-6">
              <div className="flex items-center gap-3 text-slate-700">
                <Truck className="h-5 w-5 text-primary" />
                <span>Free delivery within Nairobi for orders above KSh 10,000</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product description */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-16">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">Product Description</h2>
          <div className="prose max-w-none text-slate-700">
            <p className="mb-4">{product.description}</p>
            <p className="mb-4">
              Our {product.name} is sourced from our sustainable aquaculture system, ensuring you get the freshest, highest quality product every time. We pride ourselves on our eco-friendly farming practices that maintain water quality and fish health.
            </p>
            <p>
              Perfect for {product.category === 'ornamental' ? 'home aquariums and fish enthusiasts' : 'family meals, restaurants, and food services'}, our products are delivered fresh to maintain optimal taste and nutritional value.
            </p>
          </div>
        </div>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">You May Also Like</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Card 
                  key={relatedProduct.id} 
                  className="overflow-hidden border-0 shadow-md"
                  onClick={() => navigate(`/products/${relatedProduct.id}`)}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{relatedProduct.name}</h3>
                    <p className="text-primary font-bold">{relatedProduct.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
