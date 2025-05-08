import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <div className="bg-amber-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-amber-100">
            Have questions about Morocco? Reach out to our team for information and travel assistance
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="How can we help you?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center"
              >
                Send Message <Send size={16} className="ml-2" />
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-amber-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-amber-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Our Address</h3>
                    <p className="text-gray-600 mt-1">
                      123 Morocco Street, Marrakech Medina
                      <br />
                      Marrakech, 40000, Morocco
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="text-amber-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Phone Number</h3>
                    <p className="text-gray-600 mt-1">+212 5 24 123 456</p>
                    <p className="text-gray-600">+212 6 61 234 567 (WhatsApp)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="text-amber-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Email Address</h3>
                    <p className="text-gray-600 mt-1">info@moroccoheritage.com</p>
                    <p className="text-gray-600">support@moroccoheritage.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3398.104384727322!2d-7.989246824575061!3d31.62690024291433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d96179e51%3A0x5950b6534f87adb8!2sMarrakech%2C%20Morocco!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white rounded-lg shadow-md p-8 mt-12">
          <h2 className="text-2xl font-bold text-amber-900 mb-6 text-center">Business Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 border border-amber-200 rounded-md bg-amber-50">
              <h3 className="font-medium text-amber-800">Monday - Friday</h3>
              <p className="text-gray-600 mt-2">9:00 AM - 6:00 PM</p>
            </div>
            <div className="text-center p-4 border border-amber-200 rounded-md bg-amber-50">
              <h3 className="font-medium text-amber-800">Saturday</h3>
              <p className="text-gray-600 mt-2">10:00 AM - 4:00 PM</p>
            </div>
            <div className="text-center p-4 border border-amber-200 rounded-md bg-amber-50">
              <h3 className="font-medium text-amber-800">Sunday</h3>
              <p className="text-gray-600 mt-2">Closed</p>
            </div>
            <div className="text-center p-4 border border-amber-200 rounded-md bg-amber-50">
              <h3 className="font-medium text-amber-800">Holidays</h3>
              <p className="text-gray-600 mt-2">Hours may vary</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-amber-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg text-amber-800 mb-3">Do you offer guided tours?</h3>
              <p className="text-gray-600">
                Yes, we offer guided tours to all major historical sites in Morocco. Our experienced guides are
                knowledgeable about the history and culture of each location.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg text-amber-800 mb-3">What languages do your guides speak?</h3>
              <p className="text-gray-600">
                Our guides are fluent in Arabic, French, English, and Spanish. Some guides also speak German, Italian,
                and Japanese.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg text-amber-800 mb-3">How far in advance should I book?</h3>
              <p className="text-gray-600">
                We recommend booking at least 2-3 weeks in advance, especially during peak tourist seasons (March-May
                and September-November).
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg text-amber-800 mb-3">Do you arrange airport transfers?</h3>
              <p className="text-gray-600">
                Yes, we can arrange airport transfers to and from all major airports in Morocco. Please contact us for
                pricing and availability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}