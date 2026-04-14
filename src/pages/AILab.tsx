import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Code, MessageSquare, Image, Send, Loader2, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

interface ToolConfig {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  placeholder: string;
  color: string;
  suggestions: string[];
}

const aiTools: ToolConfig[] = [
  {
    id: "text",
    title: "Text Generator",
    description: "Generate articles, summaries, emails, and creative content using AI.",
    icon: Sparkles,
    placeholder: "Write a 100-word summary about machine learning...",
    color: "text-primary",
    suggestions: ["Write a blog intro about AI", "Summarize cloud computing", "Generate a product description"],
  },
  {
    id: "code",
    title: "Code Assistant",
    description: "Get code snippets, debug help, and programming solutions instantly.",
    icon: Code,
    placeholder: "Write a Python function to sort a list...",
    color: "text-lms-success",
    suggestions: ["FizzBuzz in Python", "React useEffect example", "SQL query for top 5 products"],
  },
  {
    id: "chat",
    title: "AI Chatbot",
    description: "Have a conversation with AI about any topic — learning, tech, career advice.",
    icon: MessageSquare,
    placeholder: "Ask me anything about programming...",
    color: "text-lms-info",
    suggestions: ["What is deep learning?", "Explain REST APIs", "How to start a tech career?"],
  },
  {
    id: "image",
    title: "Image Generator",
    description: "Describe an image and let AI create it for you. Great for concepts and illustrations.",
    icon: Image,
    placeholder: "A futuristic classroom with holographic displays...",
    color: "text-accent",
    suggestions: ["A robot teaching students", "Neural network diagram", "Futuristic city at sunset"],
  },
];

// Dummy responses for demo
const dummyResponses: Record<string, (input: string) => string> = {
  text: (input) =>
    `Here's the generated content based on your prompt:\n\n${input.length > 20 ? input.slice(0, 20) : input}... is a fascinating topic. Artificial Intelligence continues to transform how we live and work. From natural language processing to computer vision, AI applications are becoming increasingly sophisticated. The key to understanding AI lies in grasping fundamental concepts like machine learning algorithms, neural networks, and data preprocessing techniques. As the field evolves, professionals who combine domain expertise with AI skills will be in high demand across every industry.`,
  code: (input) => {
    if (input.toLowerCase().includes("python") || input.toLowerCase().includes("sort")) {
      return `\`\`\`python
def sort_list(items, reverse=False):
    """Sort a list using the built-in sorted function.
    
    Args:
        items: List to sort
        reverse: If True, sort in descending order
    
    Returns:
        Sorted list
    """
    return sorted(items, reverse=reverse)

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
print(sort_list(numbers))  # [11, 12, 22, 25, 34, 64, 90]
\`\`\``;
    }
    if (input.toLowerCase().includes("react") || input.toLowerCase().includes("useeffect")) {
      return `\`\`\`tsx
import { useState, useEffect } from 'react';

const DataFetcher = ({ url }: { url: string }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [url]);

  if (loading) return <p>Loading...</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
\`\`\``;
    }
    return `\`\`\`javascript
// Here's a solution for: ${input}
function solution(input) {
  // Process the input
  const result = input
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return result;
}

// Example
console.log(solution("hello world"));
// Output: "Hello World"
\`\`\``;
  },
  chat: (input) =>
    `Great question! "${input.slice(0, 50)}${input.length > 50 ? "..." : ""}"

That's something many learners are curious about. Here's a concise answer:

The key concepts to understand are:
1. **Foundation** — Start with the basics and build a strong understanding
2. **Practice** — Apply what you learn through hands-on projects
3. **Community** — Join forums and study groups to accelerate learning
4. **Consistency** — Dedicate regular time to studying and practicing

Would you like me to elaborate on any of these points? I can also recommend specific courses from our catalog that match your interest!`,
  image: (input) =>
    `🎨 **Image Generated Successfully!**

Based on your prompt: "${input.slice(0, 60)}${input.length > 60 ? "..." : ""}"

*[In a production environment, this would display an AI-generated image]*

**Image Details:**
- Style: Digital illustration
- Resolution: 1024 × 1024
- Format: PNG with transparency

💡 **Tip:** For better results, try adding details like style (realistic, cartoon, watercolor), lighting (dramatic, soft, neon), and mood (futuristic, cozy, minimal).`,
};

