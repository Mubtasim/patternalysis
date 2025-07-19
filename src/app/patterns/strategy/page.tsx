"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Strategy Pattern Implementation
interface SortStrategy {
  sort(data: number[]): number[];
  getName(): string;
  getComplexity(): string;
}

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

  getName(): string {
    return "Bubble Sort";
  }

  getComplexity(): string {
    return "O(n²)";
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

  getName(): string {
    return "Quick Sort";
  }

  getComplexity(): string {
    return "O(n log n)";
  }
}

class MergeSort implements SortStrategy {
  sort(data: number[]): number[] {
    if (data.length <= 1) return data;
    
    const mid = Math.floor(data.length / 2);
    const left = this.sort(data.slice(0, mid));
    const right = this.sort(data.slice(mid));
    
    return this.merge(left, right);
  }

  private merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  getName(): string {
    return "Merge Sort";
  }

  getComplexity(): string {
    return "O(n log n)";
  }
}

class StrategySorter {
  private strategy: SortStrategy;
  private static sortCount = 0;
  private static sortLog: string[] = [];

  constructor(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: SortStrategy) {
    this.strategy = strategy;
    const timestamp = new Date().toLocaleTimeString();
    StrategySorter.sortLog.push(`🔄 [${timestamp}] Strategy changed to ${strategy.getName()}`);
  }

  sort(data: number[]): number[] {
    StrategySorter.sortCount++;
    const timestamp = new Date().toLocaleTimeString();
    const result = this.strategy.sort(data);
    
    StrategySorter.sortLog.push(
      `✅ [${timestamp}] Sorted [${data.join(',')}] → [${result.join(',')}] using ${this.strategy.getName()} (${this.strategy.getComplexity()})`
    );
    
    return result;
  }

  static getSortCount(): number {
    return StrategySorter.sortCount;
  }

  static getSortLog(): string[] {
    return StrategySorter.sortLog.slice(-5);
  }

  static resetStats(): void {
    StrategySorter.sortCount = 0;
    StrategySorter.sortLog = [];
  }
}

// Hardcoded Logic Implementation (Anti-pattern)
class HardcodedSorter {
  private static sortCount = 0;
  private static sortLog: string[] = [];

  static sort(data: number[], algorithm: string): number[] {
    HardcodedSorter.sortCount++;
    const timestamp = new Date().toLocaleTimeString();
    
    let result: number[];
    let complexity: string;

    // This is the problem - hardcoded switch statement that needs modification for each new algorithm
    switch (algorithm) {
      case "bubble":
        result = HardcodedSorter.bubbleSort([...data]);
        complexity = "O(n²)";
        break;
      case "quick":
        result = HardcodedSorter.quickSort([...data]);
        complexity = "O(n log n)";
        break;
      case "merge":
        result = HardcodedSorter.mergeSort([...data]);
        complexity = "O(n log n)";
        break;
      default:
        HardcodedSorter.sortLog.push(`❌ [${timestamp}] Unknown algorithm: ${algorithm}`);
        throw new Error(`Unsupported sorting algorithm: ${algorithm}`);
    }

    HardcodedSorter.sortLog.push(
      `✅ [${timestamp}] Hardcoded sort [${data.join(',')}] → [${result.join(',')}] using ${algorithm} (${complexity}) - switch statement logic!`
    );

    return result;
  }

  private static bubbleSort(arr: number[]): number[] {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }

  private static quickSort(data: number[]): number[] {
    if (data.length <= 1) return data;
    const [pivot, ...rest] = data;
    const left = rest.filter((x) => x < pivot);
    const right = rest.filter((x) => x >= pivot);
    return [...HardcodedSorter.quickSort(left), pivot, ...HardcodedSorter.quickSort(right)];
  }

  private static mergeSort(data: number[]): number[] {
    if (data.length <= 1) return data;
    
    const mid = Math.floor(data.length / 2);
    const left = HardcodedSorter.mergeSort(data.slice(0, mid));
    const right = HardcodedSorter.mergeSort(data.slice(mid));
    
    return HardcodedSorter.merge(left, right);
  }

