"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Observer Pattern Implementation
interface Observer {
  id: string;
  notify: (message: string) => void;
}

class NewsletterSubject {
  private observers: Observer[] = [];
  private static notificationCount = 0;
  private static notificationLog: string[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
    const timestamp = new Date().toLocaleTimeString();
    NewsletterSubject.notificationLog.push(`✅ [${timestamp}] ${observer.id} subscribed`);
  }

  unsubscribe(observerId: string): void {
    this.observers = this.observers.filter(obs => obs.id !== observerId);
    const timestamp = new Date().toLocaleTimeString();
    NewsletterSubject.notificationLog.push(`❌ [${timestamp}] ${observerId} unsubscribed`);
  }

  notify(message: string): void {
    NewsletterSubject.notificationCount++;
    const timestamp = new Date().toLocaleTimeString();
    
    if (this.observers.length === 0) {
      NewsletterSubject.notificationLog.push(`📢 [${timestamp}] Sent "${message}" to 0 subscribers`);
      return;
    }

    this.observers.forEach(observer => {
      observer.notify(message);
    });
    
    NewsletterSubject.notificationLog.push(`📢 [${timestamp}] Sent "${message}" to ${this.observers.length} subscribers automatically`);
  }

  getSubscriberCount(): number {
    return this.observers.length;
  }

  static getNotificationCount(): number {
    return NewsletterSubject.notificationCount;
  }

  static getNotificationLog(): string[] {
    return NewsletterSubject.notificationLog.slice(-5);
  }

  static resetStats(): void {
    NewsletterSubject.notificationCount = 0;
    NewsletterSubject.notificationLog = [];
  }
}

// Manual Notification Implementation (Anti-pattern)
class ManualNotificationManager {
  private subscribers: { id: string; email: string; sms: boolean; push: boolean }[] = [];
  private static attemptCount = 0;
  private static attemptLog: string[] = [];

  addSubscriber(id: string, email: string, sms: boolean = false, push: boolean = false): void {
    this.subscribers.push({ id, email, sms, push });
    const timestamp = new Date().toLocaleTimeString();
    ManualNotificationManager.attemptLog.push(`✅ [${timestamp}] ${id} added manually`);
  }

  removeSubscriber(id: string): void {
    this.subscribers = this.subscribers.filter(sub => sub.id !== id);
    const timestamp = new Date().toLocaleTimeString();
    ManualNotificationManager.attemptLog.push(`❌ [${timestamp}] ${id} removed manually`);
  }

  sendNotification(message: string): void {
    ManualNotificationManager.attemptCount++;
    const timestamp = new Date().toLocaleTimeString();
    
    if (this.subscribers.length === 0) {
      ManualNotificationManager.attemptLog.push(`📢 [${timestamp}] Manual send: "${message}" to 0 subscribers`);
      return;
    }

    // This is the pain point - manual iteration and multiple notification types
    let emailCount = 0;
    let smsCount = 0;
    let pushCount = 0;

    this.subscribers.forEach(subscriber => {
      // Email notification (always sent)
      emailCount++;
      
      // SMS notification (if enabled)
      if (subscriber.sms) {
        smsCount++;
      }
      
      // Push notification (if enabled)
      if (subscriber.push) {
        pushCount++;
      }
    });

    ManualNotificationManager.attemptLog.push(
      `📢 [${timestamp}] Manual send: "${message}" (${emailCount} emails, ${smsCount} SMS, ${pushCount} push) - lots of manual logic!`
    );
  }

  getSubscriberCount(): number {
    return this.subscribers.length;
  }

  static getAttemptCount(): number {
    return ManualNotificationManager.attemptCount;
  }

  static getAttemptLog(): string[] {
    return ManualNotificationManager.attemptLog.slice(-5);
  }

  static resetStats(): void {
    ManualNotificationManager.attemptCount = 0;
    ManualNotificationManager.attemptLog = [];
  }
}

