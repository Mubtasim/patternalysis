"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Observer Pattern Implementation - Automatic notification distribution
interface NotificationObserver {
  id: string;
  type: string;
  notify: (event: string, details: string) => void;
  isActive: boolean;
}

class EventPublisher {
  private observers: NotificationObserver[] = [];
  private static eventLog: string[] = [];

  subscribe(observer: NotificationObserver): void {
    this.observers.push(observer);
    const timestamp = new Date().toLocaleTimeString();
    EventPublisher.eventLog.push(`✅ [${timestamp}] ${observer.id} (${observer.type}) subscribed automatically`);
  }

  unsubscribe(observerId: string): void {
    this.observers = this.observers.filter(obs => obs.id !== observerId);
    const timestamp = new Date().toLocaleTimeString();
    EventPublisher.eventLog.push(`❌ [${timestamp}] ${observerId} unsubscribed automatically`);
  }

  publishEvent(event: string, details: string): void {
    const timestamp = new Date().toLocaleTimeString();
    
    if (this.observers.length === 0) {
      EventPublisher.eventLog.push(`📢 [${timestamp}] Published "${event}" but no subscribers`);
      return;
    }

    const activeObservers = this.observers.filter(obs => obs.isActive);
    
    // AUTOMATIC: All active observers get notified without the publisher knowing who they are
    activeObservers.forEach(observer => {
      observer.notify(event, details);
    });
    
    EventPublisher.eventLog.push(
      `📢 [${timestamp}] AUTO-NOTIFIED ${activeObservers.length} subscribers about "${event}" (${activeObservers.map(o => o.id).join(', ')})`
    );
  }

  getActiveSubscribers(): NotificationObserver[] {
    return this.observers.filter(obs => obs.isActive);
  }

  static getEventLog(): string[] {
    return EventPublisher.eventLog.slice(-6);
  }

  static resetLog(): void {
    EventPublisher.eventLog = [];
  }

  reset(): void {
    this.observers = [];
  }
}

// Manual Notification System - Tight coupling and missed notifications
class ManualNotificationSystem {
  private emailService: { id: string; isActive: boolean } | null = null;
  private smsService: { id: string; isActive: boolean } | null = null;
  private pushService: { id: string; isActive: boolean } | null = null;
  private slackService: { id: string; isActive: boolean } | null = null;
  private static eventLog: string[] = [];

  // PROBLEM: Must manually track each service type
  addEmailService(id: string): void {
    this.emailService = { id, isActive: true };
    const timestamp = new Date().toLocaleTimeString();
    ManualNotificationSystem.eventLog.push(`✅ [${timestamp}] ${id} email service registered (manual tracking)`);
  }

  addSMSService(id: string): void {
    this.smsService = { id, isActive: true };
    const timestamp = new Date().toLocaleTimeString();
    ManualNotificationSystem.eventLog.push(`✅ [${timestamp}] ${id} SMS service registered (manual tracking)`);
  }

  addPushService(id: string): void {
    this.pushService = { id, isActive: true };
    const timestamp = new Date().toLocaleTimeString();
    ManualNotificationSystem.eventLog.push(`✅ [${timestamp}] ${id} push service registered (manual tracking)`);
  }

  addSlackService(id: string): void {
    this.slackService = { id, isActive: true };
    const timestamp = new Date().toLocaleTimeString();
    ManualNotificationSystem.eventLog.push(`✅ [${timestamp}] ${id} slack service registered (manual tracking)`);
  }

  // PROBLEM: Must manually remember to notify each service type
  publishEvent(event: string): void {
    const timestamp = new Date().toLocaleTimeString();
    const notifiedServices: string[] = [];

    // Hardcoded notification logic - easy to miss services!
    if (this.emailService?.isActive) {
      // Simulate email notification
      notifiedServices.push("Email");
    }

    if (this.smsService?.isActive) {
      // Simulate SMS notification  
      notifiedServices.push("SMS");
    }

    if (this.pushService?.isActive) {
      // Simulate push notification
      notifiedServices.push("Push");
    }

    // OOPS! Forgot to notify Slack! This is the typical problem!
    // if (this.slackService?.isActive) {
    //   notifiedServices.push("Slack");
    // }

    if (notifiedServices.length === 0) {
      ManualNotificationSystem.eventLog.push(`📢 [${timestamp}] Published "${event}" but forgot to check services`);
    } else {
      ManualNotificationSystem.eventLog.push(
        `📢 [${timestamp}] MANUALLY notified ${notifiedServices.length}/4 services about "${event}" (${notifiedServices.join(', ')}) - MISSED SLACK!`
      );
    }
  }

