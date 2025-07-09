"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Iterator interface
interface Iterator<T> {
  hasNext(): boolean;
  next(): T;
}

// Aggregate interface
interface IterableCollection<T> {
  createIterator(): Iterator<T>;
}

// Concrete collection
class NameRepository implements IterableCollection<string> {
  private names: string[] = ["Alice", "Bob", "Charlie", "Diana"];

  createIterator(): Iterator<string> {
    let index = 0;
    const names = this.names;

    return {
      hasNext: () => index < names.length,
      next: () => names[index++],
    };
  }
}

export default function IteratorPatternPage() {
  const [output, setOutput] = useState<string[]>([]);

  const handleIterate = () => {
    const nameRepo = new NameRepository();
    const iterator = nameRepo.createIterator();
    const results: string[] = [];

    while (iterator.hasNext()) {
      results.push(iterator.next());
    }

    setOutput(results);
  };

  return (
    <PatternLayout title="Iterator">
      <p className="mb-4">
        Provide a way to access the elements of an aggregate object sequentially
        without exposing its underlying representation.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        The Iterator pattern allows sequential traversal of a collection without
        revealing its internal structure. It abstracts the logic of iteration
        into a separate object.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Example</h2>

      <button
        onClick={handleIterate}
        className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Iterate Names
      </button>

      <ul className="list-disc ml-6 mb-6 text-white">
        {output.map((name, idx) => (
          <li key={idx}>{name}</li>
        ))}
      </ul>

      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
        {`interface Iterator<T> {
  hasNext(): boolean;
  next(): T;
}

interface IterableCollection<T> {
  createIterator(): Iterator<T>;
}

class NameRepository implements IterableCollection<string> {
  private names: string[] = ['Alice', 'Bob', 'Charlie', 'Diana'];

  createIterator(): Iterator<string> {
    let index = 0;
    const names = this.names;

    return {
      hasNext: () => index < names.length,
      next: () => names[index++],
    };
  }
}

// Usage
const nameRepo = new NameRepository();
const iterator = nameRepo.createIterator();

while (iterator.hasNext()) {
  console.log(iterator.next());
}`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Traversing custom data structures</li>
        <li>Abstracting away iteration logic</li>
        <li>Supporting multiple iteration strategies</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>To iterate without exposing internal structure</li>
        <li>To have multiple iterators over the same collection</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Overhead for small/simple collections</li>
        <li>Not ideal for performance-critical tight loops</li>
      </ul>
    </PatternLayout>
  );
}
