
import { Link } from 'react-router-dom';

const Footer = () => {
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="py-12 bg-white border-t border-gray-100">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <img 
              src="/images/kidera_logo.png" 
              alt="Kidera" 
              className="h-8 w-auto"
            />
          </div>
          
          <div className="flex flex-wrap justify-center space-x-6 mb-4 md:mb-0">
            <Link 
              to="/privacy-policy" 
              onClick={handleLinkClick}
              className="text-sm text-gray-500 hover:text-gray-700 my-1"
            >
              Privacy
            </Link>
            <Link 
              to="/terms" 
              onClick={handleLinkClick}
              className="text-sm text-gray-500 hover:text-gray-700 my-1"
            >
              Terms
            </Link>
            <Link 
              to="/contact" 
              onClick={handleLinkClick}
              className="text-sm text-gray-500 hover:text-gray-700 my-1"
            >
              Contact
            </Link>
            <Link 
              to="/refund" 
              onClick={handleLinkClick}
              className="text-sm text-gray-500 hover:text-gray-700 my-1"
            >
              Refund
            </Link>
          </div>
          
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Kidera
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