  getActiveServices(): string[] {
    const services: string[] = [];
    if (this.emailService?.isActive) services.push("Email");
    if (this.smsService?.isActive) services.push("SMS"); 
    if (this.pushService?.isActive) services.push("Push");
    if (this.slackService?.isActive) services.push("Slack");
    return services;
  }

  static getEventLog(): string[] {
    return ManualNotificationSystem.eventLog.slice(-6);
  }

  static resetLog(): void {
    ManualNotificationSystem.eventLog = [];
  }

  reset(): void {
    this.emailService = null;
    this.smsService = null;
    this.pushService = null;
    this.slackService = null;
  }
}

export default function ObserverPage() {
  const [observerLogs, setObserverLogs] = useState<string[]>([]);
  const [manualLogs, setManualLogs] = useState<string[]>([]);
  const [observerSubscribers, setObserverSubscribers] = useState<NotificationObserver[]>([]);
  const [manualSubscribers, setManualSubscribers] = useState<string[]>([]);
  const [maintenanceDemo, setMaintenanceDemo] = useState<{observer: string[], manual: string[]} | null>(null);

  // Use persistent instances
  const [publisher] = useState(() => new EventPublisher());
  const [manualSystem] = useState(() => new ManualNotificationSystem());

  const serviceTypes = [
    { name: "Email", icon: "📧", color: "blue" },
    { name: "SMS", icon: "📱", color: "green" }, 
    { name: "Push", icon: "🔔", color: "purple" },
    { name: "Slack", icon: "💬", color: "orange" }
  ];

  const events = [
    { name: "Order Placed", details: "New order #12345" },
    { name: "Payment Failed", details: "Card declined" },
    { name: "User Signup", details: "New user registered" },
    { name: "System Alert", details: "High CPU usage" }
  ];

  // Observer Pattern Actions
  const handleObserverSubscribe = (serviceType: string) => {
    const serviceId = `${serviceType}Service${Math.floor(Math.random() * 100)}`;
         const observer: NotificationObserver = {
       id: serviceId,
       type: serviceType,
       notify: () => {
         // In real app, this would send actual notifications
       },
       isActive: true
     };
    
    publisher.subscribe(observer);
    setObserverLogs(EventPublisher.getEventLog());
    setObserverSubscribers(publisher.getActiveSubscribers());
  };

  const handleObserverPublish = (event: string, details: string) => {
    console.log("Publishing observer event:", event, details);
    publisher.publishEvent(event, details);
    const logs = EventPublisher.getEventLog();
    console.log("Observer logs after publish:", logs);
    setObserverLogs(logs);
  };

  // Manual System Actions
  const handleManualSubscribe = (serviceType: string) => {
    const serviceId = `${serviceType}Service${Math.floor(Math.random() * 100)}`;
    
    // PROBLEM: Must use different methods for each service type
    switch (serviceType) {
      case "Email":
        manualSystem.addEmailService(serviceId);
        break;
      case "SMS":
        manualSystem.addSMSService(serviceId);
        break;
      case "Push":
        manualSystem.addPushService(serviceId);
        break;
      case "Slack":
        manualSystem.addSlackService(serviceId);
        break;
    }
    
    setManualLogs(ManualNotificationSystem.getEventLog());
    setManualSubscribers(manualSystem.getActiveServices());
  };

  const handleManualPublish = (event: string, details: string) => {
    console.log("Publishing manual event:", event, details);
    manualSystem.publishEvent(event);
    const logs = ManualNotificationSystem.getEventLog();
    console.log("Manual logs after publish:", logs);
    setManualLogs(logs);
  };

  const handleMaintenanceDemo = () => {
    const observerMaintenance = [
      "🔍 Request: Add Discord notification support",
      "📝 Step 1: Create DiscordObserver implementing NotificationObserver",
      "🔌 Step 2: Call publisher.subscribe(discordObserver)",
      "✅ DONE! Discord automatically receives ALL future events",
      "🧪 Zero changes to existing event publishing code",
      "🚀 All events (past, present, future) automatically include Discord"
    ];

    const manualMaintenance = [
      "🔍 Request: Add Discord notification support",
      "📝 Step 1: Add discordService property to ManualNotificationSystem",
      "❌ Step 2: Create addDiscordService() method",
      "❌ Step 3: Find publishEvent() method and add Discord logic",
      "❌ Step 4: Update getActiveServices() to include Discord",
      "❌ Step 5: Find all places that call publishEvent() and verify Discord support", 
      "❌ Step 6: Update OrderService.publishEvent() to include Discord",
      "❌ Step 7: Update PaymentService.publishEvent() to include Discord",
      "❌ Step 8: Update UserService.publishEvent() to include Discord",
      "❌ Step 9: Update 8 other services that publish events",
      "⚠️  Step 10: Test every single event type to ensure Discord gets notified",
      "💥 RISK: Easy to miss an event publisher and Discord won't get notified"
    ];

    setMaintenanceDemo({
      observer: observerMaintenance,
      manual: manualMaintenance
    });
  };

  const resetDemo = () => {
    // Reset static logs
    EventPublisher.resetLog();
    ManualNotificationSystem.resetLog();
    
    // Reset the actual instances
    publisher.reset();
    manualSystem.reset();
    
    // Clear UI state
    setObserverLogs([]);
    setManualLogs([]);
    setObserverSubscribers([]);
    setManualSubscribers([]);
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
        Observer Pattern **eliminates tight coupling** and **prevents missed notifications** 
        by automatically distributing events to all subscribers.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Demo: The Notification Distribution Problem</h2>
      <p className="mb-4 text-zinc-400">
        You need to notify Email, SMS, Push, and Slack services when events happen. 
        Watch what happens when you add services and publish events:
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Observer Pattern Demo */}
        <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-700">
          <h3 className="text-lg font-semibold mb-3 text-green-400">👀 Observer Pattern</h3>
          <p className="text-xs text-green-300 mb-3">Automatic notification to ALL subscribers</p>
          
          <div className="mb-3">
            <div className="text-xs text-zinc-400 mb-2">Add Notification Services:</div>
            <div className="grid grid-cols-2 gap-1">
              {serviceTypes.map(service => (
                <button
                  key={service.name}
                  onClick={() => handleObserverSubscribe(service.name)}
                  className="bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded text-xs"
                >
                  {service.icon} {service.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <div className="text-xs text-zinc-400 mb-2">Active Subscribers ({observerSubscribers.length}):</div>
            <div className="text-xs bg-zinc-800 p-2 rounded min-h-[30px]">
              {observerSubscribers.length > 0 ? (
                observerSubscribers.map(sub => `${sub.type}`).join(', ')
              ) : (
                <span className="text-zinc-500">No subscribers yet...</span>
              )}
            </div>
          </div>

          <div className="mb-3">
            <div className="text-xs text-zinc-400 mb-2">Publish Events:</div>
            <div className="grid grid-cols-1 gap-1">
              {events.slice(0, 2).map(event => (
                <button
                  key={event.name}
                  onClick={() => handleObserverPublish(event.name, event.details)}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded text-xs"
                >
                  📢 {event.name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <span className="block mb-1 text-xs text-zinc-400">Event Log:</span>
            <div className="bg-zinc-800 p-2 rounded text-xs font-mono min-h-[120px] max-h-[120px] overflow-y-auto">
              {observerLogs.length > 0 ? (
                observerLogs.map((log, idx) => (
                  <div key={idx} className="mb-1 break-all">{log}</div>
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
          <p className="text-xs text-red-300 mb-3">Hardcoded logic - misses notifications!</p>
          
          <div className="mb-3">
            <div className="text-xs text-zinc-400 mb-2">Add Notification Services:</div>
            <div className="grid grid-cols-2 gap-1">
              {serviceTypes.map(service => (
                <button
                  key={service.name}
                  onClick={() => handleManualSubscribe(service.name)}
                  className={`text-white px-2 py-1 rounded text-xs ${
                    service.name === "Slack" 
                      ? "bg-orange-600 hover:bg-orange-500 border-2 border-orange-300" 
                      : "bg-red-600 hover:bg-red-500"
                  }`}
                >
                  {service.icon} {service.name} {service.name === "Slack" && "⚠️"}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <div className="text-xs text-zinc-400 mb-2">Active Services ({manualSubscribers.length}):</div>
            <div className="text-xs bg-zinc-800 p-2 rounded min-h-[30px]">
              {manualSubscribers.length > 0 ? (
                manualSubscribers.join(', ')
              ) : (
                <span className="text-zinc-500">No services yet...</span>
              )}
            </div>
          </div>

          <div className="mb-3">
            <div className="text-xs text-zinc-400 mb-2">Publish Events:</div>
            <div className="grid grid-cols-1 gap-1">
              {events.slice(0, 2).map(event => (
                <button
                  key={event.name}
                  onClick={() => handleManualPublish(event.name, event.details)}
                  className="bg-orange-600 hover:bg-orange-500 text-white px-2 py-1 rounded text-xs"
                >
                  📢 {event.name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <span className="block mb-1 text-xs text-zinc-400">Event Log:</span>
            <div className="bg-zinc-800 p-2 rounded text-xs font-mono min-h-[120px] max-h-[120px] overflow-y-auto">
              {manualLogs.length > 0 ? (
                manualLogs.map((log, idx) => (
                  <div key={idx} className="mb-1 break-all">{log}</div>
                ))
              ) : (
                <div className="text-zinc-500">No activity yet...</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
        <h4 className="font-semibold mb-2 text-blue-300">💡 The Key Difference:</h4>
        <ul className="text-sm space-y-1 text-blue-200">
          <li>• **Observer Pattern**: Automatically notifies ALL subscribers - never misses anyone</li>
          <li>• **Manual Notification**: Hardcoded logic often forgets services (notice Slack gets missed!)</li>
          <li>• Try adding Slack and publishing events - see how manual approach fails!</li>
        </ul>
      </div>

      <div className="mb-6">
        <button
          className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold"
          onClick={handleMaintenanceDemo}
        >
          🔧 Simulate Code Maintenance: Add Discord Notifications
        </button>
      </div>

      {maintenanceDemo && (
        <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Observer Maintenance */}
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-green-300">👀 Observer Pattern Approach</h4>
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
              **Result:** Subscribe once, get ALL events automatically forever
            </div>
          </div>

          {/* Manual Notification Maintenance */}
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-red-300">📧 Manual Notification Approach</h4>
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
              **Result:** Hunt down every event publisher, high chance of missing some
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

      <h2 className="text-xl font-semibold mt-6 mb-2">Code Example: The Real Problem</h2>
      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
        {`// Observer Pattern - Add once, notify everywhere automatically
class EventPublisher {
  private observers: NotificationObserver[] = [];

  subscribe(observer: NotificationObserver) {
    this.observers.push(observer);
  }

  publishEvent(event: string) {
    // AUTOMATIC: All observers get notified
    this.observers.forEach(observer => {
      observer.notify(event); // Works automatically
    });
  }
}

// Usage - New services automatically get ALL events:
publisher.subscribe(new EmailObserver());
publisher.subscribe(new SMSObserver());
publisher.subscribe(new SlackObserver());   // Add once
publisher.subscribe(new DiscordObserver()); // Add once

publisher.publishEvent("Order Placed"); // ALL 4 services notified automatically

// vs Manual Notification - Easy to miss services
class ManualNotificationSystem {
  publishEvent(event: string) {
    // MANUAL: Must remember every service type
    if (this.emailService) this.emailService.notify(event);
    if (this.smsService) this.smsService.notify(event);
    if (this.pushService) this.pushService.notify(event);
    // OOPS! Forgot Slack again!
    // OOPS! Forgot Discord again!
  }
}

// PROBLEM: Every event publisher must manually list all services
class OrderService {
  processOrder() {
    // Must manually notify each service - easy to miss one
    this.emailService.notify("Order Placed");
    this.smsService.notify("Order Placed");
    // Forgot push and slack notifications!
  }
}

class PaymentService {
  processPayment() {
    // Must manually notify each service - easy to miss one
    this.emailService.notify("Payment Processed");
    // Forgot SMS, push, and slack notifications!
  }
}

// RESULT:
// Observer: Subscribe once → get ALL events automatically
// Manual: Update every event publisher → high chance of missing notifications`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Event handling systems (DOM events, custom application events)</li>
        <li>Notification systems (email, SMS, push, Slack, Discord)</li>
        <li>Model-View architectures (data changes automatically update UI)</li>
        <li>Reactive programming (state changes trigger automatic updates)</li>
        <li>Pub-sub message systems (microservices, event-driven architecture)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>When multiple objects need to stay in sync with one object</li>
        <li>You want to avoid tight coupling between event publishers and subscribers</li>
        <li>When you need to broadcast changes to an unknown number of objects</li>
        <li>To prevent missed notifications in complex systems</li>
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
