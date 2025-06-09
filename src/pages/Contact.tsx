
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageSquare, HelpCircle } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

const ContactForm = () => {
  const [state, handleSubmit] = useForm("xkgbjqlg");
  
  if (state.succeeded) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-green-600 mb-4">Thanks for your message! We'll get back to you soon.</p>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blush-500"
          placeholder="your@email.com"
        />
        <ValidationError 
          prefix="Email" 
          field="email"
          errors={state.errors}
          className="text-red-500 text-sm mt-1"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blush-500"
          placeholder="Tell us more about your question or issue..."
        />
        <ValidationError 
          prefix="Message" 
          field="message"
          errors={state.errors}
          className="text-red-500 text-sm mt-1"
        />
      </div>
      <Button 
        type="submit" 
        disabled={state.submitting}
        className="w-full"
        style={{
          background: 'linear-gradient(to right, #F28CA5, #B187F2)',
          border: 'none',
        }}
      >
        {state.submitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
};

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <div className="pt-36 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600">
              Get in touch with our team using the form below or email <a href="mailto:help@kidera.co" className="text-blue-600 hover:underline">help@kidera.co</a>.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
