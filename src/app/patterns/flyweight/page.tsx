"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Flyweight interface
interface Tree {
  render(x: number, y: number): string;
}

// Concrete Flyweight
class TreeType implements Tree {
  constructor(
    private name: string,
    private color: string,
    private texture: string
  ) {}

  render(x: number, y: number): string {
    return `🌳 Drawing ${this.name} at (${x}, ${y}) with ${this.color} and ${this.texture}`;
  }
}

// Flyweight Factory
class TreeFactory {
  private static treeTypes: Map<string, TreeType> = new Map();

  static getTreeType(name: string, color: string, texture: string): TreeType {
    const key = `${name}_${color}_${texture}`;
    if (!this.treeTypes.has(key)) {
      this.treeTypes.set(key, new TreeType(name, color, texture));
    }
    return this.treeTypes.get(key)!;
  }
}

// Context object
class TreeInstance {
  constructor(private x: number, private y: number, private type: TreeType) {}

  draw(): string {
    return this.type.render(this.x, this.y);
  }
}

export default function FlyweightPage() {
  const [logs, setLogs] = useState<string[]>([]);

  const handlePlantForest = () => {
    const planted: TreeInstance[] = [];

    for (let i = 0; i < 5; i++) {
      const type = TreeFactory.getTreeType("Oak", "Green", "Rough");
      planted.push(
        new TreeInstance(
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 100),
          type
        )
      );
    }

    const results = planted.map((tree) => tree.draw());
    setLogs(results);
  };

  return (
    <PatternLayout title="Flyweight">
      <p className="mb-4">
        Use sharing to support large numbers of fine-grained objects
        efficiently. Flyweight reduces memory usage by sharing common data
        between similar objects.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        The Flyweight pattern minimizes memory usage by sharing as much data as
        possible with similar objects. It’s especially useful when dealing with
        large sets of objects that share state.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Example</h2>
      <button
        onClick={handlePlantForest}
        className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded text-white mb-4"
      >
        Plant Forest
      </button>

      {logs.length > 0 && (
        <ul className="mb-6 text-green-400 font-mono text-sm list-disc ml-6">
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      )}

      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
        {`interface Tree {
  render(x: number, y: number): string;
}

class TreeType implements Tree {
  constructor(private name: string, private color: string, private texture: string) {}

  render(x: number, y: number): string {
    return \`🌳 Drawing \${this.name} at (\${x}, \${y}) with \${this.color} and \${this.texture}\`;
  }
}

class TreeFactory {
  private static treeTypes: Map<string, TreeType> = new Map();

  static getTreeType(name: string, color: string, texture: string): TreeType {
    const key = \`\${name}_\${color}_\${texture}\`;
    if (!this.treeTypes.has(key)) {
      this.treeTypes.set(key, new TreeType(name, color, texture));
    }
    return this.treeTypes.get(key)!;
  }
}

class TreeInstance {
  constructor(private x: number, private y: number, private type: TreeType) {}

  draw(): string {
    return this.type.render(this.x, this.y);
  }
}

const trees: TreeInstance[] = [];
for (let i = 0; i < 10000; i++) {
  const type = TreeFactory.getTreeType('Oak', 'Green', 'Rough');
  trees.push(new TreeInstance(i, i, type));
}`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Rendering many UI elements (icons, trees, text characters)</li>
        <li>Games with repeated entities</li>
        <li>Data visualization tools</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>You need to create a large number of similar objects</li>
        <li>You want to reduce memory consumption</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Can make code more complex</li>
        <li>Flyweight objects should be immutable</li>
      </ul>
    </PatternLayout>
  );
}
