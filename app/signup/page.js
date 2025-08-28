"use client";
import { useState } from "react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountNumber: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  function validateForm() {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      return "Please fill in all required fields";
    }
    
    if (formData.password !== formData.confirmPassword) {
      return "Passwords don't match";
    }
    
    if (formData.password.length < 6) {
      return "Password must be at least 6 characters";
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "Please enter a valid email address";
    }
    
    return "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    
    // Simulate API call - you'll replace this with actual backend call
    setTimeout(() => {
      // Mock successful signup
      localStorage.setItem("wb_user", JSON.stringify({
        email: formData.email,
        name: formData.name,
        id: "user_" + Math.random().toString(36).slice(2, 8),
        accountNumber: formData.accountNumber || "ACC-" + Math.random().toString(36).slice(2, 6).toUpperCase()
      }));
      setLoading(false);
      window.location.href = "/";
    }, 1200);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-2xl">✨</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600">Join Water Bill Portal to manage your payments</p>
          </div>
        </div>

        <div className="card p-8 bg-white/90 backdrop-blur">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700" htmlFor="name">
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full h-12 rounded-xl border-2 border-gray-200 px-4 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  className="w-full h-12 rounded-xl border-2 border-gray-200 px-4 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700" htmlFor="email">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full h-12 rounded-xl border-2 border-gray-200 px-4 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700" htmlFor="accountNumber">
                Account Number (Optional)
              </label>
              <input
                id="accountNumber"
                name="accountNumber"
                type="text"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="ACC-123456"
                className="w-full h-12 rounded-xl border-2 border-gray-200 px-4 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
              />
              <p className="text-xs text-gray-500">Link your existing account or we'll create one for you</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700" htmlFor="password">
                  Password *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className="w-full h-12 rounded-xl border-2 border-gray-200 px-4 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700" htmlFor="confirmPassword">
                  Confirm Password *
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  className="w-full h-12 rounded-xl border-2 border-gray-200 px-4 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input 
                type="checkbox" 
                id="terms"
                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{' '}
                <a href="/terms" className="text-blue-600 hover:text-blue-700 font-medium">Terms of Service</a>
                {' '}and{' '}
                <a href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">Privacy Policy</a>
              </label>
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
                  : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover-raise shadow-lg'
              } text-white`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Creating account...
                </>
              ) : (
                '✨ Create Account'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                Sign in here
              </a>
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-medium">
            <span>🔒</span>
            <span>Your information is secure and encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}