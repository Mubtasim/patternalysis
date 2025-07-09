"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// State Interface
interface TrafficLightState {
  next(context: TrafficLightContext): void;
  getColor(): string;
}

// Context
class TrafficLightContext {
  private state: TrafficLightState;

  constructor(initialState: TrafficLightState) {
    this.state = initialState;
  }

  setState(state: TrafficLightState) {
    this.state = state;
  }

  next() {
    this.state.next(this);
  }

  getColor(): string {
    return this.state.getColor();
  }
}

// Concrete States
class RedLight implements TrafficLightState {
  next(context: TrafficLightContext): void {
    context.setState(new GreenLight());
  }

  getColor(): string {
    return "🔴 Red";
  }
}

class GreenLight implements TrafficLightState {
  next(context: TrafficLightContext): void {
    context.setState(new YellowLight());
  }

  getColor(): string {
    return "🟢 Green";
  }
}

class YellowLight implements TrafficLightState {
  next(context: TrafficLightContext): void {
    context.setState(new RedLight());
  }

  getColor(): string {
    return "🟡 Yellow";
  }
}

export default function StatePatternPage() {
  const [context] = useState(() => new TrafficLightContext(new RedLight()));
  const [color, setColor] = useState(context.getColor());

  const handleNext = () => {
    context.next();
    setColor(context.getColor());
  };

  return (
    <PatternLayout title="State">
      <p className="mb-4">
        Allows an object to alter its behavior when its internal state changes.
        The object will appear to change its class.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        The State pattern encapsulates state-specific behavior and transitions,
        making objects behave differently depending on their current state.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Example</h2>

      <div className="mb-4">
        <div className="text-lg font-medium mb-2">Current Light: {color}</div>
        <button
          onClick={handleNext}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white"
        >
          Next Light
        </button>
      </div>

      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
        {`interface TrafficLightState {
  next(context: TrafficLightContext): void;
  getColor(): string;
}

class TrafficLightContext {
  private state: TrafficLightState;

  constructor(initialState: TrafficLightState) {
    this.state = initialState;
  }

  setState(state: TrafficLightState) {
    this.state = state;
  }

  next() {
    this.state.next(this);
  }

  getColor(): string {
    return this.state.getColor();
  }
}

class RedLight implements TrafficLightState {
  next(context: TrafficLightContext): void {
    context.setState(new GreenLight());
  }

  getColor(): string {
    return '🔴 Red';
  }
}

class GreenLight implements TrafficLightState {
  next(context: TrafficLightContext): void {
    context.setState(new YellowLight());
  }

  getColor(): string {
    return '🟢 Green';
  }
}

class YellowLight implements TrafficLightState {
  next(context: TrafficLightContext): void {
    context.setState(new RedLight());
  }

  getColor(): string {
    return '🟡 Yellow';
  }
}

// Usage
const context = new TrafficLightContext(new RedLight());
console.log(context.getColor()); // 🔴 Red
context.next();
console.log(context.getColor()); // 🟢 Green
context.next();
console.log(context.getColor()); // 🟡 Yellow`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>UIs with multiple modes (e.g. loading, success, error)</li>
        <li>Workflow engines or step-based logic</li>
        <li>State-driven game logic</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>An object must change behavior depending on state</li>
        <li>State-specific logic would be too messy in one class</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Too many states can introduce class explosion</li>
        <li>Be cautious of redundant logic spread across states</li>
      </ul>
    </PatternLayout>
  );
}
