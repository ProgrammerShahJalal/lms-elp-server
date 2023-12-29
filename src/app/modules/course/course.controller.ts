import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { CourseService } from "./course.service";
import { courseFilterableFields } from "./course.constants";
import { paginationFields } from "../../constants/pagination";
import pick from "../../../shared/pick";
import { SubscriptionHistory } from "../subscription-history/subscription-history.model";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../../config";

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.createCourse(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course added successfully!",
    data: result,
  });
});

const getAllCourses = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, courseFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await CourseService.getAllCourses(filters, paginationOptions);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Courses fetched successfully!",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  // const token = req.headers.authorization;
  // let verifiedUser = null;
  // verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret)

  // if(!token){
  //   const result = await CourseService.getSingleCourse(id, true);
  // }

  // const currentDate = new Date();
  //   const subscribed = await SubscriptionHistory.find({
  //     user_id,
  //     course_id: id,
  //     expire_date: { $gte: currentDate },
  //   });

  //   if (!subscribed.length) {
  //     throw new ApiError(httpStatus.OK, "No subscription found!");
  //   }

  const result = await CourseService.getSingleCourse(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course fetched successfully!",
    data: result,
  });
});

const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.updateCourse(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course updated in successfully!",
    data: result,
  });
});
const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseService.deleteCourse(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course deleted in successfully!",
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
