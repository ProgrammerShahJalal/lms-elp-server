import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { NoticeService } from "./notice.service";
import { Request, Response } from "express";
import pick from "../../../shared/pick";
import { noticeFilterableFields } from "./notice.constants";
import { paginationFields } from "../../constants/pagination";

const createNotice = catchAsync(async (req: Request, res: Response) => {
  const result = await NoticeService.createNotice(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Notice added successfully!",
    data: result,
  });
});

const getAllNotice = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, noticeFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await NoticeService.getAllNotices(filters, paginationOptions);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All notices fetched successfully!",
    data: result,
  });
});

const getSingleNotice = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NoticeService.getSingleNotice(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Notice fetched successfully!",
    data: result,
  });
});

const updateNotice = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await NoticeService.updateNotice(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Notice updated in successfully!",
    data: result,
  });
});
const deleteNotice = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NoticeService.deleteNotice(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Notice deleted in successfully!",
    data: result,
  });
});

export const NoticeController = {
  createNotice,
  getAllNotice,
  getSingleNotice,
  updateNotice,
  deleteNotice,
};
