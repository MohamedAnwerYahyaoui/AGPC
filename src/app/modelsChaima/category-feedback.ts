import { Employee } from './employee';

export interface CategoryFeedback {
  id: number;
  category: string;
  note: number;
  employee: Employee;
}
