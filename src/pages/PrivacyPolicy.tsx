
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <div className="pt-36 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
            <p className="mb-4">
              We collect information you provide directly to us, such as when you create an account, 
              use our services, or contact us for support. This includes:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Account information (email, name)</li>
              <li>Financial transaction data you input</li>
              <li>Usage data and analytics</li>
              <li>Device information and IP address</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide and maintain our services</li>
              <li>Process transactions and manage your account</li>
              <li>Send you updates and support communications</li>
              <li>Improve our services and develop new features</li>
              <li>Ensure security and prevent fraud</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Data Storage and Security</h2>
            <p className="mb-4">
              Your data is stored securely using industry-standard encryption. We use Supabase for data storage, 
              which provides enterprise-grade security and compliance. We implement appropriate technical and 
              organizational measures to protect your personal information.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
            <p className="mb-4">Under GDPR and CCPA, you have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your data</li>
              <li>Export your data</li>
              <li>Opt out of data processing</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at: 
              <a href="mailto:privacy@littleledger.com" className="text-blush-500 hover:underline ml-1">
                privacy@littleledger.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
