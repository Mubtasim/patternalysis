"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Shape interface
interface Shape {
  draw: () => string;
  getType: () => string;
}

class Circle implements Shape {
  draw() {
    return "Drawing a Circle 🟡";
  }
  getType() {
    return "Circle";
  }
}

class Square implements Shape {
  draw() {
    return "Drawing a Square 🟦";
  }
  getType() {
    return "Square";
  }
}

class Triangle implements Shape {
  draw() {
    return "Drawing a Triangle 🔺";
  }
  getType() {
    return "Triangle";
  }
}

// Factory Method
class ShapeFactory {
  private static creationCount = 0;
  private static creationLog: string[] = [];

  createShape(type: string): Shape {
    ShapeFactory.creationCount++;
    const timestamp = new Date().toLocaleTimeString();
    
    let shape: Shape;
    switch (type.toLowerCase()) {
      case "circle":
        shape = new Circle();
        break;
      case "square":
        shape = new Square();
        break;
      case "triangle":
        shape = new Triangle();
        break;
      default:
        ShapeFactory.creationLog.push(`❌ [${timestamp}] Failed to create: ${type}`);
        throw new Error(`Unknown shape type: ${type}`);
    }
    
    ShapeFactory.creationLog.push(`✅ [${timestamp}] Created: ${shape.getType()}`);
    return shape;
  }

  static getCreationCount(): number {
    return ShapeFactory.creationCount;
  }

  static getCreationLog(): string[] {
    return ShapeFactory.creationLog.slice(-5); // Last 5 entries
  }

  static resetStats(): void {
    ShapeFactory.creationCount = 0;
    ShapeFactory.creationLog = [];
  }
}

// Direct instantiation tracking for comparison
class DirectInstantiationTracker {
  private static attemptCount = 0;
  private static attemptLog: string[] = [];

  static createShape(type: string): Shape {
    DirectInstantiationTracker.attemptCount++;
    const timestamp = new Date().toLocaleTimeString();

    // This is how direct instantiation typically looks - lots of if/else or switch
    let shape: Shape;
    try {
      if (type.toLowerCase() === "circle") {
        shape = new Circle();
      } else if (type.toLowerCase() === "square") {
        shape = new Square();
      } else if (type.toLowerCase() === "triangle") {
        shape = new Triangle();
      } else {
        DirectInstantiationTracker.attemptLog.push(`❌ [${timestamp}] Failed: ${type} (hardcoded logic)`);
        throw new Error(`Cannot create ${type} - need to modify code`);
      }
      
      DirectInstantiationTracker.attemptLog.push(`✅ [${timestamp}] Created: ${shape.getType()} (hardcoded)`);
      return shape;
    } catch (error) {
      throw error;
    }
  }

  static getAttemptCount(): number {
    return DirectInstantiationTracker.attemptCount;
  }

  static getAttemptLog(): string[] {
    return DirectInstantiationTracker.attemptLog.slice(-5); // Last 5 entries
  }

  static resetStats(): void {
    DirectInstantiationTracker.attemptCount = 0;
    DirectInstantiationTracker.attemptLog = [];
  }
}

