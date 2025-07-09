"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Component interface
interface Coffee {
  cost: () => number;
  description: () => string;
}

// Concrete Component
class BasicCoffee implements Coffee {
  cost() {
    return 5;
  }
  description() {
    return "Basic Coffee";
  }
}

// Decorators
class MilkDecorator implements Coffee {
  constructor(private coffee: Coffee) {}

  cost() {
    return this.coffee.cost() + 2;
  }

  description() {
    return this.coffee.description() + ", Milk";
  }
}

class SugarDecorator implements Coffee {
  constructor(private coffee: Coffee) {}

  cost() {
    return this.coffee.cost() + 1;
  }

  description() {
    return this.coffee.description() + ", Sugar";
  }
}

export default function DecoratorPage() {
  const [result, setResult] = useState("");

  const handleDecorate = () => {
    const coffee = new SugarDecorator(new MilkDecorator(new BasicCoffee()));
    setResult(`${coffee.description()} - $${coffee.cost()}`);
  };

  return (
    <PatternLayout title="Decorator">
      <p className="mb-4">
        Attach additional responsibilities to an object dynamically. Decorators
        provide a flexible alternative to subclassing for extending
        functionality.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        The Decorator pattern lets you wrap objects with new behavior at runtime
        without modifying the original class.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Example</h2>
      <button
        onClick={handleDecorate}
        className="bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded text-white mb-4"
      >
        Make Fancy Coffee
      </button>

      {result && <p className="mb-6 text-green-400 font-semibold">{result}</p>}

      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
        {`interface Coffee {
  cost: () => number;
  description: () => string;
}

class BasicCoffee implements Coffee {
  cost() {
    return 5;
  }
  description() {
    return 'Basic Coffee';
  }
}

class MilkDecorator implements Coffee {
  constructor(private coffee: Coffee) {}

  cost() {
    return this.coffee.cost() + 2;
  }

  description() {
    return this.coffee.description() + ', Milk';
  }
}

class SugarDecorator implements Coffee {
  constructor(private coffee: Coffee) {}

  cost() {
    return this.coffee.cost() + 1;
  }

  description() {
    return this.coffee.description() + ', Sugar';
  }
}

const coffee = new SugarDecorator(new MilkDecorator(new BasicCoffee()));
console.log(coffee.description()); // "Basic Coffee, Milk, Sugar"
console.log(coffee.cost()); // 8`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Adding features to components dynamically</li>
        <li>UI components (e.g., wrappers around buttons, inputs)</li>
        <li>Middleware chains (e.g., Express, Redux)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>You want to add responsibilities to objects without subclassing</li>
        <li>Need to mix and match behaviors at runtime</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Too many small decorator classes can complicate maintenance</li>
        <li>Harder to trace functionality than with inheritance</li>
      </ul>
    </PatternLayout>
  );
}