export default function ObserverPage() {
  const [observerLogs, setObserverLogs] = useState<string[]>([]);
  const [manualLogs, setManualLogs] = useState<string[]>([]);
  const [observerCount, setObserverCount] = useState(0);
  const [manualCount, setManualCount] = useState(0);
  const [observerSubscribers, setObserverSubscribers] = useState(0);
  const [manualSubscribers, setManualSubscribers] = useState(0);
  const [maintenanceDemo, setMaintenanceDemo] = useState<{observer: string[], manual: string[]} | null>(null);

  // Use static instances to maintain state across re-renders
  const [newsletter] = useState(() => new NewsletterSubject());
  const [manualManager] = useState(() => new ManualNotificationManager());

  // Observer Pattern Actions
  const handleObserverSubscribe = () => {
    const userId = `User${Math.floor(Math.random() * 1000)}`;
         const observer: Observer = {
       id: userId,
       notify: () => {
         // In real app, this would handle the notification
       }
     };
    
    newsletter.subscribe(observer);
    setObserverLogs(NewsletterSubject.getNotificationLog());
    setObserverSubscribers(newsletter.getSubscriberCount());
  };

  const handleObserverNotify = () => {
    const messages = [
      "New product launch!",
      "Weekly newsletter",
      "Flash sale alert!",
      "System maintenance notice"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    newsletter.notify(randomMessage);
    setObserverLogs(NewsletterSubject.getNotificationLog());
    setObserverCount(NewsletterSubject.getNotificationCount());
  };

  // Manual Notification Actions
  const handleManualSubscribe = () => {
    const userId = `User${Math.floor(Math.random() * 1000)}`;
    const email = `${userId.toLowerCase()}@example.com`;
    const sms = Math.random() > 0.5;
    const push = Math.random() > 0.5;
    
    manualManager.addSubscriber(userId, email, sms, push);
    setManualLogs(ManualNotificationManager.getAttemptLog());
    setManualSubscribers(manualManager.getSubscriberCount());
  };

  const handleManualNotify = () => {
    const messages = [
      "New product launch!",
      "Weekly newsletter", 
      "Flash sale alert!",
      "System maintenance notice"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    manualManager.sendNotification(randomMessage);
    setManualLogs(ManualNotificationManager.getAttemptLog());
    setManualCount(ManualNotificationManager.getAttemptCount());
  };

  const handleMaintenanceDemo = () => {
    const observerMaintenance = [
      "🔍 Request: Add Slack notification support",
      "📝 Step 1: Create SlackObserver implementing Observer interface",
      "🔌 Step 2: SlackObserver.notify() handles Slack API calls",
      "✅ DONE! All existing notifications now go to Slack automatically",
      "🧪 Zero changes needed to existing notification logic",
      "🚀 Future notifications automatically include Slack"
    ];

    const manualMaintenance = [
      "🔍 Request: Add Slack notification support",
      "📝 Step 1: Update subscriber data structure to include Slack preference",
      "❌ Step 2: Find and update sendNotification() method",
      "❌ Step 3: Add Slack API integration logic to sendNotification()",
      "❌ Step 4: Update addSubscriber() to handle Slack preference",
      "❌ Step 5: Update removeSubscriber() if Slack affects removal logic",
      "❌ Step 6: Update all UI forms to collect Slack preferences",
      "❌ Step 7: Update database schema for Slack data",
      "❌ Step 8: Migrate existing users to new schema",
      "❌ Step 9: Update all notification calling code to handle Slack",
      "❌ Step 10: Test every single notification type manually",
      "⚠️  Step 11: Hope the complex sendNotification() logic doesn't break",
      "💥 RISK: High chance of introducing bugs in existing notifications"
    ];

    setMaintenanceDemo({
      observer: observerMaintenance,
      manual: manualMaintenance
    });
  };

  const resetDemo = () => {
    NewsletterSubject.resetStats();
    ManualNotificationManager.resetStats();
    setObserverLogs([]);
    setManualLogs([]);
    setObserverCount(0);
    setManualCount(0);
    setObserverSubscribers(0);
    setManualSubscribers(0);
    setMaintenanceDemo(null);
  };

  return (
    <PatternLayout title="Observer">
      <p className="mb-4">
        Defines a one-to-many dependency between objects so that when one object
        changes state, all its dependents are notified and updated automatically.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        The Observer pattern allows an object (the subject) to maintain a list
        of dependents (observers) and notify them automatically of any state
        changes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Interactive Demo: Observer vs Manual Notification</h2>
      <p className="mb-4 text-zinc-400">
        Compare how Observer Pattern provides automatic, scalable notifications vs manual notification management:
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Observer Pattern Demo */}
        <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-700">
          <h3 className="text-lg font-semibold mb-3 text-green-400">👀 Observer Pattern</h3>
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={handleObserverSubscribe}
              className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded text-sm"
            >
              Add Subscriber
            </button>
            <button
              onClick={handleObserverNotify}
              className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded text-sm"
            >
              Send Notification
            </button>
          </div>
          
          <div className="space-y-2 text-sm mb-3">
            <div className="flex justify-between">
              <span>Subscribers:</span>
              <span className="font-mono bg-zinc-800 px-2 py-1 rounded text-green-400">
                {observerSubscribers}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Notifications Sent:</span>
              <span className="font-mono bg-zinc-800 px-2 py-1 rounded text-green-400">
                {observerCount}
              </span>
            </div>
          </div>
          
          <div>
            <span className="block mb-1 text-sm">Recent Activity:</span>
            <div className="bg-zinc-800 p-2 rounded text-xs font-mono min-h-[120px] max-h-[120px] overflow-y-auto">
              {observerLogs.length > 0 ? (
                observerLogs.map((log, idx) => (
                  <div key={idx} className="mb-1">{log}</div>
                ))
              ) : (
                <div className="text-zinc-500">No activity yet...</div>
              )}
            </div>
          </div>
        </div>

        {/* Manual Notification Demo */}
        <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-700">
          <h3 className="text-lg font-semibold mb-3 text-red-400">📧 Manual Notification</h3>
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={handleManualSubscribe}
              className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded text-sm"
            >
              Add Subscriber
            </button>
            <button
              onClick={handleManualNotify}
              className="bg-orange-600 hover:bg-orange-500 text-white px-3 py-2 rounded text-sm"
            >
              Send Notification
            </button>
          </div>
          
          <div className="space-y-2 text-sm mb-3">
            <div className="flex justify-between">
              <span>Subscribers:</span>
              <span className="font-mono bg-zinc-800 px-2 py-1 rounded text-red-400">
                {manualSubscribers}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Notifications Sent:</span>
              <span className="font-mono bg-zinc-800 px-2 py-1 rounded text-red-400">
                {manualCount}
              </span>
            </div>
          </div>
          
          <div>
            <span className="block mb-1 text-sm">Recent Activity:</span>
            <div className="bg-zinc-800 p-2 rounded text-xs font-mono min-h-[120px] max-h-[120px] overflow-y-auto">
              {manualLogs.length > 0 ? (
                manualLogs.map((log, idx) => (
                  <div key={idx} className="mb-1">{log}</div>
                ))
              ) : (
                <div className="text-zinc-500">No activity yet...</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
        <h4 className="font-semibold mb-2 text-blue-300">💡 Key Differences:</h4>
        <ul className="text-sm space-y-1 text-blue-200">
          <li>• <strong>Observer Pattern</strong>: Automatic notification, loose coupling, easy to extend</li>
          <li>• <strong>Manual Notification</strong>: Complex logic, tight coupling, hard to maintain</li>
          <li>• Notice how Observer handles multiple notification types effortlessly!</li>
        </ul>
      </div>

      <div className="mb-6">
        <button
          className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold"
          onClick={handleMaintenanceDemo}
        >
          🔧 Simulate Code Maintenance: Add Slack Notifications
        </button>
      </div>

      {maintenanceDemo && (
        <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Observer Maintenance */}
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-green-300 flex items-center">
              👀 Observer Pattern Approach
            </h4>
            <div className="space-y-2">
              {maintenanceDemo.observer.map((step, idx) => (
                <div key={idx} className="text-sm text-green-200 flex items-start gap-2">
                  <span className="text-green-400 font-mono text-xs mt-0.5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 p-2 bg-green-800/30 rounded text-xs text-green-100">
              <strong>Result:</strong> Clean extension, zero existing code changes
            </div>
          </div>

          {/* Manual Notification Maintenance */}
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-red-300 flex items-center">
              📧 Manual Notification Approach
            </h4>
            <div className="space-y-2">
              {maintenanceDemo.manual.map((step, idx) => (
                <div key={idx} className="text-sm text-red-200 flex items-start gap-2">
                  <span className="text-red-400 font-mono text-xs mt-0.5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 p-2 bg-red-800/30 rounded text-xs text-red-100">
              <strong>Result:</strong> Complex changes, high risk of breaking existing features
            </div>
          </div>
        </div>
      )}

      <button
        className="bg-zinc-600 hover:bg-zinc-500 text-white px-4 py-2 rounded mb-6 text-sm"
        onClick={resetDemo}
      >
        Reset Demo
      </button>

      <h2 className="text-xl font-semibold mt-6 mb-2">Code Example</h2>
      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
        {`interface Observer {
  id: string;
  notify: (message: string) => void;
}

class NewsletterSubject {
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observerId: string): void {
    this.observers = this.observers.filter(obs => obs.id !== observerId);
  }

  notify(message: string): void {
    // Automatically notifies ALL observers
    this.observers.forEach(observer => {
      observer.notify(message);
    });
  }
}

// Usage - Clean and extensible
const newsletter = new NewsletterSubject();

// Adding new notification types is easy
const emailObserver = { id: 'email', notify: (msg) => sendEmail(msg) };
const slackObserver = { id: 'slack', notify: (msg) => sendSlack(msg) };

newsletter.subscribe(emailObserver);
newsletter.subscribe(slackObserver);

// One call notifies everyone automatically
 newsletter.notify(&apos;Product launch!&apos;);

// vs Manual Approach - Complex and error-prone
function sendNotificationManually(message: string) {
  // Must remember to update every notification type manually
  sendEmail(message);
  sendSlack(message); // Easy to forget when adding new types
  sendSMS(message);   // Each new type requires code changes
}`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Event handling systems (DOM events, custom events)</li>
        <li>Pub-sub implementations (message queues, event buses)</li>
        <li>Reactive libraries (RxJS, Vue reactivity, React state)</li>
        <li>Model-View architectures (MVC, MVVM)</li>
        <li>Real-time notifications (chat, alerts, updates)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>When multiple objects need to stay in sync with another</li>
        <li>You want to decouple the subject and its observers</li>
        <li>When you need to broadcast changes to unknown number of objects</li>
        <li>To avoid tight coupling between notification sender and receivers</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Can cause memory leaks if subscribers aren&apos;t properly cleaned up</li>
        <li>Too many observers can affect performance</li>
        <li>Debugging can be harder due to indirect relationships</li>
        <li>Unexpected update sequences can cause issues if not carefully designed</li>
      </ul>
    </PatternLayout>
  );
}
