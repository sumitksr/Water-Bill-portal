import Image from "next/image";

export default function Home() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
      <div className="space-y-8">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            Pay your <span className="gradient-text">water bill</span> in
            seconds
          </h1>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-lg">
            Secure, fast, and convenient. Search your bill by Account Number and
            pay with your preferred method. Save receipts and view payment
            history anytime.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/pay"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 text-base font-semibold hover:from-blue-700 hover:to-blue-800 hover-raise shadow-lg"
          >
            💳 Pay Bill Now
          </a>
          <a
            href="/history"
            className="inline-flex items-center justify-center rounded-2xl border-2 border-gray-200 bg-white/80 backdrop-blur px-8 py-4 text-base font-semibold hover:bg-white hover:border-gray-300 hover-raise shadow-lg"
          >
            📊 View History
          </a>
        </div>
      </div>
      <div className="card p-8 bg-white/90 backdrop-blur">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">🔍</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Quick Lookup</h2>
          </div>
          <form action="/pay" method="GET" className="space-y-5">
            <div className="space-y-2">
              <label
                className="text-sm font-semibold text-gray-700"
                htmlFor="acct"
              >
                Account Number
              </label>
              <input
                id="acct"
                name="acct"
                required
                placeholder="e.g., ACC-102938"
                className="w-full h-12 rounded-xl border-2 border-gray-200 px-4 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
              />
            </div>
            <button
              className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 text-base font-semibold hover:from-blue-700 hover:to-blue-800 hover-raise shadow-lg transition-all duration-300"
              type="submit"
            >
              Continue →
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
}
