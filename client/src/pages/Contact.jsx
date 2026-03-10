import React, { useState } from 'react'
import { assets } from '../assets/data'

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      // Reset after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
      e.target.reset(); // Clear the form
    }, 800);
  };

  return (
    <section className="pt-24 pb-16 min-h-[80vh] bg-slate-50/50">
      <div className="max-padd-container relative">

        {/* Header */}
        <div className="flex flex-col gap-y-4 mb-12 text-center max-w-2xl mx-auto">
          <h2 className="h2 text-4xl font-extrabold text-slate-800">Get in Touch</h2>
          <p className="text-gray-500 text-lg">
            Have a question about our rental fleet, pricing, or locations? Our team is here to help you hit the road.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* Left Column: Contact Information */}
          <div className="w-full lg:w-1/3 flex flex-col gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-6 h-full">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Contact Info</h3>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-50 flexCenter flex-shrink-0">
                  <img src={assets.pin} alt="Address" className="w-5 h-5 opacity-70" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-1">Our Location</h4>
                  <p className="text-gray-500 leading-relaxed">789 Park Lane, New City, Colombo.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-50 flexCenter flex-shrink-0">
                  <img src={assets.phone} alt="Phone" className="w-5 h-5 opacity-70" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-1">Phone Number</h4>
                  <p className="text-gray-500">+94 77 123-4560</p>
                  <p className="text-gray-500">+94 77 123-5360</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-50 flexCenter flex-shrink-0">
                  <img src={assets.mail} alt="Email" className="w-5 h-5 opacity-70" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-1">Email Address</h4>
                  <p className="text-gray-500">support@rentroo.com</p>
                  <p className="text-gray-500">info@rentroo.com</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-auto pt-8 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-slate-50 hover:bg-black group flexCenter transition-colors">
                    <img src={assets.facebook} alt="Facebook" className="w-4 h-4 opacity-70 group-hover:invert group-hover:opacity-100 transition-all" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-slate-50 hover:bg-black group flexCenter transition-colors">
                    <img src={assets.twitter} alt="Twitter" className="w-4 h-4 opacity-70 group-hover:invert group-hover:opacity-100 transition-all" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-slate-50 hover:bg-black group flexCenter transition-colors">
                    <img src={assets.instagram} alt="Instagram" className="w-4 h-4 opacity-70 group-hover:invert group-hover:opacity-100 transition-all" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-slate-50 hover:bg-black group flexCenter transition-colors">
                    <img src={assets.linkedin} alt="LinkedIn" className="w-4 h-4 opacity-70 group-hover:invert group-hover:opacity-100 transition-all" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="w-full lg:w-2/3 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Send us a Message</h3>
            <form className="flex flex-col gap-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-sm font-semibold text-slate-700">First Name <span className="text-red-500">*</span></label>
                  <input type="text" id="firstName" placeholder="John" className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-sm font-semibold text-slate-700">Last Name <span className="text-red-500">*</span></label>
                  <input type="text" id="lastName" placeholder="Doe" className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address <span className="text-red-500">*</span></label>
                  <input type="email" id="email" placeholder="john@example.com" className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-slate-700">Phone Number</label>
                  <input type="tel" id="phone" placeholder="+1 (555) 000-0000" className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-semibold text-slate-700">Subject <span className="text-red-500">*</span></label>
                <input type="text" id="subject" placeholder="How can we help you?" className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all" required />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold text-slate-700">Message <span className="text-red-500">*</span></label>
                <textarea id="message" rows="5" placeholder="Write your message here..." className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none" required></textarea>
              </div>

              <button type="submit" disabled={isSubmitted} className={`bg-slate-900 border border-slate-900 text-white rounded-xl py-4 mt-4 w-full text-lg font-semibold hover:bg-slate-800 transition-all duration-300 ${isSubmitted ? 'opacity-70 cursor-not-allowed' : ''}`}>
                {isSubmitted ? "Message Sent!" : "Send Message"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact