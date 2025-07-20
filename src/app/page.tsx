"use client";
import Link from "next/link";

export default function Home() {
  const implementedPatterns = [
    "singleton",
    "observer",
    "factory-method",
    "builder",
    "prototype",
    "adapter",
    "bridge",
    "decorator",
    "composite",
    "facade",
    "flyweight",
    "proxy",
    "chain-of-responsibility",
    "command",
    "interpreter",
    "iterator",
    "mediator",
    "memento",
    "state",
    "template-method",
    "visitor",
    "abstract-factory",
    "strategy",
  ];

  // Organize patterns by GoF categories
  const patternCategories = {
    creational: {
      title: "Creational Patterns",
      description: "Deal with object creation mechanisms",
      color: "green",
      patterns: ["singleton", "factory-method", "abstract-factory", "builder", "prototype"]
    },
    structural: {
      title: "Structural Patterns", 
      description: "Deal with object composition and relationships",
      color: "blue",
      patterns: ["adapter", "bridge", "composite", "decorator", "facade", "flyweight", "proxy"]
    },
    behavioral: {
      title: "Behavioral Patterns",
      description: "Deal with communication between objects and responsibilities",
      color: "purple", 
      patterns: ["chain-of-responsibility", "command", "interpreter", "iterator", "mediator", "memento", "observer", "state", "strategy", "template-method", "visitor"]
    }
  };

  const getColorClasses = (color: string, isImplemented: boolean) => {
    if (!isImplemented) {
      return {
        border: "border-zinc-800",
        bg: "bg-zinc-900",
        text: "text-zinc-500",
        hover: ""
      };
    }

    const colorMap = {
      green: {
        border: "border-green-700",
        bg: "bg-green-900/20",
        text: "text-white",
        hover: "hover:border-green-500 hover:bg-green-900/30"
      },
      blue: {
        border: "border-blue-700", 
        bg: "bg-blue-900/20",
        text: "text-white",
        hover: "hover:border-blue-500 hover:bg-blue-900/30"
      },
      purple: {
        border: "border-purple-700",
        bg: "bg-purple-900/20", 
        text: "text-white",
        hover: "hover:border-purple-500 hover:bg-purple-900/30"
      }
    };

    return colorMap[color as keyof typeof colorMap];
  };

  const getCategoryHeaderColor = (color: string) => {
    const colorMap = {
      green: "text-green-400 border-green-700",
      blue: "text-blue-400 border-blue-700",
      purple: "text-purple-400 border-purple-700"
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 text-white tracking-tight">
            Patternalysis
          </h1>
          <p className="mb-6 text-zinc-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Master the <strong className="text-white">Gang of Four</strong> design patterns through 
            <strong className="text-blue-400"> interactive demos</strong> and 
            <strong className="text-red-400"> dramatic failure examples</strong> — 
            simplified for frontend engineers.
          </p>

          {/* Value Proposition */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
            <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold mb-2 text-white">Interactive Demos</h3>
              <p className="text-sm text-zinc-400">
                See patterns in action with live, clickable examples that show exactly how they work
              </p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
              <div className="text-3xl mb-3">💥</div>
              <h3 className="text-lg font-semibold mb-2 text-white">Dramatic Failures</h3>
              <p className="text-sm text-zinc-400">
                Watch anti-patterns break in real-time to understand why patterns matter
              </p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold mb-2 text-white">Real-World Focus</h3>
              <p className="text-sm text-zinc-400">
                Every example uses practical scenarios you&apos;ll encounter in modern development
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/patterns/singleton"
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                🚀 Start with Singleton
              </Link>
              <Link
                href="/patterns/observer"
                className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                👀 Try Observer Pattern
              </Link>
            </div>
            <p className="text-sm text-zinc-500">
              ↑ Try these enhanced patterns with dramatic demos
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center gap-8 mt-8 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">5</div>
              <div className="text-zinc-400">Enhanced Patterns</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">23</div>
              <div className="text-zinc-400">Total Patterns</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">∞</div>
              <div className="text-zinc-400">Learning Value</div>
            </div>
          </div>
        </div>

        {/* Pattern Categories */}
        <div className="space-y-8">
          {Object.entries(patternCategories).map(([key, category]) => (
            <div key={key} className="text-left">
              {/* Category Header */}
              <div className={`mb-4 pb-2 border-b ${getCategoryHeaderColor(category.color)}`}>
                <h2 className="text-2xl font-bold mb-1">{category.title}</h2>
                <p className="text-sm text-zinc-400">{category.description}</p>
              </div>

              {/* Pattern Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.patterns.map((name) => {
                  const isImplemented = implementedPatterns.includes(name);
                  const label = name.replace(/-/g, " ");
                  const colors = getColorClasses(category.color, isImplemented);

                  return isImplemented ? (
                    <Link
                      key={name}
                      href={`/patterns/${name}`}
                      className={`block p-4 h-20 flex items-center justify-center rounded-lg border ${colors.border} ${colors.bg} ${colors.text} ${colors.hover} transition-all text-base font-medium tracking-wide capitalize`}
                    >
                      {label}
                    </Link>
                  ) : (
                    <div
                      key={name}
                      className={`p-4 h-20 flex items-center justify-center rounded-lg border ${colors.border} ${colors.bg} ${colors.text} cursor-not-allowed text-base font-medium tracking-wide gap-1 capitalize`}
                    >
                      {label} <span className="text-sm">(upcoming)</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
