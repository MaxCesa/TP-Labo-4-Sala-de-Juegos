import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { of, Subscription, timer } from 'rxjs';
import { collection, addDoc, Firestore } from '@angular/fire/firestore';
import confetti from 'canvas-confetti';
import { Score } from '../../../services/score';

interface Coordenada {
  x: number;
  y: number;
}

interface Celda {
  minasVecinas: number;
  esMina: boolean;
  estaRevelada: boolean;
  estaMarcada: boolean;
}

const direcciones = [
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
];

@Component({
  selector: 'app-buscaminas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buscaminas.component.html',
  styleUrl: './buscaminas.component.scss',
})
export class BuscaminasComponent {
  public ancho: number = 0;
  public alto: number = 0;
  public cantidadMinas: number = 0;
  public campo: Array<Array<Celda>> = [];
  public coordenadas: Coordenada[] = [];
  public celdasMarcadas: number = 0;
  public minasBienMarcadas: number = 0;
  public empezoElJuego: boolean = false;
  public subscribeTimer: number = 0;
  public puntaje: number = 0;
  private timerSubscription!: Subscription;
  public terminoElJuego: boolean = false;
  afs = inject(Firestore);
  perdiste: boolean = false;
  ganaste: boolean = false;
  @ViewChild('campo', { static: false })
  container!: ElementRef;

  constructor(private renderer: Renderer2) {}

  generarCampo(altura: number, anchura: number, cantidadDeMinas: number) {
    this.empezoElJuego = true;
    this.alto = altura;
    this.ancho = anchura;
    this.cantidadMinas = cantidadDeMinas;
    for (let i = 0; i < this.alto; i++) {
      const fila: Celda[] = [];
      for (let j = 0; j < this.ancho; j++) {
        fila.push({
          esMina: false,
          estaRevelada: false,
          minasVecinas: 0,
          estaMarcada: false,
        });
      }
      this.campo.push(fila);
    }
    this.minarCampo();
  }

  minarCampo() {
    let cantidadMinasActuales = 0;
    while (cantidadMinasActuales < this.cantidadMinas) {
      const fila = Math.floor(this.alto * Math.random());
      const col = Math.floor(this.ancho * Math.random());

      if (!this.campo[fila][col].esMina) {
        this.campo[fila][col].esMina = true;
        this.coordenadas.push({ x: fila, y: col });
        cantidadMinasActuales++;
      }
    }
    for (const { x, y } of this.coordenadas) {
      for (let i = 0; i < direcciones.length; i++) {
        const [dirX, dirY] = direcciones[i];
        const nuevaX = x + dirX;
        const nuevaY = y + dirY;
        if (
          nuevaX >= 0 &&
          nuevaX < this.alto &&
          nuevaY >= 0 &&
          nuevaY < this.ancho /*&&
            this.campo[nuevaX][nuevaY].minasVecinas >= 0*/
        ) {
          this.campo[nuevaX][nuevaY].minasVecinas++;
        }
      }
    }
    this.subscribeTimer = 0;
    this.observableTimer();
  }

  observableTimer() {
    const source = timer(0, 1000);
    this.timerSubscription = source.subscribe(() => {
      this.subscribeTimer += 1;
    });
  }

  resetTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.subscribeTimer = 0;
    this.observableTimer();
  }

  clickIzquierdo(x: number, y: number) {
    console.log(this.campo[x][y]);
    this.campo[x][y].estaRevelada = true;
    if (this.campo[x][y].esMina) {
      return this.perder();
    }

    if (this.campo[x][y].minasVecinas === 0) {
      const aux = [[x, y]];
      const visitadas = new Set<string>();

      while (aux.length > 0) {
        const [actualX, actualY] = aux.pop()!;
        this.campo[actualX][actualY].estaRevelada = true;
        visitadas.add(JSON.stringify([actualX, actualY]));
        if (this.campo[actualX][actualY].minasVecinas > 0) {
          continue;
        }
        for (const [dx, dy] of direcciones) {
          const siguienteX = actualX + dx;
          const siguienteY = actualY + dy;

          if (
            siguienteX >= 0 &&
            siguienteX < this.alto &&
            siguienteY >= 0 &&
            siguienteY < this.ancho &&
            this.campo[siguienteX][siguienteY].minasVecinas >= 0 &&
            !visitadas.has(JSON.stringify([siguienteX, siguienteY]))
          ) {
            aux.push([siguienteX, siguienteY]);
          }
        }
      }
    }
  }

  clickDerecho(event: any, x: number, y: number) {
    event.preventDefault();
    const celdaAux = this.campo[x][y];
    if (this.campo[x][y].estaMarcada) {
      this.celdasMarcadas--;
    } else {
      this.celdasMarcadas++;
    }
    if (!celdaAux.estaMarcada && celdaAux.esMina) {
      this.minasBienMarcadas++;
    }
    if (celdaAux.estaMarcada && celdaAux.esMina) {
      this.minasBienMarcadas--;
    }
    this.campo[x][y].estaMarcada = !this.campo[x][y].estaMarcada;

    if (
      this.minasBienMarcadas == this.cantidadMinas &&
      this.celdasMarcadas == this.cantidadMinas
    ) {
      this.ganar();
    }
  }

  perder() {
    this.timerSubscription.unsubscribe();
    this.perdiste = true;
    this.coordenadas.forEach((coordenada) => {
      this.campo[coordenada.x][coordenada.y].estaRevelada = true;
    });
  }
  ganar() {
    if (!this.perdiste) {
      this.puntaje = this.puntuacion();
      this.ganaste = true;
      this.timerSubscription.unsubscribe();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      var puntajesBuscaminas = collection(this.afs, 'puntajesBuscaminas');

      var nuevoPuntaje: Score = {
        nombre: localStorage.getItem('user') || 'Guest',
        fecha: new Date(),
        puntaje: this.puntuacion(),
      };

      addDoc(puntajesBuscaminas, nuevoPuntaje);
    }
  }

  puntuacion() {
    let puntuacion = 200 / Math.sqrt(this.subscribeTimer);
    switch (this.cantidadMinas) {
      case 10:
        break;
      case 40:
        puntuacion = 2 * puntuacion;
        break;
      case 99:
        puntuacion = 3 * puntuacion;
        break;
    }
    return parseInt(puntuacion.toFixed(2));
  }

  nuevoJuego() {
    this.empezoElJuego = false;
    const elements = document.querySelectorAll('.celda');
    elements.forEach((element) => {
      this.renderer.removeChild(element.parentNode, element);
    });
    this.cantidadMinas = 0;
    this.campo = [];
    this.coordenadas = [];
    this.celdasMarcadas = 0;
    this.minasBienMarcadas = 0;
    this.empezoElJuego = false;
    this.perdiste = false;
    this.ganaste = false;
    this.puntaje = 0;
    this.subscribeTimer = 0;
  }
}
