import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { UserExamQuestionMarkService } from "./user-exam-question-mark.service";

const createUserExamQuestionMark = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserExamQuestionMarkService.createUserExamQuestionMark(
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User exam question mark added successfully!",
      data: result,
    });
  }
);

const getAllUserExamQuestionMarks = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await UserExamQuestionMarkService.getAllUserExamQuestionMarks();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All User exam question marks fetched successfully!",
      data: result,
    });
  }
);

const getSingleUserExamQuestionMark = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await UserExamQuestionMarkService.getSingleUserExamQuestionMark(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User exam question mark fetched successfully!",
      data: result,
    });
  }
);

const updateUserExamQuestionMark = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await UserExamQuestionMarkService.updateUserExamQuestionMark(
      id,
      payload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User exam question mark updated in successfully!",
      data: result,
    });
  }
);
const deleteUserExamQuestionMark = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserExamQuestionMarkService.deleteUserExamQuestionMark(
      id
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User exam question mark deleted in successfully!",
      data: result,
    });
  }
);

export const UserExamQuestionMarkController = {
  createUserExamQuestionMark,
  getAllUserExamQuestionMarks,
  getSingleUserExamQuestionMark,
  updateUserExamQuestionMark,
  deleteUserExamQuestionMark,
};
