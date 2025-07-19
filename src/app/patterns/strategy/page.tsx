"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Strategy Pattern Implementation - Discount Calculator
interface VIPDetails {
  membershipYears: number;
}

interface FlashSaleDetails {
  hoursLeft: number;
}

interface DiscountStrategy {
  calculate(amount: number, details?: VIPDetails | FlashSaleDetails): number;
  getName(): string;
  getDescription(): string;
}

class StudentDiscount implements DiscountStrategy {
  calculate(amount: number): number {
    return amount * 0.15; // 15% student discount
  }

  getName(): string {
    return "Student Discount";
  }

  getDescription(): string {
    return "15% off for students with valid ID";
  }
}

class SeniorDiscount implements DiscountStrategy {
  calculate(amount: number): number {
    return amount * 0.20; // 20% senior discount
  }

  getName(): string {
    return "Senior Discount";
  }

  getDescription(): string {
    return "20% off for customers 65+";
  }
}

class VIPDiscount implements DiscountStrategy {
  calculate(amount: number, details: { membershipYears: number }): number {
    const baseDiscount = 0.25; // 25% base VIP discount
    const loyaltyBonus = Math.min(details.membershipYears * 0.02, 0.15); // 2% per year, max 15%
    return amount * (baseDiscount + loyaltyBonus);
  }

  getName(): string {
    return "VIP Discount";
  }

  getDescription(): string {
    return "25% + 2% per membership year (max 40% total)";
  }
}

// NEW requirement that breaks hardcoded logic
class FlashSaleDiscount implements DiscountStrategy {
  calculate(amount: number, details: { hoursLeft: number }): number {
    // Higher discount for more urgency
    if (details.hoursLeft <= 1) return amount * 0.50; // 50% off
    if (details.hoursLeft <= 6) return amount * 0.35; // 35% off
    return amount * 0.25; // 25% off
  }

  getName(): string {
    return "Flash Sale";
  }

  getDescription(): string {
    return "Time-sensitive: 25-50% based on urgency";
  }
}

class DiscountCalculator {
  private strategy: DiscountStrategy;
  private static calculationLog: string[] = [];

  constructor(strategy: DiscountStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: DiscountStrategy): void {
    console.log('🔧 setStrategy called with:', strategy.getName());
    this.strategy = strategy;
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `🔄 [${timestamp}] Strategy changed to ${strategy.getName()}`;
    DiscountCalculator.calculationLog.push(logMessage);
    console.log('📝 Added to log:', logMessage);
    console.log('📚 Current log array:', DiscountCalculator.calculationLog);
  }

  calculateDiscount(amount: number, details?: VIPDetails | FlashSaleDetails): { discount: number; final: number } {
    console.log('💰 calculateDiscount called with:', amount, details);
    const timestamp = new Date().toLocaleTimeString();
    const discount = this.strategy.calculate(amount, details);
    const final = amount - discount;
    
    const logMessage = `✅ [${timestamp}] ${this.strategy.getName()}: $${amount} → -$${discount.toFixed(2)} = $${final.toFixed(2)}`;
    DiscountCalculator.calculationLog.push(logMessage);
    console.log('📝 Added to log:', logMessage);
    console.log('📚 Current log array:', DiscountCalculator.calculationLog);
    
    return { discount, final };
  }

  static getCalculationLog(): string[] {
    const logs = DiscountCalculator.calculationLog.slice(-6);
    console.log('📖 getCalculationLog returning:', logs);
    return logs;
  }

  static resetLog(): void {
    DiscountCalculator.calculationLog = [];
  }
}

// Hardcoded Logic Implementation (Anti-pattern) - BREAKS with new requirements
class HardcodedDiscountCalculator {
  private static calculationLog: string[] = [];

  static calculateDiscount(amount: number, discountType: string, details?: VIPDetails | FlashSaleDetails): { discount: number; final: number } {
    const timestamp = new Date().toLocaleTimeString();
    let discount: number;
    
    // This hardcoded switch statement CANNOT handle new FlashSale discount!
    switch (discountType) {
      case "student":
        discount = amount * 0.15;
        break;
      case "senior":
        discount = amount * 0.20;
        break;
      case "vip":
        const vipDetails = details as VIPDetails;
        const loyaltyBonus = Math.min((vipDetails?.membershipYears || 0) * 0.02, 0.15);
        discount = amount * (0.25 + loyaltyBonus);
        break;
      // NOTE: FlashSale is NOT supported - missing case!
      default:
        HardcodedDiscountCalculator.calculationLog.push(`❌ [${timestamp}] ERROR: Unknown discount type '${discountType}'`);
        throw new Error(`Unsupported discount type: ${discountType}`);
    }

    const final = amount - discount;
    HardcodedDiscountCalculator.calculationLog.push(
      `✅ [${timestamp}] Hardcoded ${discountType}: $${amount} → -$${discount.toFixed(2)} = $${final.toFixed(2)}`
    );
    
    return { discount, final };
  }

