"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Base Shape interface
interface Shape {
  draw: () => string;
  getType: () => string;
  getColor: () => string;
}

// Original shapes (v1.0)
class Circle implements Shape {
  constructor(private color: string = "blue") {}
  draw() { return `Drawing a ${this.color} Circle 🟡`; }
  getType() { return "Circle"; }
  getColor() { return this.color; }
}

class Square implements Shape {
  constructor(private color: string = "red") {}
  draw() { return `Drawing a ${this.color} Square 🟦`; }
  getType() { return "Square"; }
  getColor() { return this.color; }
}

// New shapes (v2.0) - These break direct instantiation!
class Triangle implements Shape {
  constructor(private color: string = "green") {}
  draw() { return `Drawing a ${this.color} Triangle 🔺`; }
  getType() { return "Triangle"; }
  getColor() { return this.color; }
}

class Star implements Shape {
  constructor(private color: string = "yellow") {}
  draw() { return `Drawing a ${this.color} Star ⭐`; }
  getType() { return "Star"; }
  getColor() { return this.color; }
}

// Factory Method Pattern - Handles all shapes gracefully
class ShapeFactory {
  private static supportedTypes = ["circle", "square", "triangle", "star"];
  private static creationLog: string[] = [];

  static createShape(type: string, color: string = "default"): Shape {
    const timestamp = new Date().toLocaleTimeString();
    
    switch (type.toLowerCase()) {
      case "circle":
        ShapeFactory.creationLog.push(`✅ [${timestamp}] Factory created ${color} Circle`);
        return new Circle(color);
      case "square":
        ShapeFactory.creationLog.push(`✅ [${timestamp}] Factory created ${color} Square`);
        return new Square(color);
      case "triangle":
        ShapeFactory.creationLog.push(`✅ [${timestamp}] Factory created ${color} Triangle`);
        return new Triangle(color);
      case "star":
        ShapeFactory.creationLog.push(`✅ [${timestamp}] Factory created ${color} Star`);
        return new Star(color);
      default:
        ShapeFactory.creationLog.push(`❌ [${timestamp}] Factory: Unknown type '${type}'`);
        throw new Error(`Factory: Unsupported shape type: ${type}`);
    }
  }

  static getSupportedTypes(): string[] {
    return [...ShapeFactory.supportedTypes];
  }

  static getCreationLog(): string[] {
    return ShapeFactory.creationLog.slice(-5);
  }

  static resetLog(): void {
    ShapeFactory.creationLog = [];
  }
}

// Direct Instantiation - Breaks when new shapes are added!
class DirectInstantiation {
  private static creationLog: string[] = [];
  
  // This represents old v1.0 code that only knows about Circle and Square
  static createShape(type: string, color: string = "default"): Shape {
    const timestamp = new Date().toLocaleTimeString();
    
    // PROBLEM: This old code doesn't know about new shapes!
    switch (type.toLowerCase()) {
      case "circle":
        DirectInstantiation.creationLog.push(`✅ [${timestamp}] Direct: Created ${color} Circle (hardcoded)`);
        return new Circle(color);
      case "square":
        DirectInstantiation.creationLog.push(`✅ [${timestamp}] Direct: Created ${color} Square (hardcoded)`);
        return new Square(color);
      // Triangle and Star are NOT supported in this old code!
      default:
        DirectInstantiation.creationLog.push(`💥 [${timestamp}] Direct: BROKEN! '${type}' not in hardcoded list`);
        throw new Error(`Direct: ERROR! '${type}' not supported in v1.0 code. Need to modify every creation point!`);
    }
  }

  static getSupportedTypes(): string[] {
    return ["circle", "square"]; // Old code only supports these
  }

  static getCreationLog(): string[] {
    return DirectInstantiation.creationLog.slice(-5);
  }

  static resetLog(): void {
    DirectInstantiation.creationLog = [];
  }
}

