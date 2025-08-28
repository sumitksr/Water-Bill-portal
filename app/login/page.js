"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    
    // Simulate API call - you'll replace this with actual backend call
    setTimeout(() => {
      // Mock successful login
      localStorage.setItem("wb_user", JSON.stringify({
        email,
        name: "Demo User",
        id: "user_" + Math.random().toString(36).slice(2, 8)
      }));
      setLoading(false);
      window.location.href = "/";
    }, 1000);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-2xl">🔐</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your Water Bill Portal account</p>
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

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-12 rounded-xl border-2 border-gray-200 px-4 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </a>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 border-2 border-red-200 error-state">
                <p className="text-sm font-semibold">⚠️ {error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full inline-flex items-center justify-center rounded-xl px-6 py-4 text-lg font-bold transition-all duration-300 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover-raise shadow-lg'
              } text-white`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Signing in...
                </>
              ) : (
                '🔐 Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
                Sign up here
              </a>
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
            <span>💡</span>
            <span>Demo mode - any email/password will work</span>
          </div>
        </div>
      </div>
    </div>
  );
}