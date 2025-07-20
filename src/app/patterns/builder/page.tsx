"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Builder Pattern Implementation - Computer Configuration
interface ComputerSpecs {
  cpu: string;
  ram: string;
  storage: string;
  gpu: string;
  motherboard: string;
  powerSupply: string;
  cooling: string;
  caseType: string;
}

class Computer {
  constructor(
    public cpu: string,
    public ram: string,
    public storage: string,
    public gpu: string,
    public motherboard: string,
    public powerSupply: string,
    public cooling: string,
    public caseType: string
  ) {}

  getSpecs(): string {
    return `🖥️ Custom Computer:\n• CPU: ${this.cpu}\n• RAM: ${this.ram}\n• Storage: ${this.storage}\n• GPU: ${this.gpu}\n• Motherboard: ${this.motherboard}\n• Power Supply: ${this.powerSupply}\n• Cooling: ${this.cooling}\n• Case: ${this.caseType}`;
  }

  getPrice(): number {
    // Simplified pricing logic
    let price = 500; // Base price
    if (this.cpu.includes("Intel i9")) price += 400;
    else if (this.cpu.includes("Intel i7")) price += 300;
    else if (this.cpu.includes("Intel i5")) price += 200;
    
    if (this.ram.includes("32GB")) price += 300;
    else if (this.ram.includes("16GB")) price += 150;
    else if (this.ram.includes("8GB")) price += 80;
    
    if (this.storage.includes("1TB SSD")) price += 200;
    else if (this.storage.includes("512GB SSD")) price += 100;
    
    if (this.gpu.includes("RTX 4090")) price += 1600;
    else if (this.gpu.includes("RTX 4070")) price += 600;
    else if (this.gpu.includes("GTX 1660")) price += 250;
    
    return price;
  }
}

class ComputerBuilder {
  private computer: Partial<ComputerSpecs> = {};
  private static buildLog: string[] = [];

  setCPU(cpu: string): ComputerBuilder {
    this.computer.cpu = cpu;
    const timestamp = new Date().toLocaleTimeString();
    ComputerBuilder.buildLog.push(`🔧 [${timestamp}] CPU set to: ${cpu}`);
    return this;
  }

  setRAM(ram: string): ComputerBuilder {
    this.computer.ram = ram;
    const timestamp = new Date().toLocaleTimeString();
    ComputerBuilder.buildLog.push(`🔧 [${timestamp}] RAM set to: ${ram}`);
    return this;
  }

  setStorage(storage: string): ComputerBuilder {
    this.computer.storage = storage;
    const timestamp = new Date().toLocaleTimeString();
    ComputerBuilder.buildLog.push(`🔧 [${timestamp}] Storage set to: ${storage}`);
    return this;
  }

  setGPU(gpu: string): ComputerBuilder {
    this.computer.gpu = gpu;
    const timestamp = new Date().toLocaleTimeString();
    ComputerBuilder.buildLog.push(`🔧 [${timestamp}] GPU set to: ${gpu}`);
    return this;
  }

  setMotherboard(motherboard: string): ComputerBuilder {
    this.computer.motherboard = motherboard;
    const timestamp = new Date().toLocaleTimeString();
    ComputerBuilder.buildLog.push(`🔧 [${timestamp}] Motherboard set to: ${motherboard}`);
    return this;
  }

  setPowerSupply(powerSupply: string): ComputerBuilder {
    this.computer.powerSupply = powerSupply;
    const timestamp = new Date().toLocaleTimeString();
    ComputerBuilder.buildLog.push(`🔧 [${timestamp}] Power Supply set to: ${powerSupply}`);
    return this;
  }

  setCooling(cooling: string): ComputerBuilder {
    this.computer.cooling = cooling;
    const timestamp = new Date().toLocaleTimeString();
    ComputerBuilder.buildLog.push(`🔧 [${timestamp}] Cooling set to: ${cooling}`);
    return this;
  }

  setCase(caseType: string): ComputerBuilder {
    this.computer.caseType = caseType;
    const timestamp = new Date().toLocaleTimeString();
    ComputerBuilder.buildLog.push(`🔧 [${timestamp}] Case set to: ${caseType}`);
    return this;
  }

