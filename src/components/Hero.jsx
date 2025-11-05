import { ArrowRight, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <Zap size={14} /> Automate your day-to-day
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              Build workflows visually. Automate anything.
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Drag, drop and connect steps to create powerful automations for
              your business — without writing code.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#builder" className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-black">
                Try the Builder
                <ArrowRight size={16} />
              </a>
              <button className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
                View Templates
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto h-72 w-full max-w-lg rounded-xl border border-gray-200 bg-white p-2 shadow-sm sm:h-80">
              <div className="h-full w-full rounded-lg bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-purple-500/10" />
              <div className="pointer-events-none absolute inset-x-6 -bottom-8 h-24 rounded-xl bg-gradient-to-t from-white to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
