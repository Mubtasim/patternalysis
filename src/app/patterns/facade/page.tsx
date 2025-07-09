"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Subsystems
class CPU {
  freeze() {
    return "Freezing CPU";
  }
  jump(position: number) {
    return `Jumping to ${position}`;
  }
  execute() {
    return "Executing instructions";
  }
}

class Memory {
  load(position: number, data: string) {
    return `Loading ${data} into position ${position}`;
  }
}

class HardDrive {
  read(position: number, size: number) {
    return `Reading ${size} bytes from position ${position}`;
  }
}

// Facade
class ComputerFacade {
  private cpu: CPU;
  private memory: Memory;
  private hardDrive: HardDrive;

  constructor() {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();
  }

  start() {
    const logs = [];
    logs.push(this.cpu.freeze());
    logs.push(this.memory.load(0, "bootloader"));
    logs.push(this.hardDrive.read(0, 256));
    logs.push(this.cpu.jump(0));
    logs.push(this.cpu.execute());
    return logs;
  }
}

export default function FacadePage() {
  const [logs, setLogs] = useState<string[]>([]);

  const handleStartComputer = () => {
    const computer = new ComputerFacade();
    setLogs(computer.start());
  };

  return (
    <PatternLayout title="Facade">
      <p className="mb-4">
        Provide a unified interface to a set of interfaces in a subsystem.
        Facade defines a higher-level interface that makes the subsystem easier
        to use.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        The Facade pattern simplifies interactions with complex systems by
        providing a unified and minimal API that hides the underlying
        complexity.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Example</h2>
      <button
        onClick={handleStartComputer}
        className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-white mb-4"
      >
        Start Computer
      </button>

      {logs.length > 0 && (
        <ul className="mb-6 text-green-400 font-mono text-sm list-disc ml-6">
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      )}

      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
        {`class CPU {
  freeze() { return 'Freezing CPU'; }
  jump(position: number) { return \`Jumping to \${position}\`; }
  execute() { return 'Executing instructions'; }
}

class Memory {
  load(position: number, data: string) {
    return \`Loading \${data} into position \${position}\`;
  }
}

class HardDrive {
  read(position: number, size: number) {
    return \`Reading \${size} bytes from position \${position}\`;
  }
}

class ComputerFacade {
  private cpu = new CPU();
  private memory = new Memory();
  private hardDrive = new HardDrive();

  start() {
    return [
      this.cpu.freeze(),
      this.memory.load(0, 'bootloader'),
      this.hardDrive.read(0, 256),
      this.cpu.jump(0),
      this.cpu.execute()
    ];
  }
}

const computer = new ComputerFacade();
console.log(computer.start());`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Hiding complex library calls behind a simple API</li>
        <li>Startup/shutdown sequences</li>
        <li>Unifying legacy APIs under a single entry point</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>When you need to simplify complex subsystems</li>
        <li>To shield client code from implementation details</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Can hide important details from developers</li>
        <li>Facade can become god object if it does too much</li>
      </ul>
    </PatternLayout>
  );
}
