import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Country } from './country';

@Injectable({
  providedIn: 'root'
})
export class CountriesAPIService {

  api: string = 'https://restcountries.com/v3.1/';

  constructor(private httpClient:HttpClient) { }

  imagenPais:string = "";

  getCountries():Observable<any>{
    return this.httpClient.get<Country>("https://restcountries.com/v2/name/arg?fields=name,flags");
  }

  todos(): Observable<any> {
    return this.httpClient.get(this.api + 'all');
    
  }

  pais(nombrePais:string): Observable<any>{
    return this.httpClient.get(this.api +'name/' + nombrePais);
    
  }


}
