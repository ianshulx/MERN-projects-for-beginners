import { z } from "zod";
import {
  PaymentMethodEnum,
  RecurringIntervalEnum,
  TransactionTypeEnum,
} from "../models/transaction.model.js";

export const transactionIdSchema = z.string().trim().min(1);

export const baseTransactionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  type: z.enum([TransactionTypeEnum.INCOME, TransactionTypeEnum.EXPENSE], {
    errorMap: () => ({
      message: "Transaction type must either INCOME or EXPENSE",
    }),
  }),
  amount: z.number().positive("Amount must be postive").min(1),
  category: z.string().min(1, "Category is required"),
  date: z
    .union([z.string().datetime({ message: "Invalid date string" }), z.date()])
    .transform((val) => new Date(val)),
  isRecurring: z.boolean().default(false),
  recurringInterval: z
    .enum([
      RecurringIntervalEnum.DAILY,
      RecurringIntervalEnum.WEEKLY,
      RecurringIntervalEnum.MONTHLY,
      RecurringIntervalEnum.YEARLY,
    ])
    .nullable()
    .optional(),

  receiptUrl: z.string().optional(),
  paymentMethod: z
    .enum([
      PaymentMethodEnum.CARD,
      PaymentMethodEnum.BANK_TRANSFER,
      PaymentMethodEnum.MOBILE_PAYMENT,
      PaymentMethodEnum.AUTO_DEBIT,
      PaymentMethodEnum.CASH,
      PaymentMethodEnum.OTHER,
    ])
    .default(PaymentMethodEnum.CASH),
});

export const bulkDeleteTransactionSchema = z.object({
  transactionIds: z
    .array(z.string().length(24, "Invalid transaction ID format"))
    .min(1, "At least one transaction ID must be provided"),
});

export const bulkTransactionSchema = z.object({
  transactions: z
    .array(baseTransactionSchema)
    .min(1, "At least one transaction is required")
    .max(300, "Must not be more than 300 transactions")
    .refine(
      (txs) =>
        txs.every((tx) => {
          const amount = Number(tx.amount);
          return !isNaN(amount) && amount > 0 && amount <= 1_000_000_000;
        }),
      {
        message: "Amount must be a postive number",
      }
    ),
});

export const createTransactionSchema = baseTransactionSchema;
export const updateTransactionSchema = baseTransactionSchema.partial();

export type CreateTransactionType = z.infer<typeof createTransactionSchema>;

export type UpdateTransactionType = z.infer<typeof updateTransactionSchema>;

export type BulkDelteTransactionType = z.infer<
  typeof bulkDeleteTransactionSchema
>;