const AIToolPanel = ({ tool }: { tool: ToolConfig }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setOutput("");
    // Simulate AI processing delay
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));
    setOutput(dummyResponses[tool.id](input));
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center`}>
          <tool.icon className={`h-5 w-5 ${tool.color}`} />
        </div>
        <div>
          <h3 className="font-bold text-foreground">{tool.title}</h3>
          <p className="text-xs text-muted-foreground">{tool.description}</p>
        </div>
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2">
        {tool.suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setInput(s)}
            className="text-xs px-3 py-1.5 rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors border border-primary/10"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      {tool.id === "text" || tool.id === "image" ? (
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={tool.placeholder}
          rows={4}
          className="resize-none"
        />
      ) : (
        <div className="relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={tool.placeholder}
            onKeyDown={(e) => e.key === "Enter" && handleRun()}
            className="pr-12"
          />
          <button
            onClick={handleRun}
            disabled={loading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 disabled:text-muted-foreground"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      )}

      <Button
        onClick={handleRun}
        disabled={loading || !input.trim()}
        className="gradient-primary text-primary-foreground font-semibold"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 mr-2" /> {tool.id === "image" ? "Generate Image" : tool.id === "code" ? "Generate Code" : "Run"}
          </>
        )}
      </Button>

      {/* Output */}
      {(output || loading) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-muted/50 border border-border rounded-xl p-4"
        >
          {loading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">AI is thinking...</span>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none text-foreground">
              {output.split("\n").map((line, i) => {
                if (line.startsWith("```")) return null;
                if (line.startsWith("# ")) return <h3 key={i} className="text-foreground font-bold mt-2">{line.slice(2)}</h3>;
                if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-bold text-foreground">{line.slice(2, -2)}</p>;
                if (line.startsWith("- ") || line.startsWith("* ")) return <li key={i} className="text-foreground text-sm ml-4">{line.slice(2)}</li>;
                if (line.trim() === "") return <br key={i} />;
                return <p key={i} className="text-foreground text-sm leading-relaxed">{line}</p>;
              })}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

const AILab = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <div className="gradient-hero py-12">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-primary-foreground/70 hover:text-primary-foreground text-sm mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Bot className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground">AI Lab</h1>
              <p className="text-primary-foreground/80">Explore AI-powered tools to boost your learning</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {aiTools.map((t) => (
              <Badge key={t.id} className="bg-primary-foreground/20 text-primary-foreground border-none">
                <t.icon className="h-3 w-3 mr-1" /> {t.title}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Tabs defaultValue="text" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto gap-2 bg-transparent p-0">
            {aiTools.map((tool) => (
              <TabsTrigger
                key={tool.id}
                value={tool.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border rounded-xl py-3 px-4 flex items-center gap-2"
              >
                <tool.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tool.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {aiTools.map((tool) => (
            <TabsContent key={tool.id} value={tool.id}>
              <div className="bg-card border border-border rounded-2xl p-6">
                <AIToolPanel tool={tool} />
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Course Integration Suggestion */}
        <motion.div
          className="mt-12 bg-primary/5 border border-primary/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-bold text-foreground text-lg mb-2 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" /> AI Tools in Your Courses
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Our AI tools are integrated directly into your learning experience. Here are some course-specific suggestions:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { course: "Complete Python Bootcamp", tool: "Code Assistant", tip: "Get instant Python code help while learning" },
              { course: "AI & Machine Learning A-Z", tool: "Text Generator", tip: "Generate study notes and concept summaries" },
              { course: "React & TypeScript", tool: "Code Assistant", tip: "Debug React components and get TypeScript tips" },
            ].map((item) => (
              <div key={item.course} className="bg-card border border-border rounded-xl p-4">
                <p className="font-semibold text-foreground text-sm">{item.course}</p>
                <Badge variant="secondary" className="mt-1 mb-2 text-xs">{item.tool}</Badge>
                <p className="text-xs text-muted-foreground">{item.tip}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default AILab;
