import { IQuestion } from "./question.interface";
import { Question } from "./question.model";

// registering user/student
const createQuestion = async (payload: IQuestion): Promise<IQuestion> => {
  const result = await Question.create(payload);

  return result;
};

// get all quiz questions
const getAllQuestions = async (): Promise<IQuestion[]> => {
  const result = await Question.find({});
  return result;
};

// get single quiz question
const getSingleQuestion = async (id: string): Promise<IQuestion | null> => {
  const result = await Question.findById(id);
  return result;
};

// update quiz question
const updateQuestion = async (
  id: string,
  payload: Partial<IQuestion>
): Promise<IQuestion | null> => {
  const result = await Question.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

// delete quiz question
const deleteQuestion = async (id: string) => {
  const result = await Question.findByIdAndDelete(id);
  return result;
};

export const QuestionService = {
  createQuestion,
  getAllQuestions,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
};
