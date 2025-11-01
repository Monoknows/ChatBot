import React, { type JSX } from "react";
export default function Features(): JSX.Element {
  return (
    <section className="relative w-screen min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white py-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.15),transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-6xl px-6 relative z-10">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 lg:p-16 shadow-[0_0_50px_-15px_rgba(14,165,233,0.4)] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-transform duration-500 hover:scale-[1.01]">
          {/* Left: Text Section */}
          <div className="flex flex-col justify-center text-left space-y-6">
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 drop-shadow-md">
              Our Features
            </h2>

            <p className="text-slate-200 text-lg leading-relaxed max-w-3xl">
              Responder offers a suite of powerful features designed to enhance
              your productivity and streamline your workflow.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-400 pt-4">
              <li>✔ AI-Powered Suggestions</li>
              <li>✔ Real-time Collaboration</li>
              <li>✔ Code Snippet Management</li>
              <li>✔ Multi-language Support</li>
              <li>✔ Smart Error Detection</li>
              <li>✔ Cloud Sync Across Devices</li>
              <li>✔ Dark & Light Theme Options</li>
              <li>✔ Secure User Authentication</li>
            </ul>

            <button className="w-fit mt-8 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-md text-black font-semibold transition-transform duration-200 transform hover:-translate-y-1">
              Explore More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
