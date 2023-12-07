import { IQuizQuestion } from "./quiz-question.interface";
import { QuizQuestion } from "./quiz-question.model";

// registering user/student
const createQuizQuestion = async (
  payload: IQuizQuestion
): Promise<IQuizQuestion> => {
  const result = await QuizQuestion.create(payload);

  return result;
};

// get all quiz questions
const getAllQuizQuestions = async (): Promise<IQuizQuestion[]> => {
  const result = await QuizQuestion.find({});
  return result;
};

// get single quiz question
const getSingleQuizQuestion = async (
  id: string
): Promise<IQuizQuestion | null> => {
  const result = await QuizQuestion.findById(id);
  return result;
};

// update quiz question
const updateQuizQuestion = async (
  id: string,
  payload: Partial<IQuizQuestion>
): Promise<IQuizQuestion | null> => {
  const result = await QuizQuestion.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

// delete quiz question
const deleteQuizQuestion = async (id: string) => {
  const result = await QuizQuestion.findByIdAndDelete(id);
  return result;
};

export const QuizQuestionService = {
  createQuizQuestion,
  getAllQuizQuestions,
  getSingleQuizQuestion,
  updateQuizQuestion,
  deleteQuizQuestion,
};
