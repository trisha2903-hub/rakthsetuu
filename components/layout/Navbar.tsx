
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Bell } from "lucide-react";
import BloodIcon from "@/components/icons/BloodIcon";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex items-center">
                <BloodIcon className="h-8 w-8 text-blood" />
                <span className="ml-2 text-xl font-bold text-trust-dark">
                  Rakth<span className="text-blood">Setu</span>
                </span>
              </div>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blood px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/donor-registration" className="text-gray-700 hover:text-blood px-3 py-2 rounded-md text-sm font-medium">
              Become a Donor
            </Link>
            <Link to="/find-donors" className="text-gray-700 hover:text-blood px-3 py-2 rounded-md text-sm font-medium">
              Find Donors
            </Link>
            <Link to="/blood-education" className="text-gray-700 hover:text-blood px-3 py-2 rounded-md text-sm font-medium">
              Blood Education
            </Link>
            <Button asChild variant="ghost" className="relative">
              <Link to="/notifications">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-blood rounded-full">
                  3
                </span>
              </Link>
            </Button>
            <Button asChild variant="default" className="ml-3 bg-blood hover:bg-blood-dark">
              <Link to="/emergency-request">
                Request Blood
              </Link>
            </Button>
          </div>
          <div className="flex md:hidden items-center">
            <Button variant="ghost" onClick={toggleMenu} className="inline-flex items-center justify-center p-2">
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link to="/donor-registration" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
              Become a Donor
            </Link>
            <Link to="/find-donors" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
              Find Donors
            </Link>
            <Link to="/blood-education" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
              Blood Education
            </Link>
            <Link to="/notifications" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
              Notifications
            </Link>
            <Link to="/emergency-request" className="bg-blood text-white hover:bg-blood-dark block px-3 py-2 rounded-md text-base font-medium">
              Request Blood
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
