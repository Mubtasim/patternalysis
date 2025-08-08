"use client";

import PatternLayout from "@/components/PatternLayout";
import toast from "react-hot-toast";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useState } from "react";

class ToastManager {
  private static instance: ToastManager;
  private static instanceCount = 0;
  private instanceId: string;
  
  private constructor() {
    ToastManager.instanceCount++;
    this.instanceId = `singleton-${Date.now()}`;
  }
  
  static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }
  
  static getInstanceCount(): number {
    return ToastManager.instanceCount;
  }
  
  getInstanceId(): string {
    return this.instanceId;
  }
  
  show(message: string) {
    toast.success(message);
  }
}

// Regular class for comparison
class RegularToastManager {
  private static instanceCount = 0;
  private instanceId: string;
  
  constructor() {
    RegularToastManager.instanceCount++;
    this.instanceId = `regular-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  static getInstanceCount(): number {
    return RegularToastManager.instanceCount;
  }
  
  getInstanceId(): string {
    return this.instanceId;
  }
  
  show(message: string) {
    toast.success(message);
  }
}

export default function SingletonPage() {
  const [singletonCount, setSingletonCount] = useState(0);
  const [regularCount, setRegularCount] = useState(0);
  const [singletonId, setSingletonId] = useState<string>("");
  const [regularIds, setRegularIds] = useState<string[]>([]);

  const handleSingletonClick = () => {
    const toastManager = ToastManager.getInstance();
    toastManager.show("Hello from Singleton");
    setSingletonCount(ToastManager.getInstanceCount());
    setSingletonId(toastManager.getInstanceId());
  };

  const handleRegularClick = () => {
    const toastManager = new RegularToastManager();
    toastManager.show("Hello from Regular Class");
    setRegularCount(RegularToastManager.getInstanceCount());
    setRegularIds(prev => [...prev, toastManager.getInstanceId()].slice(-3)); // Keep last 3
  };

  const resetDemo = () => {
    setSingletonCount(0);
    setRegularCount(0);
    setSingletonId("");
    setRegularIds([]);
    // Note: We can't actually reset the static counters in this demo
    // In a real app, you'd need to restart to truly reset
  };

  return (
    <PatternLayout title="Singleton">
      <p className="mb-4">
        Ensure a class has only one instance and provide a global access point.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        The Singleton pattern ensures there is only one instance of a class
        throughout the app, and provides a global point of access to that
        instance.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Interactive Demo: Singleton vs Regular Class</h2>
      <p className="mb-4 text-muted-foreground">
        Click the buttons below to see the difference between Singleton and regular class instantiation:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Singleton Demo */}
        <div className="bg-card p-4 rounded-lg border border-border">
          <h3 className="text-lg font-semibold mb-3 text-green-400">🔒 Singleton Pattern</h3>
          <button
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded mb-3 w-full"
            onClick={handleSingletonClick}
          >
            Get Singleton Instance
          </button>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Instances Created:</span>
              <span className="font-mono bg-secondary border border-border px-2 py-1 rounded text-green-700 dark:text-green-400">
                {singletonCount}
              </span>
            </div>
            {singletonId && (
              <div className="break-all">
                <span className="block">Instance ID:</span>
                <span className="font-mono text-xs bg-secondary border border-border p-2 rounded block text-green-700 dark:text-green-400">
                  {singletonId}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Regular Class Demo */}
        <div className="bg-card p-4 rounded-lg border border-border">
          <h3 className="text-lg font-semibold mb-3 text-red-400">🔓 Regular Class</h3>
          <button
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded mb-3 w-full"
            onClick={handleRegularClick}
          >
            Create New Instance
          </button>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Instances Created:</span>
              <span className="font-mono bg-secondary border border-border px-2 py-1 rounded text-red-700 dark:text-red-400">
                {regularCount}
              </span>
            </div>
            {regularIds.length > 0 && (
              <div>
                <span className="block mb-1">Recent Instance IDs:</span>
                <div className="space-y-1">
                  {regularIds.map((id) => (
                    <span key={id} className="font-mono text-xs bg-secondary border border-border p-1 rounded block text-red-700 dark:text-red-400">
                      {id}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
        <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-300">💡 Notice the Difference:</h4>
        <ul className="text-sm space-y-1 text-blue-700 dark:text-blue-200">
          <li>• <strong>Singleton</strong>: Always returns the same instance (same ID, count stays low)</li>
          <li>• <strong>Regular Class</strong>: Creates new instances every time (different IDs, count increases)</li>
        </ul>
      </div>

      <button
        className="bg-zinc-600 hover:bg-zinc-500 text-white px-4 py-2 rounded mb-6 text-sm"
        onClick={resetDemo}
      >
        Reset Demo Counters
      </button>

      <h2 className="text-xl font-semibold mt-6 mb-2">Code Example</h2>
      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
        {`class ToastManager {
  private static instance: ToastManager;
  private constructor() {} // Private constructor prevents direct instantiation
  
  static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance; // Always returns the same instance
  }
  
  show(message: string) {
    toast.success(message);
  }
}

// Usage - both variables point to the same instance
const toast1 = ToastManager.getInstance();
const toast2 = ToastManager.getInstance();
console.log(toast1 === toast2); // true`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Global toast manager</li>
        <li>Application-wide theme or settings service</li>
        <li>Redux store or centralized event bus</li>
        <li>Database connection pools</li>
        <li>Logging services</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Need exactly one instance of a class</li>
        <li>Shared global state or utilities</li>
        <li>Expensive object creation that should be done once</li>
        <li>Coordinating actions across the system</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Overuse can lead to tightly coupled code</li>
        <li>Harder to test if used improperly</li>
        <li>Can create hidden dependencies</li>
        <li>Violates Single Responsibility Principle if it does too much</li>
      </ul>
    </PatternLayout>
  );
}
