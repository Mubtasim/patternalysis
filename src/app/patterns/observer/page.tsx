// app/patterns/observer/page.tsx
"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

class Observer {
  private subscribers: (() => void)[] = [];

  subscribe(callback: () => void) {
    this.subscribers.push(callback);
  }

  notifyAll() {
    this.subscribers.forEach((cb) => cb());
  }
}

const eventSource = new Observer();

export default function ObserverPage() {
  const [logs, setLogs] = useState<string[]>([]);

  const handleSubscribe = () => {
    const id = Date.now();
    eventSource.subscribe(() => {
      setLogs((prev) => [...prev, `🔔 Subscriber ${id} notified.`]);
    });
    setLogs((prev) => [...prev, `✅ Subscriber ${id} subscribed.`]);
  };

  const handleNotify = () => {
    setLogs((prev) => [...prev, "🚀 Notifying all subscribers..."]);
    eventSource.notifyAll();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Observer Pattern</h1>
        <p className="text-zinc-400 mb-6">
          The Observer pattern defines a one-to-many dependency between objects,
          so that when one object changes state, all its dependents are notified
          and updated automatically.
        </p>

        <div className="flex gap-4 mb-4">
          <button
            onClick={handleSubscribe}
            className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded text-white"
          >
            Subscribe
          </button>
          <button
            onClick={handleNotify}
            className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded text-white"
          >
            Notify All
          </button>
        </div>

        <div className="bg-zinc-900 rounded p-4 mb-6 h-48 overflow-y-auto text-sm border border-zinc-800">
          {logs.map((log, idx) => (
            <div key={idx}>{log}</div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mb-2">Code Example</h2>
        <SyntaxHighlighter
          language="ts"
          style={atomDark}
          customStyle={{ borderRadius: "0.5rem", fontSize: "0.875rem" }}
        >
          {`class Observer {
  private subscribers: (() => void)[] = [];

  subscribe(callback: () => void) {
    this.subscribers.push(callback);
  }

  notifyAll() {
    this.subscribers.forEach((cb) => cb());
  }
}

const eventSource = new Observer();

// Usage
const subscriber = () => console.log("Notified!");
eventSource.subscribe(subscriber);
eventSource.notifyAll();`}
        </SyntaxHighlighter>

        <div className="mt-8 space-y-4 text-zinc-300">
          <div>
            <strong>Common Uses:</strong> Event listeners, pub-sub systems,
            reactive programming (e.g. RxJS)
          </div>
          <div>
            <strong>When to Use:</strong> When multiple objects need to reflect
            the state of another object automatically
          </div>
          <div>
            <strong>Caution:</strong> Can lead to memory leaks if subscribers
            are not cleaned up
          </div>
        </div>
      </div>
    </div>
  );
}
