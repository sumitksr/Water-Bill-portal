"use client";
import { useEffect, useState } from "react";

export default function Navigation() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("wb_user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("wb_user");
    localStorage.removeItem("wb_history");
    setUser(null);
    setDropdownOpen(false);
    window.location.href = "/";
  }

  return (
    <nav className="flex items-center gap-1 md:gap-2">
      <a className="px-4 py-2 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 font-medium text-sm hover-raise" href="/">
        Home
      </a>
      <a className="px-4 py-2 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 font-medium text-sm hover-raise" href="/pay">
        Pay
      </a>
      <a className="px-4 py-2 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 font-medium text-sm hover-raise" href="/history">
        History
      </a>
      
      {user ? (
        <div className="relative ml-2">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-blue-50 transition-all duration-200 font-medium text-sm hover-raise"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">
                {user.name?.charAt(0)?.toUpperCase() || '👤'}
              </span>
            </div>
            <span className="hidden sm:block">{user.name?.split(' ')[0]}</span>
            <svg className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
              <a
                href="/profile"
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                onClick={() => setDropdownOpen(false)}
              >
                <span>👤</span>
                Profile
              </a>
              <a
                href="/history"
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                onClick={() => setDropdownOpen(false)}
              >
                <span>📊</span>
                Payment History
              </a>
              <hr className="my-2 border-gray-200" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left"
              >
                <span>🚪</span>
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2 ml-2">
          <a
            href="/login"
            className="px-4 py-2 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 font-medium text-sm hover-raise"
          >
            Sign In
          </a>
          <a
            href="/signup"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium text-sm hover:from-blue-700 hover:to-blue-800 hover-raise shadow-sm transition-all duration-200"
          >
            Sign Up
          </a>
        </div>
      )}
    </nav>
  );
}