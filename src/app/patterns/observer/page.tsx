"use client";

import PatternLayout from "@/components/PatternLayout";
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
    <PatternLayout title="Observer">
      <p className="mb-4">
        Defines a one-to-many dependency between objects so that when one object
        changes state, all its dependents are notified and updated
        automatically.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        The Observer pattern allows an object (the subject) to maintain a list
        of dependents (observers) and notify them automatically of any state
        changes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Example</h2>
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

      <div className="bg-zinc-900 text-zinc-100 rounded p-4 mb-6 h-48 overflow-y-auto text-sm border border-zinc-800">
        {logs.map((log, idx) => (
          <div key={idx}>{log}</div>
        ))}
      </div>

      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
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

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Event handling systems</li>
        <li>Pub-sub implementations</li>
        <li>Reactive libraries (e.g. RxJS, signals)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>When multiple objects need to stay in sync with another</li>
        <li>You want to decouple the subject and its observers</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>
          Can cause memory leaks if subscribers aren’t properly cleaned up
        </li>
        <li>Too many observers can affect performance</li>
      </ul>
    </PatternLayout>
  );
}
