import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middlerware";
import { HTTPSTATUS } from "../config/http.config";
import {
  bulkDeleteTransactionSchema,
  bulkTransactionSchema,
  createTransactionSchema,
  transactionIdSchema,
  updateTransactionSchema,
} from "../validators/transaction.validator";
import {
  bulkDeleteTransactionService,
  bulkTransactionService,
  createTransactionService,
  deleteTransactionService,
  duplicateTransactionService,
  getAllTransactionService,
  getTransactionByIdService,
  scanReceiptService,
  updateTransactionService,
} from "../services/transaction.service";
import { TransactionTypeEnum } from "../models/transaction.model";

export const createTransactionController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createTransactionSchema.parse(req.body);
    const userId = req.user?._id;

    const transaction = await createTransactionService(body, userId);

    return res.status(HTTPSTATUS.CREATED).json({
      message: "Transacton created successfully",
      transaction,
    });
  }
);

export const getAllTransactionController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const filters = {
      keyword: req.query.keyword as string | undefined,
      type: req.query.type as keyof typeof TransactionTypeEnum | undefined,
      recurringStatus: req.query.recurringStatus as
        | "RECURRING"
        | "NON_RECURRING"
        | undefined,
    };

    const pagination = {
      pageSize: parseInt(req.query.pageSize as string) || 20,
      pageNumber: parseInt(req.query.pageNumber as string) || 1,
    };

    const result = await getAllTransactionService(userId, filters, pagination);

    return res.status(HTTPSTATUS.OK).json({
      message: "Transaction fetched successfully",
      ...result,
    });
  }
);

export const getTransactionByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const transactionId = transactionIdSchema.parse(req.params.id);

    const transaction = await getTransactionByIdService(userId, transactionId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Transaction fetched successfully",
      transaction,
    });
  }
);

export const duplicateTransactionController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const transactionId = transactionIdSchema.parse(req.params.id);

    const transaction = await duplicateTransactionService(
      userId,
      transactionId
    );

    return res.status(HTTPSTATUS.OK).json({
      message: "Transaction duplicated successfully",
      data: transaction,
    });
  }
);

export const updateTransactionController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const transactionId = transactionIdSchema.parse(req.params.id);
    const body = updateTransactionSchema.parse(req.body);

    await updateTransactionService(userId, transactionId, body);

    return res.status(HTTPSTATUS.OK).json({
      message: "Transaction updated successfully",
    });
  }
);

export const deleteTransactionController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const transactionId = transactionIdSchema.parse(req.params.id);

    await deleteTransactionService(userId, transactionId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Transaction deleted successfully",
    });
  }
);

export const bulkDeleteTransactionController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { transactionIds } = bulkDeleteTransactionSchema.parse(req.body);

    const result = await bulkDeleteTransactionService(userId, transactionIds);

    return res.status(HTTPSTATUS.OK).json({
      message: "Transaction deleted successfully",
      ...result,
    });
  }
);

export const bulkTransactionController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { transactions } = bulkTransactionSchema.parse(req.body);

    const result = await bulkTransactionService(userId, transactions);

    return res.status(HTTPSTATUS.OK).json({
      message: "Bulk transaction inserted successfully",
      ...result,
    });
  }
);

export const scanReceiptController = asyncHandler(
  async (req: Request, res: Response) => {
    const file = req?.file;

    const result = await scanReceiptService(file);

    return res.status(HTTPSTATUS.OK).json({
      message: "Reciept scanned successfully",
      data: result,
    });
  }
);
