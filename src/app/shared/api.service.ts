import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl="http://localhost:5000/"

  constructor(private http: HttpClient) { }

  getAllUser():Observable<any>{
    return this.http.get(this.baseUrl + 'users')
  }

  onRegister(data:any):Observable<any>{
    return this.http.post(this.baseUrl+'register', data);
  }

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          console.log('working')
        })
      );
  }
  createAnnualReport(data:any):Observable<any>{
    return this.http.post(this.baseUrl + 'annualProduct', data);
  }
  getAnnualReport():Observable<any>{
    return this.http.get<any>(this.baseUrl + 'annualreport');
  }
  getAnnualProduction():Observable<any>{
    return this.http.get(this.baseUrl+'categories');
  }
  createTrainRecort(data:any):Observable<any>{
    return this.http.post(this.baseUrl+'trains', data);
  }
  getAnnualRecort():Observable<any>{
    return this.http.get(this.baseUrl+ 'trains')
  }
}
