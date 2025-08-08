"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Memento
class Memento {
  constructor(private readonly state: string) {}
  getState(): string {
    return this.state;
  }
}

// Originator
class TextEditor {
  private content = "";

  type(words: string) {
    this.content += words;
  }

  getContent(): string {
    return this.content;
  }

  save(): Memento {
    return new Memento(this.content);
  }

  restore(memento: Memento) {
    this.content = memento.getState();
  }
}

// Caretaker
class History {
  private mementos: Memento[] = [];

  add(memento: Memento) {
    this.mementos.push(memento);
  }

  undo(): Memento | null {
    return this.mementos.pop() || null;
  }
}

export default function MementoPatternPage() {
  const [editor] = useState(() => new TextEditor());
  const [history] = useState(() => new History());
  const [content, setContent] = useState("");
  const [input, setInput] = useState("");

  const handleType = () => {
    history.add(editor.save());
    editor.type(input);
    setContent(editor.getContent());
    setInput("");
  };

  const handleUndo = () => {
    const memento = history.undo();
    if (memento) {
      editor.restore(memento);
      setContent(editor.getContent());
    }
  };

  return (
    <PatternLayout title="Memento">
      <p className="mb-4">
        Without violating encapsulation, capture and externalize an object’s
        internal state so that the object can be restored to that state later.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        The Memento pattern lets you save and restore the previous state of an
        object without revealing its implementation.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Example</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          className="border border-gray-400 rounded px-3 py-2"
          placeholder="Type something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleType}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
        >
          Type
        </button>
        <button
          onClick={handleUndo}
          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
        >
          Undo
        </button>
      </div>

      <div className="bg-card text-foreground p-4 rounded mb-6 border border-border min-h-[50px]">
        {content}
      </div>

      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
        {`class Memento {
  constructor(private readonly state: string) {}
  getState(): string {
    return this.state;
  }
}

class TextEditor {
  private content = '';

  type(words: string) {
    this.content += words;
  }

  getContent(): string {
    return this.content;
  }

  save(): Memento {
    return new Memento(this.content);
  }

  restore(memento: Memento) {
    this.content = memento.getState();
  }
}

class History {
  private mementos: Memento[] = [];

  add(memento: Memento) {
    this.mementos.push(memento);
  }

  undo(): Memento | null {
    return this.mementos.pop() || null;
  }
}

// Usage
const editor = new TextEditor();
const history = new History();

editor.type("Hello ");
history.add(editor.save());

editor.type("World!");
history.add(editor.save());

editor.restore(history.undo()!); // Undo last change
`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Undo/Redo systems</li>
        <li>Form state management</li>
        <li>Versioning tools</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Need to restore previous object state</li>
        <li>Don’t want to expose internal details</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Can use a lot of memory with large snapshots</li>
        <li>Restoring logic must be reliable</li>
      </ul>
    </PatternLayout>
  );
}
