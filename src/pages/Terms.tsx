
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <div className="pt-36 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using Little Ledger, you accept and agree to be bound by the terms and 
              provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Description of Service</h2>
            <p className="mb-4">
              Little Ledger is a financial tracking and ledger application that allows users to record, 
              organize, and analyze their financial transactions. The service is provided on a subscription basis.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">User Accounts</h2>
            <p className="mb-4">
              You are responsible for maintaining the confidentiality of your account and password. 
              You agree to accept responsibility for all activities that occur under your account.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Acceptable Use</h2>
            <p className="mb-4">You agree not to use the service to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit harmful or malicious content</li>
              <li>Attempt to gain unauthorized access</li>
              <li>Use the service for any illegal financial activities</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Payment and Billing</h2>
            <p className="mb-4">
              Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable 
              except as required by law or as specified in our Refund Policy.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
            <p className="mb-4">
              Little Ledger shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages resulting from your use of the service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Information</h2>
            <p className="mb-4">
              Questions about the Terms of Service should be sent to: 
              <a href="mailto:legal@littleledger.com" className="text-blush-500 hover:underline ml-1">
                legal@littleledger.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
