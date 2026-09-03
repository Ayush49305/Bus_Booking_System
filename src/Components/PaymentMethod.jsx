import React, { useState } from "react";

const PaymentMethod = ({ totalPrice = 0, onPayment }) => {

  const [paymentMethod, setPaymentMethod] = useState("upi");


  const handlePayment = () => {

    onPayment(paymentMethod);

  };


  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Payment Method
      </h2>


      {/* PAYMENT OPTIONS */}
      <div className="space-y-4 mb-8">


        {/* CARD */}
        <label
          className={`flex items-center gap-4 border rounded-lg p-4 cursor-pointer transition ${
            paymentMethod === "card"
              ? "border-green-600 bg-green-50"
              : "border-gray-200"
          }`}
        >

          <input
            type="radio"
            name="payment"
            value="card"
            checked={paymentMethod === "card"}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
            className="accent-green-600"
          />

          <div>

            <p className="font-semibold text-gray-800">
              Credit / Debit Card
            </p>

            <p className="text-sm text-gray-500">
              Pay using your card
            </p>

          </div>

        </label>


        {/* UPI */}
        <label
          className={`flex items-center gap-4 border rounded-lg p-4 cursor-pointer transition ${
            paymentMethod === "upi"
              ? "border-green-600 bg-green-50"
              : "border-gray-200"
          }`}
        >

          <input
            type="radio"
            name="payment"
            value="upi"
            checked={paymentMethod === "upi"}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
            className="accent-green-600"
          />

          <div>

            <p className="font-semibold text-gray-800">
              UPI
            </p>

            <p className="text-sm text-gray-500">
              Pay using UPI ID
            </p>

          </div>

        </label>


        {/* NET BANKING */}
        <label
          className={`flex items-center gap-4 border rounded-lg p-4 cursor-pointer transition ${
            paymentMethod === "netbanking"
              ? "border-green-600 bg-green-50"
              : "border-gray-200"
          }`}
        >

          <input
            type="radio"
            name="payment"
            value="netbanking"
            checked={paymentMethod === "netbanking"}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
            className="accent-green-600"
          />

          <div>

            <p className="font-semibold text-gray-800">
              Net Banking
            </p>

            <p className="text-sm text-gray-500">
              Pay directly from your bank account
            </p>

          </div>

        </label>

      </div>


      {/* CARD */}
      {paymentMethod === "card" && (

        <div className="space-y-5 border-t pt-6">

          <h3 className="font-semibold text-gray-800">
            Card Details
          </h3>

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>

            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
            />

          </div>


          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Holder Name
            </label>

            <input
              type="text"
              placeholder="Enter card holder name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
            />

          </div>


          <div className="grid grid-cols-2 gap-5">

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>

              <input
                type="text"
                placeholder="MM/YY"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
              />

            </div>


            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>

              <input
                type="password"
                placeholder="123"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
              />

            </div>

          </div>

        </div>

      )}


      {/* UPI */}
      {paymentMethod === "upi" && (

        <div className="border-t pt-6">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            UPI ID
          </label>

          <input
            type="text"
            placeholder="example@upi"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
          />

        </div>

      )}


      {/* NET BANKING */}
      {paymentMethod === "netbanking" && (

        <div className="border-t pt-6">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Bank
          </label>

          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
          >

            <option>
              Select your bank
            </option>

            <option>
              State Bank of India
            </option>

            <option>
              HDFC Bank
            </option>

            <option>
              ICICI Bank
            </option>

            <option>
              Axis Bank
            </option>

          </select>

        </div>

      )}


      {/* PAY BUTTON */}
      <button
        onClick={handlePayment}
        className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold transition"
      >
        PAY ₹{totalPrice}
      </button>

    </div>
  );
};

export default PaymentMethod;