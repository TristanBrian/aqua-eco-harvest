
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-aqua-950">About Us</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-slate-700">
            Kamuthanga Fish Farm, situated in Kenya, East Africa, leads the way in sustainable aquaculture.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1628863353691-0031b9b389b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Kamuthanga Fish Farm" 
              className="rounded-xl shadow-xl"
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-aqua-900">Our Story</h3>
            <p className="mb-4 text-slate-700">
              Established in 2012, our journey began with a mission to transform fish farming in a region historically reliant on Lake Victoria's fisheries. By pioneering eco-friendly practices like the Recirculating Aquaculture System (RAS), we've not only earned East Africa's first ECO Mark certification but also set new standards for environmentally responsible aquaculture.
            </p>
            <p className="mb-6 text-slate-700">
              Our farm offers premium Tilapia and catfish products, along with a captivating collection of ornamental fish. Kamuthanga is more than a farm; it's a commitment to partnership, innovation, and a sustainable future for East Africa's aquaculture.
            </p>
            
            <Button asChild className="rounded-full px-6">
              <Link to="/about">Learn More About Our Journey</Link>
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mt-20">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-semibold mb-4 text-aqua-900">Our Method</h3>
            <p className="mb-4 text-slate-700">
              At Kamuthanga, we are dedicated to revolutionizing fish farming through our innovative use of the Recirculating Aquaculture System (RAS) method. RAS is at the heart of our commitment to sustainability, precision, and quality in aquaculture.
            </p>
            <p className="mb-6 text-slate-700">
              With RAS, we have created an environment where water is continuously filtered and recycled, allowing us to dramatically reduce water usage and waste discharge. This method not only conserves precious resources but also ensures that our fish are raised in a pristine and controlled environment, free from contaminants and disease.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                <span className="text-slate-700">90% Fish survival rate</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-teal-500 mr-2"></div>
                <span className="text-slate-700">66% Reduction in fish maturity rates</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-aqua-400 mr-2"></div>
                <span className="text-slate-700">100% Organic Foods</span>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <img 
              src="https://images.unsplash.com/photo-1565012050574-e2b32f6cb43b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="RAS Method" 
              className="rounded-xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
