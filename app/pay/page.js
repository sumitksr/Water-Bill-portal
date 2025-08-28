"use client";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";

function getQueryParam(name) {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || "";
}

function generateMockBill(accountNumber) {
  const baseAmount = 325.5;
  const lateFee = accountNumber === "ACC-0001" ? 25 : 0;
  const usageGallons = 4200;
  return {
    accountNumber,
    name: accountNumber === "ACC-0001" ? "Demo User" : "",
    address: accountNumber === "ACC-0001" ? "123 Demo Street" : "",
    dueDate: format(new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), "PP"),
    usageGallons,
    amountDue: +(baseAmount + lateFee).toFixed(2),
  };
}

export default function PayPage() {
  const [accountNumber, setAccountNumber] = useState("");
  const [bill, setBill] = useState(null);
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const initial = getQueryParam("acct");
    if (initial) {
      setAccountNumber(initial);
      setBill(generateMockBill(initial));
    }
  }, []);

  const total = useMemo(() => (bill ? bill.amountDue : 0), [bill]);

  function validate() {
    if (!accountNumber || accountNumber.length < 5) return "Enter a valid account number";
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return "Enter a valid email";
    if (!card || !/^\d{16}$/.test(card.replaceAll(" ", ""))) return "Enter a 16-digit card number";
    if (!bill) return "Lookup the bill first";
    return "";
  }

  function handleLookup(e) {
    e.preventDefault();
    setError("");
    setBill(generateMockBill(accountNumber));
  }

  function handlePay(e) {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      const receipt = {
        id: "RCPT-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
        ts: new Date().toISOString(),
        accountNumber,
        email,
        amount: total,
        name: bill?.name || "",
      };
      const prev = JSON.parse(localStorage.getItem("wb_history") || "[]");
      localStorage.setItem("wb_history", JSON.stringify([receipt, ...prev]));
      setProcessing(false);
      window.location.href = `/receipt?id=${encodeURIComponent(receipt.id)}`;
    }, 900);
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">💳 Pay Bill</h1>
          <p className="text-gray-600">Enter your account number to get started</p>
        </div>
        
        <div className="card p-8 bg-white/90 backdrop-blur">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">🔍</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Account Lookup</h2>
          </div>
          <form onSubmit={handleLookup} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700" htmlFor="acct">Account Number</label>
              <input 
                id="acct" 
                value={accountNumber} 
                onChange={(e) => setAccountNumber(e.target.value)} 
                placeholder="e.g., ACC-0001" 
                className="w-full h-12 rounded-xl border-2 border-gray-200 px-4 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300" 
              />
            </div>
            <button className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 text-base font-semibold hover:from-blue-700 hover:to-blue-800 hover-raise shadow-lg transition-all duration-300" type="submit">
              🔍 Lookup Bill
            </button>
          </form>
        </div>

        {bill && (
          <div className="card p-8 bg-white/90 backdrop-blur">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <span className="text-white font-bold">📄</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Bill Details</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Account</span>
                <span className="font-semibold text-gray-900">{bill.accountNumber}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Name</span>
                <span className="font-semibold text-gray-900">{bill.name || "-"}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Address</span>
                <span className="font-semibold text-gray-900">{bill.address || "-"}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Usage</span>
                <span className="font-semibold text-gray-900">{bill.usageGallons} gal</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Due Date</span>
                <span className="font-semibold text-gray-900">{bill.dueDate}</span>
              </div>
              <div className="flex justify-between items-center py-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl px-4 border-2 border-blue-200">
                <span className="text-blue-700 font-bold text-lg">Amount Due</span>
                <span className="font-bold text-2xl text-blue-700">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">💰 Payment</h2>
          <p className="text-gray-600">Complete your payment securely</p>
        </div>
        
        <div className="card p-8 bg-white/90 backdrop-blur">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <span className="text-white font-bold">💳</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Payment Details</h3>
          </div>
          
          <form onSubmit={handlePay} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700" htmlFor="email">Receipt Email</label>
              <input 
                id="email" 
                type="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="you@example.com" 
                className="w-full h-12 rounded-xl border-2 border-gray-200 px-4 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700" htmlFor="card">Card Number</label>
              <input 
                id="card" 
                value={card} 
                onChange={(e) => setCard(e.target.value)} 
                placeholder="1234 5678 9012 3456" 
                className="w-full h-12 rounded-xl border-2 border-gray-200 px-4 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300" 
                inputMode="numeric" 
              />
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 border-2 border-red-200 error-state">
                <p className="text-sm font-semibold">⚠️ {error}</p>
              </div>
            )}

            <button 
              disabled={processing} 
              className={`w-full inline-flex items-center justify-center rounded-xl px-6 py-4 text-lg font-bold transition-all duration-300 ${
                processing 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover-raise shadow-lg'
              } text-white`}
              type="submit"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Processing...
                </>
              ) : (
                `💰 Pay $${total.toFixed(2)}`
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}