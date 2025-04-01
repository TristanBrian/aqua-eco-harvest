
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20 relative overflow-hidden">
      {/* Background pattern/effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-aqua-50 to-transparent opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent -z-10"></div>
      
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-aqua-950">
            East Africa's Premier <span className="text-primary">Sustainable</span> Fish Farm
          </h1>
          <p className="text-lg md:text-xl mb-8 text-slate-700 max-w-xl">
            Pioneering eco-friendly aquaculture practices with Kenya's first
            ECO Mark certified fish farm. Discover our premium Tilapia, catfish,
            and ornamental fish products.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/products">
                Explore Our Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
        
        <div className="order-1 md:order-2 relative">
          <div className="relative rounded-xl overflow-hidden shadow-2xl water-effect bg-white">
            <img
              src="https://images.unsplash.com/photo-1559597917-9d20d672643c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Sustainable Fish Farming"
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-6">
              <p className="font-medium">East Africa's first ECO Mark certified fish farm</p>
            </div>
          </div>
          <div className="absolute -z-10 top-1/2 -right-12 transform -translate-y-1/2 w-24 h-24 rounded-full bg-teal-300 animate-float opacity-70"></div>
          <div className="absolute -z-10 bottom-12 -left-6 w-16 h-16 rounded-full bg-aqua-300 animate-float opacity-70" style={{ animationDelay: "2s" }}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
