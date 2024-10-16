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
  afs = inject(Firestore);
  constructor() {}

  ngOnInit(): void {
    var cartaAzar = Math.trunc(Math.random() * 52);
    this.numeroAnterior = cartaAzar % 14;
    this.right = 225 * (cartaAzar % 14);
    this.bottom = Math.trunc(cartaAzar / 14) * 315;
  }

  getSpriteStyle = function (id: number) {
    var palo = Math.trunc(id / 14);
    console.log(
      'background-position: ' + 225 * (id % 14) + ' ' + palo * 315 + 'px;'
    );
    return 'background-position: ' + 225 * (id % 14) + ' ' + palo * 315 + 'px;';
  };

  apuestaMayor() {
    var cartaAzar = Math.trunc(Math.random() * 52);
    if (this.numeroAnterior <= cartaAzar % 14) {
      this.aciertos++;
    } else {
      this.perdio();
    }
    this.numeroAnterior = cartaAzar % 14;
    this.right = 225 * (cartaAzar % 14);
    this.bottom = Math.trunc(cartaAzar / 14) * 315;
  }

  apuestaMenor() {
    var cartaAzar = Math.trunc(Math.random() * 52);
    if (this.numeroAnterior >= cartaAzar % 14) {
      this.aciertos++;
    } else {
      this.perdio();
    }
    this.right = 225 * (cartaAzar % 14);
    this.numeroAnterior = cartaAzar % 14;
    cartaAzar % 14 == this.numeroAnterior;
  }

  perdio() {
    if (this.aciertos > 0) {
      var puntajesMayorMenor = collection(this.afs, 'puntajesMayorMenor');

      var nuevoPuntaje: Score = {
        nombre: localStorage.getItem('user') || 'Guest',
        fecha: new Date(),
        puntaje: this.aciertos,
      };

      addDoc(puntajesMayorMenor, nuevoPuntaje);
    }
    alert('¡Perdiste! Tu racha fue de ' + this.aciertos.toString());
    this.aciertos = 0;
  }

  cartaRandom() {
    var carta: HTMLDivElement = document.getElementsByClassName(
      'carta'
    )[0] as HTMLDivElement;
    var cartaAzar = Math.trunc(Math.random() * 52);
    this.right = 225 * (cartaAzar % 14);
    this.bottom = Math.trunc(cartaAzar / 14) * 315;
    this.numeroAnterior = cartaAzar % 14;
  }
}