  static getCalculationLog(): string[] {
    return HardcodedDiscountCalculator.calculationLog.slice(-6);
  }

  static resetLog(): void {
    HardcodedDiscountCalculator.calculationLog = [];
  }
}

export default function StrategyPatternPage() {
  const [strategyLogs, setStrategyLogs] = useState<string[]>([]);
  const [hardcodedLogs, setHardcodedLogs] = useState<string[]>([]);
  const [purchaseAmount] = useState(100);
  const [membershipYears] = useState(3);
  const [flashSaleHours] = useState(2);
  const [maintenanceDemo, setMaintenanceDemo] = useState<{strategy: string[], hardcoded: string[]} | null>(null);

  // Use persistent instance
  const [discountCalculator] = useState(() => new DiscountCalculator(new StudentDiscount()));

  const handleStrategyDiscount = (discountType: string) => {
    console.log('🔍 handleStrategyDiscount called with:', discountType);
    let strategy: DiscountStrategy;
    let details: VIPDetails | FlashSaleDetails | undefined = undefined;

    switch (discountType) {
      case "student":
        strategy = new StudentDiscount();
        break;
      case "senior":
        strategy = new SeniorDiscount();
        break;
      case "vip":
        strategy = new VIPDiscount();
        details = { membershipYears };
        break;
      case "flash":
        strategy = new FlashSaleDiscount();
        details = { hoursLeft: flashSaleHours };
        break;
      default:
        console.log('❌ Unknown discount type:', discountType);
        return;
    }

    console.log('📊 About to call setStrategy with:', strategy.getName());
    discountCalculator.setStrategy(strategy);
    
    console.log('💰 About to calculateDiscount with amount:', purchaseAmount, 'details:', details);
    const result = discountCalculator.calculateDiscount(purchaseAmount, details);
    console.log('💰 calculateDiscount result:', result);
    
    const logs = DiscountCalculator.getCalculationLog();
    console.log('📝 Current logs:', logs);
    
    setStrategyLogs(logs);
    console.log('🔄 setStrategyLogs called with:', logs);
  };

  const handleHardcodedDiscount = (discountType: string) => {
    try {
      let details: VIPDetails | FlashSaleDetails | undefined = undefined;
      
      if (discountType === "vip") {
        details = { membershipYears };
      } else if (discountType === "flash") {
        details = { hoursLeft: flashSaleHours };
      }

      HardcodedDiscountCalculator.calculateDiscount(purchaseAmount, discountType, details);
      setHardcodedLogs(HardcodedDiscountCalculator.getCalculationLog());
    } catch {
      setHardcodedLogs(HardcodedDiscountCalculator.getCalculationLog());
    }
  };

  const handleMaintenanceDemo = () => {
    const strategyMaintenance = [
      "💼 Business Request: Add Flash Sale discount system",
      "⚡ Requirements: Time-sensitive pricing (25-50% based on urgency)",
      "",
      "📝 Strategy Pattern Implementation:",
      "✅ Step 1: Create FlashSaleDiscount class implementing DiscountStrategy",
      "✅ Step 2: Implement calculate() method with time-based logic",
      "✅ Step 3: Add getName() and getDescription() methods",
      "",
      "🎯 RESULT: Immediately works with existing DiscountCalculator!",
      "🔌 Zero changes to client code or existing discount logic",
      "🚀 Calculator.setStrategy(new FlashSaleDiscount()) - Done!"
    ];

    const hardcodedMaintenance = [
      "💼 Business Request: Add Flash Sale discount system",
      "⚡ Requirements: Time-sensitive pricing (25-50% based on urgency)",
      "",
      "📝 Hardcoded Logic Implementation:",
      "❌ Step 1: Find the main switch statement in calculateDiscount()",
      "❌ Step 2: Add new 'flash' case with complex time logic",
      "❌ Step 3: Update all UI components to include Flash Sale option",
      "❌ Step 4: Find PricingService.calculatePrice() - add flash case",
      "❌ Step 5: Find OrderProcessor.applyDiscounts() - add flash case",
      "❌ Step 6: Find ReportGenerator.getDiscountBreakdown() - add flash case",
      "❌ Step 7: Find EmailService.sendReceipt() - add flash case description",
      "❌ Step 8: Find AdminPanel.getDiscountTypes() - add flash option",
      "❌ Step 9: Update validation logic in 12 different places",
      "",
      "💥 RISK: Miss one switch statement → Runtime errors in production!",
      "🔍 Real situation: 'flash' not in HardcodedDiscountCalculator → CRASH!"
    ];

    setMaintenanceDemo({
      strategy: strategyMaintenance,
      hardcoded: hardcodedMaintenance
    });
  };

  const resetDemo = () => {
    DiscountCalculator.resetLog();
    HardcodedDiscountCalculator.resetLog();
    setStrategyLogs([]);
    setHardcodedLogs([]);
    setMaintenanceDemo(null);
  };

  return (
    <PatternLayout title="Strategy">
      <p className="mb-4">
        Define a family of algorithms, encapsulate each one, and make them
        interchangeable without breaking existing code.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        The Strategy pattern allows you to select algorithms at runtime without
        modifying client code or creating complex conditional logic that breaks when extended.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Interactive Demo: Strategy vs Hardcoded Logic</h2>
      <p className="mb-4 text-zinc-400">
        Test a discount system. Watch what happens when a NEW discount type (Flash Sale) is needed:
      </p>

      <div className="mb-4 p-3 bg-zinc-800 rounded border border-zinc-600">
        <h4 className="font-semibold mb-2 text-zinc-300">Shopping Scenario:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>📦 <strong>Purchase Amount:</strong> ${purchaseAmount}</div>
          <div>🎓 <strong>VIP Membership:</strong> {membershipYears} years</div>
          <div>⏰ <strong>Flash Sale Time Left:</strong> {flashSaleHours} hours</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Strategy Pattern Demo */}
        <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-700">
          <h3 className="text-lg font-semibold mb-3 text-green-400">⚡ Strategy Pattern</h3>
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => handleStrategyDiscount("student")}
              className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded text-sm"
            >
              Student (15%)
            </button>
            <button
              onClick={() => handleStrategyDiscount("senior")}
              className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded text-sm"
            >
              Senior (20%)
            </button>
            <button
              onClick={() => handleStrategyDiscount("vip")}
              className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded text-sm"
            >
              VIP (25%+)
            </button>
            <button
              onClick={() => handleStrategyDiscount("flash")}
              className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded text-sm border-2 border-yellow-400 relative"
            >
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs px-1 rounded">NEW</span>
              Flash Sale
            </button>
          </div>
          
          <div>
            <span className="block mb-1 text-sm">Activity Log:</span>
            <div className="bg-zinc-800 p-2 rounded text-xs font-mono min-h-[140px] max-h-[140px] overflow-y-auto">
              {strategyLogs.length > 0 ? (
                strategyLogs.map((log, idx) => (
                  <div key={idx} className="mb-1 break-all text-green-300">{log}</div>
                ))
              ) : (
                <div className="text-zinc-500">Try the discount buttons above...</div>
              )}
            </div>
          </div>
        </div>

        {/* Hardcoded Logic Demo */}
        <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-700">
          <h3 className="text-lg font-semibold mb-3 text-red-400">🔀 Hardcoded Logic</h3>
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => handleHardcodedDiscount("student")}
              className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded text-sm"
            >
              Student (15%)
            </button>
            <button
              onClick={() => handleHardcodedDiscount("senior")}
              className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded text-sm"
            >
              Senior (20%)
            </button>
            <button
              onClick={() => handleHardcodedDiscount("vip")}
              className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded text-sm"
            >
              VIP (25%+)
            </button>
            <button
              onClick={() => handleHardcodedDiscount("flash")}
              className="bg-red-800 hover:bg-red-700 text-white px-3 py-2 rounded text-sm border-2 border-red-400 relative opacity-75"
            >
              <span className="absolute -top-1 -right-1 bg-red-400 text-black text-xs px-1 rounded">💥</span>
              Flash Sale
            </button>
          </div>
          
          <div>
            <span className="block mb-1 text-sm">Activity Log:</span>
            <div className="bg-zinc-800 p-2 rounded text-xs font-mono min-h-[140px] max-h-[140px] overflow-y-auto">
              {hardcodedLogs.length > 0 ? (
                hardcodedLogs.map((log, idx) => (
                  <div key={idx} className={`mb-1 break-all ${log.includes('ERROR') ? 'text-red-400' : 'text-red-300'}`}>
                    {log}
                  </div>
                ))
              ) : (
                <div className="text-zinc-500">Try the discount buttons above...</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
        <h4 className="font-semibold mb-2 text-blue-300">💡 Key Insight:</h4>
        <ul className="text-sm space-y-1 text-blue-200">
          <li>• <strong>Strategy Pattern</strong>: NEW Flash Sale works immediately - no code changes needed!</li>
          <li>• <strong>Hardcoded Logic</strong>: NEW Flash Sale CRASHES - missing switch case breaks production!</li>
          <li>• <strong>Real Impact</strong>: Strategy enables safe extension, hardcoded logic creates maintenance nightmares</li>
        </ul>
      </div>

      <div className="mb-6">
        <button
          className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold"
          onClick={handleMaintenanceDemo}
        >
          🔧 Simulate Code Maintenance: Adding Flash Sale Feature
        </button>
      </div>

      {maintenanceDemo && (
        <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Strategy Maintenance */}
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-green-300 flex items-center">
              ⚡ Strategy Pattern: Easy Extension
            </h4>
            <div className="space-y-1">
              {maintenanceDemo.strategy.map((step, idx) => (
                <div key={idx} className="text-sm text-green-200">
                  {step === "" ? <div className="h-2"></div> : step}
                </div>
              ))}
            </div>
            <div className="mt-3 p-2 bg-green-800/30 rounded text-xs text-green-100">
              <strong>✅ Result:</strong> New feature works instantly, zero risk of breaking existing code
            </div>
          </div>

          {/* Hardcoded Logic Maintenance */}
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-red-300 flex items-center">
              🔀 Hardcoded Logic: Maintenance Nightmare
            </h4>
            <div className="space-y-1">
              {maintenanceDemo.hardcoded.map((step, idx) => (
                <div key={idx} className="text-sm text-red-200">
                  {step === "" ? <div className="h-2"></div> : step}
                </div>
              ))}
            </div>
            <div className="mt-3 p-2 bg-red-800/30 rounded text-xs text-red-100">
              <strong>💥 Result:</strong> High risk of runtime errors, scattered changes across entire codebase
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
        {`interface DiscountStrategy {
  calculate(amount: number, details?: any): number;
  getName(): string;
}

class FlashSaleDiscount implements DiscountStrategy {
  calculate(amount: number, details: { hoursLeft: number }): number {
    if (details.hoursLeft <= 1) return amount * 0.50; // 50% off
    if (details.hoursLeft <= 6) return amount * 0.35; // 35% off
    return amount * 0.25; // 25% off
  }
  
  getName(): string { return "Flash Sale"; }
}

class DiscountCalculator {
  private strategy: DiscountStrategy;

  setStrategy(strategy: DiscountStrategy) {
    this.strategy = strategy; // Clean algorithm switching
  }

  calculate(amount: number, details?: any): number {
    return this.strategy.calculate(amount, details); // No conditionals!
  }
}

// Usage - New strategies work immediately
const calculator = new DiscountCalculator();
calculator.setStrategy(new FlashSaleDiscount());
const discount = calculator.calculate(100, { hoursLeft: 2 });

// vs Hardcoded Approach - Breaks when extended
class HardcodedCalculator {
  static calculate(amount: number, type: string, details?: any): number {
    switch (type) { // This switch must be updated everywhere!
      case "student": return amount * 0.15;
      case "senior": return amount * 0.20;
      case "vip": return amount * 0.25;
      // Missing "flash" case = Runtime Error!
      default: throw new Error(\`Unknown type: \${type}\`);
    }
  }
}`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Payment processing (credit card, PayPal, crypto, buy-now-pay-later)</li>
        <li>Pricing strategies (regular, discount, subscription, bulk pricing)</li>
        <li>Data validation (email, phone, password strength, custom rules)</li>
        <li>File export formats (PDF, Excel, CSV, JSON)</li>
        <li>Authentication methods (OAuth, JWT, API keys, biometric)</li>
        <li>Sorting/filtering algorithms (performance vs memory trade-offs)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>When you need multiple ways to perform the same task</li>
        <li>When algorithms should be interchangeable at runtime</li>
        <li>To eliminate complex if/else or switch statement chains</li>
        <li>When new algorithm variants are frequently added</li>
        <li>When algorithms have different performance characteristics</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Increases the number of classes (but improves maintainability)</li>
        <li>Clients must understand available strategies</li>
        <li>Overkill for simple algorithms that never change</li>
        <li>Strategy selection logic still needs to exist somewhere</li>
      </ul>
    </PatternLayout>
  );
}
