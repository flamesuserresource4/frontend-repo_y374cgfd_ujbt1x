import { Rocket, Settings } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/70 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-sm">
              <Rocket size={18} />
            </div>
            <span className="font-semibold text-gray-900">FlowForge</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#features" className="hover:text-gray-900">Features</a>
            <a href="#builder" className="hover:text-gray-900">Builder</a>
            <a href="#pricing" className="hover:text-gray-900">Pricing</a>
          </nav>

          <div className="flex items-center gap-2">
            <button className="hidden sm:inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <Settings size={16} />
              Settings
            </button>
            <button className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-cyan-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:opacity-95">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
