
import { Button } from "@/components/ui/button";
import { Lock, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import HouseIcon from "@/components/HouseIcon";

const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center min-w-0 rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground">
            <HouseIcon className="h-8 w-8 text-green-600 mr-2 sm:mr-3 flex-shrink-0" />
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
              <span className="hidden sm:inline">Penta Housing Co-Op</span>
              <span className="sm:hidden">Penta Co-Op</span>
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            <Link to="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost">About</Button>
            </Link>
            <Link to="/apply">
              <Button variant="ghost">Apply</Button>
            </Link>
            <Link to="/members">
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
            data-menu-toggle
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="md:hidden border-t bg-white hidden" data-mobile-menu>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/">
                <Button variant="ghost" className="w-full justify-start">Home</Button>
              </Link>
              <Link to="/about">
                <Button variant="ghost" className="w-full justify-start">About</Button>
              </Link>
              <Link to="/apply">
                <Button variant="ghost" className="w-full justify-start">Apply</Button>
              </Link>
              <Link to="/members">
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
};

export default Navigation;
