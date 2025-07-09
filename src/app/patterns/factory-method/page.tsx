"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Shape interface
interface Shape {
  draw: () => string;
}

class Circle implements Shape {
  draw() {
    return "Drawing a Circle";
  }
}

class Square implements Shape {
  draw() {
    return "Drawing a Square";
  }
}

// Factory Method
class ShapeFactory {
  createShape(type: string): Shape {
    if (type === "circle") return new Circle();
    if (type === "square") return new Square();
    throw new Error("Unknown shape type");
  }
}

export default function FactoryMethodPage() {
  const [message, setMessage] = useState("");

  const factory = new ShapeFactory();

  const handleCreateShape = (type: string) => {
    try {
      const createdShape = factory.createShape(type);
      setMessage(createdShape.draw());
    } catch (error) {
      setMessage("Error: " + (error as Error).message);
    }
  };

  return (
    <PatternLayout title="Factory Method">
      <p className="mb-4">
        Define an interface for creating an object, but let subclasses decide
        which class to instantiate.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        Factory Method lets a class defer instantiation to subclasses. It
        provides flexibility by decoupling client code from specific classes it
        needs to instantiate.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Example</h2>
      <div className="flex gap-4 mb-4">
        <button
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded text-white"
          onClick={() => handleCreateShape("circle")}
        >
          Create Circle
        </button>
        <button
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded text-white"
          onClick={() => handleCreateShape("square")}
        >
          Create Square
        </button>
      </div>
      {message && (
        <p className="mb-6 text-green-400 font-semibold">{message}</p>
      )}

      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
        {`interface Shape {
  draw: () => string;
}

class Circle implements Shape {
  draw() {
    return 'Drawing a Circle';
  }
}

class Square implements Shape {
  draw() {
    return 'Drawing a Square';
  }
}

class ShapeFactory {
  createShape(type: string): Shape {
    if (type === 'circle') return new Circle();
    if (type === 'square') return new Square();
    throw new Error('Unknown shape type');
  }
}

const factory = new ShapeFactory();
const shape = factory.createShape('circle');
console.log(shape.draw());`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Object creation with subclasses</li>
        <li>UI widget libraries</li>
        <li>Frameworks that need to create objects without tight coupling</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>
          When a class can’t anticipate the class of objects it must create
        </li>
        <li>To delegate responsibility of object creation to subclasses</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Can lead to many small subclasses</li>
        <li>Can complicate the code with lots of parallel hierarchies</li>
      </ul>
    </PatternLayout>
  );
}
