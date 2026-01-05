import { type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import robot from "../../assets/robot-removebg-preview.png";

export default function LandingPage(): JSX.Element {
  const navigate = useNavigate();

  const goToChatbot = () => {
    navigate("/chatbot");
  };

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="w-full overflow-x-hidden bg-linear-to-b from-[#030712] via-[#0a0f1a] to-[#020617] text-white selection:bg-cyan-400/20">
      {/* ===== HERO SECTION ===== */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between min-h-screen px-8 sm:px-16 pt-24 lg:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(14,165,233,0.2),transparent_70%)]" />

        {/* Text Section */}
        <motion.div
          className="flex-1 z-10 text-center lg:text-left space-y-8"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
            <span className="bg-linear-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(56,189,248,0.3)]">
              Responder
            </span>
            <br />
            <span className="text-slate-300 font-light text-3xl md:text-4xl">
              An Ai Powered Chatbot App
            </span>
          </h1>

          <motion.p
            className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Your intelligent safety companion, ready to assist you in
            emergencies with real-time guidance and support.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded"
            onClick={goToChatbot}
          >
            Go To The ChatBot
          </motion.button>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="flex-1 z-10 mt-12 lg:mt-0 flex justify-center"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400/20 blur-3xl rounded-full w-[18rem] h-72 mx-auto animate-pulse" />
            <motion.img
              src={robot}
              alt="Responder Robot"
              className="relative w-80 md:w-[24rem] drop-shadow-[0_0_50px_rgba(14,165,233,0.5)]"
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>
        </motion.div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section
        id="features"
        className="relative w-screen py-32 px-8 sm:px-16 bg-linear-to-b from-[#020617] via-[#0b1324] to-[#030712]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08),transparent_70%)]" />

        <div className="max-w-6xl mx-auto text-center space-y-12">
          <motion.h2
            className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-sky-300 to-blue-400 drop-shadow-lg"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Powerful Features
          </motion.h2>

          <motion.p
            className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Responder combines cutting-edge AI technology with user-friendly
            design to deliver a suite of features that enhance your safety and
            peace of mind.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-10">
            {[
              {
                title: "AI-Powered Conversations",
                desc: "Engage in natural, context-aware chats powered by advanced language models that understand your intent.",
              },
              {
                title: "Code Assistance",
                desc: "Write, debug, and understand code effortlessly with real-time suggestions and explanations for multiple languages.",
              },
              {
                title: "Knowledge Search",
                desc: "Instantly retrieve accurate information, documentation, or tutorials without leaving the chat.",
              },
              {
                title: "Task Automation",
                desc: "Automate repetitive tasks, summarize content, and generate structured data or reports with simple prompts.",
              },
              {
                title: "Personalized Memory",
                desc: "Responder remembers your preferences and context to offer consistent, tailored interactions over time.",
              },
              {
                title: "Multi-Platform Access",
                desc: "Available on web, mobile, and desktop with seamless syncing for uninterrupted productivity anywhere.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-8 text-left shadow-lg hover:shadow-cyan-400/20 transition-all duration-300"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <h3 className="text-2xl font-semibold text-cyan-400 mb-3">
                  {f.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <motion.section
        id="about"
        className="relative py-28 px-8 sm:px-16 bg-linear-to-b from-[#0b1324] via-[#0a0f1a] to-[#020617] border-t border-slate-800"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent drop-shadow-md">
            About Responder
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-3xl mx-auto">
            Responder is an intelligent safety companion built to bridge the gap
            between people and emergency services. Our mission is to empower
            communities with fast, connected, and reliable tools to act
            decisively when every second counts.
          </p>
        </div>
      </motion.section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#01050e] border-t border-slate-800 text-slate-500 text-center py-8">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-cyan-400 font-semibold">Responder</span>. All
          rights reserved.
        </p>
      </footer>
    </div>
  );
}
