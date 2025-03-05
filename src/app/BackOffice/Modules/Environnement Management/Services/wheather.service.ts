import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '776a4872a3eb3d79757362a6c22687fd'; // Replace with your API key
  private apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`);
  }
}
