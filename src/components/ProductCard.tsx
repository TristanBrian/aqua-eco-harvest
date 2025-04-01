
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

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
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden h-full flex flex-col bg-white border-0 shadow-md rounded-xl">
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
            >
              <Button 
                onClick={() => onAddToCart(product.name)}
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
            <Link to={`/products/${product.id}`} className="text-sm font-medium text-slate-600 flex items-center hover:text-primary transition-colors">
              Details <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
