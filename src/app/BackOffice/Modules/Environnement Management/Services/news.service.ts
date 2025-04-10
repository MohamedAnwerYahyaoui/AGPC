import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiKey = '7c72b6ff2ad4470eb65efcd65086dfd0'; // Replace with your NewsAPI key
  private apiUrl = `https://newsapi.org/v2/everything`;

  constructor(private http: HttpClient) { }

  getConstructionNews(): Observable<any> {
    const params = {
      q: 'construction',
      apiKey: this.apiKey,
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: 10 // Limit the number of articles to 10
    };
    return this.http.get<any>(this.apiUrl, { params });
  }
}