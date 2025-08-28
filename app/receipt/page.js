"use client";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";

function getQueryParam(name) {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || "";
}

export default function ReceiptPage() {
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    const id = getQueryParam("id");
    const all = JSON.parse(localStorage.getItem("wb_history") || "[]");
    const found = all.find((r) => r.id === id) || null;
    setReceipt(found);
  }, []);

  const when = useMemo(() => (receipt ? format(new Date(receipt.ts), "PPpp") : ""), [receipt]);

  if (!receipt) {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center mx-auto">
            <span className="text-3xl">❌</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Receipt Not Found</h1>
          <p className="text-gray-600 text-lg">The receipt you're looking for doesn't exist or may have been removed.</p>
        </div>
        
        <div className="card p-8 bg-white/90 backdrop-blur text-center">
          <div className="space-y-6">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto">
              <span className="text-white font-bold">💳</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-900">Make a New Payment</h2>
              <p className="text-gray-600">Start a new payment to generate a receipt</p>
            </div>
            <a href="/pay" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 text-base font-semibold hover:from-blue-700 hover:to-blue-800 hover-raise shadow-lg">
              💳 Pay Bill Now
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <span className="text-3xl">✅</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Payment Successful!</h1>
        <p className="text-gray-600 text-lg">Your payment has been processed successfully</p>
      </div>

      <div className="card p-8 bg-white/90 backdrop-blur">
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-gray-200 pb-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <span className="text-white font-bold">🧾</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Payment Receipt</h2>
                <p className="text-gray-600">Transaction completed</p>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                {receipt.id}
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Transaction Date</label>
                <p className="text-lg font-semibold text-gray-900">{format(new Date(receipt.ts), "MMMM dd, yyyy")}</p>
                <p className="text-sm text-gray-600">{format(new Date(receipt.ts), "h:mm:ss a")}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Account Number</label>
                <p className="text-lg font-semibold text-gray-900">{receipt.accountNumber}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Receipt Email</label>
              <p className="text-lg font-semibold text-gray-900">{receipt.email}</p>
            </div>

            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
              <div className="flex justify-between items-center">
                <div>
                  <label className="text-sm font-semibold text-green-700 uppercase tracking-wide">Amount Paid</label>
                  <p className="text-3xl font-bold text-green-700">${receipt.amount.toFixed(2)}</p>
                </div>
                <div className="h-16 w-16 rounded-full bg-green-200 flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button 
              onClick={() => window.print()} 
              className="flex-1 inline-flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white px-6 py-3 text-base font-semibold hover:bg-gray-50 hover:border-gray-300 hover-raise shadow-sm transition-all duration-300"
            >
              🖨️ Print Receipt
            </button>
            <a 
              href="/history" 
              className="flex-1 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 text-base font-semibold hover:from-blue-700 hover:to-blue-800 hover-raise shadow-lg"
            >
              📊 View All History
            </a>
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
          <span>💡</span>
          <span>Keep this receipt for your records</span>
        </div>
      </div>
    </div>
  );
}