import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Water Bill Portal",
  description: "Securely pay and manage your water bills.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full flex flex-col`}
      >
        <header className="sticky top-0 z-10 flex-shrink-0">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between rounded-b-2xl border bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-lg">
            <a href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-all duration-200">W</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
              </div>
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">Water Bill Portal</span>
            </a>
            <Navigation />
          </div>
        </header>
        <main className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full">{children}</main>
        <footer className="flex-shrink-0 mt-auto">
          <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600 rounded-t-2xl border-t bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-white font-bold text-xs">W</span>
                <span className="font-semibold">© {new Date().getFullYear()} WaterWorks Utility</span>
              </div>
              <div className="flex items-center gap-6">
                <a className="hover:text-blue-700 hover:underline transition-colors duration-200 font-medium" href="/pay">Make a payment</a>
                <a className="hover:text-blue-700 hover:underline transition-colors duration-200 font-medium" href="/history">View history</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
