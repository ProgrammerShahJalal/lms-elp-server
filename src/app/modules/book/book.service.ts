import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Course } from "../course/course.model";
import { IBook } from "./book.interface";
import { Book } from "./book.model";

// create Book
const createBook = async (payload: IBook): Promise<IBook> => {
  // if the provided course_id have the course or not in db
  const { course_id } = payload;
  if (course_id) {
    const course = await Course.findById(course_id);
    if (!course) {
      throw new ApiError(httpStatus.NOT_FOUND, "Course not found!");
    }
  }

  const result = await Book.create(payload);

  return result;
};

// get all Books
const getAllBooks = async (): Promise<IBook[]> => {
  const result = await Book.find({});

  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "No book found!");
  }
  return result;
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
const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const result = await Book.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

// delete Book
const deleteBook = async (id: string) => {
  const result = await Book.findByIdAndDelete(id);
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
