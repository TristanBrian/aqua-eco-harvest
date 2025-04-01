
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SDGSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-aqua-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/3 right-0 w-48 h-48 bg-aqua-300 rounded-full filter blur-3xl opacity-10 -z-10"></div>
      <div className="absolute bottom-1/3 left-0 w-48 h-48 bg-teal-300 rounded-full filter blur-3xl opacity-10 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-aqua-950">
                Commitment to SDGs
              </h2>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <img 
                  src="https://www.un.org/sustainabledevelopment/wp-content/uploads/2018/05/E_SDG-goals_icons-individual-rgb-02.png" 
                  alt="Zero Hunger SDG"
                  className="h-20 w-20 object-contain"
                />
                <img 
                  src="https://www.un.org/sustainabledevelopment/wp-content/uploads/2018/05/E_SDG-goals_icons-individual-rgb-04.png" 
                  alt="Quality Education SDG"
                  className="h-20 w-20 object-contain"
                />
                <img 
                  src="https://www.un.org/sustainabledevelopment/wp-content/uploads/2018/05/E_SDG-goals_icons-individual-rgb-14.png" 
                  alt="Life Below Water SDG"
                  className="h-20 w-20 object-contain"
                />
              </div>
              
              <div className="space-y-6 mb-8">
                <p className="text-slate-700">
                  Kamuthanga Fish Farm, through its implementation of the Recirculating Aquaculture System (RAS) method, plays a vital role in advancing the Sustainable Development Goal (SDG) of "Zero Hunger." By producing high-quality fish products and supplying them to customers and restaurants, the farm contributes to food security and access to nutritious food, thereby alleviating hunger and malnutrition within the community it serves.
                </p>
                
                <p className="text-slate-700">
                  Kamuthanga Farm actively promotes "Quality Education" as an SDG by opening its doors to interested parties and farmers eager to learn about sustainable fishing practices. By sharing knowledge and expertise, the farm empowers individuals to make informed decisions in aquaculture, fostering a culture of learning and skill development.
                </p>
              </div>
              
              <div className="text-center">
                <Button asChild className="rounded-full px-8">
                  <Link to="/sustainability">Read More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SDGSection;
