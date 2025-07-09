"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Command interface
interface Command {
  execute(): void;
}

// Receiver
class Light {
  isOn = false;
  turnOn() {
    this.isOn = true;
  }
  turnOff() {
    this.isOn = false;
  }
}

// Concrete Commands
class TurnOnCommand implements Command {
  constructor(private light: Light) {}
  execute() {
    this.light.turnOn();
  }
}

class TurnOffCommand implements Command {
  constructor(private light: Light) {}
  execute() {
    this.light.turnOff();
  }
}

// Invoker
class RemoteControl {
  private command: Command | null = null;
  setCommand(command: Command) {
    this.command = command;
  }
  pressButton() {
    if (this.command) this.command.execute();
  }
}

export default function CommandPatternPage() {
  const [lightState, setLightState] = useState("Off");

  const light = new Light();
  const remote = new RemoteControl();

  const turnOn = () => {
    const onCommand = new TurnOnCommand(light);
    remote.setCommand(onCommand);
    remote.pressButton();
    setLightState(light.isOn ? "On" : "Off");
  };

  const turnOff = () => {
    const offCommand = new TurnOffCommand(light);
    remote.setCommand(offCommand);
    remote.pressButton();
    setLightState(light.isOn ? "On" : "Off");
  };

  return (
    <PatternLayout title="Command">
      <p className="mb-4">
        Encapsulate a request as an object, thereby letting you parameterize
        clients with different requests.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        The Command pattern turns requests into objects allowing for
        parameterization, queuing, or logging of requests.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Example</h2>

      <div className="flex gap-4 mb-4">
        <button
          onClick={turnOn}
          className="bg-pink-600 hover:bg-pink-500 px-4 py-2 rounded text-white"
        >
          Turn On Light
        </button>
        <button
          onClick={turnOff}
          className="bg-pink-600 hover:bg-pink-500 px-4 py-2 rounded text-white"
        >
          Turn Off Light
        </button>
      </div>

      <p className="mb-6 font-semibold">
        Light is currently:{" "}
        <span className="text-yellow-300">{lightState}</span>
      </p>

      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
        {`interface Command {
  execute(): void;
}

class Light {
  isOn = false;
  turnOn() {
    this.isOn = true;
  }
  turnOff() {
    this.isOn = false;
  }
}

class TurnOnCommand implements Command {
  constructor(private light: Light) {}
  execute() {
    this.light.turnOn();
  }
}

class TurnOffCommand implements Command {
  constructor(private light: Light) {}
  execute() {
    this.light.turnOff();
  }
}

class RemoteControl {
  private command: Command | null = null;
  setCommand(command: Command) {
    this.command = command;
  }
  pressButton() {
    if (this.command) this.command.execute();
  }
}

// Usage
const light = new Light();
const remote = new RemoteControl();

const onCommand = new TurnOnCommand(light);
remote.setCommand(onCommand);
remote.pressButton();

const offCommand = new TurnOffCommand(light);
remote.setCommand(offCommand);
remote.pressButton();`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>GUI buttons and menu items</li>
        <li>Undo/Redo operations</li>
        <li>Task scheduling</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>To parameterize objects with operations</li>
        <li>To queue or log requests</li>
        <li>To support undoable operations</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Can result in a large number of command classes</li>
        <li>May increase system complexity</li>
      </ul>
    </PatternLayout>
  );
}
