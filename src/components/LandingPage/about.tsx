import React, { type JSX } from "react";

export default function About(): JSX.Element {
  return (
    <section className="relative w-screen min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white py-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.15),transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-6xl px-6 relative z-10">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 lg:p-16 shadow-[0_0_50px_-15px_rgba(14,165,233,0.4)] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-transform duration-500 hover:scale-[1.01]">
          {/* Left: Text Section */}
          <div className="flex flex-col justify-center text-left space-y-6">
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 drop-shadow-md">
              About Us
            </h2>

            <p className="text-slate-200 text-lg leading-relaxed max-w-3xl">
              At <span className="font-semibold text-cyan-400">Responder</span>,
              we build intelligent software designed for speed, clarity, and
              reliability. Founded by{" "}
              <span className="font-medium text-white">Jon Alfred Bernabe</span>
              , our mission is to create AI-powered tools that empower
              developers and users to communicate seamlessly.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-400 pt-4">
              <li>✔ Clean, maintainable code</li>
              <li>✔ Design-first development</li>
              <li>✔ Performance & accessibility</li>
              <li>✔ Collaborative & iterative</li>
            </ul>
          </div>

          {/* Right: Decorative Card */}
          <div className="flex justify-center items-center">
            <div className="group relative w-full max-w-sm">
              <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-500 to-sky-300 opacity-20 blur-xl group-hover:opacity-30 transition duration-500"></div>

              <div className="relative rounded-2xl overflow-hidden bg-[linear-gradient(145deg,#0f172a,#1e293b)] border border-white/10 shadow-2xl p-6 hover:scale-[1.03] transition-transform duration-500">
                <div className="w-full h-56 flex items-center justify-center bg-gradient-to-tr from-slate-800/40 to-slate-700/30 rounded-lg">
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-90"
                  >
                    <rect
                      x="2"
                      y="3"
                      width="20"
                      height="14"
                      rx="2.5"
                      fill="#0ea5e9"
                    />
                    <path
                      d="M7 21l3-3h4l3 3"
                      stroke="#07263a"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="8.5" cy="9" r="1.1" fill="#07263a" />
                    <circle cx="15.5" cy="9" r="1.1" fill="#07263a" />
                    <path
                      d="M6 13c1.5-1 4-1 6-1s4.5 0 6 1"
                      stroke="#07263a"
                      strokeWidth="0.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="mt-5">
                  <div className="text-sm text-slate-400 uppercase tracking-wide">
                    3D Chatbot
                  </div>
                  <div className="mt-1 text-xl font-semibold text-white">
                    Interactive Assistant
                  </div>
                  <p className="mt-2 text-slate-400 text-sm">
                    Enhancing user engagement through smooth conversational AI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtext below card */}
        <p className="mt-10 text-center text-slate-500 text-sm">
          Focused on quality, rapid iteration, and keeping the developer
          experience delightful.
        </p>
      </div>
    </section>
  );
}
// ...existing code...
