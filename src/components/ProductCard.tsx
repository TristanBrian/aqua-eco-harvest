
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, ArrowRight, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

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
  onAddToCart: (productName: string) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className="h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card 
          className="overflow-hidden h-full flex flex-col bg-white border-0 shadow-md rounded-xl cursor-pointer"
          onClick={() => setIsDialogOpen(true)}
        >
          <div className="h-56 overflow-hidden relative">
            <motion.img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute top-3 right-3">
              <Badge className="bg-white/80 backdrop-blur-sm text-slate-700 font-medium px-3 py-1 rounded-full shadow-sm">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Badge>
            </div>
            
            {isHovered && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product.name);
                  }}
                  className="w-full bg-white hover:bg-white/90 text-slate-800 group"
                >
                  <ShoppingCart className="h-4 w-4 mr-2 group-hover:text-primary transition-colors" />
                  Add to Cart
                </Button>
              </motion.div>
            )}
          </div>
          
          <CardContent className="p-5 flex flex-col flex-grow">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">{product.name}</h3>
              <div className="flex items-center bg-amber-50 px-2 py-1 rounded-md">
                <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                <span className="text-xs font-medium text-slate-700 ml-1">4.8</span>
              </div>
            </div>
            
            <p className="text-slate-600 mb-4 text-sm line-clamp-2">{product.description}</p>
            
            <div className="mb-4 flex-grow">
              <div className="grid grid-cols-2 gap-2">
                {product.features.slice(0, 4).map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/80"></div>
                    <span className="text-xs text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
              <span className="font-bold text-primary text-lg">{product.price}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-0 h-auto font-medium text-slate-600 flex items-center hover:text-primary hover:bg-transparent"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/products/${product.id}`);
                }}
              >
                Details <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white rounded-xl">
          <div className="grid md:grid-cols-2 h-full">
            <div className="relative h-[300px] md:h-full">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 right-4 bg-white/90 text-slate-700 font-medium px-3 py-1.5 rounded-full shadow-sm">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Badge>
            </div>
            
            <div className="p-6 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-slate-800">{product.name}</h2>
                <div className="flex items-center bg-amber-50 px-2 py-1 rounded-md">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span className="text-sm font-medium text-slate-700 ml-1">4.8</span>
                </div>
              </div>
              
              <p className="text-slate-600 mb-6">{product.description}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-slate-800">Features</h3>
                <div className="grid grid-cols-1 gap-2">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">In Stock</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    onClick={() => {
                      onAddToCart(product.name);
                      setIsDialogOpen(false);
                    }}
                    className="w-full"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setIsDialogOpen(false);
                      navigate(`/products/${product.id}`);
                    }}
                  >
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <DialogClose className="absolute top-3 right-3 rounded-full bg-white/80 backdrop-blur-sm p-1 text-slate-700 hover:bg-white">
            <X className="h-5 w-5" />
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
