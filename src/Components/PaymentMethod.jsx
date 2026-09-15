import React, { useState } from "react";

const PaymentMethod = ({
  totalPrice = 0,
  onPayment,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const [upi, setUpi] = useState("");

  const [card, setCard] = useState({
    number: "",
    holder: "",
    expiry: "",
    cvv: "",
  });

  const [bank, setBank] = useState("");

  const handlePayment = () => {
    // UPI validation
    if (paymentMethod === "upi") {
      if (!upi.trim()) {
        alert("Please enter your UPI ID.");
        return;
      }
    }

    // Card validation
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

    // Net Banking validation
    if (paymentMethod === "netbanking") {
      if (!bank) {
        alert("Please select your bank.");
        return;
      }
    }

    // Cash does not need any additional details
    onPayment(paymentMethod);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Payment Method
      </h2>

      {/* OPTIONS */}
      <div className="space-y-4 mb-8">

        {/* CARD */}
        <label
          className={`flex items-center gap-4 border rounded-lg p-4 cursor-pointer ${
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
          className={`flex items-center gap-4 border rounded-lg p-4 cursor-pointer ${
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
          className={`flex items-center gap-4 border rounded-lg p-4 cursor-pointer ${
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

        {/* CASH */}
        <label
          className={`flex items-center gap-4 border rounded-lg p-4 cursor-pointer ${
            paymentMethod === "cash"
              ? "border-green-600 bg-green-50"
              : "border-gray-200"
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="cash"
            checked={paymentMethod === "cash"}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
            className="accent-green-600"
          />

          <div>
            <p className="font-semibold text-gray-800">
              Pay via Cash
            </p>

            <p className="text-sm text-gray-500">
              Pay cash at the boarding point
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
            onChange={(e) =>
              setUpi(e.target.value)
            }
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
            value={bank}
            onChange={(e) =>
              setBank(e.target.value)
            }
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

      {/* CASH */}
      {paymentMethod === "cash" && (
        <div className="border-t pt-6">

          <div className="bg-green-50 border border-green-200 rounded-lg p-5">

            <h3 className="font-semibold text-gray-800 mb-2">
              Pay via Cash
            </h3>

            <p className="text-sm text-gray-600">
              You can pay ₹{totalPrice} in cash at the
              boarding point before your journey.
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Please make sure to carry the required
              amount with you.
            </p>

          </div>

        </div>
      )}

      {/* PAY / CONFIRM BUTTON */}
      <button
        onClick={handlePayment}
        className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold"
      >
        {paymentMethod === "cash"
          ? `Confirm Booking • ₹${totalPrice}`
          : `Pay ₹${totalPrice}`}
      </button>

    </div>
  );
};

export default PaymentMethod;