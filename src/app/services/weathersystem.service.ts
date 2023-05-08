import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaseService } from "./base/base.service";
import { IGetVariablesQuery } from "../modals/weathersytem.modal";

@Injectable({
  providedIn: 'root'
})
export class WeatherSystemService extends BaseService{
  apiURL!: string;
  constructor(readonly http: HttpClient) {
      super();
      this.apiURL = this.api;
  }

  getHottestCity(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}GetHottestCity`, { headers: this.httpHeader })
    .pipe(
      map((response) => {
        return response;
      }),
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  getMoistestCity(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}GetMoistestCity`, { headers: this.httpHeader })
    .pipe(
      map((response) => {
        return response;
      }),
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  getVariables(modal: IGetVariablesQuery): Observable<any> {

    return this.http.post<any>(`${this.apiURL}GetVariables`, modal, { headers: this.httpHeader })
    .pipe(
      map((response) => {
        return response;
      }),
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }
}
