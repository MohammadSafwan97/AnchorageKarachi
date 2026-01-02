import { useEffect, useRef, useState } from "react";

/* ---------------- PREDEFINED Q&A ---------------- */

const PREDEFINED_QA = {
  "What documents are required for property transfer?":
    "For property transfer, you typically need CNIC copies of both seller and purchaser, allotment letter, transfer application form, payment receipts, and any previous transfer or ownership documents.",

  "How long does a transfer case take?":
    "A complete and properly documented transfer case usually takes 7–14 working days, subject to verification and approvals from relevant authorities.",

  "How can I check my transfer case status?":
    "You can check your transfer case status by visiting the Anchorage Karachi Facilitation Office with your case number or by contacting the support desk.",

  "What is PAL and why is it required?":
    "PAL (Provisional Allotment Letter) is an official document that confirms provisional ownership of a property and is required for initiating transfer and verification processes.",

 

  "Can someone submit documents on my behalf?":
    "Yes, an authorized representative can submit documents on your behalf, provided they carry a valid authority letter along with CNIC copies.",
};

const SUGGESTED_QUESTIONS = Object.keys(PREDEFINED_QA);

/* ---------------- COMPONENT ---------------- */

export function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text:
        "Welcome to Anchorage Karachi Facilitation Office.\n\nYou may ask about property transfer cases, documentation, case status, or project-related information.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const containerRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async (textOverride) => {
    const messageToSend = (textOverride ?? input).trim();
    if (!messageToSend) return;

    setInput("");
    setMessages(prev => [...prev, { role: "user", text: messageToSend }]);

    // Predefined answers
    if (PREDEFINED_QA[messageToSend]) {
      setMessages(prev => [
        ...prev,
        { role: "bot", text: PREDEFINED_QA[messageToSend] },
      ]);
      return;
    }

    // Backend fallback
    setLoading(true);
    try {
      const res = await fetch("/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: messageToSend }),
      });

      const data = await res.text();
      setMessages(prev => [...prev, { role: "bot", text: data }]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: "bot",
          text:
            "We are unable to process your request at the moment. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed bottom-6 right-6 w-[1000px] max-w-[1200vw] h-[1400px]
                 bg-white rounded-xl shadow-2xl border
                 flex flex-col z-50"
      style={{ maxHeight: "90vh" }}
    >
      {/* HEADER */}
      <div className="px-4 py-3 bg-blue-900 text-white">
        <p className="text-sm font-semibold text-white">Anchorage Karachi</p>
        <p className="text-xs opacity-90 text-white">Facilitation Assistant</p>
      </div>

      {/* MESSAGES */}
      <div
        ref={containerRef}
        className="flex-1 px-4 py-3 space-y-3 overflow-y-auto
                   text-sm bg-slate-50 text-slate-700"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-[85%] whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-blue-900 text-white"
                  : "bg-white border text-slate-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-xs italic text-slate-400">
            Processing your request…
          </div>
        )}
      </div>

      {/* ✅ SUGGESTED QUESTIONS (NOW ABOVE INPUT) */}
      <div className="px-3 py-3 bg-slate-100 border-t">
        <p className="text-xs font-medium text-slate-600 mb-2">
          Suggested Questions
        </p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((q, i) => (
            <button
              key={i}
              onClick={() => sendMessage(q)}
              className="text-xs bg-white border rounded-full px-3 py-1
                         hover:bg-slate-50 transition text-slate-700"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* INPUT */}
      <div className="border-t px-3 py-3 bg-slate-100">
        <div className="flex gap-2">
          <textarea
            rows={1}
            value={input}
            placeholder="Type your question here…"
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            className="flex-1 resize-none rounded-md border px-3 py-2 text-sm
                       focus:ring-2 focus:ring-blue-700"
          />

          <button
            onClick={() => sendMessage()}
            className="px-4 py-2 bg-blue-900 text-white rounded-md
                       hover:bg-blue-950 transition text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
