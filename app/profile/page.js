"use client";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    accountNumber: ""
  });

  useEffect(() => {
    const userData = localStorage.getItem("wb_user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setFormData({
        name: parsed.name || "",
        email: parsed.email || "",
        phone: parsed.phone || "",
        accountNumber: parsed.accountNumber || ""
      });
    } else {
      window.location.href = "/login";
    }
  }, []);

  function handleChange(e) {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  function handleSave() {
    const updatedUser = { ...user, ...formData };
    localStorage.setItem("wb_user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditing(false);
  }

  function handleLogout() {
    localStorage.removeItem("wb_user");
    localStorage.removeItem("wb_history");
    window.location.href = "/";
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto">
          <span className="text-white font-bold text-2xl">
            {user.name?.charAt(0)?.toUpperCase() || '👤'}
          </span>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">👋 Welcome, {user.name}!</h1>
          <p className="text-gray-600">Manage your account and payment preferences</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-8 bg-white/90 backdrop-blur">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold">👤</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
              </div>
              <button
                onClick={() => editing ? handleSave() : setEditing(true)}
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold hover:from-blue-700 hover:to-blue-800 hover-raise shadow-sm transition-all duration-200"
              >
                {editing ? '💾 Save' : '✏️ Edit'}
              </button>
            </div>

            <div className="grid gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Full Name</label>
                  {editing ? (
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full h-12 rounded-xl border-2 border-gray-200 px-4 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                    />
                  ) : (
                    <p className="text-lg font-semibold text-gray-900 py-3">{user.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email Address</label>
                  {editing ? (
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full h-12 rounded-xl border-2 border-gray-200 px-4 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                    />
                  ) : (
                    <p className="text-lg font-semibold text-gray-900 py-3">{user.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                  {editing ? (
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                      className="w-full h-12 rounded-xl border-2 border-gray-200 px-4 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                    />
                  ) : (
                    <p className="text-lg font-semibold text-gray-900 py-3">{user.phone || "Not provided"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Account Number</label>
                  {editing ? (
                    <input
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      placeholder="ACC-123456"
                      className="w-full h-12 rounded-xl border-2 border-gray-200 px-4 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                    />
                  ) : (
                    <p className="text-lg font-semibold text-gray-900 py-3">{user.accountNumber || "Not linked"}</p>
                  )}
                </div>
              </div>

              {editing && (
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleSave}
                    className="flex-1 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 text-base font-semibold hover:from-green-700 hover:to-green-800 hover-raise shadow-lg"
                  >
                    💾 Save Changes
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="flex-1 inline-flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white px-6 py-3 text-base font-semibold hover:bg-gray-50 hover:border-gray-300 hover-raise shadow-sm"
                  >
                    ❌ Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="card p-6 bg-white/90 backdrop-blur">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">⚡</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
            </div>
            
            <div className="space-y-3">
              <a
                href="/pay"
                className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 text-sm font-semibold hover:from-blue-700 hover:to-blue-800 hover-raise shadow-lg"
              >
                💳 Pay Bill
              </a>
              <a
                href="/history"
                className="w-full inline-flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 hover-raise shadow-sm"
              >
                📊 View History
              </a>
            </div>
          </div>

          <div className="card p-6 bg-white/90 backdrop-blur">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">⚙️</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Account Settings</h3>
            </div>
            
            <div className="space-y-3">
              <button className="w-full inline-flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 hover-raise shadow-sm">
                🔒 Change Password
              </button>
              <button 
                onClick={handleLogout}
                className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 text-sm font-semibold hover:from-red-700 hover:to-red-800 hover-raise shadow-lg"
              >
                🚪 Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
          <span>🔒</span>
          <span>Your data is stored locally and secure</span>
        </div>
      </div>
    </div>
  );
}