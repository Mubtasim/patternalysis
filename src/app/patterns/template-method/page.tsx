"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Abstract Class
abstract class DataProcessor {
  process(): string[] {
    const steps: string[] = [];
    steps.push(this.readData());
    steps.push(this.transformData());
    steps.push(this.saveData());
    return steps;
  }

  protected abstract readData(): string;
  protected abstract transformData(): string;
  protected abstract saveData(): string;
}

// Concrete Class 1
class CSVProcessor extends DataProcessor {
  protected readData(): string {
    return "📥 Reading CSV data...";
  }
  protected transformData(): string {
    return "🔄 Converting CSV rows to objects...";
  }
  protected saveData(): string {
    return "💾 Saving objects to DB...";
  }
}

// Concrete Class 2
class JSONProcessor extends DataProcessor {
  protected readData(): string {
    return "📥 Reading JSON file...";
  }
  protected transformData(): string {
    return "🔄 Parsing JSON to object...";
  }
  protected saveData(): string {
    return "💾 Inserting object to DB...";
  }
}

export default function TemplateMethodPage() {
  const [logs, setLogs] = useState<string[]>([]);

  const handleProcess = (type: "csv" | "json") => {
    const processor = type === "csv" ? new CSVProcessor() : new JSONProcessor();
    const result = processor.process();
    setLogs(result);
  };

  return (
    <PatternLayout title="Template Method">
      <p className="mb-4">
        Defines the skeleton of an algorithm in the base class and lets
        subclasses override specific steps.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        The Template Method pattern lets subclasses redefine certain steps of an
        algorithm without changing the algorithm’s structure.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Example</h2>
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => handleProcess("csv")}
          className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded text-white"
        >
          Process CSV
        </button>
        <button
          onClick={() => handleProcess("json")}
          className="bg-teal-600 hover:bg-teal-500 px-4 py-2 rounded text-white"
        >
          Process JSON
        </button>
      </div>

      <div className="bg-card p-4 text-foreground text-sm rounded mb-6 border border-border min-h-[50px]">
        {logs.map((log, idx) => (
          <div key={idx}>{log}</div>
        ))}
      </div>

      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
        {`abstract class DataProcessor {
  process(): string[] {
    const steps: string[] = [];
    steps.push(this.readData());
    steps.push(this.transformData());
    steps.push(this.saveData());
    return steps;
  }

  protected abstract readData(): string;
  protected abstract transformData(): string;
  protected abstract saveData(): string;
}

class CSVProcessor extends DataProcessor {
  protected readData(): string {
    return 'Reading CSV data...';
  }
  protected transformData(): string {
    return 'Converting CSV rows to objects...';
  }
  protected saveData(): string {
    return 'Saving objects to DB...';
  }
}

class JSONProcessor extends DataProcessor {
  protected readData(): string {
    return 'Reading JSON file...';
  }
  protected transformData(): string {
    return 'Parsing JSON to object...';
  }
  protected saveData(): string {
    return 'Inserting object to DB...';
  }
}

const processor = new CSVProcessor();
console.log(processor.process());`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>
          Framework lifecycle methods (e.g., React hooks, Angular lifecycle)
        </li>
        <li>Form validation pipelines</li>
        <li>Workflow steps where base structure is fixed</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>You want to enforce a strict sequence of steps</li>
        <li>Subclasses share structure but vary in detail</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>
          Harder to follow logic when too many layers inherit from the base
        </li>
        <li>Inflexible if steps are not actually reusable</li>
      </ul>
    </PatternLayout>
  );
}
