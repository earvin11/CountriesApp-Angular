import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styles: [`
    li: {
      cursor: pointer;
    }
  `]
})
export class ByCountryComponent {

  public term: string = '';
  public error: boolean = false;
  public countries: Country[] = [];

  public countriesSuggestions: Country[] = [];
  public showSuggestions: boolean = false;

  constructor(
    private countryService: CountryService
  ) {}

  search( term: string ) {
    this.error = false
    this.term = term;

    this.countryService.searchCountry( this.term )
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
    this.term = term;
    this.showSuggestions = true;
    
    this.countryService.searchCountry(term)
      .subscribe({ 
        next: countries => this.countriesSuggestions = countries.splice(0,5),
        error: error => this.countriesSuggestions = []
      });
  }

  searchSuggestion(term : string) {
    this.search(term);
  }
}
