import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GanttDataService {
  private apiUrl = 'http://localhost:8086/livra/gantt';
  constructor(private http: HttpClient) { }

  getGanttData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}