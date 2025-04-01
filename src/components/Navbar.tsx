
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, LogOut, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

// Logo component for the navbar
const Logo = () => (
  <Link to="/" className="flex items-center space-x-2">
    <span className="text-2xl font-bold text-primary">Kamuthanga</span>
    <span className="text-lg font-medium">Fish Farm</span>
  </Link>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn, user, logout, showLoginModal, LoginModal } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const adminLink = { name: 'Admin', path: '/admin' };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-white bg-opacity-90 backdrop-blur-sm shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-foreground hover:text-primary font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            <Link to="/marketplace" className="flex items-center text-foreground hover:text-primary font-medium transition-colors">
              <ShoppingCart className="mr-1 h-4 w-4" />
              Marketplace
            </Link>
            
            {isLoggedIn && (
              <Link 
                to={adminLink.path}
                className="text-foreground hover:text-primary font-medium transition-colors"
              >
                {adminLink.name}
              </Link>
            )}
            
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {user?.name}
                </span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={logout}
                  className="text-foreground hover:text-red-500"
                >
                  <LogOut size={18} />
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={showLoginModal}
                className="flex items-center gap-1 text-foreground hover:text-primary"
              >
                <User size={18} />
                Login
              </Button>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-foreground"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md py-4 px-4 border-t">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-foreground hover:text-primary font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              <Link 
                to="/marketplace" 
                className="flex items-center text-foreground hover:text-primary font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="mr-1 h-4 w-4" />
                Marketplace
              </Link>
              
              {isLoggedIn && (
                <Link 
                  to={adminLink.path}
                  className="text-foreground hover:text-primary font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {adminLink.name}
                </Link>
              )}
              
              {isLoggedIn ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Signed in as {user?.name}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-red-500"
                  >
                    <LogOut size={18} className="mr-1" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    showLoginModal();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-1 w-full"
                >
                  <User size={18} />
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Login Modal */}
      <LoginModal />
    </nav>
  );
};

export default Navbar;
