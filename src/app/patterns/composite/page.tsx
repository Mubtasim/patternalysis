"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Component Interface
interface FileSystemEntity {
  getName(): string;
  display(indent?: string): string;
}

// Leaf
class File implements FileSystemEntity {
  constructor(private name: string) {}

  getName() {
    return this.name;
  }

  display(indent = "") {
    return `${indent}- File: ${this.name}`;
  }
}

// Composite
class Folder implements FileSystemEntity {
  private children: FileSystemEntity[] = [];

  constructor(private name: string) {}

  add(child: FileSystemEntity) {
    this.children.push(child);
  }

  getName() {
    return this.name;
  }

  display(indent = "") {
    const lines = [`${indent}+ Folder: ${this.name}`];
    for (const child of this.children) {
      lines.push(child.display(indent + "  "));
    }
    return lines.join("\n");
  }
}

export default function CompositePage() {
  const [output, setOutput] = useState("");

  const handleRender = () => {
    const root = new Folder("root");
    const src = new Folder("src");
    const dist = new Folder("dist");
    const indexFile = new File("index.tsx");
    const styleFile = new File("style.css");
    const mainJs = new File("main.js");

    src.add(indexFile);
    src.add(styleFile);
    dist.add(mainJs);
    root.add(src);
    root.add(dist);

    setOutput(root.display());
  };

  return (
    <PatternLayout title="Composite">
      <p className="mb-4">
        Compose objects into tree structures to represent part-whole
        hierarchies. Composite lets clients treat individual objects and
        compositions uniformly.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        The Composite pattern allows you to build complex structures from simple
        objects, using the same interface for both leaves and composites.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Example</h2>
      <button
        onClick={handleRender}
        className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded text-white mb-4"
      >
        Render File Tree
      </button>

      {output && (
        <pre className="bg-card text-green-700 dark:text-green-300 p-4 rounded border border-border whitespace-pre-wrap">
          {output}
        </pre>
      )}

      <SyntaxHighlighter
        language="ts"
        style={atomDark}
        className="rounded mt-6"
      >
        {`interface FileSystemEntity {
  getName(): string;
  display(indent?: string): string;
}

class File implements FileSystemEntity {
  constructor(private name: string) {}

  getName() {
    return this.name;
  }

  display(indent = '') {
    return \`\${indent}- File: \${this.name}\`;
  }
}

class Folder implements FileSystemEntity {
  private children: FileSystemEntity[] = [];

  constructor(private name: string) {}

  add(child: FileSystemEntity) {
    this.children.push(child);
  }

  getName() {
    return this.name;
  }

  display(indent = '') {
    const lines = [\`\${indent}+ Folder: \${this.name}\`];
    for (const child of this.children) {
      lines.push(child.display(indent + '  '));
    }
    return lines.join('\n');
  }
}

const root = new Folder('root');
const src = new Folder('src');
const index = new File('index.tsx');
src.add(index);
root.add(src);
console.log(root.display());`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>File system trees</li>
        <li>UI component hierarchies</li>
        <li>Organization charts</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>You want to treat individual and composite objects the same way</li>
        <li>You want to represent recursive structures</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Can make code harder to understand if hierarchy grows too large</li>
        <li>Not ideal for flat or non-hierarchical data</li>
      </ul>
    </PatternLayout>
  );
}
