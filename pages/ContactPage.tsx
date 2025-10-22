
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-stone-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-stone-700">Get In Touch</h1>
          <p className="mt-4 text-lg text-stone-500">
            Have a question, suggestion, or just want to say hi? We'd love to hear from you!
          </p>
        </div>
        <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg">
          <form action="https://formspree.io/f/your_form_id" method="POST">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-600">Full Name</label>
                <input type="text" name="name" id="name" required className="mt-1 block w-full px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-600">Email Address</label>
                <input type="email" name="email" id="email" required className="mt-1 block w-full px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400" />
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="message" className="block text-sm font-medium text-stone-600">Message</label>
              <textarea id="message" name="message" rows={5} required className="mt-1 block w-full px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400"></textarea>
            </div>
            <div className="mt-6 text-center">
              <button type="submit" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-amber-400 hover:bg-amber-500 transition-colors duration-300">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
