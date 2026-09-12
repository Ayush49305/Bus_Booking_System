import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Help = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-[70vh] px-6 py-12">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-4xl font-semibold mb-6">
            Help & Support
          </h1>

          <div className="space-y-4 text-gray-700 text-lg">

            <p>
              Need help with your bus booking? We are here to help.
            </p>

            <div className="border rounded-lg p-5">
              <h2 className="text-xl font-semibold mb-2">
                How to Book a Ticket?
              </h2>
              <p>
                Enter your departure city, destination city and journey
                date. Select a bus, choose your seat and complete the
                passenger and payment details.
              </p>
            </div>

            <div className="border rounded-lg p-5">
              <h2 className="text-xl font-semibold mb-2">
                How to View My Booking?
              </h2>
              <p>
                Click on My Booking from the navigation bar to view your
                booked tickets.
              </p>
            </div>

            <div className="border rounded-lg p-5">
              <h2 className="text-xl font-semibold mb-2">
                Need More Help?
              </h2>
              <p>
                Contact our support team for further assistance.
              </p>
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}

export default Help