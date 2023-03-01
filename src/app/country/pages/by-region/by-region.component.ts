import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  styles: [
    `
      button {
        margin-right: 5px;
      }
    `
  ]
})
export class ByRegionComponent {

  regions: string[] = ['EU','EFTA','CARICOM','PA','AU','USAN','EEU','AL','ASEAN','CAIS','CEFTA','NAFTA','SAARC'];
  regionActive: string = '';
  countries: Country[] = [];

  constructor(
    private readonly countryService: CountryService
  ) {}

  // metodo para la clase de los buttons
  getClassCSS( region: string ): string {
    return (region === this.regionActive ) 
      ? 'btn btn-primary'
      : 'btn btn-outline-primary';
  }

  activateRegion( region: string ) {

    if(region === this.regionActive) return;

    this.regionActive = region;
    this.countries = [];

    this.countryService.searchRegion( region )
    .subscribe({ 
      next: (resp) => {
      // console.log(resp)
      this.countries = resp;
    }, error: (e) => {
      this.countries = [];
    }});
  }

}
