import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Contact = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-[70vh] px-6 py-12">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-4xl font-semibold mb-6">
            Contact Us
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">
                Customer Support
              </h2>

              <p className="text-gray-600 mb-2">
                Email: support@greenbus.com
              </p>

              <p className="text-gray-600">
                Phone: +91 98765 43210
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">
                Office
              </h2>

              <p className="text-gray-600">
                Green Bus Online Ticket Booking
              </p>

              <p className="text-gray-600">
                India
              </p>
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}

export default Contact