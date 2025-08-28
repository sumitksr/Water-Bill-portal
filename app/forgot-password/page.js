"use client";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    
    if (!email) {
      return;
    }

    setLoading(true);
    
    // Simulate API call - you'll replace this with actual backend call
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1000);
  }

  if (sent) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-2xl">📧</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">Check Your Email</h1>
              <p className="text-gray-600">We've sent password reset instructions to {email}</p>
            </div>
          </div>

          <div className="card p-8 bg-white/90 backdrop-blur text-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-gray-900">What's Next?</h2>
                <p className="text-gray-600">
                  Click the link in the email to reset your password. The link will expire in 24 hours.
                </p>
              </div>
              
              <div className="flex flex-col gap-3">
                <a
                  href="/login"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 text-base font-semibold hover:from-blue-700 hover:to-blue-800 hover-raise shadow-lg"
                >
                  🔐 Back to Sign In
                </a>
                <button
                  onClick={() => setSent(false)}
                  className="inline-flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white px-6 py-3 text-base font-semibold hover:bg-gray-50 hover:border-gray-300 hover-raise shadow-sm"
                >
                  📧 Send Again
                </button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
              <span>💡</span>
              <span>Check your spam folder if you don't see the email</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-2xl">🔑</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Forgot Password?</h1>
            <p className="text-gray-600">No worries! Enter your email and we'll send you reset instructions</p>
          </div>
        </div>

        <div className="card p-8 bg-white/90 backdrop-blur">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-12 rounded-xl border-2 border-gray-200 px-4 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full inline-flex items-center justify-center rounded-xl px-6 py-4 text-lg font-bold transition-all duration-300 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 hover-raise shadow-lg'
              } text-white`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Sending...
                </>
              ) : (
                '📧 Send Reset Link'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Remember your password?{' '}
              <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                Sign in here
              </a>
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-700 text-sm font-medium">
            <span>🔒</span>
            <span>Demo mode - any email will work</span>
          </div>
        </div>
      </div>
    </div>
  );
}