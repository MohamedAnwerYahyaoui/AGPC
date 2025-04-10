import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryFeedback } from '../modelsChaima/category-feedback';


@Injectable({
  providedIn: 'root'
})
export class CategoryFeedbackService {
  private apiUrl = 'http://localhost:8086/reclamation/category-feedbacks';

  constructor(private http: HttpClient) {}

  getUserFeedbacks(userId: number): Observable<CategoryFeedback[]> {
    return this.http.get<CategoryFeedback[]>(`${this.apiUrl}/user?userId=${userId}`);
  }

  createFeedback(feedback: CategoryFeedback): Observable<CategoryFeedback> {
    return this.http.post<CategoryFeedback>(this.apiUrl, feedback);
  }

  updateFeedback(feedback: CategoryFeedback): Observable<CategoryFeedback> {
    return this.http.put<CategoryFeedback>(this.apiUrl, feedback);
  }

  deleteFeedback(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAll(): Observable<CategoryFeedback[]> {
    return this.http.get<CategoryFeedback[]>(this.apiUrl);
  }

  getAverageRatings(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/averages`);
  }
  
}
