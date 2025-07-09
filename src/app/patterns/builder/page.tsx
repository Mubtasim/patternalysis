"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import toast from "react-hot-toast";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

class Burger {
  private ingredients: string[] = [];

  addIngredient(ingredient: string) {
    this.ingredients.push(ingredient);
    return this;
  }

  build() {
    return `Burger with: ${this.ingredients.join(", ")}`;
  }
}

export default function BuilderPage() {
  const [burger, setBurger] = useState(new Burger());
  const [result, setResult] = useState("");

  const handleAdd = (item: string) => {
    const updated = burger.addIngredient(item);
    setBurger(updated);
    setResult("");
    toast.success(`${item} added`);
  };

  const handleBuild = () => {
    if (burger.build() === "Burger with: ") {
      toast.error("Please add ingredients before building the burger.");
      return;
    }
    setResult(burger.build());
    setBurger(new Burger());
  };

  return (
    <PatternLayout title="Builder">
      <p className="mb-4">
        Separate the construction of a complex object from its representation so
        that the same construction process can create different representations.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        The Builder pattern lets you build complex objects step by step. It
        allows you to construct different types and representations using the
        same construction code.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Example</h2>
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => handleAdd("cheese")}
          className="bg-yellow-600 hover:bg-yellow-500 px-4 py-2 rounded text-white"
        >
          Add Cheese
        </button>
        <button
          onClick={() => handleAdd("lettuce")}
          className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-white"
        >
          Add Lettuce
        </button>
        <button
          onClick={() => handleAdd("tomato")}
          className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-white"
        >
          Add Tomato
        </button>
        <button
          onClick={handleBuild}
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded text-white"
        >
          Build Burger
        </button>
      </div>

      {result && <p className="mb-6 text-green-400 font-semibold">{result}</p>}

      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
        {`class Burger {
  private ingredients: string[] = [];

  addIngredient(ingredient: string) {
    this.ingredients.push(ingredient);
    return this;
  }

  build() {
    return \`Burger with: \${this.ingredients.join(', ')}\`;
  }
}

const burger = new Burger();
burger.addIngredient('cheese').addIngredient('lettuce').addIngredient('tomato');
console.log(burger.build());`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Step-by-step construction of complex objects</li>
        <li>Form builders</li>
        <li>Fluent APIs</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>You need to build a complex object over several steps</li>
        <li>
          You want to reuse the same creation logic for different
          representations
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Can introduce too many classes if overused</li>
        <li>Might be overkill for simple object construction</li>
      </ul>
    </PatternLayout>
  );
}
