"use client";

import PatternLayout from "@/components/PatternLayout";

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
    alert("Toast: " + message);
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
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleClick}
      >
        Show Toast (Singleton)
      </button>
    </PatternLayout>
  );
}
