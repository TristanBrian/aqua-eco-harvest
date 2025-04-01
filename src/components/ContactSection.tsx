
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-16 bg-white" id="contact">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-aqua-950">Get in Touch With Us</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-slate-700">
            Have questions about our products or services? We'd love to hear from you!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-aqua-900">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-aqua-100 rounded-full p-3 mr-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1">Our Address</h4>
                  <p className="text-slate-600">Kamuthanga, Machakos County</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-aqua-100 rounded-full p-3 mr-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1">Email Us</h4>
                  <p className="text-slate-600">office@kamuthanga-farm.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-aqua-100 rounded-full p-3 mr-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1">Call Us</h4>
                  <p className="text-slate-600">+254 722 522169</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-aqua-50 rounded-lg p-6">
              <h4 className="font-medium text-lg mb-3">Business Hours</h4>
              <ul className="space-y-2 text-slate-600">
                <li className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>8:00 AM - 5:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span>9:00 AM - 3:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-aqua-900">Send Us a Message</h3>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                    Your Name
                  </label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">
                  Subject
                </label>
                <Input id="subject" placeholder="How can we help you?" required />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Write your message here..." 
                  rows={5} 
                  required 
                />
              </div>
              
              <Button type="submit" className="w-full rounded-full">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
