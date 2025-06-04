
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <div className="pt-28 pb-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Kidera Privacy Policy</h1>
            <div className="w-24 h-1.5 bg-blush-400 mx-auto rounded-full"></div>
          </div>
          <div className="prose prose-lg max-w-none bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm uppercase tracking-wider font-medium mb-8 text-center">Last updated: June 4, 2025</p>
            
            <p className="mb-6 text-gray-700 leading-relaxed">
              This Privacy Policy describes how Kidera ("we", "us", or "our") collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from www.kidera.app (the "Site"). For purposes of this Privacy Policy, "you" and "your" means you as the user of the Services, whether you are a customer, website visitor, or another individual whose information we have collected pursuant to this Privacy Policy.
            </p>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Please read this Privacy Policy carefully. By using and accessing any of the Services, you agree to the collection, use, and disclosure of your information as described in this Privacy Policy. If you do not agree, please do not use the Services.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-6 pb-2 border-b border-gray-100 text-gray-800">Changes to This Privacy Policy</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">We may update this Privacy Policy from time to time. We will post the revised version on the Site with a new "Last updated" date.</p>

            <h2 className="text-2xl font-semibold mt-12 mb-6 pb-2 border-b border-gray-100 text-gray-800">How We Collect and Use Your Personal Information</h2>
            <p className="mb-4 text-gray-700">To provide the Services, we collect personal information about you from:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Information you provide directly</li>
              <li>Cookies and usage tracking</li>
              <li>Information from third-party service providers (e.g., Supabase, Stripe, Google)</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800">Information We Collect Directly</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Contact details: name, email, phone number</li>
              <li>Authentication info: email address, Google account details</li>
              <li>Journal entry content you submit (text, photos, videos, audio)</li>
              <li>Customer support messages you send us</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800">Information We Collect Automatically (Usage Data)</h3>
            <p className="mb-4">We may collect information via cookies and analytics tools, including:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Device and browser info</li>
              <li>IP address</li>
              <li>Interaction logs with the Site</li>
              <li>Entry creation timestamps</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800">Information from Third Parties</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Supabase (user authentication)</li>
              <li>Cloudflare (media storage)</li>
              <li>Stripe (if used for payments)</li>
              <li>Google OAuth (if you log in via Google)</li>
              <li>OpenAI (Timeline Summaries, Image Generation)</li>
            </ul>
            <p className="mb-6 text-gray-700 leading-relaxed">We treat this information per this Privacy Policy. We are not responsible for the privacy practices of third parties.</p>

            <h2 className="text-2xl font-semibold mt-12 mb-6 pb-2 border-b border-gray-100 text-gray-800">How We Use Your Information</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>To authenticate users and provide access to their entries</li>
              <li>To support user accounts and data backups</li>
              <li>To improve the Site and personalize your experience</li>
              <li>To send important service-related communications</li>
              <li>To provide customer support</li>
              <li>To comply with legal obligations and enforce our terms</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-12 mb-6 pb-2 border-b border-gray-100 text-gray-800">Cookies</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">We use cookies for session management, analytics, and optional preferences. You can opt out via your browser settings. Blocking cookies may affect functionality.</p>

            <h2 className="text-2xl font-semibold mt-12 mb-6 pb-2 border-b border-gray-100 text-gray-800">Disclosure of Personal Information</h2>
            <p className="mb-4 text-gray-700">We may share your personal data with:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Hosting and storage providers (e.g., Supabase, Cloudflare)</li>
              <li>Authentication and email providers (e.g., Google, SMTP)</li>
              <li>Analytics and error tracking services (Google Analytics)</li>
              <li>Legal entities in response to legal requests or for compliance</li>
            </ul>
            <p className="mb-6 text-gray-700 leading-relaxed">We do not sell or share personal information with advertisers.</p>

            <h2 className="text-2xl font-semibold mt-12 mb-6 pb-2 border-b border-gray-100 text-gray-800">Children's Data</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">Kidera is not intended for children or anyone under 18 years of age. We do not knowingly collect data from children. If you believe your child has provided us with data, contact us at help@kidera.co.</p>

            <h2 className="text-2xl font-semibold mt-12 mb-6 pb-2 border-b border-gray-100 text-gray-800">Data Security & Retention</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">We take reasonable steps to secure your information but cannot guarantee complete protection. Data is retained as long as needed to provide services or comply with legal obligations.</p>

            <h2 className="text-2xl font-semibold mt-12 mb-6 pb-2 border-b border-gray-100 text-gray-800">Your Rights</h2>
            <p className="mb-4 text-gray-700">Depending on your region, you may have rights including:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Access to your data</li>
              <li>Request correction or deletion</li>
              <li>Withdraw consent</li>
              <li>Object to processing</li>
              <li>Export your data (portability)</li>
              <li>Opt out of promotional emails</li>
            </ul>
            <p className="mb-6 text-gray-700 leading-relaxed">
              To exercise any of these rights, contact:
              <br />
              📧 <a href="mailto:help@kidera.co" className="text-blush-500 hover:underline">help@kidera.co</a>
            </p>
            <p className="text-gray-700 leading-relaxed">We may require identity verification before processing requests.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
