
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <div className="pt-36 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">30-Day Money-Back Guarantee</h2>
            <p className="mb-4">
              We offer a 30-day money-back guarantee for all new subscriptions. If you're not satisfied 
              with Little Ledger within the first 30 days of your subscription, you can request a full refund.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Refund Eligibility</h2>
            <p className="mb-4">You are eligible for a refund if:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>You request the refund within 30 days of your initial subscription</li>
              <li>You have not violated our Terms of Service</li>
              <li>You contact us through our official support channels</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Non-Refundable Items</h2>
            <p className="mb-4">The following are not eligible for refunds:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Subscription renewals (after the initial 30-day period)</li>
              <li>Physical items that have been shipped (photo books, printed materials)</li>
              <li>Custom services or consultations that have been completed</li>
              <li>Accounts that have been terminated for Terms of Service violations</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">How to Request a Refund</h2>
            <p className="mb-4">To request a refund:</p>
            <ol className="list-decimal pl-6 mb-4">
              <li>Contact our billing team at billing@littleledger.com</li>
              <li>Include your account email and reason for the refund request</li>
              <li>Allow 3-5 business days for processing</li>
              <li>Refunds will be issued to the original payment method</li>
            </ol>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Processing Time</h2>
            <p className="mb-4">
              Once approved, refunds typically take 5-10 business days to appear on your statement, 
              depending on your payment method and financial institution.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Subscription Cancellation</h2>
            <p className="mb-4">
              You can cancel your subscription at any time from your account settings. Cancellation 
              will prevent future billing but does not automatically trigger a refund for the current period.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p className="mb-4">
              For refund requests or questions about this policy, contact: 
              <a href="mailto:billing@littleledger.com" className="text-blush-500 hover:underline ml-1">
                billing@littleledger.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RefundPolicy;
