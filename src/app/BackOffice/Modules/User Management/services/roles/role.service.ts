import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleRecord } from '../../models/role-record';
import { Observable } from 'rxjs';
import { RoleDTO } from '../../models/role-dto';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl = 'http://localhost:8081/um/roles';

  constructor(private http: HttpClient) { }

  createRole(role: RoleRecord): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, role);
  }

  getAllRoles(): Observable<RoleDTO[]> {
    return this.http.get<RoleDTO[]>(`${this.apiUrl}/all`);
  }

  deleteRole(roleName: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${roleName}`);
  }
}
