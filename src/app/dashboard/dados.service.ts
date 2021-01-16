import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DadosService {
  readonly dados = [
    ['Janeiro', 3500],
    ['Fevereiro', 2450],
    ['Março', 3300],
    ['Abril', 3680],
    ['Maio', 3950],
    ['Junho', 4208],
    ['Julho', 4000],
    ['Agosto', 5125],
    ['Setembro', 6573],
    ['Outubro', 7899],
    ['Novembro', 9000],
    ['Dezembro', 13215],
  ];

  constructor() {}

  obterDados(): Observable<any> {
    return new Observable((observer) => {
      observer.next(this.dados);
      observer.complete();
    });
  }
}
