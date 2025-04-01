
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-aqua-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-white">Kamuthanga</span>
              <span className="text-lg font-medium text-aqua-300">Fish Farm</span>
            </Link>
            <p className="text-aqua-100 mb-6 max-w-xs">
              East Africa's premier sustainable fish farm, committed to eco-friendly aquaculture and setting new standards in the industry.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-aqua-800 pb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-aqua-100 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-aqua-100 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/products" className="text-aqua-100 hover:text-white transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-aqua-100 hover:text-white transition-colors">Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="text-aqua-100 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-aqua-800 pb-2">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products/tilapia" className="text-aqua-100 hover:text-white transition-colors">Tilapia</Link>
              </li>
              <li>
                <Link to="/products/catfish" className="text-aqua-100 hover:text-white transition-colors">Catfish</Link>
              </li>
              <li>
                <Link to="/products/ornamental" className="text-aqua-100 hover:text-white transition-colors">Ornamental Fish</Link>
              </li>
              <li>
                <Link to="/products/fingerlings" className="text-aqua-100 hover:text-white transition-colors">Fingerlings</Link>
              </li>
              <li>
                <Link to="/products/sustainable-practices" className="text-aqua-100 hover:text-white transition-colors">Sustainable Practices</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-aqua-800 pb-2">Contact Us</h4>
            <address className="not-italic space-y-2 text-aqua-100">
              <p>Kamuthanga, Machakos County</p>
              <p>Email: office@kamuthanga-farm.com</p>
              <p>Phone: +254 722 522169</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-aqua-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-aqua-300 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Kamuthanga Fish Farm. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-aqua-300 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-aqua-300 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/admin" className="text-aqua-300 hover:text-white text-sm transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
