"use client";
import Link from "next/link";

export default function Home() {
  const implementedPatterns = ["singleton"];

  const allPatterns = [
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
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-6 py-10">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-3 text-white tracking-tight">
          Patternalysis
        </h1>
        <p className="mb-10 text-zinc-400 text-lg max-w-2xl mx-auto">
          Discover and interact with the <strong>Gang of Four</strong> design
          patterns — simplified for frontend engineers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {allPatterns.map((name) => {
            const isImplemented = implementedPatterns.includes(name);
            return (
              <div
                key={name}
                className={`p-5 h-28 flex items-center justify-center rounded-xl border transition-all text-base font-medium tracking-wide ${
                  isImplemented
                    ? "bg-zinc-900 text-white border-zinc-700 hover:border-indigo-500 hover:bg-zinc-800"
                    : "bg-zinc-900 text-zinc-500 border-zinc-800 cursor-not-allowed"
                }`}
              >
                {isImplemented ? (
                  <Link href={`/patterns/${name}`} className="hover:underline">
                    {name.replace(/-/g, " ")}
                  </Link>
                ) : (
                  <span>
                    {name.replace(/-/g, " ")}{" "}
                    <span className="text-sm">(upcoming)</span>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