export default function FactoryMethodPage() {
  const [factoryResults, setFactoryResults] = useState<string[]>([]);
  const [directResults, setDirectResults] = useState<string[]>([]);
  const [factoryCount, setFactoryCount] = useState(0);
  const [directCount, setDirectCount] = useState(0);
  const [maintenanceDemo, setMaintenanceDemo] = useState<{factory: string[], direct: string[]} | null>(null);

  const factory = new ShapeFactory();

  const handleFactoryCreate = (type: string) => {
    try {
      factory.createShape(type);
      setFactoryResults(ShapeFactory.getCreationLog());
      setFactoryCount(ShapeFactory.getCreationCount());
    } catch {
      setFactoryResults(ShapeFactory.getCreationLog());
      setFactoryCount(ShapeFactory.getCreationCount());
    }
  };

  const handleDirectCreate = (type: string) => {
    try {
      DirectInstantiationTracker.createShape(type);
      setDirectResults(DirectInstantiationTracker.getAttemptLog());
      setDirectCount(DirectInstantiationTracker.getAttemptCount());
    } catch {
      setDirectResults(DirectInstantiationTracker.getAttemptLog());
      setDirectCount(DirectInstantiationTracker.getAttemptCount());
    }
  };

  const handleMaintenanceDemo = () => {
    const factoryMaintenance = [
      "🔍 Request: Add Diamond shape support",
      "📝 Step 1: Create Diamond class implementing Shape interface",
      "✏️  Step 2: Add 'diamond' case to factory switch statement",
      "✅ DONE! Diamond support added in 2 simple steps",
      "🧪 All existing code continues to work without changes"
    ];

    const directMaintenance = [
      "🔍 Request: Add Diamond shape support", 
      "📝 Step 1: Create Diamond class implementing Shape interface",
      "❌ Step 2: Find and update UIManager.createShape() method",
      "❌ Step 3: Find and update GameEngine.createShape() method", 
      "❌ Step 4: Find and update ShapeRenderer.createShape() method",
      "❌ Step 5: Update all 12 other files that create shapes directly",
      "❌ Step 6: Update tests for each modified file",
      "⚠️  Step 7: Hope you didn't miss any creation points...",
      "💥 RISK: High chance of breaking existing functionality"
    ];

    setMaintenanceDemo({
      factory: factoryMaintenance,
      direct: directMaintenance
    });
  };

  const resetDemo = () => {
    ShapeFactory.resetStats();
    DirectInstantiationTracker.resetStats();
    setFactoryResults([]);
    setDirectResults([]);
    setFactoryCount(0);
    setDirectCount(0);
    setMaintenanceDemo(null);
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

      <h2 className="text-xl font-semibold mt-6 mb-2">Interactive Demo: Factory vs Direct Instantiation</h2>
      <p className="mb-4 text-zinc-400">
        Compare how Factory Method provides better flexibility and error handling compared to direct instantiation:
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Factory Method Demo */}
        <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-700">
          <h3 className="text-lg font-semibold mb-3 text-green-400">🏭 Factory Method</h3>
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => handleFactoryCreate("circle")}
              className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded text-sm"
            >
              Create Circle
            </button>
            <button
              onClick={() => handleFactoryCreate("square")}
              className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded text-sm"
            >
              Create Square
            </button>
            <button
              onClick={() => handleFactoryCreate("triangle")}
              className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded text-sm"
            >
              Create Triangle
            </button>
            <button
              onClick={() => handleFactoryCreate("unknown")}
              className="bg-orange-600 hover:bg-orange-500 text-white px-3 py-2 rounded text-sm"
            >
              Try Unknown
            </button>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Total Attempts:</span>
              <span className="font-mono bg-zinc-800 px-2 py-1 rounded text-green-400">
                {factoryCount}
              </span>
            </div>
            <div>
              <span className="block mb-1">Recent Activity:</span>
              <div className="bg-zinc-800 p-2 rounded text-xs font-mono min-h-[100px] max-h-[100px] overflow-y-auto">
                {factoryResults.length > 0 ? (
                  factoryResults.map((log, idx) => (
                    <div key={idx} className="mb-1">{log}</div>
                  ))
                ) : (
                  <div className="text-zinc-500">No activity yet...</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Direct Instantiation Demo */}
        <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-700">
          <h3 className="text-lg font-semibold mb-3 text-red-400">🔧 Direct Instantiation</h3>
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => handleDirectCreate("circle")}
              className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded text-sm"
            >
              Create Circle
            </button>
            <button
              onClick={() => handleDirectCreate("square")}
              className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded text-sm"
            >
              Create Square
            </button>
            <button
              onClick={() => handleDirectCreate("triangle")}
              className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded text-sm"
            >
              Create Triangle
            </button>
            <button
              onClick={() => handleDirectCreate("unknown")}
              className="bg-orange-600 hover:bg-orange-500 text-white px-3 py-2 rounded text-sm"
            >
              Try Unknown
            </button>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Total Attempts:</span>
              <span className="font-mono bg-zinc-800 px-2 py-1 rounded text-red-400">
                {directCount}
              </span>
            </div>
            <div>
              <span className="block mb-1">Recent Activity:</span>
              <div className="bg-zinc-800 p-2 rounded text-xs font-mono min-h-[100px] max-h-[100px] overflow-y-auto">
                {directResults.length > 0 ? (
                  directResults.map((log, idx) => (
                    <div key={idx} className="mb-1">{log}</div>
                  ))
                ) : (
                  <div className="text-zinc-500">No activity yet...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
        <h4 className="font-semibold mb-2 text-blue-300">💡 Key Differences:</h4>
        <ul className="text-sm space-y-1 text-blue-200">
          <li>• <strong>Factory Method</strong>: Centralized creation logic, easy to extend, clean error handling</li>
          <li>• <strong>Direct Instantiation</strong>: Scattered creation logic, hard to extend, repetitive code</li>
          <li>• Try creating &quot;unknown&quot; shapes to see how error handling differs!</li>
        </ul>
      </div>

      <div className="mb-6">
        <button
          className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold"
          onClick={handleMaintenanceDemo}
        >
          🔧 Simulate Code Maintenance: Add New Shape Type
        </button>
      </div>

      {maintenanceDemo && (
        <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Factory Maintenance */}
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-green-300 flex items-center">
              🏭 Factory Method Approach
            </h4>
            <div className="space-y-2">
              {maintenanceDemo.factory.map((step, idx) => (
                <div key={idx} className="text-sm text-green-200 flex items-start gap-2">
                  <span className="text-green-400 font-mono text-xs mt-0.5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 p-2 bg-green-800/30 rounded text-xs text-green-100">
              <strong>Result:</strong> Clean, safe, maintainable solution
            </div>
          </div>

          {/* Direct Instantiation Maintenance */}
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-red-300 flex items-center">
              🔧 Direct Instantiation Approach
            </h4>
            <div className="space-y-2">
              {maintenanceDemo.direct.map((step, idx) => (
                <div key={idx} className="text-sm text-red-200 flex items-start gap-2">
                  <span className="text-red-400 font-mono text-xs mt-0.5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 p-2 bg-red-800/30 rounded text-xs text-red-100">
              <strong>Result:</strong> Error-prone, time-consuming, risky changes
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
        {`interface Shape {
  draw: () => string;
}

class Circle implements Shape {
  draw() {
    return 'Drawing a Circle 🟡';
  }
}

class Square implements Shape {
  draw() {
    return 'Drawing a Square 🟦';
  }
}

// Factory Method Pattern
class ShapeFactory {
  createShape(type: string): Shape {
    switch (type.toLowerCase()) {
      case 'circle':
        return new Circle();
      case 'square':
        return new Square();
      case 'triangle':
        return new Triangle(); // Easy to add new shapes!
      default:
        throw new Error(\`Unknown shape type: \${type}\`);
    }
  }
}

// Usage - Clean and extensible
const factory = new ShapeFactory();
const shape = factory.createShape('circle');
console.log(shape.draw());

// vs Direct Instantiation - Scattered logic
function createShapeDirectly(type: string): Shape {
  if (type === 'circle') return new Circle();
  if (type === 'square') return new Square();
  // Adding triangle requires modifying this function everywhere it's used
  throw new Error('Unsupported shape');
}`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Object creation with subclasses</li>
        <li>UI widget libraries (Button, TextField, etc.)</li>
        <li>Frameworks that need to create objects without tight coupling</li>
        <li>Plugin systems where new types can be added</li>
        <li>Database drivers (MySQL, PostgreSQL, etc.)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>When a class can&apos;t anticipate the class of objects it must create</li>
        <li>To delegate responsibility of object creation to subclasses</li>
        <li>When you want to localize the knowledge of which class to create</li>
        <li>When you need to provide extensibility for object creation</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Can lead to many small subclasses</li>
        <li>Can complicate the code with lots of parallel hierarchies</li>
        <li>Overkill for simple object creation scenarios</li>
        <li>Can hide dependencies if overused</li>
      </ul>
    </PatternLayout>
  );
}
