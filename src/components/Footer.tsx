
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-12 bg-white border-t border-gray-100">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-blush-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold">LL</span>
            </div>
            <span className="font-semibold text-lg">Little Ledger</span>
          </div>
          
          <div className="flex flex-wrap justify-center space-x-6 mb-4 md:mb-0">
            <Link to="/privacy-policy" className="text-sm text-gray-500 hover:text-gray-700 my-1">Privacy</Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-700 my-1">Terms</Link>
            <Link to="/contact" className="text-sm text-gray-500 hover:text-gray-700 my-1">Contact</Link>
            <Link to="/refund" className="text-sm text-gray-500 hover:text-gray-700 my-1">Refund</Link>
          </div>
          
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Little Ledger
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
