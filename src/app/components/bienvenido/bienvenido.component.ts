import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css'],
  standalone: true,
})
export class BienvenidoComponent implements OnInit {
  puntajes = {
    ahorcado: {
      jugador: '',
      puntaje: 0,
    },
    mayorMenor: {
      jugador: '',
      puntaje: 0,
    },
    clicker: {
      jugador: '',
      puntaje: 0,
    },
    preguntados: {
      jugador: '',
      puntaje: 0,
    },
  };

  constructor(private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.obtenerMejorPuntajeAhorcado();
    this.obtenerMejorPuntajeClicker();
    this.obtenerMejorPuntajeMayorMenor();
    this.obtenerMejorPuntajePreguntados();
  }

  obtenerMejorPuntajeAhorcado() {
    var auxJugador = '';
    var auxPuntaje = -1;

    this.afs
      .collection('puntajesAhorcado')
      .valueChanges()
      .forEach((t) => {
        t.forEach((element: any) => {
          if (element.puntaje > auxPuntaje) {
            auxJugador = element.nombre.split('@')[0].replace('"', '');
            auxPuntaje = element.puntaje;
          }
        });
        this.puntajes.ahorcado.jugador = auxJugador;
        this.puntajes.ahorcado.puntaje = auxPuntaje;
      });
  }

  obtenerMejorPuntajeMayorMenor() {
    var auxJugador = '';
    var auxPuntaje = -1;

    this.afs
      .collection('puntajesMayorMenor')
      .valueChanges()
      .forEach((t) => {
        t.forEach((element: any) => {
          if (element.puntaje > auxPuntaje) {
            auxJugador = element.nombre.split('@')[0].replace('"', '');
            auxPuntaje = element.puntaje;
          }
        });
        this.puntajes.mayorMenor.jugador = auxJugador;
        this.puntajes.mayorMenor.puntaje = auxPuntaje;
      });
  }

  obtenerMejorPuntajeClicker() {
    var auxJugador = '';
    var auxPuntaje = -1;

    this.afs
      .collection('puntajesClicker')
      .valueChanges()
      .forEach((t) => {
        t.forEach((element: any) => {
          if (element.puntaje > auxPuntaje) {
            auxJugador = element.nombre.split('@')[0].replace('"', '');
            auxPuntaje = element.puntaje;
          }
        });
        this.puntajes.clicker.jugador = auxJugador;
        this.puntajes.clicker.puntaje = auxPuntaje;
      });
  }

  obtenerMejorPuntajePreguntados() {
    var auxJugador = '';
    var auxPuntaje = -1;

    this.afs
      .collection('puntajesPreguntados')
      .valueChanges()
      .forEach((t) => {
        t.forEach((element: any) => {
          if (element.puntaje > auxPuntaje) {
            auxJugador = element.nombre.split('@')[0].replace('"', '');
            auxPuntaje = element.puntaje;
          }
        });
        this.puntajes.preguntados.jugador = auxJugador;
        this.puntajes.preguntados.puntaje = auxPuntaje;
        console.log(this.puntajes);
      });
  }
}
