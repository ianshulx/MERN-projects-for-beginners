import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middlerware";
import { HTTPSTATUS } from "../config/http.config";
import { DateRangePreset } from "../enums/date-range.enum";
import {
  chartAnalyticsService,
  expensePieChartBreakdownService,
  summaryAnalyticsService,
} from "../services/analytics.service";

export const summaryAnalyticsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const { preset, from, to } = req.query;

    const filter = {
      dateRangePreset: preset as DateRangePreset,
      customFrom: from ? new Date(from as string) : undefined,
      customTo: to ? new Date(to as string) : undefined,
    };
    const stats = await summaryAnalyticsService(
      userId,
      filter.dateRangePreset,
      filter.customFrom,
      filter.customTo
    );

    return res.status(HTTPSTATUS.OK).json({
      message: "Summary fetched successfully",
      data: stats,
    });
  }
);

export const chartAnalyticsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { preset, from, to } = req.query;

    const filter = {
      dateRangePreset: preset as DateRangePreset,
      customFrom: from ? new Date(from as string) : undefined,
      customTo: to ? new Date(to as string) : undefined,
    };

    const chartData = await chartAnalyticsService(
      userId,
      filter.dateRangePreset,
      filter.customFrom,
      filter.customTo
    );

    return res.status(HTTPSTATUS.OK).json({
      message: "Chart fetched successfully",
      data: chartData,
    });
  }
);

export const expensePieChartBreakdownController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { preset, from, to } = req.query;

    const filter = {
      dateRangePreset: preset as DateRangePreset,
      customFrom: from ? new Date(from as string) : undefined,
      customTo: to ? new Date(to as string) : undefined,
    };
    const pieChartData = await expensePieChartBreakdownService(
      userId,
      filter.dateRangePreset,
      filter.customFrom,
      filter.customTo
    );

    return res.status(HTTPSTATUS.OK).json({
      message: "Expense breakdown fetched successfully",
      data: pieChartData,
    });
  }
);
