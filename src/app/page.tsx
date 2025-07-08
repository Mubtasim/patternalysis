"use client";
import Link from "next/link";

export default function Home() {
  const patterns = [
    "singleton",
    "factory-method",
    "builder",
    "prototype",
    "abstract-factory",
    "adapter",
    "decorator",
    "composite",
    "facade",
    "bridge",
    "flyweight",
    "proxy",
    "observer",
    "strategy",
    "command",
    "mediator",
    "chain-of-responsibility",
    "interpreter",
    "iterator",
    "memento",
    "state",
    "template-method",
    "visitor",
  ];

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Patternalysis</h1>
      <p className="mb-4">
        Explore the Gang of Four design patterns with frontend-focused examples.
      </p>
      <ul className="list-disc ml-6 space-y-1">
        {patterns.map((name) => (
          <li key={name}>
            <Link
              href={`/patterns/${name}`}
              className="text-blue-600 hover:underline"
            >
              {name.replace(/-/g, " ")}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
