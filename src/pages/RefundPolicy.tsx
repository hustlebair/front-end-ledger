import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <div className="pt-28 pb-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Refund Policy</h1>
            <div className="w-24 h-1.5 bg-blush-400 mx-auto rounded-full"></div>
          </div>
          <div className="prose prose-lg max-w-none bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm uppercase tracking-wider font-medium mb-8 text-center">Effective Date: June 9, 2025</p>
            
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                At Kidera, we do not offer refunds for any subscription payments that have already been processed. All purchases are final.
              </p>
              
              <p>
                You can cancel your subscription at any time to avoid being charged for the next billing cycle. Subscription management is handled through Stripe, and cancellation will take effect at the end of your current billing period.
              </p>
              
              <p>
                If you need help managing your subscription, please contact us at <a href="mailto:help@kidera.co" className="text-blush-500 hover:underline">help@kidera.co</a>
              </p>
            
            </div>

            <p className="text-sm text-gray-500 text-center mt-12">
              &copy; {new Date().getFullYear()} Kidera. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RefundPolicy;
