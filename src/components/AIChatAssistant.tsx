import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { courses } from "@/data/mockData";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const quickReplies = [
  "Suggest a Python course",
  "What courses are available?",
  "Help me get started",
  "Recommend Data Science courses",
];

const generateResponse = (input: string): string => {
  const lower = input.toLowerCase();

  if (lower.includes("python")) {
    const pythonCourses = courses.filter((c) => c.tags.some((t) => t.toLowerCase().includes("python")) || c.title.toLowerCase().includes("python"));
    if (pythonCourses.length > 0) {
      return `Great choice! Here are our Python courses:\n\n${pythonCourses.map((c) => `📘 **${c.title}** — $${c.price} (⭐ ${c.rating})\n   ${c.description}`).join("\n\n")}\n\nWould you like to know more about any of these?`;
    }
  }

  if (lower.includes("sql") || lower.includes("database")) {
    const sqlCourses = courses.filter((c) => c.category === "Data Science" || c.tags.some((t) => t.toLowerCase().includes("sql")));
    return `Here are our SQL & Database courses:\n\n${sqlCourses.map((c) => `📘 **${c.title}** — $${c.price} (⭐ ${c.rating})`).join("\n")}\n\nThese are perfect for data roles!`;
  }

  if (lower.includes("data science") || lower.includes("data analytics") || lower.includes("analytics")) {
    const dsCourses = courses.filter((c) => c.category === "Data Science");
    return `Here are our Data Science courses:\n\n${dsCourses.map((c) => `📊 **${c.title}** — $${c.price} (⭐ ${c.rating})`).join("\n")}\n\nData skills are in high demand!`;
  }

  if (lower.includes("ai") || lower.includes("machine learning") || lower.includes("artificial intelligence")) {
    const aiCourses = courses.filter((c) => c.category === "AI & ML");
    return `Here are our AI & ML courses:\n\n${aiCourses.map((c) => `🤖 **${c.title}** — $${c.price} (⭐ ${c.rating})`).join("\n")}\n\nAI is the future — great choice!`;
  }

  if (lower.includes("available") || lower.includes("all courses") || lower.includes("what courses") || lower.includes("catalog")) {
    const cats = [...new Set(courses.map((c) => c.category))];
    return `We have **${courses.length} courses** across these categories:\n\n${cats.map((c) => `📂 ${c}`).join("\n")}\n\nBrowse them at the **Courses** page or ask me about a specific topic!`;
  }

  if (lower.includes("get started") || lower.includes("beginner") || lower.includes("new")) {
    const beginner = courses.filter((c) => c.level === "Beginner");
    return `Welcome! Here are beginner-friendly courses to start:\n\n${beginner.map((c) => `🌟 **${c.title}** — $${c.price}`).join("\n")}\n\nI'd recommend starting with Python — it's versatile and in-demand!`;
  }

  if (lower.includes("recommend") || lower.includes("suggest")) {
    const top = courses.sort((a, b) => b.rating - a.rating).slice(0, 3);
    return `Here are my top recommendations:\n\n${top.map((c, i) => `${i + 1}. **${c.title}** — ⭐ ${c.rating} (${c.studentCount.toLocaleString()} students)`).join("\n")}\n\nThese are our highest-rated courses!`;
  }

  if (lower.includes("help") || lower.includes("how") || lower.includes("navigate")) {
    return `Here's how to use LearnHub:\n\n🏠 **Home** — Browse featured courses\n📚 **Courses** — See all courses with filters\n📊 **My Learning** — Track your enrolled courses\n🛒 **Cart** — Add courses and checkout\n\nYou can search courses by name, filter by category, and enroll with one click!`;
  }

  if (lower.includes("price") || lower.includes("cost") || lower.includes("free")) {
    return `Our courses range from **$11.99 to $18.99** with discounts up to **85% off**! All courses come with:\n\n✅ Lifetime access\n✅ Certificate of completion\n✅ 30-day money-back guarantee\n\nLook for the **Bestseller** badge for our most popular options!`;
  }

  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hello! 👋 I'm your LearnHub AI assistant. I can help you find courses, suggest learning paths, and navigate the platform. What would you like to learn?";
  }

  return `I can help you with:\n\n• **Finding courses** — Ask about Python, SQL, AI, Data Science, etc.\n• **Recommendations** — I'll suggest courses based on your interests\n• **Navigation** — I'll guide you through the platform\n• **Pricing** — Learn about our course pricing\n\nTry asking "Suggest a Python course" or "Help me get started"!`;
};

const AIChatAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: "Hi! 👋 I'm your LearnHub AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    // Simulate typing delay
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 700));
    const response = generateResponse(text);
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", content: response }]);
    setTyping(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
        >
          <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-4rem)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="gradient-primary px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary-foreground" />
              <span className="font-semibold text-primary-foreground text-sm">LearnHub AI Assistant</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-primary-foreground/70 hover:text-primary-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                  </div>
                )}
                <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                  {msg.content.split("\n").map((line, i) => (
                    <p key={i} className={i > 0 ? "mt-1" : ""}>
                      {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                        part.startsWith("**") && part.endsWith("**") ? (
                          <strong key={j}>{part.slice(2, -2)}</strong>
                        ) : (
                          <span key={j}>{part}</span>
                        )
                      )}
                    </p>
                  ))}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
                <div className="bg-secondary rounded-xl px-4 py-3 text-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {quickReplies.map((q) => (
                <button key={q} onClick={() => sendMessage(q)} className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors">
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-border flex gap-2 flex-shrink-0">
            <Input placeholder="Ask me anything..." value={input} onChange={(e) => setInput(e.target.value)} className="text-sm" disabled={typing} />
            <Button type="submit" size="icon" className="gradient-primary text-primary-foreground flex-shrink-0" disabled={!input.trim() || typing}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatAssistant;
