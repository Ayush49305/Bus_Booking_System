import React, { useState } from "react";

const PaymentMethod = ({
  totalPrice = 0,
  onPayment,
}) => {

  const [paymentMethod, setPaymentMethod] =
    useState("upi");

  const [upi, setUpi] = useState("");

  const [card, setCard] = useState({
    number: "",
    holder: "",
    expiry: "",
    cvv: "",
  });

  const [bank, setBank] = useState("");


  const handlePayment = () => {

    if (paymentMethod === "upi") {

      if (!upi.trim()) {

        alert("Please enter your UPI ID.");

        return;
      }

    }


    if (paymentMethod === "card") {

      if (
        !card.number ||
        !card.holder ||
        !card.expiry ||
        !card.cvv
      ) {

        alert("Please fill all card details.");

        return;
      }

    }


    if (paymentMethod === "netbanking") {

      if (!bank) {

        alert("Please select your bank.");

        return;
      }

    }


    onPayment(paymentMethod);

  };


  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Payment Method
      </h2>


      {/* OPTIONS */}
      <div className="space-y-4 mb-8">

        {[
          ["card", "Credit / Debit Card", "Pay using your card"],
          ["upi", "UPI", "Pay using UPI ID"],
          ["netbanking", "Net Banking", "Pay directly from your bank account"],
        ].map(([value, title, subtitle]) => (

          <label
            key={value}
            className={`flex items-center gap-4 border rounded-lg p-4 cursor-pointer ${
              paymentMethod === value
                ? "border-green-600 bg-green-50"
                : "border-gray-200"
            }`}
          >

            <input
              type="radio"
              name="payment"
              value={value}
              checked={paymentMethod === value}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
              className="accent-green-600"
            />

            <div>

              <p className="font-semibold text-gray-800">
                {title}
              </p>

              <p className="text-sm text-gray-500">
                {subtitle}
              </p>

            </div>

          </label>

        ))}

      </div>


      {/* CARD */}
      {paymentMethod === "card" && (

        <div className="space-y-5 border-t pt-6">

          <h3 className="font-semibold text-gray-800">
            Card Details
          </h3>

          <input
            type="text"
            value={card.number}
            onChange={(e) =>
              setCard({
                ...card,
                number: e.target.value,
              })
            }
            placeholder="1234 5678 9012 3456"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:border-green-600"
          />

          <input
            type="text"
            value={card.holder}
            onChange={(e) =>
              setCard({
                ...card,
                holder: e.target.value,
              })
            }
            placeholder="Card holder name"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:border-green-600"
          />

          <div className="grid grid-cols-2 gap-5">

            <input
              type="text"
              value={card.expiry}
              onChange={(e) =>
                setCard({
                  ...card,
                  expiry: e.target.value,
                })
              }
              placeholder="MM/YY"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-green-600"
            />

            <input
              type="password"
              value={card.cvv}
              onChange={(e) =>
                setCard({
                  ...card,
                  cvv: e.target.value,
                })
              }
              placeholder="CVV"
              maxLength="3"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-green-600"
            />

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
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
            placeholder="example@upi"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
          />

        </div>

      )}


      {/* BANK */}
      {paymentMethod === "netbanking" && (

        <div className="border-t pt-6">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Bank
          </label>

          <select
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
          >

            <option value="">
              Select your bank
            </option>

            <option value="State Bank of India">
              State Bank of India
            </option>

            <option value="HDFC Bank">
              HDFC Bank
            </option>

            <option value="ICICI Bank">
              ICICI Bank
            </option>

            <option value="Axis Bank">
              Axis Bank
            </option>

            <option value="Bank of India">
              Bank of India
            </option>

          </select>

        </div>

      )}


      {/* PAY */}
      <button
        onClick={handlePayment}
        className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold"
      >
        Pay ₹{totalPrice}
      </button>

    </div>
  );
};

export default PaymentMethod;