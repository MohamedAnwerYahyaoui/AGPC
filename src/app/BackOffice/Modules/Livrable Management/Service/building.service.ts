import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Building3DData} from "../Model/building3d-data.model";
import {BuildingModel} from "../Model/building.model";

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  private apiUrl =  'http://localhost:8086/livra/model';

  constructor(private http: HttpClient) { }

  generate3DModel(model: BuildingModel): Observable<Building3DData> {
    return this.http.post<Building3DData>(this.apiUrl, model);
  }




}