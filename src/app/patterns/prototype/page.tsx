"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface Shape {
  clone: () => Shape;
  draw: () => string;
}

class Circle implements Shape {
  radius: number;
  constructor(radius: number) {
    this.radius = radius;
  }

  clone(): Shape {
    return new Circle(this.radius);
  }

  draw() {
    return `Circle with radius ${this.radius}`;
  }
}

class Rectangle implements Shape {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  clone(): Shape {
    return new Rectangle(this.width, this.height);
  }

  draw() {
    return `Rectangle ${this.width}x${this.height}`;
  }
}

export default function PrototypePage() {
  const [output, setOutput] = useState("");

  const handleClone = (shape: Shape) => {
    const copy = shape.clone();
    setOutput(copy.draw());
  };

  const originalCircle = new Circle(10);
  const originalRect = new Rectangle(20, 30);

  return (
    <PatternLayout title="Prototype">
      <p className="mb-4">
        Specify the kinds of objects to create using a prototypical instance,
        and create new objects by copying this prototype.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        The Prototype pattern lets you copy existing objects without making your
        code dependent on their concrete classes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Example</h2>
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => handleClone(originalCircle)}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white"
        >
          Clone Circle
        </button>
        <button
          onClick={() => handleClone(originalRect)}
          className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded text-white"
        >
          Clone Rectangle
        </button>
      </div>

      {output && <p className="mb-6 text-green-400 font-semibold">{output}</p>}

      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
        {`interface Shape {
  clone: () => Shape;
  draw: () => string;
}

class Circle implements Shape {
  radius: number;
  constructor(radius: number) {
    this.radius = radius;
  }

  clone(): Shape {
    return new Circle(this.radius);
  }

  draw() {
    return \`Circle with radius \${this.radius}\`;
  }
}

class Rectangle implements Shape {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  clone(): Shape {
    return new Rectangle(this.width, this.height);
  }

  draw() {
    return \`Rectangle \${this.width}x\${this.height}\`;
  }
}`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Cloning objects when construction is expensive</li>
        <li>Preserving existing state in copies</li>
        <li>Prototype registries for creating new objects</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>When creating a new object is costly or complex</li>
        <li>When objects are similar but not identical</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Deep vs. shallow copy can be tricky</li>
        <li>May hide dependencies if used excessively</li>
      </ul>
    </PatternLayout>
  );
}
