
import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral dark:bg-gray-800 pt-10 pb-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-trust-dark">RakthSetu</h3>
            <p className="text-sm text-gray-600 mb-4">
              A bridge between life-savers and those in need. We connect blood donors with patients in emergency situations.
            </p>
            <div className="flex items-center">
              <Heart className="h-5 w-5 text-blood mr-2" />
              <span className="text-sm text-gray-600">
                Saving lives together
              </span>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4 text-trust-dark">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-blood">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/donor-registration" className="text-sm text-gray-600 hover:text-blood">
                  Become a Donor
                </Link>
              </li>
              <li>
                <Link to="/find-donors" className="text-sm text-gray-600 hover:text-blood">
                  Find Donors
                </Link>
              </li>
              <li>
                <Link to="/emergency-request" className="text-sm text-gray-600 hover:text-blood">
                  Request Blood
                </Link>
              </li>
              <li>
                <Link to="/blood-education" className="text-sm text-gray-600 hover:text-blood">
                  Blood Education
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4 text-trust-dark">Blood Types</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/blood-education#a-positive" className="text-sm text-gray-600 hover:text-blood">
                A+
              </Link>
              <Link to="/blood-education#a-negative" className="text-sm text-gray-600 hover:text-blood">
                A-
              </Link>
              <Link to="/blood-education#b-positive" className="text-sm text-gray-600 hover:text-blood">
                B+
              </Link>
              <Link to="/blood-education#b-negative" className="text-sm text-gray-600 hover:text-blood">
                B-
              </Link>
              <Link to="/blood-education#ab-positive" className="text-sm text-gray-600 hover:text-blood">
                AB+
              </Link>
              <Link to="/blood-education#ab-negative" className="text-sm text-gray-600 hover:text-blood">
                AB-
              </Link>
              <Link to="/blood-education#o-positive" className="text-sm text-gray-600 hover:text-blood">
                O+
              </Link>
              <Link to="/blood-education#o-negative" className="text-sm text-gray-600 hover:text-blood">
                O-
              </Link>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4 text-trust-dark">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blood mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">
                  123 Health Avenue, Medical District, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blood mr-2" />
                <span className="text-sm text-gray-600">
                  +91 98765 43210
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blood mr-2" />
                <span className="text-sm text-gray-600">
                  help@rakthsetu.org
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-center text-gray-500">
            &copy; {new Date().getFullYear()} RakthSetu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
