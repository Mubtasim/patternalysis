"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Implementation
interface Renderer {
  renderCircle: (radius: number) => string;
}

class SVGRenderer implements Renderer {
  renderCircle(radius: number): string {
    return `<svg><circle r="${radius}" /></svg>`;
  }
}

class CanvasRenderer implements Renderer {
  renderCircle(radius: number): string {
    return `Canvas circle with radius ${radius}`;
  }
}

// Abstraction
class Shape {
  protected renderer: Renderer;

  constructor(renderer: Renderer) {
    this.renderer = renderer;
  }

  draw(): string {
    return "";
  }
}

class Circle extends Shape {
  private radius: number;

  constructor(radius: number, renderer: Renderer) {
    super(renderer);
    this.radius = radius;
  }

  draw(): string {
    return this.renderer.renderCircle(this.radius);
  }
}

export default function BridgePage() {
  const [output, setOutput] = useState("");

  const handleDraw = (RendererType: new () => Renderer) => {
    const renderer = new RendererType();
    const circle = new Circle(10, renderer);
    setOutput(circle.draw());
  };

  return (
    <PatternLayout title="Bridge">
      <p className="mb-4">
        Decouple an abstraction from its implementation so that the two can vary
        independently.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        The Bridge pattern separates an object’s abstraction from its
        implementation, allowing you to develop them independently. It avoids
        permanent binding between abstraction and implementation.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Example</h2>
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => handleDraw(SVGRenderer)}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white"
        >
          Draw SVG Circle
        </button>
        <button
          onClick={() => handleDraw(CanvasRenderer)}
          className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-white"
        >
          Draw Canvas Circle
        </button>
      </div>

      {output && <p className="mb-6 text-green-400 font-semibold">{output}</p>}

      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
        {`interface Renderer {
  renderCircle(radius: number): string;
}

class SVGRenderer implements Renderer {
  renderCircle(radius: number): string {
    return \`<svg><circle r=\"\${radius}\" /></svg>\`;
  }
}

class CanvasRenderer implements Renderer {
  renderCircle(radius: number): string {
    return \`Canvas circle with radius \${radius}\`;
  }
}

class Shape {
  protected renderer: Renderer;

  constructor(renderer: Renderer) {
    this.renderer = renderer;
  }

  draw(): string {
    return '';
  }
}

class Circle extends Shape {
  private radius: number;

  constructor(radius: number, renderer: Renderer) {
    super(renderer);
    this.radius = radius;
  }

  draw(): string {
    return this.renderer.renderCircle(this.radius);
  }
}

const svg = new SVGRenderer();
const circle = new Circle(10, svg);
console.log(circle.draw());`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Cross-platform UI rendering</li>
        <li>Decoupling shape & renderer hierarchies</li>
        <li>Multiple implementations of an abstraction</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>You want to separate abstraction from implementation</li>
        <li>Need to avoid a Cartesian product of classes</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Can add complexity through indirection</li>
        <li>Needs careful abstraction design</li>
      </ul>
    </PatternLayout>
  );
}
