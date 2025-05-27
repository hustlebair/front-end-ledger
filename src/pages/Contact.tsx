
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageSquare, HelpCircle } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <div className="pt-36 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600">
              We're here to help! Get in touch with our team.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blush-100 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-blush-500" />
                </div>
                <CardTitle className="text-lg">General Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Questions about your account or general inquiries
                </p>
                <Button variant="outline" asChild>
                  <a href="mailto:support@littleledger.com">
                    support@littleledger.com
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blush-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-blush-500" />
                </div>
                <CardTitle className="text-lg">Sales & Billing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Questions about pricing, billing, or subscriptions
                </p>
                <Button variant="outline" asChild>
                  <a href="mailto:billing@littleledger.com">
                    billing@littleledger.com
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blush-100 rounded-lg flex items-center justify-center mb-4">
                  <HelpCircle className="h-6 w-6 text-blush-500" />
                </div>
                <CardTitle className="text-lg">Technical Help</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Technical issues, bug reports, or feature requests
                </p>
                <Button variant="outline" asChild>
                  <a href="mailto:tech@littleledger.com">
                    tech@littleledger.com
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blush-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blush-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blush-500"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea 
                    rows={5}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blush-500"
                    placeholder="Tell us more about your question or issue..."
                  />
                </div>
                <Button 
                  className="w-full"
                  style={{
                    background: 'linear-gradient(to right, #F28CA5, #B187F2)',
                    border: 'none',
                  }}
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
