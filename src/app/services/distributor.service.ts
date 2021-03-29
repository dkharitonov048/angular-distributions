import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Distributor, DistributorToAdd, PagedResponse } from '../interfaces/distributor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Dictionary } from '../interfaces/configuration';
import { APPCONFIG } from '../app-config';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DistributorService {

  private serviceUrl = `${APPCONFIG.baseUrl}/dtn/`;
  private distributorsUrl = `${this.serviceUrl}api/v1/Distributions`;
  private formsOfActivityUrl = `${this.serviceUrl}api/v1/Distributions/FormsOfActivity`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getToken()
      })
    }
  }

  getDistributors(pageSize: number, pageNumber: number): Observable<PagedResponse<Distributor>> {
    let url = `${this.distributorsUrl}?Page=${pageNumber}&Size=${pageSize}`;
    return this.http.get<PagedResponse<Distributor>>(url, this.getHttpOptions())
  }
  getFormsOfActivity(): Observable<Dictionary[]> {
    return this.http.get<Dictionary[]>(this.formsOfActivityUrl, this.getHttpOptions());
  }

  addDistrobutor(distributor: DistributorToAdd): Observable<Distributor>{
    console.log("post 1")
    return this.http.post<Distributor>(this.distributorsUrl, distributor, this.getHttpOptions()).pipe(
      catchError(this.handleError<any>()));
  }

  private handleError<T>() {
    return (error: any): Observable<T> => {
      console.log(error);
      // validation message
      if(error.status === 400){
        throw error.error.message;
      }
      throw error.message;
    };
  }
}
