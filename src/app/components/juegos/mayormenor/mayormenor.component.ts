import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { collection, Firestore, addDoc } from '@angular/fire/firestore';
import { Score } from '../../../services/score';

@Component({
  selector: 'app-mayormenor',
  templateUrl: './mayormenor.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./mayormenor.component.scss'],
})
export class MayormenorComponent implements OnInit {
  itemImageUrl: string = 'cartas.jpg';
  cartas: Array<number> = new Array();
  right: number = 0;
  bottom: number = 0;
  aciertos: number = 0;
  numeroAnterior: number = 0;
  perdiste = false;
  afs = inject(Firestore);
  constructor() {}

  ngOnInit(): void {
    var cartaAzar = Math.trunc(Math.random() * 52);
    this.numeroAnterior = cartaAzar % 13;
    this.right = 225 * (cartaAzar % 13);
    this.bottom = Math.trunc(cartaAzar / 13) * 315;
  }

  getSpriteStyle = function (id: number) {
    var palo = Math.trunc(id / 13);
    console.log(
      'background-position: ' + 225 * (id % 13) + ' ' + palo * 315 + 'px;'
    );
    return 'background-position: ' + 225 * (id % 13) + ' ' + palo * 315 + 'px;';
  };

  apuestaMayor() {
    var cartaAzar = Math.trunc(Math.random() * 52);
    var valorCarta = cartaAzar % 13;
    if (valorCarta == 0) {
      valorCarta = 13;
    }
    console.log(
      'Anterior:',
      this.numeroAnterior,
      'Nueva:',
      valorCarta,
      'Seleccion: Mayor'
    );
    if (this.numeroAnterior < valorCarta) {
      this.aciertos++;
    } else if (this.numeroAnterior > valorCarta) {
      this.perdio();
    }
    this.numeroAnterior = valorCarta;
    this.right = 225 * valorCarta;
    this.bottom = Math.trunc(cartaAzar / 13) * 315;
  }

  apuestaMenor() {
    var cartaAzar = Math.trunc(Math.random() * 52);
    var valorCarta = cartaAzar % 13;
    if (valorCarta == 0) {
      valorCarta = 13;
    }
    console.log(
      'Anterior:',
      this.numeroAnterior,
      'Nueva:',
      valorCarta,
      'Seleccion: Menor'
    );

    if (this.numeroAnterior > valorCarta) {
      this.aciertos++;
    } else if (this.numeroAnterior < valorCarta) {
      this.perdio();
    }
    this.right = 225 * valorCarta;
    this.numeroAnterior = valorCarta;
  }

  perdio() {
    this.perdiste = true;
    if (this.aciertos > 0) {
      var puntajesMayorMenor = collection(this.afs, 'puntajesMayorMenor');

      var nuevoPuntaje: Score = {
        nombre: localStorage.getItem('user') || 'Guest',
        fecha: new Date(),
        puntaje: this.aciertos,
      };

      addDoc(puntajesMayorMenor, nuevoPuntaje);
    }
  }

  nuevoJuego() {
    this.cartaRandom();
    this.aciertos = 0;
    this.perdiste = false;
  }

  cartaRandom() {
    var carta: HTMLDivElement = document.getElementsByClassName(
      'carta'
    )[0] as HTMLDivElement;
    var cartaAzar = Math.trunc(Math.random() * 52);
    this.right = 225 * (cartaAzar % 13);
    this.bottom = Math.trunc(cartaAzar / 13) * 315;
    this.numeroAnterior = cartaAzar % 13;
  }
}
