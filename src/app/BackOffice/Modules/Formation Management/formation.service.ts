import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formation } from './models/formation';
import { Observable } from 'rxjs';





const url=["http://localhost:8087/micro3/"]


@Injectable({
  providedIn: 'root'
})
export class FormationService {

  constructor(private http:HttpClient) { }


  getFormation(): Observable<Formation[]> {
    return this.http.get<Formation[]>(url+"formation/GetAll");
  }

  addFormation(chantier:Formation) : Observable<Formation> {
    return this.http.post<Formation>(url+"formation/AddFormation",chantier);
  }

  getFormationById(id:number): Observable<Formation> {
    return this.http.get<Formation>(url+"formation/GetbyId/"+id);
  }


  updateChantier(id:number,budget:Formation): Observable<Formation> {
    return this.http.put<Formation>(url+"formation/UpdateFormation/"+id,budget);
  }





  deleteFormation(id:number): Observable<any> {
    return this.http.delete(url+"formation/DeleteFormation/"+id);
  }



}
