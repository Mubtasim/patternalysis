"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Mediator Interface
interface ChatMediator {
  sendMessage(message: string, sender: User): void;
  addUser(user: User): void;
}

// User Interface
abstract class User {
  constructor(protected name: string, protected mediator: ChatMediator) {}
  abstract receive(message: string): void;

  send(message: string) {
    this.mediator.sendMessage(message, this);
  }

  getName(): string {
    return this.name;
  }
}

// Concrete Mediator
class ChatRoom implements ChatMediator {
  private users: User[] = [];

  addUser(user: User) {
    this.users.push(user);
  }

  sendMessage(message: string, sender: User) {
    this.users.forEach((user) => {
      if (user !== sender) {
        user.receive(`${sender.getName()}: ${message}`);
      }
    });
  }
}

// Concrete User
class ChatUser extends User {
  private setMessages: React.Dispatch<React.SetStateAction<string[]>>;

  constructor(
    name: string,
    mediator: ChatMediator,
    setMessages: React.Dispatch<React.SetStateAction<string[]>>
  ) {
    super(name, mediator);
    this.setMessages = setMessages;
  }

  receive(message: string) {
    this.setMessages((prev) => [...prev, message]);
  }

  getName() {
    return this.name;
  }
}

export default function MediatorPatternPage() {
  const [messages, setMessages] = useState<string[]>([]);

  // Mediator and users
  const chatRoom = new ChatRoom();
  const alice = new ChatUser("Alice", chatRoom, setMessages);
  const bob = new ChatUser("Bob", chatRoom, setMessages);

  chatRoom.addUser(alice);
  chatRoom.addUser(bob);

  const handleSendMessage = () => {
    alice.send("Hello Bob!");
    bob.send("Hey Alice!");
  };

  return (
    <PatternLayout title="Mediator">
      <p className="mb-4">
        Defines an object that encapsulates how a set of objects interact.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        The Mediator pattern centralizes complex communications and control
        logic between objects in a system, promoting loose coupling.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Example</h2>
      <button
        onClick={handleSendMessage}
        className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded text-white mb-4"
      >
        Simulate Chat
      </button>

      <div className="bg-card p-4 rounded text-sm mb-6 border border-border">
        {messages.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>

      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
        {`interface ChatMediator {
  sendMessage(message: string, sender: User): void;
  addUser(user: User): void;
}

abstract class User {
  constructor(protected name: string, protected mediator: ChatMediator) {}
  abstract receive(message: string): void;
  send(message: string) {
    this.mediator.sendMessage(message, this);
  }
}

class ChatRoom implements ChatMediator {
  private users: User[] = [];

  addUser(user: User) {
    this.users.push(user);
  }

  sendMessage(message: string, sender: User) {
    this.users.forEach((user) => {
      if (user !== sender) {
        user.receive(\`\${sender.getName()}: \${message}\`);
      }
    });
  }
}

class ChatUser extends User {
  receive(message: string) {
    console.log(\`[Message to \${this.name}]: \${message}\`);
  }

  getName() {
    return this.name;
  }
}

// Usage
const mediator = new ChatRoom();
const alice = new ChatUser('Alice', mediator);
const bob = new ChatUser('Bob', mediator);

mediator.addUser(alice);
mediator.addUser(bob);

alice.send('Hello Bob!');
bob.send('Hi Alice!');
`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Chat applications</li>
        <li>Form or module coordination</li>
        <li>Decoupling tightly connected systems</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Too many objects interacting directly</li>
        <li>You want to simplify object communications</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Mediator can become a complex God object</li>
        <li>Should be kept focused to avoid tight coupling again</li>
      </ul>
    </PatternLayout>
  );
}