  private static merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  static getSortCount(): number {
    return HardcodedSorter.sortCount;
  }

  static getSortLog(): string[] {
    return HardcodedSorter.sortLog.slice(-5);
  }

  static resetStats(): void {
    HardcodedSorter.sortCount = 0;
    HardcodedSorter.sortLog = [];
  }
}

export default function StrategyPatternPage() {
  const [strategyLogs, setStrategyLogs] = useState<string[]>([]);
  const [hardcodedLogs, setHardcodedLogs] = useState<string[]>([]);
  const [strategyCount, setStrategyCount] = useState(0);
  const [hardcodedCount, setHardcodedCount] = useState(0);
  const [testData] = useState<number[]>([64, 34, 25, 12, 22, 11, 90]);
  const [maintenanceDemo, setMaintenanceDemo] = useState<{strategy: string[], hardcoded: string[]} | null>(null);

  // Use persistent instances
  const [strategySorter] = useState(() => new StrategySorter(new BubbleSort()));

  const handleStrategySort = (algorithmName: string) => {
    let strategy: SortStrategy;
    switch (algorithmName) {
      case "bubble":
        strategy = new BubbleSort();
        break;
      case "quick":
        strategy = new QuickSort();
        break;
      case "merge":
        strategy = new MergeSort();
        break;
      default:
        return;
    }

    strategySorter.setStrategy(strategy);
    strategySorter.sort(testData);
    setStrategyLogs(StrategySorter.getSortLog());
    setStrategyCount(StrategySorter.getSortCount());
  };

  const handleHardcodedSort = (algorithmName: string) => {
    try {
      HardcodedSorter.sort(testData, algorithmName);
      setHardcodedLogs(HardcodedSorter.getSortLog());
      setHardcodedCount(HardcodedSorter.getSortCount());
    } catch {
      setHardcodedLogs(HardcodedSorter.getSortLog());
      setHardcodedCount(HardcodedSorter.getSortCount());
    }
  };

  const handleMaintenanceDemo = () => {
    const strategyMaintenance = [
      "🔍 Request: Add Heap Sort algorithm",
      "📝 Step 1: Create HeapSort class implementing SortStrategy interface",
      "💡 Step 2: Implement sort(), getName(), and getComplexity() methods",
      "✅ DONE! HeapSort can now be used anywhere strategies are accepted",
      "🧪 Zero changes needed to existing Sorter class or client code",
      "🔌 Plug-and-play: Just pass new HeapSort() to setStrategy()"
    ];

    const hardcodedMaintenance = [
      "🔍 Request: Add Heap Sort algorithm",
      "📝 Step 1: Implement heapSort() method in HardcodedSorter class",
      "❌ Step 2: Add 'heap' case to the main switch statement",
      "❌ Step 3: Update all UI dropdowns to include 'Heap Sort' option",
      "❌ Step 4: Update all algorithm documentation/comments",
      "❌ Step 5: Find and update DataProcessor.sort() switch statement",
      "❌ Step 6: Find and update ReportGenerator.sort() switch statement",
      "❌ Step 7: Find and update ExportService.sort() switch statement",
      "❌ Step 8: Update all 15 other places that have hardcoded algorithm logic",
      "❌ Step 9: Update unit tests for each modified class",
      "❌ Step 10: Update integration tests that rely on algorithm lists",
      "⚠️  Step 11: Search codebase for any missed hardcoded references",
      "💥 RISK: Easy to miss a switch statement and break existing functionality"
    ];

    setMaintenanceDemo({
      strategy: strategyMaintenance,
      hardcoded: hardcodedMaintenance
    });
  };

  const resetDemo = () => {
    StrategySorter.resetStats();
    HardcodedSorter.resetStats();
    setStrategyLogs([]);
    setHardcodedLogs([]);
    setStrategyCount(0);
    setHardcodedCount(0);
    setMaintenanceDemo(null);
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
        runtime without altering the client code or using complex conditional logic.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Interactive Demo: Strategy vs Hardcoded Logic</h2>
      <p className="mb-4 text-zinc-400">
        Compare how Strategy Pattern provides clean algorithm switching vs hardcoded conditional logic:
      </p>

      <div className="mb-4 p-3 bg-zinc-800 rounded border border-zinc-600">
        <h4 className="font-semibold mb-2 text-zinc-300">Test Data:</h4>
        <div className="font-mono text-sm text-blue-300">[{testData.join(', ')}]</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Strategy Pattern Demo */}
        <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-700">
          <h3 className="text-lg font-semibold mb-3 text-green-400">⚡ Strategy Pattern</h3>
          
          <div className="grid grid-cols-1 gap-2 mb-3">
            <button
              onClick={() => handleStrategySort("bubble")}
              className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded text-sm"
            >
              Use Bubble Sort Strategy
            </button>
            <button
              onClick={() => handleStrategySort("quick")}
              className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded text-sm"
            >
              Use Quick Sort Strategy
            </button>
            <button
              onClick={() => handleStrategySort("merge")}
              className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded text-sm"
            >
              Use Merge Sort Strategy
            </button>
          </div>
          
          <div className="space-y-2 text-sm mb-3">
            <div className="flex justify-between">
              <span>Sorts Performed:</span>
              <span className="font-mono bg-zinc-800 px-2 py-1 rounded text-green-400">
                {strategyCount}
              </span>
            </div>
          </div>
          
          <div>
            <span className="block mb-1 text-sm">Recent Activity:</span>
            <div className="bg-zinc-800 p-2 rounded text-xs font-mono min-h-[120px] max-h-[120px] overflow-y-auto">
              {strategyLogs.length > 0 ? (
                strategyLogs.map((log, idx) => (
                  <div key={idx} className="mb-1 break-all">{log}</div>
                ))
              ) : (
                <div className="text-zinc-500">No activity yet...</div>
              )}
            </div>
          </div>
        </div>

        {/* Hardcoded Logic Demo */}
        <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-700">
          <h3 className="text-lg font-semibold mb-3 text-red-400">🔀 Hardcoded Logic</h3>
          
          <div className="grid grid-cols-1 gap-2 mb-3">
            <button
              onClick={() => handleHardcodedSort("bubble")}
              className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded text-sm"
            >
              Hardcoded Bubble Sort
            </button>
            <button
              onClick={() => handleHardcodedSort("quick")}
              className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded text-sm"
            >
              Hardcoded Quick Sort
            </button>
            <button
              onClick={() => handleHardcodedSort("merge")}
              className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded text-sm"
            >
              Hardcoded Merge Sort
            </button>
          </div>
          
          <div className="space-y-2 text-sm mb-3">
            <div className="flex justify-between">
              <span>Sorts Performed:</span>
              <span className="font-mono bg-zinc-800 px-2 py-1 rounded text-red-400">
                {hardcodedCount}
              </span>
            </div>
          </div>
          
          <div>
            <span className="block mb-1 text-sm">Recent Activity:</span>
            <div className="bg-zinc-800 p-2 rounded text-xs font-mono min-h-[120px] max-h-[120px] overflow-y-auto">
              {hardcodedLogs.length > 0 ? (
                hardcodedLogs.map((log, idx) => (
                  <div key={idx} className="mb-1 break-all">{log}</div>
                ))
              ) : (
                <div className="text-zinc-500">No activity yet...</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
        <h4 className="font-semibold mb-2 text-blue-300">💡 Key Differences:</h4>
        <ul className="text-sm space-y-1 text-blue-200">
          <li>• <strong>Strategy Pattern</strong>: Clean polymorphism, easy to extend, encapsulated algorithms</li>
          <li>• <strong>Hardcoded Logic</strong>: Complex switch statements, scattered logic, hard to maintain</li>
          <li>• Notice how Strategy provides cleaner logs and better algorithm information!</li>
        </ul>
      </div>

      <div className="mb-6">
        <button
          className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold"
          onClick={handleMaintenanceDemo}
        >
          🔧 Simulate Code Maintenance: Add Heap Sort Algorithm
        </button>
      </div>

      {maintenanceDemo && (
        <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Strategy Maintenance */}
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-green-300 flex items-center">
              ⚡ Strategy Pattern Approach
            </h4>
            <div className="space-y-2">
              {maintenanceDemo.strategy.map((step, idx) => (
                <div key={idx} className="text-sm text-green-200 flex items-start gap-2">
                  <span className="text-green-400 font-mono text-xs mt-0.5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 p-2 bg-green-800/30 rounded text-xs text-green-100">
              <strong>Result:</strong> Plug-and-play extension, zero existing code changes
            </div>
          </div>

          {/* Hardcoded Logic Maintenance */}
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-red-300 flex items-center">
              🔀 Hardcoded Logic Approach
            </h4>
            <div className="space-y-2">
              {maintenanceDemo.hardcoded.map((step, idx) => (
                <div key={idx} className="text-sm text-red-200 flex items-start gap-2">
                  <span className="text-red-400 font-mono text-xs mt-0.5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 p-2 bg-red-800/30 rounded text-xs text-red-100">
              <strong>Result:</strong> Multiple file changes, high risk of missing switch statements
            </div>
          </div>
        </div>
      )}

      <button
        className="bg-zinc-600 hover:bg-zinc-500 text-white px-4 py-2 rounded mb-6 text-sm"
        onClick={resetDemo}
      >
        Reset Demo
      </button>

      <h2 className="text-xl font-semibold mt-6 mb-2">Code Example</h2>
      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
        {`interface SortStrategy {
  sort(data: number[]): number[];
  getName(): string;
  getComplexity(): string;
}

class QuickSort implements SortStrategy {
  sort(data: number[]): number[] {
    // Quick sort implementation
    return this.quickSortRecursive(data);
  }
  
  getName(): string { return "Quick Sort"; }
  getComplexity(): string { return "O(n log n)"; }
}

class StrategySorter {
  private strategy: SortStrategy;

  setStrategy(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  sort(data: number[]): number[] {
    return this.strategy.sort(data); // Clean delegation
  }
}

// Usage - Clean and extensible
const sorter = new StrategySorter();
sorter.setStrategy(new QuickSort());
const result = sorter.sort([64, 34, 25, 12]);

// vs Hardcoded Approach - Complex and brittle
class HardcodedSorter {
  static sort(data: number[], algorithm: string): number[] {
    switch (algorithm) { // This grows complex quickly
      case "bubble": return this.bubbleSort(data);
      case "quick": return this.quickSort(data);
      case "merge": return this.mergeSort(data);
      case "heap": return this.heapSort(data); // Each addition requires changes here
      default: throw new Error("Unsupported algorithm");
    }
  }
}`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Choosing algorithms at runtime (sorting, compression, encryption)</li>
        <li>Payment processing (credit card, PayPal, bank transfer)</li>
        <li>Validation strategies (email, phone, password strength)</li>
        <li>Data export formats (PDF, Excel, CSV)</li>
        <li>Authentication methods (OAuth, JWT, API keys)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>When you need to select behavior dynamically</li>
        <li>When multiple variants of an algorithm are needed</li>
        <li>To eliminate complex conditional logic (if/else, switch statements)</li>
        <li>When algorithms should be interchangeable at runtime</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Can increase number of classes (but improves maintainability)</li>
        <li>Clients must be aware of different strategies</li>
        <li>Overkill for simple algorithms that rarely change</li>
        <li>Strategy switching overhead for performance-critical applications</li>
      </ul>
    </PatternLayout>
  );
}
