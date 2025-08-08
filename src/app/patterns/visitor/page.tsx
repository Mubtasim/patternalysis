"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Visitor Interface
interface Visitor {
  visitCircle(circle: Circle): string;
  visitSquare(square: Square): string;
}

// Shape Interface
interface Shape {
  accept(visitor: Visitor): string;
}

// Concrete Shape: Circle
class Circle implements Shape {
  constructor(public radius: number) {}
  accept(visitor: Visitor): string {
    return visitor.visitCircle(this);
  }
}

// Concrete Shape: Square
class Square implements Shape {
  constructor(public side: number) {}
  accept(visitor: Visitor): string {
    return visitor.visitSquare(this);
  }
}

// Concrete Visitor: AreaCalculator
class AreaCalculator implements Visitor {
  visitCircle(circle: Circle): string {
    const area = Math.PI * circle.radius ** 2;
    return `🟠 Area of Circle: ${area.toFixed(2)}`;
  }

  visitSquare(square: Square): string {
    const area = square.side ** 2;
    return `🟦 Area of Square: ${area}`;
  }
}

export default function VisitorPatternPage() {
  const [log, setLog] = useState("");

  const handleCalculate = (shape: Shape) => {
    const visitor = new AreaCalculator();
    const result = shape.accept(visitor);
    setLog(result);
  };

  return (
    <PatternLayout title="Visitor">
      <p className="mb-4">
        Lets you define a new operation without changing the classes of the
        elements on which it operates.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        The Visitor pattern separates algorithms from the objects on which they
        operate, letting you add new operations without modifying those objects.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Example</h2>
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => handleCalculate(new Circle(5))}
          className="bg-pink-600 hover:bg-pink-500 px-4 py-2 rounded text-white"
        >
          Calculate Circle Area
        </button>
        <button
          onClick={() => handleCalculate(new Square(4))}
          className="bg-rose-600 hover:bg-rose-500 px-4 py-2 rounded text-white"
        >
          Calculate Square Area
        </button>
      </div>

      <div className="bg-card p-4 text-foreground text-sm rounded mb-6 border border-border min-h-[50px]">
        {log}
      </div>

      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
        {`interface Visitor {
  visitCircle(circle: Circle): string;
  visitSquare(square: Square): string;
}

interface Shape {
  accept(visitor: Visitor): string;
}

class Circle implements Shape {
  constructor(public radius: number) {}
  accept(visitor: Visitor): string {
    return visitor.visitCircle(this);
  }
}

class Square implements Shape {
  constructor(public side: number) {}
  accept(visitor: Visitor): string {
    return visitor.visitSquare(this);
  }
}

class AreaCalculator implements Visitor {
  visitCircle(circle: Circle): string {
    const area = Math.PI * circle.radius ** 2;
    return \`Area of Circle: \${area.toFixed(2)}\`;
  }

  visitSquare(square: Square): string {
    const area = square.side ** 2;
    return \`Area of Square: \${area}\`;
  }
}

const shape: Shape = new Circle(5);
const visitor = new AreaCalculator();
console.log(shape.accept(visitor));`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Object structures with many unrelated operations</li>
        <li>Compilers (AST traversal)</li>
        <li>Data structure traversal + operations</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>You want to separate logic from data structures</li>
        <li>Frequent need to perform unrelated operations on objects</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Adding a new type of shape requires updating all visitors</li>
        <li>Can be overkill for small object hierarchies</li>
      </ul>
    </PatternLayout>
  );
}
