export interface IExam {
  name: string;
  description: string;
  total_marks: number;
  duration: string;
  cost: number;
  is_active: boolean;
  is_paid: boolean;
  course_id: string;
}
