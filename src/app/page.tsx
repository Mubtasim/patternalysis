"use client";
import Link from "next/link";

export default function Home() {

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

  const getColorClasses = () => {
    return {
      border: "border-zinc-700",
      bg: "bg-zinc-700",
      text: "text-white",
      hover: "hover:bg-zinc-600"
    };
  };

  const getCategoryHeaderColor = () => {
    return "text-zinc-700 dark:text-zinc-400 border-zinc-700 dark:border-zinc-600";
  };

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 text-foreground tracking-tight">
            Patternalysis
          </h1>
          <p className="mb-6 text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Master the <strong className="text-foreground">Gang of Four</strong> design patterns through 
            <strong className="text-blue-600 dark:text-blue-400"> interactive demos</strong> and 
            <strong className="text-red-600 dark:text-red-400"> dramatic failure examples</strong> — 
            simplified for frontend engineers.
          </p>

          {/* Value Proposition */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">Interactive Demos</h3>
              <p className="text-sm text-muted-foreground">
                See patterns in action with live, clickable examples that show exactly how they work
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="text-3xl mb-3">💥</div>
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">Dramatic Failures</h3>
              <p className="text-sm text-muted-foreground">
                Watch anti-patterns break in real-time to understand why patterns matter
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">Real-World Focus</h3>
              <p className="text-sm text-muted-foreground">
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
              <button
                onClick={() => document.getElementById('patterns-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-zinc-700 hover:bg-zinc-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                📚 Browse All Patterns
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center gap-8 mt-8 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">23</div>
              <div className="text-muted-foreground">Total Patterns</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">∞</div>
              <div className="text-muted-foreground">Learning Value</div>
            </div>
          </div>
        </div>

        {/* Pattern Categories */}
        <div id="patterns-section" className="space-y-8">
          {Object.entries(patternCategories).map(([key, category]) => (
            <div key={key} className="text-left">
              {/* Category Header */}
              <div className={`mb-4 pb-2 border-b ${getCategoryHeaderColor()}`}>
                <h2 className="text-2xl font-bold mb-1">{category.title}</h2>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>

              {/* Pattern Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.patterns.map((name) => {
                  const label = name.replace(/-/g, " ");
                  const colors = getColorClasses();

                  return (
                    <Link
                      key={name}
                      href={`/patterns/${name}`}
                      className={`block p-4 h-20 flex items-center justify-center rounded-lg border ${colors.border} ${colors.bg} ${colors.text} ${colors.hover} transition-all text-base font-bold tracking-wide capitalize shadow-sm`}
                    >
                      {label}
                    </Link>
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
