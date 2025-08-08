"use client";

import PatternLayout from "@/components/PatternLayout";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";


export default function AdapterPage() {

  const scatteredCodeFiles = [
    {
      file: "OrderService.js",
      problem: "Duplicate payment logic",
      code: `// Must manually handle each provider
if (provider === 'stripe') {
  stripe.charges.create({
    amount: total * 100, // Manual conversion
    currency: currency.toLowerCase()
  });
} else if (provider === 'paypal') {
  paypal.payment.create({
    total: total.toString(), // Different conversion
    currency_code: currency.toUpperCase()
  });
}
// ... duplicate logic for each provider`
    },
    {
      file: "RefundService.js", 
      problem: "Same conversion logic repeated",
      code: `// Same conversion logic duplicated!
if (provider === 'stripe') {
  stripe.refunds.create({
    charge: chargeId,
    amount: refundAmount * 100 // Convert to cents again
  });
} else if (provider === 'paypal') {
  paypal.refund.create({
    amount: refundAmount.toString() // Convert to string again
  });
}
// ... more duplicate logic`
    },
    {
      file: "ReportingService.js",
      problem: "Provider-specific formatting everywhere", 
      code: `// Provider formatting scattered everywhere
function formatAmount(amount, provider) {
  if (provider === 'stripe') {
    return amount * 100; // Cents conversion again
  } else if (provider === 'paypal') {
    return amount.toString(); // String conversion again
  } else if (provider === 'square') {
    return { amount: amount * 100, currency: 'USD' }; // Nested object again
  }
  // ... same logic repeated in 15+ files
}`
    },
    {
      file: "SubscriptionService.js",
      problem: "More duplicate conversion logic",
      code: `// Yet another place with the same conversions
function processSubscription(amount, provider) {
  if (provider === 'stripe') {
    return stripe.subscriptions.create({
      amount: amount * 100, // Cents conversion duplicated
      currency: 'usd'
    });
  }
  // ... same pattern repeated everywhere
}`
    }
  ];

  return (
    <PatternLayout title="Adapter">
      <p className="mb-4">
        Convert the interface of a class into another interface clients expect.
        Adapter lets classes work together that couldn&apos;t otherwise due to
        incompatible interfaces.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        The Adapter pattern acts as a bridge between two incompatible
        interfaces. It&apos;s like a universal power adapter that lets you plug your device into any outlet worldwide.
        In code, it wraps existing classes and makes them compatible with your app&apos;s expected interface.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">The Problem: API Integration Complexity</h2>
      <p className="mb-6 text-muted-foreground">
        Your app needs to process payments, but each provider has a completely different API format. 
        The **Adapter Pattern** organizes this complexity cleanly, while **Direct Integration** scatters it everywhere, creating a maintenance nightmare.
      </p>

      {/* Complexity Analysis */}
      <h2 className="text-xl font-semibold mt-6 mb-4">🔍 Why Direct Integration Gets Complex</h2>
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h4 className="text-lg font-semibold mb-4 text-yellow-300">The Real Problem: Scattered Complexity</h4>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded p-4">
            <h5 className="font-semibold text-green-800 dark:text-green-300 mb-2">✅ With Adapter Pattern:</h5>
            <div className="text-sm text-green-700 dark:text-green-200 space-y-2">
              <div>📁 <strong>PaymentService.js</strong> - Clean interface only</div>
              <div>📁 <strong>OrderService.js</strong> - Clean interface only</div>
              <div>📁 <strong>RefundService.js</strong> - Clean interface only</div>
              <div>📁 <strong>ReportingService.js</strong> - Clean interface only</div>
              <div className="pt-2 border-t border-green-200 dark:border-green-700">
                <div>📁 <strong>StripeAdapter.js</strong> - All Stripe complexity here</div>
                <div>📁 <strong>PayPalAdapter.js</strong> - All PayPal complexity here</div>
                <div>📁 <strong>BitcoinAdapter.js</strong> - All Bitcoin complexity here</div>
              </div>
              <div className="pt-2 text-green-700 dark:text-green-400 font-semibold">
                🎯 Result: Complexity isolated, easy to maintain!
              </div>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded p-4">
            <h5 className="font-semibold text-red-800 dark:text-red-300 mb-2">💀 With Direct Integration:</h5>
            <div className="text-sm text-red-700 dark:text-red-200 space-y-2">
              <div>📁 <strong>PaymentService.js</strong> - Stripe + PayPal + Square + Bitcoin logic</div>
              <div>📁 <strong>OrderService.js</strong> - Stripe + PayPal + Square + Bitcoin logic</div>
              <div>📁 <strong>RefundService.js</strong> - Stripe + PayPal + Square + Bitcoin logic</div>
              <div>📁 <strong>ReportingService.js</strong> - Stripe + PayPal + Square + Bitcoin logic</div>
              <div>📁 <strong>SubscriptionService.js</strong> - Stripe + PayPal + Square + Bitcoin logic</div>
              <div>📁 <strong>InvoiceService.js</strong> - Stripe + PayPal + Square + Bitcoin logic</div>
              <div>📁 <strong>AnalyticsService.js</strong> - Stripe + PayPal + Square + Bitcoin logic</div>
              <div>📁 <strong>...and 15+ more files</strong> - Same duplicated logic everywhere!</div>
              <div className="pt-2 text-red-700 dark:text-red-400 font-semibold">
                �� Result: Complexity scattered everywhere, maintenance nightmare!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scattered Code Examples */}
      <h2 className="text-xl font-semibold mt-6 mb-4">📁 The Scattered Code Problem</h2>
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h4 className="text-lg font-semibold mb-4 text-purple-300">Duplicated Logic Everywhere</h4>
        <p className="text-sm text-muted-foreground mb-4">
          This is why Direct Integration becomes a maintenance nightmare. The same conversion logic gets duplicated in every file that handles payments:
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {scatteredCodeFiles.map((file, index) => (
            <div key={index} className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded p-4">
              <div className="mb-2">
                <h5 className="font-semibold text-red-800 dark:text-red-300">{file.file}</h5>
                <span className="text-xs text-red-700 dark:text-red-400">{file.problem}</span>
              </div>
              <SyntaxHighlighter 
                language="javascript" 
                style={atomDark} 
                className="rounded text-xs"
                customStyle={{ margin: 0, fontSize: '10px' }}
              >
                {file.code}
              </SyntaxHighlighter>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-800/30 border border-red-200 dark:border-red-700 rounded">
          <h5 className="font-semibold text-red-800 dark:text-red-300 mb-2">💥 The Problem:</h5>
          <ul className="text-sm text-red-700 dark:text-red-200 space-y-1">
            <li>• Same conversion logic duplicated in 20+ files</li>
            <li>• Add new provider? Update every single file manually</li>
            <li>• Bug in conversion logic? Fix it in 20+ places</li>
            <li>• Different developers implement slightly different logic</li>
            <li>• High chance of missing updates in some files</li>
          </ul>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">Code Example: Clean vs Scattered</h2>
      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
        {`// Adapter Pattern - Complexity isolated and organized
interface PaymentProcessor {
  processPayment(amount: number, currency: string): PaymentResult;
}

// All complexity hidden in specific adapters
class StripeAdapter implements PaymentProcessor {
  processPayment(amount: number, currency: string) {
    // Handle Stripe's specific requirements here
    return StripeAPI.charges.create({
      amount: amount * 100,           // Stripe wants cents
      currency: currency.toLowerCase() // Stripe wants lowercase
    });
  }
}

class PayPalAdapter implements PaymentProcessor {
  processPayment(amount: number, currency: string) {
    // Handle PayPal's specific requirements here
    return PayPalAPI.payment.create({
      total: amount.toString(),        // PayPal wants string
      currency_code: currency.toUpperCase() // PayPal wants uppercase
    });
  }
}

// Your business logic stays clean and simple!
class OrderService {
  processPayment(processor: PaymentProcessor, amount: number) {
    return processor.processPayment(amount, "USD"); // Clean interface!
  }
}

// vs Direct Integration - Complexity scattered everywhere
class OrderService {
  processPayment(provider: string, amount: number, currency: string) {
    // Must handle every provider's specific format manually
    if (provider === "stripe") {
      return StripeAPI.charges.create({
        amount: amount * 100,           // Manual conversion
        currency: currency.toLowerCase() // Manual formatting
      });
    } else if (provider === "paypal") {
      return PayPalAPI.payment.create({
        total: amount.toString(),        // Different conversion
        currency_code: currency.toUpperCase() // Different formatting
      });
    } else if (provider === "bitcoin") {
      return BitcoinAPI.transactions.send({
        amount_btc: amount / 45000,     // Yet another conversion
        currency: currency              // Yet another format
      });
    }
    // This same logic gets duplicated in RefundService, ReportingService, 
    // SubscriptionService, InvoiceService, and 15+ other files!
  }
}

// RESULT:
// Adapter: Complexity organized in dedicated classes
// Direct: Same complexity duplicated in 20+ files`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Integrating third-party APIs with different interfaces</li>
        <li>Making legacy code work with new systems</li>
        <li>Unifying multiple data sources or services</li>
        <li>Creating consistent interfaces for inconsistent libraries</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>You need to use existing classes with incompatible interfaces</li>
        <li>You want to create a unified interface for multiple similar services</li>
        <li>You&apos;re integrating third-party libraries or legacy systems</li>
        <li>You want to isolate your code from external API changes</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Benefits</h2>
      <ul className="list-disc ml-6 mb-4">
        <li><strong>Interface Unification</strong>: Make incompatible APIs work with the same interface</li>
        <li><strong>Complexity Isolation</strong>: Keep messy integration details in dedicated adapter classes</li>
        <li><strong>Easy Extension</strong>: Add new providers without changing existing business logic</li>
        <li><strong>Maintainability</strong>: Fix bugs in one place instead of 20+ scattered locations</li>
        <li><strong>Testability</strong>: Mock adapters easily for unit testing</li>
      </ul>
    </PatternLayout>
  );
}
