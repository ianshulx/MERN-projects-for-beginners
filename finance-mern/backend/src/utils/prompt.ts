import { PaymentMethodEnum } from "../models/transaction.model";

export const receiptPrompt = `
You are a financial assistant that helps users analyze and extract transaction details from receipt image (base64 encoded)
Analyze this receipt image (base64 encoded) and extract transaction details matching this exact JSON format:
{
  "title": "string",          // Merchant/store name or brief description
  "amount": number,           // Total amount (positive number)
  "date": "ISO date string",  // Transaction date in YYYY-MM-DD format
  "description": "string",    // Items purchased summary (max 50 words)
  "category": "string",       // category of the transaction 
  "type": "EXPENSE"           // Always "EXPENSE" for receipts
  "paymentMethod": "string",  // One of: ${Object.values(PaymentMethodEnum).join(",")}
}

Rules:
1. Amount must be positive
2. Date must be valid and in ISO format
3. Category must match our enum values
4. If uncertain about any field, omit it
5. If not a receipt, return {}

Example valid response:
{
  "title": "Walmart Groceries",
  "amount": 58.43,
  "date": "2025-05-08",
  "description": "Groceries: milk, eggs, bread",
  "category": "groceries",
  "paymentMethod": "CARD",
  "type": "EXPENSE"
}
`;

export const reportInsightPrompt = ({
  totalIncome,
  totalExpenses,
  availableBalance,
  savingsRate,
  categories,
  periodLabel,
}: {
  totalIncome: number;
  totalExpenses: number;
  availableBalance: number;
  savingsRate: number;
  categories: Record<string, { amount: number; percentage: number }>;
  periodLabel: string;
}) => {
  const categoryList = Object.entries(categories)
    .map(
      ([name, { amount, percentage }]) =>
        `- ${name}: ${amount} (${percentage}%)`
    )
    .join("\n");

  console.log(categoryList, "category list");

  return `
  You are a friendly and smart financial coach, not a robot.

Your job is to give **exactly 3 good short insights** to the user based on their data that feel like you're talking to them directly.

Each insight should reflect the actual data and sound like something a smart money coach would say based on the data — short, clear, and practical.

🧾 Report for: ${periodLabel}
- Total Income: $${totalIncome.toFixed(2)}
- Total Expenses: $${totalExpenses.toFixed(2)}
- Available Balance: $${availableBalance.toFixed(2)}
- Savings Rate: ${savingsRate}%

Top Expense Categories:
${categoryList}

📌 Guidelines:
- Keep each insight to one short, realistic, personalized, natural sentence
- Use conversational language, correct wordings & Avoid sounding robotic, or generic
- Include specific data when helpful and comma to amount
- Be encouraging if user spent less than they earned
- Format your response **exactly** like this:

["Insight 1", "Insight 2", "Insight 3"]

✅ Example:
[
   "Nice! You kept $7,458 after expenses — that’s solid breathing room.",
   "You spent the most on 'Meals' this period — 32%. Maybe worth keeping an eye on.",
   "You stayed under budget this time. That's a win — keep the momentum"
]

⚠️ Output only a **JSON array of 3 strings**. Do not include any explanation, markdown, or notes.
  
  `.trim();
};
