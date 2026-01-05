"use client";
import { useRef, useState, useEffect } from "react";
import DOMPurify, { type Config } from "dompurify";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  sender: "user" | "bot";
  text: string;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  //Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  //Extract reply safely
  const extractReply = (p: unknown): string => {
    if (p === null || p === undefined) return "";
    if (typeof p === "string") {
      const looksLikeJson =
        p.trim().startsWith("{") || p.trim().startsWith("[");
      if (looksLikeJson) {
        try {
          const maybe = JSON.parse(p);
          return extractReply(maybe);
        } catch {
          return p;
        }
      }
      return p;
    }
    if (Array.isArray(p)) return extractReply(p[0]);
    if (typeof p === "object") {
      const obj = p as Record<string, unknown>;
      const keys = [
        "reply",
        "message",
        "text",
        "output",
        "data",
        "result",
        "response",
      ];
      for (const k of keys) {
        if (obj[k] !== undefined) return extractReply(obj[k]);
      }
      const choices = (obj as any).choices;
      if (choices?.[0])
        return extractReply(
          choices[0].text ?? choices[0].message ?? choices[0]
        );
      const msgs = (obj as any).messages;
      if (msgs?.[0]) return extractReply(msgs[0].text ?? msgs[0]);
      for (const k in obj) {
        const v = obj[k];
        if (typeof v === "string" && v.trim()) return v;
      }
      try {
        return JSON.stringify(obj);
      } catch {
        return String(obj);
      }
    }
    return String(p);
  };

  const stripCodeFences = (s: unknown): string => {
    let t = String(s ?? "").trim();
    const match = t.match(/^```(?:[a-zA-Z0-9_-]+)?\s*([\s\S]*?)\s*```$/);
    if (match) t = match[1];
    return t.replace(/```/g, "").trim();
  };
  const htmlToPlainText = (html: string): string => {
    const noFences = stripCodeFences(html);
    const config: Config = { ALLOWED_TAGS: [] };
    const cleaned = DOMPurify.sanitize(noFences, config);
    const tmp = document.createElement("div");
    tmp.innerHTML = cleaned;
    return tmp.textContent || tmp.innerText || "";
  };

  //Send message
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch(
        "https://jonn8n.safehub-lcup.uk/webhook/Chatbots",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        }
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      let parsed: unknown;
      try {
        parsed = await response.json();
      } catch {
        parsed = await response.text();
      }

      const reply = extractReply(parsed) || "No reply content";
      const finalText = htmlToPlainText(reply);
      const botMessage: Message = { sender: "bot", text: finalText };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chatbot fetch error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error connecting to chatbot." },
      ]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  return (
    <div className="relative w-screen h-screen flex flex-col bg-linear-to-b from-slate-950 via-slate-900 to-black text-white overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.12),transparent_70%)] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-4 border-b border-white/10 backdrop-blur-md bg-white/5">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400 drop-shadow-md">
          Responder Chat
        </h1>
        <div className="w-10 h-10 rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-300 shadow-inner">
          🤖
        </div>
      </header>

      {/* Chat messages */}
      <div
        ref={scrollRef}
        className="relative z-10 flex-1 overflow-y-auto px-6 py-6 space-y-5 backdrop-blur-md"
      >
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && (
                <div className="w-8 h-8 mr-2 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-sm">
                  🤖
                </div>
              )}
              <div
                className={`px-5 py-3 rounded-2xl max-w-[70%] text-sm leading-relaxed shadow-md whitespace-pre-wrap wrap-break-words ${
                  msg.sender === "user"
                    ? "bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded-br-none shadow-cyan-400/40"
                    : "bg-white/10 text-slate-200 rounded-bl-none border border-white/10"
                }`}
              >
                {msg.text}
              </div>
              {msg.sender === "user" && (
                <div className="w-8 h-8 ml-2 rounded-full bg-cyan-400/20 border border-cyan-400/30 flex items-center justify-center text-sm text-cyan-300">
                  😊
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <div className="flex justify-start text-slate-400 text-sm animate-pulse">
            <div className="bg-white/10 px-4 py-2 rounded-2xl border border-white/10">
              Typing...
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-md p-4 flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="grow px-4 py-3 rounded-full bg-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-6 py-3 rounded-full bg-linear-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 text-black font-semibold shadow-md active:scale-95 transition-transform disabled:opacity-50"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
