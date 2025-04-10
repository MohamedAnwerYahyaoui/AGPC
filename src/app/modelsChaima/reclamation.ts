import { Employee } from "./employee";

export interface Reclamation {
    id?: number | null;
    comment: string;
    employee: Employee;
    file?: File; // Optional file for upload
    fileUrl?: string | null;
    fileName?: string;
}