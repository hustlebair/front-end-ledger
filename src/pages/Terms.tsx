
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <div className="pt-28 pb-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Kidera – Terms of Service</h1>
            <div className="w-24 h-1.5 bg-blush-400 mx-auto rounded-full"></div>
          </div>
          <div className="prose prose-lg max-w-none bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm uppercase tracking-wider font-medium mb-8 text-center">Effective Date: June 4, 2025</p>
            
            <p className="text-sm text-gray-500 text-center mt-12">
              &copy; {new Date().getFullYear()} Kidera. All rights reserved.
            </p>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Welcome to Kidera! These Terms of Service ("Terms") govern your access to and use of Kidera ("we", "our", or "us"), including our website www.kidera.app (the "Site") and all associated services, software, and content (collectively, the "Services").
            </p>
            <p className="mb-6 text-gray-700 leading-relaxed">
              By accessing or using Kidera, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Services.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-6 pb-2 border-b border-gray-100 text-gray-800">1. Description of Service</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Kidera is a memory journaling and media storage platform designed for parents to document their child's growth through text entries, photos, videos, and audio notes. It is offered on a subscription or free-tier basis and may include AI features to summarize or organize content over time.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-6 pb-2 border-b border-gray-100 text-gray-800">2. User Accounts</h2>
            <p className="mb-4 text-gray-700 leading-relaxed">
              To use certain features, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials and agree to accept full responsibility for all activities that occur under your account.
            </p>
            <p className="mb-6 text-gray-700 leading-relaxed">
              If you believe your account has been compromised, notify us immediately at <a href="mailto:help@kidera.co" className="text-blush-500 hover:underline">help@kidera.co</a>.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-6 pb-2 border-b border-gray-100 text-gray-800">3. Acceptable Use</h2>
            <p className="mb-4 text-gray-700">You agree not to use Kidera to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Violate any applicable law or regulation</li>
              <li>Infringe the rights of any third party (including intellectual property rights)</li>
              <li>Upload or share harmful, abusive, or malicious content</li>
              <li>Attempt to access unauthorized data or systems</li>
              <li>Use the platform for financial fraud, spam, or illegal activity</li>
              <li>Upload pornography or sexually explicit content</li>
            </ul>
            <p className="mb-6 text-gray-700 leading-relaxed">We reserve the right to suspend or terminate any account that violates these terms.</p>

            <h2 className="text-2xl font-semibold mt-12 mb-6 pb-2 border-b border-gray-100 text-gray-800">4. Content Ownership</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              You retain full ownership of the content (journal entries, photos, videos, audio) you upload.
              <br /><br />
              By uploading content, you grant Kidera a worldwide, non-exclusive, royalty-free license to store, display, and process this content solely for the purpose of providing the Services to you.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-6 pb-2 border-b border-gray-100 text-gray-800">5. Payment and Billing</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Kidera offers both free and paid subscription tiers. Paid plans are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law or our stated Refund Policy.
              <br /><br />
              You may cancel your subscription at any time, and you will continue to have access to the paid features until the end of your billing period.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-6 pb-2 border-b border-gray-100 text-gray-800">6. Privacy and Data</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Your use of Kidera is subject to our <a href="/privacy-policy" className="text-blush-500 hover:underline">Privacy Policy</a>, which explains how we collect, store, and use your data.
              <br /><br />
              By using Kidera, you acknowledge that we may process your data in accordance with our Privacy Policy.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-6 pb-2 border-b border-gray-100 text-gray-800">7. User-Generated Content</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Some features allow you to upload, store, or share personal content. You are solely responsible for the legality and appropriateness of this content.
              <br /><br />
              We reserve the right to review and remove any content that violates these Terms or is otherwise objectionable, without prior notice.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-6 pb-2 border-b border-gray-100 text-gray-800">8. Service Availability & Modifications</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              We aim to keep the Services available and error-free, but we do not guarantee uninterrupted access. We may modify, suspend, or discontinue parts of the platform at any time, with or without notice.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-6 pb-2 border-b border-gray-100 text-gray-800">9. Limitation of Liability</h2>
            <p className="mb-4 text-gray-700">To the fullest extent permitted by law, Kidera shall not be liable for:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Any indirect, incidental, special, or consequential damages</li>
              <li>Loss of data, profits, or business opportunities</li>
              <li>Service outages, third-party service failures, or user-generated content issues</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-12 mb-6 pb-2 border-b border-gray-100 text-gray-800">10. Termination</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              You may cancel your account at any time. We may suspend or terminate your access to the Services if you violate these Terms, act maliciously, or cause harm to the platform.
              <br /><br />
              Upon termination, we will retain your data for a reasonable period (typically 30 days) to allow you to export it, after which it may be permanently deleted.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-6 pb-2 border-b border-gray-100 text-gray-800">11. Governing Law</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              These Terms are governed by the laws of the United States. All disputes shall be handled in accordance with applicable law.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-6 pb-2 border-b border-gray-100 text-gray-800">12. Contact Us</h2>
            <p className="mb-4 text-gray-700">
              If you have any questions about these Terms or your account, contact:
            </p>
            <p className="mb-6 text-gray-700 leading-relaxed">
              📧 <a href="mailto:help@kidera.co" className="text-blush-500 hover:underline">help@kidera.co</a>
              <br />
              📍 Kidera, 39520 Murrieta Hot Springs Rd, ste 219 #2042, Murrieta CA 92563
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
