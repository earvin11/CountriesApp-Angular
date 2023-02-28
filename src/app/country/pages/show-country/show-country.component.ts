import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-show-country',
  templateUrl: './show-country.component.html'
})
export class ShowCountryComponent implements OnInit {

  country!: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
  ) {}

  ngOnInit(): void {

    // Suscribete a un observable para las rutas
    // chequea los params de la ruta activa
    // intercepta con el pipe y extrae el param id de la ruta y enviaselo al observador showCountryByCode
    // esto va a retornar el resultado del observable dentro del switchMap

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.countryService.showCountryByCode(id)),
        tap( console.log )
      )
      .subscribe( country => {
        this.country = country;
      })

    // this.activatedRoute.params
    //   .subscribe( ({ id }) => {

    //     this.countryService.showCountryByCode( id )
    //       .subscribe( country => {
    //         console.log(country);
    //       });
    //   })
  }


}
