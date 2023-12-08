import { IExam } from "./exam.interface";
import { Exam } from "./exam.model";

// create exam
const createExam = async (payload: IExam): Promise<IExam> => {
  const result = await Exam.create(payload);

  return result;
};

// get all exams
const getAllExams = async (): Promise<IExam[]> => {
  const result = await Exam.find({});
  return result;
};

// get single exam
const getSingleExam = async (id: string): Promise<IExam | null> => {
  const result = await Exam.findById(id);
  return result;
};

// update exam
const updateExam = async (
  id: string,
  payload: Partial<IExam>
): Promise<IExam | null> => {
  const result = await Exam.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

// delete exam
const deleteExam = async (id: string) => {
  const result = await Exam.findByIdAndDelete(id);
  return result;
};

export const ExamService = {
  createExam,
  getAllExams,
  getSingleExam,
  updateExam,
  deleteExam,
};
