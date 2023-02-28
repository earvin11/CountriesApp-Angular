import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital',
  templateUrl: './by-capital.component.html'
})
export class ByCapitalComponent {
  public term: string = '';
  public error: boolean = false;
  public countries: Country[] = [];

  constructor(
    private countryService: CountryService
  ) {}

  search( term: string ) {
    this.error = false
    this.term = term;

    this.countryService.searchCapital( this.term )
      .subscribe({ 
        next: (resp) => {
        // console.log(resp)
        this.countries = resp;
      }, error: (e) => {
        this.error = true;
        this.countries = [];
      }});
  }

  suggestions( term: string ) {
    this.error = false;
    //TODO: crar sugerencias
  }
}
