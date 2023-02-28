import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html',
  styles: [
  ]
})
export class CountryInputComponent implements OnInit{

  @Input()
  inputPlaceholder: string = '';

  // Decorator Output para declarar un evento a emitir propio de este component
  @Output()
  onEnter: EventEmitter<string> = new EventEmitter();
  @Output()
  onDebounce: EventEmitter<string> = new EventEmitter();

  // observable
  debouncer: Subject<string> = new Subject();

  term: string = '';

  // lifecycle component
  ngOnInit(): void {

    // pasados 300ms subscriibete al debouncer emite su valor
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe( value => {
      this.onDebounce.emit( value );
    });

  }

  // El search method hace que el component emita el evento onEnter enviando el this.term
  search() {
    this.onEnter.emit( this.term );
  }

  keyPress() {
    // envia el valor al subscribe del debouncer
    this.debouncer.next( this.term );
  }

}
