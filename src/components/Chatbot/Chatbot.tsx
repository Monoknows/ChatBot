import React, { useState } from "react";

export default function Chatbot() {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted:", inputValue);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-slate-900/60 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-white mb-3">
        Welcome To Test CHATBOT!
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor="input" className="text-sm text-slate-300">
          Enter Text:
        </label>

        <input
          id="input"
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Type your message here..."
          className="px-3 py-2 rounded-md bg-transparent border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-cyan-400 text-black rounded-md font-medium"
          >
            Send
          </button>
          <button
            type="button"
            onClick={() => setInputValue("")}
            className="px-4 py-2 border rounded-md text-sm text-slate-200"
          >
            Clear
          </button>
        </div>
      </form>

      <p className="mt-4 text-sm text-slate-300">
        You typed: <span className="font-medium text-white">{inputValue}</span>
      </p>
    </div>
  );
}
