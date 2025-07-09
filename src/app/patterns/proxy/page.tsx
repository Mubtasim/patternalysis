"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Subject Interface
interface Image {
  display(): string;
}

// Real Subject
class RealImage implements Image {
  constructor(private filename: string) {
    console.log(`Loading ${filename} from disk...`);
  }

  display() {
    return `🖼️ Displaying ${this.filename}`;
  }
}

// Proxy
class ProxyImage implements Image {
  private realImage: RealImage | null = null;

  constructor(private filename: string) {}

  display() {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);
    }
    return this.realImage.display();
  }
}

export default function ProxyPage() {
  const [logs, setLogs] = useState<string[]>([]);

  const handleLoadImage = () => {
    const proxy = new ProxyImage("design-patterns.png");
    const steps = [];
    steps.push(proxy.display()); // Should load from disk
    steps.push(proxy.display()); // Should use cached version
    setLogs(steps);
  };

  return (
    <PatternLayout title="Proxy">
      <p className="mb-4">
        Provide a surrogate or placeholder for another object to control access
        to it. Useful for lazy loading, access control, logging, etc.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        The Proxy pattern controls access to another object by serving as a
        stand-in. It can delay instantiation, reduce load time, or add
        additional behavior.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Example</h2>
      <button
        onClick={handleLoadImage}
        className="bg-sky-600 hover:bg-sky-500 px-4 py-2 rounded text-white mb-4"
      >
        Load Image
      </button>

      {logs.length > 0 && (
        <ul className="mb-6 text-green-400 font-mono text-sm list-disc ml-6">
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      )}

      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
        {`interface Image {
  display(): string;
}

class RealImage implements Image {
  constructor(private filename: string) {
    console.log(\`Loading \${filename} from disk...\`);
  }

  display() {
    return \`🖼️ Displaying \${this.filename}\`;
  }
}

class ProxyImage implements Image {
  private realImage: RealImage | null = null;

  constructor(private filename: string) {}

  display() {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);
    }
    return this.realImage.display();
  }
}

const proxy = new ProxyImage('design-patterns.png');
console.log(proxy.display());
console.log(proxy.display());`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Lazy loading</li>
        <li>Virtual proxies for remote objects</li>
        <li>Access control</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>To add a layer of control or enhancement to an object</li>
        <li>To defer object creation or expensive operations</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Can introduce complexity</li>
        <li>Not always obvious when proxy is being used</li>
      </ul>
    </PatternLayout>
  );
}
