import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { APPCONFIG } from '../app-config';
import { Dictionary } from '../interfaces/configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfService {

  private serviceUrl = `${APPCONFIG.baseUrl}/cfg/`;
  private regionsUrl = `${this.serviceUrl}api/v1/Dictionaries/regions`;
  private segmentsUrl = `${this.serviceUrl}api/v1/Dictionaries/segments`;

  constructor(private http: HttpClient) { }

  regions: Dictionary[] = [];

  getRegions () : Observable<Dictionary[]>{
    return this.http.get<Dictionary[]>(this.regionsUrl);
  }
  getSegments () : Observable<Dictionary[]>{
    return this.http.get<Dictionary[]>(this.segmentsUrl);
  }
}
