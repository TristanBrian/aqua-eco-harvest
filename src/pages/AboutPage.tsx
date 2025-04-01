
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CertificationSection from "@/components/CertificationSection";
import { Leaf, Droplet, Fish, Award, Sprout, Users } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-aqua-950">About Kamuthanga Fish Farm</h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-slate-700">
              Learn about our journey, vision, and commitment to sustainable aquaculture in East Africa.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1508857650881-46850fcc7d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Kamuthanga Fish Farm" 
                className="rounded-xl shadow-xl"
              />
            </div>
            
            <div>
              <h2 className="text-3xl font-semibold mb-4 text-aqua-900">Our Story</h2>
              <p className="mb-4 text-slate-700">
                Kamuthanga Fish Farm, situated in Kenya, East Africa, leads the way in sustainable aquaculture. Established in 2012, our journey began with a mission to transform fish farming in a region historically reliant on Lake Victoria's fisheries.
              </p>
              <p className="mb-4 text-slate-700">
                By pioneering eco-friendly practices like the Recirculating Aquaculture System (RAS), we've not only earned East Africa's first ECO Mark certification but also set new standards for environmentally responsible aquaculture.
              </p>
              <p className="mb-4 text-slate-700">
                Our farm offers premium Tilapia and catfish products, along with a captivating collection of ornamental fish. Kamuthanga is more than a farm; it's a commitment to partnership, innovation, and a sustainable future for East Africa's aquaculture.
              </p>
            </div>
          </div>
          
          <div className="mb-20">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4 text-aqua-900">Our Values</h2>
              <p className="text-lg text-slate-700">
                At the heart of Kamuthanga Fish Farm are core values that guide everything we do.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-green-100 text-green-600 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Leaf className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-aqua-900">Sustainability</h3>
                  <p className="text-slate-600">
                    We are committed to sustainable practices that protect our environment and natural resources.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-aqua-900">Quality</h3>
                  <p className="text-slate-600">
                    We maintain the highest standards in all aspects of our operations, from fish farming to customer service.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-purple-100 text-purple-600 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-aqua-900">Community</h3>
                  <p className="text-slate-600">
                    We believe in supporting our local community through job creation, knowledge sharing, and sustainable economic growth.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mb-20">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4 text-aqua-900">Our Breeding</h2>
              <p className="text-lg text-slate-700 mb-8">
                Our genetic lineage originates from the Tilaqua in the Netherlands, where we obtain YY supermales as our breeding stock.
              </p>
            </div>
            
            <div className="bg-aqua-50 rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1516683037151-9a17603a8dc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="Fish Breeding" 
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-aqua-900">Advanced Genetic Techniques</h3>
                  <p className="mb-4 text-slate-700">
                    These YY supermales give rise to exclusively male offspring, which exhibit a remarkable growth rate twice that of the females. These supermales are renowned for their high quality, making them a favored choice among most farmers for breeding purposes.
                  </p>
                  <p className="text-slate-700">
                    Importantly, they do not reproduce, thereby eliminating concerns related to inbreeding and excessive multiplication.
                  </p>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-slate-700">2x Growth Rate</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-slate-700">No Inbreeding</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <span className="text-slate-700">High Quality</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                      <span className="text-slate-700">Male Offspring</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-12">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4 text-aqua-900">Our Method</h2>
              <p className="text-lg text-slate-700">
                At Kamuthanga, we are dedicated to revolutionizing fish farming through our innovative use of the Recirculating Aquaculture System (RAS) method.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-semibold mb-4 text-aqua-900">Recirculating Aquaculture System (RAS)</h3>
                <p className="mb-4 text-slate-700">
                  RAS is at the heart of our commitment to sustainability, precision, and quality in aquaculture. With RAS, we have created an environment where water is continuously filtered and recycled, allowing us to dramatically reduce water usage and waste discharge.
                </p>
                <p className="mb-6 text-slate-700">
                  This method not only conserves precious resources but also ensures that our fish are raised in a pristine and controlled environment, free from contaminants and disease. The result is the production of exceptionally healthy, vibrant, and sustainable Tilapia and catfish, setting a new standard in aquaculture IN East Africa.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <div className="bg-teal-100 text-teal-600 rounded-full p-2 mr-3 mt-1">
                      <Droplet className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-aqua-900">Water Conservation</h4>
                      <p className="text-sm text-slate-600">90% reduction in water usage compared to traditional methods</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 mt-1">
                      <Fish className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-aqua-900">Fish Health</h4>
                      <p className="text-sm text-slate-600">90% fish survival rate with optimized conditions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 text-green-600 rounded-full p-2 mr-3 mt-1">
                      <Sprout className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-aqua-900">Growth Efficiency</h4>
                      <p className="text-sm text-slate-600">66% reduction in fish maturity rates</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-amber-100 text-amber-600 rounded-full p-2 mr-3 mt-1">
                      <Leaf className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-aqua-900">Organic Practices</h4>
                      <p className="text-sm text-slate-600">100% organic feeds and natural treatments</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1504472478235-9bc48ba4d60f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="RAS System" 
                  className="rounded-xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <CertificationSection />
      <Footer />
    </div>
  );
};

export default AboutPage;
