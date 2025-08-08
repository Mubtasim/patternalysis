export type PatternInfo = {
  slug: string;
  title: string;
  category: "creational" | "structural" | "behavioral";
};

// Navigation order mirrors homepage order (category groups in sequence)
export const patterns: PatternInfo[] = [
  // Creational
  { slug: "singleton", title: "Singleton", category: "creational" },
  { slug: "factory-method", title: "Factory Method", category: "creational" },
  { slug: "abstract-factory", title: "Abstract Factory", category: "creational" },
  { slug: "builder", title: "Builder", category: "creational" },
  { slug: "prototype", title: "Prototype", category: "creational" },

  // Structural
  { slug: "adapter", title: "Adapter", category: "structural" },
  { slug: "bridge", title: "Bridge", category: "structural" },
  { slug: "composite", title: "Composite", category: "structural" },
  { slug: "decorator", title: "Decorator", category: "structural" },
  { slug: "facade", title: "Facade", category: "structural" },
  { slug: "flyweight", title: "Flyweight", category: "structural" },
  { slug: "proxy", title: "Proxy", category: "structural" },

  // Behavioral
  { slug: "chain-of-responsibility", title: "Chain of Responsibility", category: "behavioral" },
  { slug: "command", title: "Command", category: "behavioral" },
  { slug: "interpreter", title: "Interpreter", category: "behavioral" },
  { slug: "iterator", title: "Iterator", category: "behavioral" },
  { slug: "mediator", title: "Mediator", category: "behavioral" },
  { slug: "memento", title: "Memento", category: "behavioral" },
  { slug: "observer", title: "Observer", category: "behavioral" },
  { slug: "state", title: "State", category: "behavioral" },
  { slug: "strategy", title: "Strategy", category: "behavioral" },
  { slug: "template-method", title: "Template Method", category: "behavioral" },
  { slug: "visitor", title: "Visitor", category: "behavioral" }
];

export function getPatternIndexBySlug(slug: string): number {
  return patterns.findIndex((p) => p.slug === slug);
}

export function getPrevNextBySlug(slug: string): {
  prev: PatternInfo | null;
  next: PatternInfo | null;
} {
  const index = getPatternIndexBySlug(slug);
  if (index === -1) return { prev: null, next: null };
  const prev = index > 0 ? patterns[index - 1] : null;
  const next = index < patterns.length - 1 ? patterns[index + 1] : null;
  return { prev, next };
} 