import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{Chantier} from '../models/Chantier';
import { Zones } from '../models/Zones';
import { User } from '../models/User';
import { Observable } from 'rxjs';

const url=["http://localhost:8086/environnement/"]


@Injectable({
  providedIn: 'root'
})
export class ChantierService {

  constructor(private http: HttpClient) { }



  getChantier(): Observable<Chantier[]> {
    return this.http.get<Chantier[]>(url+"environnement/Chantier/getAll");
  }

  addChantier(chantier:Chantier) : Observable<Chantier> {
    return this.http.post<Chantier>(url+"environnement/Chantier/AddChantier",chantier);
  }

  getChantierById(id:number): Observable<Chantier> {
    return this.http.get<Chantier>(url+"environnement/Chantier/GetbyId/"+id);
  }


  updateChantier(id:number,budget:Chantier): Observable<Chantier> {
    return this.http.put<Chantier>(url+"environnement/Chantier/UpdateChantier/"+id,budget);
  }





  deleteChantier(id:number): Observable<any> {
    return this.http.delete(url+"environnement/Chantier/DeleteChantier/"+id);
  }




  //Zones

  getZone(): Observable<Zones[]> {
    return this.http.get<Zones[]>(url+"environnement/Zones/GetAllZones");
  }

  addZone(chantier:Zones) : Observable<Zones> {
    return this.http.post<Zones>(url+"environnement/Zones/AddZones",chantier);
  }

  getZoneById(id:number): Observable<Zones> {
    return this.http.get<Zones>(url+"environnement/Zones/GetById/"+id);
  }


  updateZone(id:number,budget:Zones): Observable<Zones> {
    return this.http.put<Zones>(url+"environnement/Zones/UpdateZones/"+id,budget);
  }





  deleteZone(id:number): Observable<any> {
    return this.http.delete(url+"environnement/Zones/DeleteZones/"+id);
  }


  //use
  getUser(): Observable<User[]> {
    return this.http.get<User[]>(url+"environnement/user/all");
  }

}