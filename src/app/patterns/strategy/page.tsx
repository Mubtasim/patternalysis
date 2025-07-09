"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Strategy interface
interface SortStrategy {
  sort(data: number[]): number[];
}

// Concrete Strategies
class BubbleSort implements SortStrategy {
  sort(data: number[]): number[] {
    const arr = [...data];
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }
}

class QuickSort implements SortStrategy {
  sort(data: number[]): number[] {
    if (data.length <= 1) return data;
    const [pivot, ...rest] = data;
    const left = rest.filter((x) => x < pivot);
    const right = rest.filter((x) => x >= pivot);
    return [...this.sort(left), pivot, ...this.sort(right)];
  }
}

// Context
class Sorter {
  private strategy: SortStrategy;

  constructor(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  sort(data: number[]): number[] {
    return this.strategy.sort(data);
  }
}

export default function StrategyPatternPage() {
  const [data, setData] = useState<number[]>([10, 5, 8, 3, 7]);
  const [result, setResult] = useState<number[]>([]);
  const [strategyName, setStrategyName] = useState("Bubble Sort");

  const sorter = new Sorter(new BubbleSort());

  const handleSort = () => {
    let strategy: SortStrategy;
    if (strategyName === "Bubble Sort") strategy = new BubbleSort();
    else strategy = new QuickSort();

    sorter.setStrategy(strategy);
    const sorted = sorter.sort(data);
    setResult(sorted);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = parseInt(e.target.value);
    if (isNaN(val)) return;
    const newData = [...data];
    newData[index] = val;
    setData(newData);
  };

  return (
    <PatternLayout title="Strategy">
      <p className="mb-4">
        Defines a family of algorithms, encapsulates each one, and makes them
        interchangeable.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        The Strategy pattern lets you select an algorithm&apos;s behavior at
        runtime without altering the client.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Example</h2>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">
          Select Sort Strategy:
        </label>
        <select
          value={strategyName}
          onChange={(e) => setStrategyName(e.target.value)}
          className="bg-zinc-800 text-white px-3 py-1 rounded"
        >
          <option>Bubble Sort</option>
          <option>Quick Sort</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Input Data:</label>
        <div className="flex gap-2">
          {data.map((num, idx) => (
            <input
              key={idx}
              type="number"
              value={num}
              onChange={(e) => handleInputChange(e, idx)}
              className="w-16 p-1 rounded bg-zinc-800 text-white border border-zinc-700"
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleSort}
        className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded mb-6"
      >
        Sort
      </button>

      {result.length > 0 && (
        <>
          <p className="mb-2 font-medium text-gray-300">
            Using strategy: {strategyName}
          </p>
          <p className="mb-6 font-semibold text-green-400">
            Sorted Result: {result.join(", ")}
          </p>
        </>
      )}

      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
        {`interface SortStrategy {
  sort(data: number[]): number[];
}

class BubbleSort implements SortStrategy {
  sort(data: number[]): number[] {
    // Bubble sort implementation
  }
}

class QuickSort implements SortStrategy {
  sort(data: number[]): number[] {
    // Quick sort implementation
  }
}

class Sorter {
  private strategy: SortStrategy;

  constructor(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  sort(data: number[]): number[] {
    return this.strategy.sort(data);
  }
}

// Usage
const sorter = new Sorter(new BubbleSort());
const sorted = sorter.sort([10,5,8,3,7]);
console.log(sorted);`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Choosing algorithms at runtime</li>
        <li>Sorting strategies, compression, encryption algorithms</li>
        <li>Replacing conditionals with polymorphism</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>When you need to select behavior dynamically</li>
        <li>When multiple variants of an algorithm are needed</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Can increase number of classes</li>
        <li>Clients must be aware of different strategies</li>
      </ul>
    </PatternLayout>
  );
}
