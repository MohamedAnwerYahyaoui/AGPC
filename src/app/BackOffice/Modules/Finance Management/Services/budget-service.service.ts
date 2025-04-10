import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Budget } from '../models/Budget';
import { expences } from '../models/Expences';

const url=["http://localhost:8086/bm/"]

@Injectable({
  providedIn: 'root'
})
export class BudgetServiceService {

  constructor(private http: HttpClient) { }


//Budget


  getBudget(): Observable<Budget[]> {
    return this.http.get<Budget[]>(url+"finance/Budget/getAll");
  }

  addBudget(budget:Budget) : Observable<Budget> {
    return this.http.post<Budget>(url+"finance/Budget/AddBudget",budget);
  }

  getBudgetById(id:number): Observable<Budget> {
    return this.http.get<Budget>(url+"finance/Budget/GetBudget/"+id);
  }


  updateBudget(id:number,budget:Budget): Observable<Budget> {
    return this.http.put<Budget>(url+"finance/Budget/UpdateBudget/"+id,budget);
  }

  //Taches
  getTaches(): Observable<any> {
    return this.http.get(url+"finance/Taches/all");
  }

  deleteBudget(id:number): Observable<any> {
    return this.http.delete(url+"finance/Budget/DeleteBudget/"+id);
  }
  //Expences



  getExpences(): Observable<expences[]> {
    return this.http.get<expences[]>(url+"finance/Expences/GetAllExpences");
  }

  addExpences(expences:expences) : Observable<expences> {
    return this.http.post<expences>(url+"finance/Expences/AddExpences",expences);
  }

updateExpences(id:number,expences:expences): Observable<expences> {
    return this.http.put<expences>(url+"finance/Expences/UpdateExpences/"+id,expences);
  }
  getExpencesById(id:number): Observable<expences> {
    return this.http.get<expences>(url+"finance/Expences/GetExpences/"+id);
  }
  deleteExpences(id:number): Observable<any> {
    return this.http.delete(url+"finance/Expences/Delete/"+id);
  }
  getExpencesByBudgetId(budgetId: number): Observable<expences[]> {
    return this.http.get<expences[]>(url+"finance/Expences/GetByIdBudget/"+budgetId);
  }

}