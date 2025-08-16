"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chatbox({ onClose }: { onClose?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error("Failed to fetch response");

      const data: { reply: string } = await res.json();

      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "⚠️ Something went wrong. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 70 }}
      className="fixed bottom-4 right-4 w-96 bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl border border-gray-200 overflow-hidden"
    >
      {/* Header with close button */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-center font-semibold py-2 flex justify-between items-center px-3">
        <span>💬 Chat with Ammar</span>
        {onClose && (
          <button onClick={onClose} className="text-white hover:text-gray-200 text-sm">
            ✖
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto border-b mb-2 p-3 space-y-2">
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <span
                className={`px-3 py-2 rounded-2xl text-sm max-w-[70%] shadow-md ${
                  m.role === "user"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {m.content}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <span className="bg-gray-200 px-3 py-2 rounded-2xl text-sm text-gray-500 animate-pulse">
              Typing...
            </span>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="flex p-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 bg-white text-gray-800 border-2 border-purple-500 px-4 py-3 
                     rounded-l-xl text-base focus:outline-none focus:ring-2 
                     focus:ring-purple-400 shadow-md"
          placeholder="💬 Ask me anything..."
        />

        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 10px rgba(59,130,246,0.7)" }}
          whileTap={{ scale: 0.9 }}
          onClick={sendMessage}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 rounded-r-xl text-sm font-medium shadow-md hover:from-blue-600 hover:to-purple-700 transition-all"
        >
          Send
        </motion.button>
      </div>
    </motion.div>
  );
}
