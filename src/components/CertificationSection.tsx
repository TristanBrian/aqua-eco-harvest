
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CertificationSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-teal-50 to-aqua-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-200 rounded-full filter blur-3xl opacity-20 -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-aqua-200 rounded-full filter blur-3xl opacity-20 -z-10 transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <Badge className="mb-4 bg-teal-100 text-teal-800 hover:bg-teal-200 w-fit">ECO Mark Certified</Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-aqua-950">We are Eco Mark Certified</h2>
                <p className="text-slate-700 mb-6">
                  At Kamuthanga Fish Farm, we are proud to hold the prestigious ECO Mark certification awarded by the Africa Organization for Standardization. This esteemed recognition underscores our unwavering commitment to environmentally responsible practices in aquaculture.
                </p>
                <p className="text-slate-700 mb-6">
                  Our ECO Mark certification signifies that our farm adheres to the highest standards of sustainability, minimising our environmental footprint while delivering top-quality fish products.
                </p>
                <Button className="w-fit rounded-full">Learn More About Our Certification</Button>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Eco Certification" 
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-aqua-900/70 to-transparent flex items-end">
                  <div className="p-8 text-white">
                    <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <img 
                        src="https://i.ibb.co/QbB5Cq5/eco-certification.png" 
                        alt="ECO Mark" 
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <p className="font-medium">East Africa's first ECO Mark certified fish farm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationSection;
