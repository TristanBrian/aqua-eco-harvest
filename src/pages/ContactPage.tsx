
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Calendar, Users } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-aqua-950">Contact Us</h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-slate-700">
              We'd love to hear from you. Get in touch with Kamuthanga Fish Farm.
            </p>
          </div>
          
          {/* Map and Info Cards */}
          <div className="mb-16">
            <div className="bg-white rounded-xl overflow-hidden shadow-md mb-8">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.32321456266!2d37.03923277775872!3d-1.5149867075927282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f7d91ca1a6e2f%3A0x9d3c6abe3842df47!2sMachakos%2C%20Kenya!5e0!3m2!1sen!2sus!4v1662826608442!5m2!1sen!2sus" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Kamuthanga Fish Farm Location"
              ></iframe>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="bg-aqua-100 text-primary rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Our Location</h3>
                  <p className="text-slate-600">Kamuthanga, Machakos County, Kenya, East Africa</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="bg-green-100 text-green-600 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Opening Hours</h3>
                  <p className="text-slate-600">Monday - Friday: 8:00 AM - 5:00 PM<br />Saturday: 9:00 AM - 3:00 PM<br />Sunday: Closed</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="bg-amber-100 text-amber-600 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Farm Tours</h3>
                  <p className="text-slate-600">We offer guided tours of our facilities. Pre-booking is required. Contact us to schedule a visit.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="bg-purple-100 text-purple-600 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Training Programs</h3>
                  <p className="text-slate-600">We offer training for aspiring fish farmers. Contact us for upcoming dates and registration details.</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Contact Form Section */}
          <ContactSection />
          
          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-semibold mb-8 text-center text-aqua-900">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium text-aqua-900 mb-2">Do you offer delivery services?</h3>
                <p className="text-slate-600">Yes, we offer delivery services within Machakos County and to Nairobi. Additional delivery fees may apply based on distance. For bulk orders, we can arrange delivery to other parts of Kenya.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium text-aqua-900 mb-2">How do I place an order?</h3>
                <p className="text-slate-600">You can place orders by calling us directly at +254 722 522169, sending an email to orders@kamuthanga-farm.com, or filling out the contact form on this page. For large orders, we recommend calling to discuss your specific requirements.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium text-aqua-900 mb-2">Do you provide training for aspiring fish farmers?</h3>
                <p className="text-slate-600">Yes, we offer comprehensive training programs for individuals interested in fish farming. Our courses cover everything from setting up a fish farm to sustainable aquaculture practices and marketing strategies. Contact us for information about upcoming training sessions.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium text-aqua-900 mb-2">Can I visit the farm?</h3>
                <p className="text-slate-600">Yes, we welcome visitors for educational tours and to view our facilities. However, to ensure we can provide a meaningful experience and maintain our biosecurity protocols, visits must be scheduled in advance. Please contact us to arrange a tour.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
