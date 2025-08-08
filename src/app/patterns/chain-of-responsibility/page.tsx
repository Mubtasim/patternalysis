"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Handler interface
interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): string | null;
}

// Abstract Handler
abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: string): string | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

// Concrete Handlers
class AuthHandler extends AbstractHandler {
  handle(request: string): string | null {
    if (request === "auth") {
      return "✅ Authentication successful";
    }
    return super.handle(request);
  }
}

class LoggingHandler extends AbstractHandler {
  handle(request: string): string | null {
    if (request === "log") {
      return "📋 Logged request";
    }
    return super.handle(request);
  }
}

class DataHandler extends AbstractHandler {
  handle(request: string): string | null {
    if (request === "data") {
      return "📦 Data processed";
    }
    return super.handle(request);
  }
}

export default function ChainOfResponsibilityPage() {
  const [logs, setLogs] = useState<string[]>([]);

  const handleRequest = (request: string) => {
    // Setup chain
    const auth = new AuthHandler();
    const log = new LoggingHandler();
    const data = new DataHandler();

    auth.setNext(log).setNext(data);

    const result = auth.handle(request);

    setLogs((prev) => [
      ...prev,
      result || "No handler could process the request",
    ]);
  };

  return (
    <PatternLayout title="Chain of Responsibility">
      <p className="mb-4">
        Avoid coupling the sender of a request to its receiver by giving more
        than one object a chance to handle the request.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        The Chain of Responsibility pattern chains handler objects and passes a
        request along the chain until an object handles it.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Example</h2>
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => handleRequest("auth")}
          className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded text-white"
        >
          Authenticate
        </button>
        <button
          onClick={() => handleRequest("log")}
          className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded text-white"
        >
          Log Request
        </button>
        <button
          onClick={() => handleRequest("data")}
          className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded text-white"
        >
          Process Data
        </button>
      </div>

      <div className="bg-card rounded p-4 mb-6 h-48 overflow-y-auto text-sm border border-border">
        {logs.map((log, idx) => (
          <div key={idx}>{log}</div>
        ))}
      </div>

      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
        {`interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): string | null;
}

abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: string): string | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

class AuthHandler extends AbstractHandler {
  handle(request: string): string | null {
    if (request === 'auth') {
      return '✅ Authentication successful';
    }
    return super.handle(request);
  }
}

class LoggingHandler extends AbstractHandler {
  handle(request: string): string | null {
    if (request === 'log') {
      return '📋 Logged request';
    }
    return super.handle(request);
  }
}

class DataHandler extends AbstractHandler {
  handle(request: string): string | null {
    if (request === 'data') {
      return '📦 Data processed';
    }
    return super.handle(request);
  }
}

// Setup
const auth = new AuthHandler();
const log = new LoggingHandler();
auth.setNext(log);
const data = new DataHandler();
log.setNext(data);

console.log(auth.handle('auth'));
console.log(auth.handle('log'));
console.log(auth.handle('data'));
console.log(auth.handle('unknown'));`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Event bubbling and capturing</li>
        <li>Request processing pipelines</li>
        <li>UI frameworks and middleware</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>When multiple objects can handle a request</li>
        <li>To decouple sender and receiver</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Can complicate debugging and tracing</li>
        <li>Order of handlers matters</li>
      </ul>
    </PatternLayout>
  );
}
