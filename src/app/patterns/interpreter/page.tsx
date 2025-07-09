"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface Expression {
  interpret(context: string): boolean;
}

class TerminalExpression implements Expression {
  constructor(private data: string) {}
  interpret(context: string): boolean {
    return context.includes(this.data);
  }
}

class OrExpression implements Expression {
  constructor(private expr1: Expression, private expr2: Expression) {}
  interpret(context: string): boolean {
    return this.expr1.interpret(context) || this.expr2.interpret(context);
  }
}

class AndExpression implements Expression {
  constructor(private expr1: Expression, private expr2: Expression) {}
  interpret(context: string): boolean {
    return this.expr1.interpret(context) && this.expr2.interpret(context);
  }
}

export default function InterpreterPage() {
  const [input, setInput] = useState("");
  const [op, setOp] = useState<"and" | "or">("or");
  const [result, setResult] = useState<string | null>(null);

  const cat = new TerminalExpression("cat");
  const dog = new TerminalExpression("dog");

  const expression =
    op === "and" ? new AndExpression(cat, dog) : new OrExpression(cat, dog);

  const handleInterpret = () => {
    const res = expression.interpret(input);
    setResult(res ? "✅ Matched!" : "❌ Not matched");
  };

  return (
    <PatternLayout title="Interpreter">
      <p className="mb-4">
        Given a language, define a representation for its grammar along with an
        interpreter that uses the representation to interpret sentences in the
        language.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        The Interpreter pattern provides a way to evaluate language grammar or
        expressions.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Example</h2>

      <input
        type="text"
        className="border border-gray-400 rounded px-3 py-2 mb-2 w-full max-w-md"
        placeholder="Type a sentence"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="mb-4 flex items-center gap-4">
        <label>
          <input
            type="radio"
            name="operator"
            checked={op === "or"}
            onChange={() => setOp("or")}
          />{" "}
          OR
        </label>
        <label>
          <input
            type="radio"
            name="operator"
            checked={op === "and"}
            onChange={() => setOp("and")}
          />{" "}
          AND
        </label>
      </div>

      <button
        onClick={handleInterpret}
        className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded text-white mb-4"
      >
        Interpret
      </button>

      {result && <p className="font-semibold text-lg">{result}</p>}

      <SyntaxHighlighter
        language="ts"
        style={atomDark}
        className="rounded mt-6"
      >
        {`interface Expression {
  interpret(context: string): boolean;
}

class TerminalExpression implements Expression {
  constructor(private data: string) {}
  interpret(context: string): boolean {
    return context.includes(this.data);
  }
}

class OrExpression implements Expression {
  constructor(private expr1: Expression, private expr2: Expression) {}
  interpret(context: string): boolean {
    return this.expr1.interpret(context) || this.expr2.interpret(context);
  }
}

class AndExpression implements Expression {
  constructor(private expr1: Expression, private expr2: Expression) {}
  interpret(context: string): boolean {
    return this.expr1.interpret(context) && this.expr2.interpret(context);
  }
}

// Usage example:
const cat = new TerminalExpression('cat');
const dog = new TerminalExpression('dog');

const orExpression = new OrExpression(cat, dog);
console.log(orExpression.interpret('dog is friendly')); // true

const andExpression = new AndExpression(cat, dog);
console.log(andExpression.interpret('cat and dog')); // true
`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Parsing expressions</li>
        <li>SQL or regex interpreters</li>
        <li>Compilers and calculators</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>When you have a grammar to represent</li>
        <li>When you want to interpret sentences in a language</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Can become complex for large grammars</li>
        <li>Not efficient for complex parsing</li>
      </ul>
    </PatternLayout>
  );
}
