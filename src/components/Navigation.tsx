
import { useState, useCallback, memo } from "react";
import { Button } from "@/components/ui/button";
import { Lock, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import HouseIcon from "@/components/HouseIcon";
import { useAnalytics } from "@/hooks/useAnalytics";

const Navigation = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { trackNavigation } = useAnalytics();

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleNavClick = useCallback((destination: string, location: 'desktop' | 'mobile' | 'logo') => {
    trackNavigation(destination, location);
    if (location === 'mobile') {
      setIsMenuOpen(false);
    }
  }, [trackNavigation]);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center min-w-0 rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground" onClick={() => handleNavClick('home', 'logo')}>
            <HouseIcon className="h-8 w-8 text-green-600 mr-2 sm:mr-3 flex-shrink-0" />
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
              <span className="hidden sm:inline">Penta Housing Co-Op</span>
              <span className="sm:hidden">Penta Co-Op</span>
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" onClick={() => handleNavClick('home', 'desktop')}>
              <Button variant="ghost">Home</Button>
            </Link>
            <Link to="/about" onClick={() => handleNavClick('about', 'desktop')}>
              <Button variant="ghost">About</Button>
            </Link>
            <Link to="/apply" onClick={() => handleNavClick('apply', 'desktop')}>
              <Button variant="ghost">Apply</Button>
            </Link>
            <Link to="/members" onClick={() => handleNavClick('members', 'desktop')}>
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                <Lock className="h-4 w-4 mr-2" />
                Members Area
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost" 
            className="md:hidden"
            onClick={handleMenuToggle}
            data-menu-toggle
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden border-t bg-white ${isMenuOpen ? '' : 'hidden'}`} data-mobile-menu>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" onClick={() => handleNavClick('home', 'mobile')}>
                <Button variant="ghost" className="w-full justify-start">Home</Button>
              </Link>
              <Link to="/about" onClick={() => handleNavClick('about', 'mobile')}>
                <Button variant="ghost" className="w-full justify-start">About</Button>
              </Link>
              <Link to="/apply" onClick={() => handleNavClick('apply', 'mobile')}>
                <Button variant="ghost" className="w-full justify-start">Apply</Button>
              </Link>
              <Link to="/members" onClick={() => handleNavClick('members', 'mobile')}>
                <Button variant="outline" className="w-full justify-start border-green-600 text-green-600 hover:bg-green-50">
                  <Lock className="h-4 w-4 mr-2" />
                  Members Area
                </Button>
              </Link>
            </div>
        </div>
      </div>
    </nav>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
