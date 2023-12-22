import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Course } from "../course/course.model";
import { IBook, IBookFilters } from "./book.interface";
import { Book } from "./book.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { bookSearchableFields } from "./book.constants";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";
import { IGenericResponse } from "../../../interfaces/common";
import { IUploadFile } from "../../../interfaces/file";
import { Request } from "express";
import { FileUploadHelper } from "../../helpers/fileUploadHelper";

// create Book
const addBook = async (req: Request): Promise<IBook> => {
  // if the provided course_id have the course or not in db
  const { course_id } = req.body;
  if (course_id) {
    const course = await Course.findById(course_id);
    if (!course) {
      throw new ApiError(httpStatus.NOT_FOUND, "Course not found!");
    }
  }

  if (req.file) {
    const file = req.file as IUploadFile;
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);

    if (uploadedImage) {
      req.body.cover_page = uploadedImage.secure_url;
    }
  }

  const result = await Book.create(req.body);
  return result;
};

// get all Books
const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate("course_id");
  const total = await Book.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get single Book
const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found!");
  }

  return result;
};

// update Book
const updateBook = async (req: Request): Promise<IBook | null> => {
  // find book of given id
  const book = await Book.findById(req.params.id);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found!");
  }

  // if image is given, upload new, and delete old one
  if (req.file) {
    const file = req.file as IUploadFile;
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);

    if (uploadedImage) {
      req.body.cover_page = uploadedImage.secure_url;
    }
    if (book.cover_page) {
      // delete that book cover page from cloudinary
      FileUploadHelper.deleteFromCloudinary(book?.cover_page as string);
    }
  }

  // updating book
  const result = await Book.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });

  return result;
};

// delete Book
const deleteBook = async (id: string) => {
  const book = await Book.findById(id);

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found!");
  } else {
    if (book.cover_page) {
      // delete that book cover page from cloudinary
      FileUploadHelper.deleteFromCloudinary(book?.cover_page as string);
    }
  }

  // find and delete book in one operation
  const result = await Book.findByIdAndDelete(id);
  return result;
};

export const BookService = {
  addBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
