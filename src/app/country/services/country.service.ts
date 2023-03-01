import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl: string = 'https://restcountries.com/v2';

  get httpParams() {
    return new HttpParams()
    .set('fields', 'name,capital,alpha2Code,flag,population');
  }

  constructor(
    private http: HttpClient,
  ) { }

  searchCountry( term: string ): Observable<Country[]> {   
    const url = `${ this.apiUrl }/name/${ term }`;
    return this.http.get<Country[]>( url, { params: this.httpParams } );
  }

  searchCapital( term: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/capital/${ term }`;
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

  showCountryByCode( code: string ): Observable<Country> {
    const url = `${ this.apiUrl }/alpha/${ code }`;
    return this.http.get<Country>(url);
  }

  searchRegion( region: string ) : Observable<Country[]> {
    const url = `${ this.apiUrl }/regionalbloc/${ region }`;
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

}
