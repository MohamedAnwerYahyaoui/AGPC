import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {User} from "../Model/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8086/livra/user';


  constructor(private http: HttpClient) {
  }
/*
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }
*/
getUsers(): Observable<User[]> {
  return this.http.get<User[]>(`${this.apiUrl}/all`).pipe(
    catchError((error: any) => {
      console.error('Erreur lors du chargement des utilisateurs:', error);
      return throwError(() => error);
    })
  );
}

}