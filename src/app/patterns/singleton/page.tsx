"use client";

import PatternLayout from "@/components/PatternLayout";
import toast from "react-hot-toast";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

class ToastManager {
  private static instance: ToastManager;
  private constructor() {}
  static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }
  show(message: string) {
    toast.success(message);
  }
}

export default function SingletonPage() {
  const handleClick = () => {
    const toast = ToastManager.getInstance();
    toast.show("Hello from Singleton");
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

      <h2 className="text-xl font-semibold mt-6 mb-2">Example</h2>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        onClick={handleClick}
      >
        Show Toast (Singleton)
      </button>

      <SyntaxHighlighter language="ts" style={dark} className="rounded">
        {`class ToastManager {
  private static instance: ToastManager;
  private constructor() {}
  static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }
  show(message: string) {
    alert("Toast: " + message);
  }
}`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Global toast manager</li>
        <li>Application-wide theme or settings service</li>
        <li>Redux store or centralized event bus</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Need exactly one instance of a class</li>
        <li>Shared global state or utilities</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Overuse can lead to tightly coupled code</li>
        <li>Harder to test if used improperly</li>
      </ul>
    </PatternLayout>
  );
}