  build(): Computer {
    const timestamp = new Date().toLocaleTimeString();
    // Set defaults for missing components
    const finalSpecs: ComputerSpecs = {
      cpu: this.computer.cpu || "Intel i3-12100",
      ram: this.computer.ram || "8GB DDR4",
      storage: this.computer.storage || "256GB SSD",
      gpu: this.computer.gpu || "Integrated Graphics",
      motherboard: this.computer.motherboard || "Basic ATX",
      powerSupply: this.computer.powerSupply || "500W Bronze",
      cooling: this.computer.cooling || "Stock Cooler",
      caseType: this.computer.caseType || "Mid Tower"
    };

    ComputerBuilder.buildLog.push(`✅ [${timestamp}] Computer built successfully!`);
    
    return new Computer(
      finalSpecs.cpu,
      finalSpecs.ram,
      finalSpecs.storage,
      finalSpecs.gpu,
      finalSpecs.motherboard,
      finalSpecs.powerSupply,
      finalSpecs.cooling,
      finalSpecs.caseType
    );
  }

  static getBuildLog(): string[] {
    return ComputerBuilder.buildLog.slice(-8);
  }

  static resetLog(): void {
    ComputerBuilder.buildLog = [];
  }
}

// Hardcoded Constructor Approach (Anti-pattern) - Parameter Explosion!
class HardcodedComputerBuilder {
  private static buildLog: string[] = [];

  // This constructor is a nightmare - 8 parameters in a specific order!
  static createComputer(
    cpu: string,
    ram: string,
    storage: string,
    gpu: string,
    motherboard: string,
    powerSupply: string,
    cooling: string,
    caseType: string
  ): Computer {
    const timestamp = new Date().toLocaleTimeString();
    HardcodedComputerBuilder.buildLog.push(
      `💥 [${timestamp}] Constructor called with 8 parameters in exact order!`
    );
    HardcodedComputerBuilder.buildLog.push(
      `❓ [${timestamp}] Did you remember the right parameter order?`
    );
    
    return new Computer(cpu, ram, storage, gpu, motherboard, powerSupply, cooling, caseType);
  }

  // Even worse - preset configurations with unclear parameter order
  static createGamingPC(): Computer {
    const timestamp = new Date().toLocaleTimeString();
    HardcodedComputerBuilder.buildLog.push(
      `🎮 [${timestamp}] Creating Gaming PC with hardcoded constructor...`
    );
    HardcodedComputerBuilder.buildLog.push(
      `😵 [${timestamp}] Hope the parameter order is: CPU, RAM, Storage, GPU, Mobo, PSU, Cooling, Case!`
    );
    
    // What if we accidentally swap parameters? 
    // This is supposed to be: CPU, RAM, Storage, GPU, Motherboard, PSU, Cooling, Case
    return HardcodedComputerBuilder.createComputer(
      "Intel i7-13700K",
      "16GB DDR5",
      "1TB SSD",
      "RTX 4070",
      "Z790 Gaming",
      "750W Gold",
      "AIO Liquid",
      "Gaming ATX"
    );
  }

  static createBudgetPC(): Computer {
    const timestamp = new Date().toLocaleTimeString();
    HardcodedComputerBuilder.buildLog.push(
      `💰 [${timestamp}] Creating Budget PC with constructor...`
    );
    HardcodedComputerBuilder.buildLog.push(
      `😰 [${timestamp}] Parameters in wrong order = wrong computer!`
    );
    
    // OOPS! Accidentally swapped some parameters (common mistake with many parameters)
    // This should be: CPU, RAM, Storage, GPU, Motherboard, PSU, Cooling, Case
    // But we accidentally put GPU before Storage!
    return HardcodedComputerBuilder.createComputer(
      "Intel i5-12400",
      "8GB DDR4",
      "GTX 1660 Super",  // WRONG! This is GPU, should be Storage
      "512GB SSD",       // WRONG! This is Storage, should be GPU  
      "B660 Basic",
      "600W Bronze",
      "Stock Cooler",
      "Budget Tower"
    );
  }

  static getBuildLog(): string[] {
    return HardcodedComputerBuilder.buildLog.slice(-8);
  }

  static resetLog(): void {
    HardcodedComputerBuilder.buildLog = [];
  }
}

