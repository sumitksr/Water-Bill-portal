"use client";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";

export default function HistoryPage() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("wb_history") || "[]");
    setItems(all);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((r) =>
      r.accountNumber.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">📊 Payment History</h1>
          <p className="text-gray-600 text-lg">History is stored locally in your browser.</p>
        </div>
        <a href="/pay" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 text-base font-semibold hover:from-blue-700 hover:to-blue-800 hover-raise shadow-lg">
          💳 Make Payment
        </a>
      </div>

      <div className="card p-6 bg-white/90 backdrop-blur">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">🔍</span>
          </div>
          <h2 className="text-lg font-bold text-gray-900">Search Payments</h2>
        </div>
        <input 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search by account, email, or receipt ID" 
          className="w-full h-12 rounded-xl border-2 border-gray-200 px-4 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300" 
        />
      </div>

      <div className="card overflow-hidden bg-white/90 backdrop-blur">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No payments found</h3>
            <p className="text-gray-600 mb-6">
              {query ? "Try adjusting your search terms" : "You haven't made any payments yet"}
            </p>
            <a href="/pay" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 text-base font-semibold hover:from-blue-700 hover:to-blue-800 hover-raise shadow-lg">
              💳 Make Your First Payment
            </a>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                <tr>
                  <th className="text-left px-6 py-4 font-bold text-gray-900">Date</th>
                  <th className="text-left px-6 py-4 font-bold text-gray-900">Receipt</th>
                  <th className="text-left px-6 py-4 font-bold text-gray-900">Account</th>
                  <th className="text-left px-6 py-4 font-bold text-gray-900">Email</th>
                  <th className="text-right px-6 py-4 font-bold text-gray-900">Amount</th>
                  <th className="text-right px-6 py-4 font-bold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, index) => (
                  <tr key={r.id} className={`border-t border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                    <td className="px-6 py-4 text-gray-900 font-medium">
                      {format(new Date(r.ts), "MMM dd, yyyy")}
                      <div className="text-sm text-gray-500">{format(new Date(r.ts), "h:mm a")}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                        {r.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{r.accountNumber}</td>
                    <td className="px-6 py-4 text-gray-600">{r.email}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-lg text-green-700">${r.amount.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a 
                        className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold hover:from-blue-700 hover:to-blue-800 hover-raise shadow-sm transition-all duration-200" 
                        href={`/receipt?id=${encodeURIComponent(r.id)}`}
                      >
                        📄 View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {filtered.length > 0 && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
            <span>📊</span>
            <span>Showing {filtered.length} payment{filtered.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      )}
    </div>
  );
}