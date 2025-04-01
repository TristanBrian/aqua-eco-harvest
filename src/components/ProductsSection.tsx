
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Premium Tilapia",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description: "Farm-fresh tilapia raised in our sustainable RAS system, known for its excellent taste and quality."
  },
  {
    id: 2,
    name: "African Catfish",
    image: "https://images.unsplash.com/photo-1583225214464-9296029427aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description: "Nutritious and flavorful catfish, sustainably raised in our eco-friendly aquaculture system."
  },
  {
    id: 3,
    name: "Ornamental Fish",
    image: "https://images.unsplash.com/photo-1520302519120-740f047a60bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description: "Vibrant and healthy ornamental fish for aquarium enthusiasts, bred with care in our facilities."
  },
  {
    id: 4,
    name: "Fish Fingerlings",
    image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description: "High-quality fingerlings for fish farmers, featuring superior genetics and excellent growth rates."
  }
];

const ProductsSection = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-aqua-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-aqua-950">Our Products</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-slate-700">
            At Kamuthanga Fish Farm, we offer a wide range of premium fish products that are sustainably raised and of the highest quality.
          </p>
        </div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={item}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full border-0 shadow-md rounded-xl bg-white">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-aqua-900">{product.name}</h3>
                  <p className="text-slate-600 mb-4 text-sm line-clamp-2">{product.description}</p>
                  <Button asChild variant="ghost" className="p-0 h-auto font-medium text-primary flex items-center hover:bg-transparent">
                    <Link to={`/products/${product.id}`}>
                      Learn more <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="rounded-full px-8 shadow-md">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
