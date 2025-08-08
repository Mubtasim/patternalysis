"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Abstract Product Interfaces
interface Button {
  render(): string;
}

interface Checkbox {
  render(): string;
}

// Concrete Product Implementations: Light Theme
class LightButton implements Button {
  render(): string {
    return "🟦 Light Button";
  }
}

class LightCheckbox implements Checkbox {
  render(): string {
    return "☑️ Light Checkbox";
  }
}

// Concrete Product Implementations: Dark Theme
class DarkButton implements Button {
  render(): string {
    return "⬛ Dark Button";
  }
}

class DarkCheckbox implements Checkbox {
  render(): string {
    return "🔲 Dark Checkbox";
  }
}

// Abstract Factory Interface
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

// Concrete Factories
class LightThemeFactory implements GUIFactory {
  createButton(): Button {
    return new LightButton();
  }
  createCheckbox(): Checkbox {
    return new LightCheckbox();
  }
}

class DarkThemeFactory implements GUIFactory {
  createButton(): Button {
    return new DarkButton();
  }
  createCheckbox(): Checkbox {
    return new DarkCheckbox();
  }
}

export default function AbstractFactoryPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [log, setLog] = useState<string[]>([]);

  const handleCreateUI = () => {
    const factory: GUIFactory =
      theme === "light" ? new LightThemeFactory() : new DarkThemeFactory();
    const button = factory.createButton();
    const checkbox = factory.createCheckbox();
    setLog([button.render(), checkbox.render()]);
  };

  return (
    <PatternLayout title="Abstract Factory">
      <p className="mb-4">
        Provides an interface for creating families of related or dependent
        objects without specifying their concrete classes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        Abstract Factory lets you produce different types of related objects
        using a common interface, making it easy to switch families of
        components without breaking client code.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Example</h2>
      <div className="flex items-center gap-4 mb-4">
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as "light" | "dark")}
          className="bg-secondary text-foreground border border-border px-3 py-1 rounded"
        >
          <option value="light">Light Theme</option>
          <option value="dark">Dark Theme</option>
        </select>
        <button
          onClick={handleCreateUI}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded"
        >
          Create UI
        </button>
      </div>

      <div className="bg-card p-4 text-foreground text-sm rounded mb-6 border border-border min-h-[50px]">
        {log.map((item, idx) => (
          <div key={idx}>{item}</div>
        ))}
      </div>

      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
        {`interface Button {
  render(): string;
}

interface Checkbox {
  render(): string;
}

class LightButton implements Button {
  render() {
    return "Light Button";
  }
}

class DarkButton implements Button {
  render() {
    return "Dark Button";
  }
}

interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

class LightThemeFactory implements GUIFactory {
  createButton() { return new LightButton(); }
  createCheckbox() { return new LightCheckbox(); }
}`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>UI toolkits (light/dark themes)</li>
        <li>Cross-platform apps (Mac vs Windows components)</li>
        <li>Dependency injection for family object creation</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>You need to create multiple families of related objects</li>
        <li>You want to switch entire sets of objects easily</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Can grow complex with many products/factories</li>
        <li>May lead to lots of boilerplate classes</li>
      </ul>
    </PatternLayout>
  );
}