export default function FactoryMethodPage() {
  const [factoryLogs, setFactoryLogs] = useState<string[]>([]);
  const [directLogs, setDirectLogs] = useState<string[]>([]);
  const [factoryResult, setFactoryResult] = useState<string>("");
  const [directResult, setDirectResult] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState("blue");
  const [maintenanceDemo, setMaintenanceDemo] = useState<{factory: string[], direct: string[]} | null>(null);

  const allShapes = ["circle", "square", "triangle", "star"];
  const colors = ["blue", "red", "green", "yellow", "purple"];

  const handleFactoryCreate = (shapeType: string) => {
    try {
      const shape = ShapeFactory.createShape(shapeType, selectedColor);
      setFactoryResult(shape.draw());
      setFactoryLogs(ShapeFactory.getCreationLog());
    } catch (error) {
      setFactoryResult(`Error: ${(error as Error).message}`);
      setFactoryLogs(ShapeFactory.getCreationLog());
    }
  };

  const handleDirectCreate = (shapeType: string) => {
    try {
      const shape = DirectInstantiation.createShape(shapeType, selectedColor);
      setDirectResult(shape.draw());
      setDirectLogs(DirectInstantiation.getCreationLog());
    } catch (error) {
      setDirectResult(`💥 BROKEN: ${(error as Error).message}`);
      setDirectLogs(DirectInstantiation.getCreationLog());
    }
  };

  const handleMaintenanceDemo = () => {
    const factoryMaintenance = [
      "🔍 Request: Add Heart shape support",
      "📝 Step 1: Create Heart class implementing Shape interface",
      "✏️  Step 2: Add 'heart' case to factory switch statement",
      "✅ DONE! Heart shapes work everywhere automatically",
      "🧪 All existing creation code continues to work unchanged",
      "🚀 Zero modifications needed to client code"
    ];

    const directMaintenance = [
      "🔍 Request: Add Heart shape support",
      "📝 Step 1: Create Heart class implementing Shape interface",
      "❌ Step 2: Find and update DrawingApp.createShape() method",
      "❌ Step 3: Find and update GameEngine.createShape() method",
      "❌ Step 4: Find and update UIBuilder.createShape() method",
      "❌ Step 5: Update all 8 other hardcoded creation points",
      "❌ Step 6: Update dropdown menus in 5 different components",
      "❌ Step 7: Update validation logic in form handlers",
      "❌ Step 8: Update documentation and type definitions",
      "⚠️  Step 9: Test every single creation point manually",
      "💥 RISK: Miss one creation point = runtime errors in production"
    ];

    setMaintenanceDemo({
      factory: factoryMaintenance,
      direct: directMaintenance
    });
  };

  const resetDemo = () => {
    ShapeFactory.resetLog();
    DirectInstantiation.resetLog();
    setFactoryLogs([]);
    setDirectLogs([]);
    setFactoryResult("");
    setDirectResult("");
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
        Factory Method provides **extensibility without modification** - you can add new types 
        without changing existing creation code.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Demo: The Extensibility Problem</h2>
      <p className="mb-4 text-zinc-400">
        Imagine you built an app in **v1.0** with Circle and Square. Now in **v2.0**, you need Triangle and Star. 
        Watch what happens to each approach:
      </p>

      <div className="mb-4 p-3 bg-zinc-800 rounded border border-zinc-600">
        <h4 className="font-semibold mb-2 text-zinc-300">Settings:</h4>
        <div className="flex items-center gap-4">
          <label className="text-sm">Color:</label>
          <select 
            value={selectedColor} 
            onChange={(e) => setSelectedColor(e.target.value)}
            className="bg-zinc-700 text-white px-2 py-1 rounded text-sm"
          >
            {colors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Factory Method Demo */}
        <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-700">
          <h3 className="text-lg font-semibold mb-3 text-green-400">🏭 Factory Method (v2.0)</h3>
          <p className="text-xs text-green-300 mb-3">Supports all shapes gracefully</p>
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            {allShapes.map(shape => (
              <button
                key={shape}
                onClick={() => handleFactoryCreate(shape)}
                className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded text-sm capitalize"
              >
                Create {shape}
              </button>
            ))}
          </div>
          
          <div className="mb-3 p-2 bg-zinc-800 rounded">
            <div className="text-xs text-zinc-400 mb-1">Result:</div>
            <div className="text-sm text-white min-h-[20px]">
              {factoryResult || "Click a button to create shapes..."}
            </div>
          </div>
          
          <div>
            <span className="block mb-1 text-xs text-zinc-400">Creation Log:</span>
            <div className="bg-zinc-800 p-2 rounded text-xs font-mono min-h-[100px] max-h-[100px] overflow-y-auto">
              {factoryLogs.length > 0 ? (
                factoryLogs.map((log, idx) => (
                  <div key={idx} className="mb-1">{log}</div>
                ))
              ) : (
                <div className="text-zinc-500">No activity yet...</div>
              )}
            </div>
          </div>
        </div>

        {/* Direct Instantiation Demo */}
        <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-700">
          <h3 className="text-lg font-semibold mb-3 text-red-400">🔧 Direct Instantiation (v1.0)</h3>
          <p className="text-xs text-red-300 mb-3">Old hardcoded logic - breaks with new shapes!</p>
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            {allShapes.map(shape => {
              const isSupported = DirectInstantiation.getSupportedTypes().includes(shape);
              return (
                <button
                  key={shape}
                  onClick={() => handleDirectCreate(shape)}
                  className={`px-3 py-2 rounded text-sm capitalize ${
                    isSupported 
                      ? "bg-red-600 hover:bg-red-500 text-white"
                      : "bg-orange-600 hover:bg-orange-500 text-white border-2 border-orange-300"
                  }`}
                >
                  {shape} {!isSupported && "💥"}
                </button>
              );
            })}
          </div>
          
          <div className="mb-3 p-2 bg-zinc-800 rounded">
            <div className="text-xs text-zinc-400 mb-1">Result:</div>
            <div className="text-sm text-white min-h-[20px]">
              {directResult || "Click a button to create shapes..."}
            </div>
          </div>
          
          <div>
            <span className="block mb-1 text-xs text-zinc-400">Creation Log:</span>
            <div className="bg-zinc-800 p-2 rounded text-xs font-mono min-h-[100px] max-h-[100px] overflow-y-auto">
              {directLogs.length > 0 ? (
                directLogs.map((log, idx) => (
                  <div key={idx} className="mb-1">{log}</div>
                ))
              ) : (
                <div className="text-zinc-500">No activity yet...</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
        <h4 className="font-semibold mb-2 text-blue-300">💡 The Key Difference:</h4>
        <ul className="text-sm space-y-1 text-blue-200">
          <li>• **Factory Method**: All 4 shapes work perfectly - handles extension gracefully</li>
          <li>• **Direct Instantiation**: Only 2 shapes work - breaks when new types are added</li>
          <li>• Try clicking Triangle and Star to see the dramatic difference!</li>
        </ul>
      </div>

      <div className="mb-6">
        <button
          className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold"
          onClick={handleMaintenanceDemo}
        >
          🔧 Simulate Code Maintenance: Add Heart Shape
        </button>
      </div>

      {maintenanceDemo && (
        <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Factory Maintenance */}
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-green-300">🏭 Factory Method Approach</h4>
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
              **Result:** Add once, works everywhere automatically
            </div>
          </div>

          {/* Direct Instantiation Maintenance */}
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-red-300">🔧 Direct Instantiation Approach</h4>
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
              **Result:** Hunt down every creation point, high risk of missing some
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

      <h2 className="text-xl font-semibold mt-6 mb-2">Code Example: The Real Problem</h2>
      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
        {`// Factory Method - Change ONE place, works everywhere
class ShapeFactory {
  static createShape(type: string): Shape {
    switch (type) {
      case 'circle': return new Circle();
      case 'square': return new Square();
      case 'triangle': return new Triangle(); // Add once here
      case 'star': return new Star();         // Add once here
      default: throw new Error(\`Unknown: \${type}\`);
    }
  }
}

// All these classes use the factory - NO changes needed:
class DrawingCanvas {
  createShape(type: string) {
    return ShapeFactory.createShape(type); // Works automatically
  }
}

class GameEngine {
  spawnEnemy(type: string) {
    return ShapeFactory.createShape(type); // Works automatically  
  }
}

class UIBuilder {
  buildIcon(type: string) {
    return ShapeFactory.createShape(type); // Works automatically
  }
}

// vs Direct Instantiation - Change EVERY place manually
class DrawingCanvas {
  createShape(type: string): Shape {
    switch (type) {
      case 'circle': return new Circle();
      case 'square': return new Square();
      // Must add Triangle here manually!
      // Must add Star here manually!
      default: throw new Error('Forgot to update this one!');
    }
  }
}

class GameEngine {
  spawnEnemy(type: string): Shape {
    switch (type) {
      case 'circle': return new Circle();
      case 'square': return new Square();
      // Must add Triangle here manually!
      // Must add Star here manually!
      default: throw new Error('Forgot to update this one!');
    }
  }
}

class UIBuilder {
  buildIcon(type: string): Shape {
    switch (type) {
      case 'circle': return new Circle();
      case 'square': return new Square();
      // Must add Triangle here manually!
      // Must add Star here manually!
      default: throw new Error('Forgot to update this one!');
    }
  }
}

// And 12 other classes with duplicated creation logic...

// RESULT:
// Factory Method: 1 change → works everywhere
// Direct Instantiation: 15 changes → high chance of missing some`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Plugin systems where new types can be added without changing core code</li>
        <li>UI widget libraries that support extensible component types</li>
        <li>Database drivers that can be extended with new database types</li>
        <li>Export systems supporting multiple formats (PDF, Excel, CSV...)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>When you expect to add new types in the future</li>
        <li>When you want to avoid modifying existing creation code</li>
        <li>When creation logic might become complex or vary by type</li>
        <li>When you want to centralize object creation logic</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Can add complexity for simple scenarios that rarely change</li>
        <li>Still requires modifying the factory when adding new types</li>
        <li>May be overkill if you only have 2-3 stable types</li>
      </ul>
    </PatternLayout>
  );
}