export default function BuilderPage() {
  const [builderLogs, setBuilderLogs] = useState<string[]>([]);
  const [hardcodedLogs, setHardcodedLogs] = useState<string[]>([]);
  const [builtComputer, setBuiltComputer] = useState<Computer | null>(null);
  const [hardcodedComputer, setHardcodedComputer] = useState<Computer | null>(null);
  const [maintenanceDemo, setMaintenanceDemo] = useState<{builder: string[], hardcoded: string[]} | null>(null);

  // Use persistent builder
  const [computerBuilder] = useState(() => new ComputerBuilder());

  const handleBuilderStep = (component: string, value: string) => {
    switch (component) {
      case "cpu":
        computerBuilder.setCPU(value);
        break;
      case "ram":
        computerBuilder.setRAM(value);
        break;
      case "storage":
        computerBuilder.setStorage(value);
        break;
      case "gpu":
        computerBuilder.setGPU(value);
        break;
      case "motherboard":
        computerBuilder.setMotherboard(value);
        break;
      case "powerSupply":
        computerBuilder.setPowerSupply(value);
        break;
      case "cooling":
        computerBuilder.setCooling(value);
        break;
      case "case":
        computerBuilder.setCase(value);
        break;
    }
    setBuilderLogs(ComputerBuilder.getBuildLog());
  };

  const handleBuilderBuild = () => {
    const computer = computerBuilder.build();
    setBuiltComputer(computer);
    setBuilderLogs(ComputerBuilder.getBuildLog());
  };

  const handleHardcodedGaming = () => {
    const computer = HardcodedComputerBuilder.createGamingPC();
    setHardcodedComputer(computer);
    setHardcodedLogs(HardcodedComputerBuilder.getBuildLog());
  };

  const handleHardcodedBudget = () => {
    const computer = HardcodedComputerBuilder.createBudgetPC();
    setHardcodedComputer(computer);
    setHardcodedLogs(HardcodedComputerBuilder.getBuildLog());
  };

  const handleMaintenanceDemo = () => {
    const builderMaintenance = [
      "💼 Business Request: Add RGB lighting and custom water cooling options",
      "🎨 Requirements: Users want to customize lighting and advanced cooling",
      "",
      "📝 Builder Pattern Implementation:",
      "✅ Step 1: Add setRGBLighting(lighting: string) method to ComputerBuilder",
      "✅ Step 2: Add setCustomCooling(cooling: string) method to ComputerBuilder", 
      "✅ Step 3: Update Computer class to include new properties",
      "",
      "🎯 RESULT: New methods integrate seamlessly with existing chain!",
      "🔌 builder.setCPU('i9').setRGB('Rainbow').setCustomCooling('Custom Loop').build()",
      "🚀 Clear, readable, self-documenting code - no confusion!"
    ];

    const hardcodedMaintenance = [
      "💼 Business Request: Add RGB lighting and custom water cooling options",
      "🎨 Requirements: Users want to customize lighting and advanced cooling",
      "",
      "📝 Hardcoded Constructor Implementation:",
      "❌ Step 1: Add rgbLighting and customCooling parameters to constructor",
      "❌ Step 2: Constructor now takes 10 parameters instead of 8!",
      "❌ Step 3: Update ALL existing createComputer() calls with new parameter order",
      "❌ Step 4: Update createGamingPC() to include RGB and cooling parameters",
      "❌ Step 5: Update createBudgetPC() to include RGB and cooling parameters",
      "❌ Step 6: Update 15+ other preset methods with new parameter order",
      "❌ Step 7: Fix all existing code that calls the constructor",
      "",
      "💥 RESULT: Constructor becomes unmanageable with 10+ parameters!",
      "😵 createComputer(cpu, ram, storage, gpu, mobo, psu, cooling, case, rgb, custom)",
      "🔥 Wrong parameter order = Wrong computer configuration!"
    ];

    setMaintenanceDemo({
      builder: builderMaintenance,
      hardcoded: hardcodedMaintenance
    });
  };

  const resetDemo = () => {
    ComputerBuilder.resetLog();
    HardcodedComputerBuilder.resetLog();
    setBuilderLogs([]);
    setHardcodedLogs([]);
    setBuiltComputer(null);
    setHardcodedComputer(null);
    setMaintenanceDemo(null);
  };

  return (
    <PatternLayout title="Builder">
      <p className="mb-4">
        Construct complex objects step-by-step without constructor parameter explosion and confusion.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        The Builder pattern lets you construct complex objects step-by-step using clear, 
        readable method calls instead of confusing constructors with many parameters.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Interactive Demo: Builder vs Constructor Parameter Explosion</h2>
      <p className="mb-4 text-zinc-400">
        Build a custom computer. See how Builder stays clear while constructor parameters become unmanageable:
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Builder Pattern Demo */}
        <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-700">
          <h3 className="text-lg font-semibold mb-3 text-green-400">🔧 Builder Pattern</h3>
          
          <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
            <button
              onClick={() => handleBuilderStep("cpu", "Intel i9-13900K")}
              className="bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded"
            >
              Set CPU: i9
            </button>
            <button
              onClick={() => handleBuilderStep("ram", "32GB DDR5")}
              className="bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded"
            >
              Set RAM: 32GB
            </button>
            <button
              onClick={() => handleBuilderStep("storage", "1TB SSD")}
              className="bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded"
            >
              Set Storage: 1TB
            </button>
            <button
              onClick={() => handleBuilderStep("gpu", "RTX 4090")}
              className="bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded"
            >
              Set GPU: RTX 4090
            </button>
            <button
              onClick={() => handleBuilderStep("motherboard", "Z790 Extreme")}
              className="bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded"
            >
              Set Motherboard
            </button>
            <button
              onClick={() => handleBuilderStep("powerSupply", "1000W Platinum")}
              className="bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded"
            >
              Set PSU: 1000W
            </button>
          </div>
          
          <button
            onClick={handleBuilderBuild}
            className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded mb-3 w-full font-semibold"
          >
            🔨 Build Computer
          </button>
          
          <div>
            <span className="block mb-1 text-sm">Build Process:</span>
            <div className="bg-zinc-800 p-2 rounded text-xs font-mono min-h-[120px] max-h-[120px] overflow-y-auto">
              {builderLogs.length > 0 ? (
                builderLogs.map((log, idx) => (
                  <div key={idx} className="mb-1 break-all text-green-300">{log}</div>
                ))
              ) : (
                <div className="text-zinc-500">Click buttons above to configure computer...</div>
              )}
            </div>
          </div>
        </div>

        {/* Hardcoded Constructor Demo */}
        <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-700">
          <h3 className="text-lg font-semibold mb-3 text-red-400">💥 Constructor Parameters</h3>
          
          <div className="grid grid-cols-1 gap-2 mb-3">
            <button
              onClick={handleHardcodedGaming}
              className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded text-sm"
            >
              Gaming PC (8 Parameters!)
            </button>
            <button
              onClick={handleHardcodedBudget}
              className="bg-red-700 hover:bg-red-600 text-white px-3 py-2 rounded text-sm border-2 border-red-400"
            >
              Budget PC (Wrong Parameter Order!) 💥
            </button>
          </div>
          
          <div className="mb-3 p-2 bg-red-900/30 border border-red-700 rounded text-xs text-red-200">
            <strong>Constructor requires:</strong><br/>
            CPU, RAM, Storage, GPU, Motherboard, PSU, Cooling, Case
            <br/><strong>Easy to mess up the order!</strong>
          </div>
          
          <div>
            <span className="block mb-1 text-sm">Build Process:</span>
            <div className="bg-zinc-800 p-2 rounded text-xs font-mono min-h-[120px] max-h-[120px] overflow-y-auto">
              {hardcodedLogs.length > 0 ? (
                hardcodedLogs.map((log, idx) => (
                  <div key={idx} className={`mb-1 break-all ${log.includes('💥') || log.includes('😵') ? 'text-red-400' : 'text-red-300'}`}>
                    {log}
                  </div>
                ))
              ) : (
                <div className="text-zinc-500">Try the preset configurations above...</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Display */}
      {(builtComputer || hardcodedComputer) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {builtComputer && (
            <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-green-300">✅ Builder Result:</h4>
              <pre className="text-xs text-green-200 whitespace-pre-wrap">{builtComputer.getSpecs()}</pre>
              <div className="mt-2 text-sm">
                <strong className="text-green-400">Price: ${builtComputer.getPrice()}</strong>
              </div>
            </div>
          )}
          {hardcodedComputer && (
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-red-300">💥 Constructor Result (Check for errors!):</h4>
              <pre className="text-xs text-red-200 whitespace-pre-wrap">{hardcodedComputer.getSpecs()}</pre>
              <div className="mt-2 text-sm">
                <strong className="text-red-400">Price: ${hardcodedComputer.getPrice()}</strong>
              </div>
              {hardcodedComputer.storage.includes("GTX") && (
                <div className="mt-2 p-2 bg-red-800/50 rounded text-xs text-red-100">
                  🚨 <strong>BUG DETECTED:</strong> Storage field contains GPU name! Parameter order was wrong.
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="mb-6 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
        <h4 className="font-semibold mb-2 text-blue-300">💡 Key Insight:</h4>
        <ul className="text-sm space-y-1 text-blue-200">
          <li>• <strong>Builder Pattern</strong>: Clear method names, any order, impossible to confuse parameters!</li>
          <li>• <strong>Constructor</strong>: 8+ parameters in exact order, easy to swap and create bugs!</li>
          <li>• <strong>Real Impact</strong>: Builder prevents configuration errors, constructor creates maintenance nightmares</li>
        </ul>
      </div>

      <div className="mb-6">
        <button
          className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold"
          onClick={handleMaintenanceDemo}
        >
          🔧 Simulate Code Maintenance: Adding RGB Lighting & Custom Cooling
        </button>
      </div>

      {maintenanceDemo && (
        <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Builder Maintenance */}
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-green-300 flex items-center">
              🔧 Builder Pattern: Easy Extension
            </h4>
            <div className="space-y-1">
              {maintenanceDemo.builder.map((step, idx) => (
                <div key={idx} className="text-sm text-green-200">
                  {step === "" ? <div className="h-2"></div> : step}
                </div>
              ))}
            </div>
            <div className="mt-3 p-2 bg-green-800/30 rounded text-xs text-green-100">
              <strong>✅ Result:</strong> New methods integrate seamlessly, code stays readable and maintainable
            </div>
          </div>

          {/* Hardcoded Logic Maintenance */}
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-red-300 flex items-center">
              💥 Constructor: Parameter Explosion
            </h4>
            <div className="space-y-1">
              {maintenanceDemo.hardcoded.map((step, idx) => (
                <div key={idx} className="text-sm text-red-200">
                  {step === "" ? <div className="h-2"></div> : step}
                </div>
              ))}
            </div>
            <div className="mt-3 p-2 bg-red-800/30 rounded text-xs text-red-100">
              <strong>💥 Result:</strong> Constructor becomes unmanageable, high risk of parameter order bugs
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
        {`class ComputerBuilder {
  private computer: Partial<ComputerSpecs> = {};

  setCPU(cpu: string): ComputerBuilder {
    this.computer.cpu = cpu;
    return this; // Method chaining
  }

  setRAM(ram: string): ComputerBuilder {
    this.computer.ram = ram;
    return this;
  }

  setGPU(gpu: string): ComputerBuilder {
    this.computer.gpu = gpu;
    return this;
  }

  build(): Computer {
    return new Computer(this.computer);
  }
}

// Usage - Clear and readable
const computer = new ComputerBuilder()
  .setCPU("Intel i9-13900K")     // Clear what each parameter is
  .setRAM("32GB DDR5")           // Any order you want
  .setGPU("RTX 4090")            // Self-documenting
  .build();

// vs Constructor Approach - Confusing and error-prone
const computer2 = new Computer(
  "Intel i9-13900K",  // What is this parameter?
  "32GB DDR5",        // What order should these be in?
  "1TB SSD",          // Easy to swap these accidentally
  "RTX 4090",         // Which one is GPU vs Storage?
  "Z790 Extreme",     // Did I get the order right?
  "1000W Platinum",   // Getting confusing...
  "AIO Liquid",       // Too many parameters!
  "Gaming ATX"        // Wrong order = Wrong computer!
);`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Configuration objects (database connections, API clients)</li>
        <li>Complex UI components with many optional properties</li>
        <li>SQL query builders and fluent APIs</li>
        <li>Form builders and validation setup</li>
        <li>Test data builders and mock object creation</li>
        <li>HTTP request builders (headers, params, body)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>When constructors would have many parameters (4+ parameters)</li>
        <li>When you need optional or default values for complex objects</li>
        <li>When parameter order could cause confusion or bugs</li>
        <li>When you want to create different variations of the same object</li>
        <li>When you need to validate or transform data during construction</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Adds complexity for simple objects (use regular constructors for 1-3 params)</li>
        <li>Requires more classes and methods than direct construction</li>
        <li>May be slower than direct construction (usually negligible)</li>
        <li>Team needs to understand the pattern to use effectively</li>
      </ul>
    </PatternLayout>
  );
}
