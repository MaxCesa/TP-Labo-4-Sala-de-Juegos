import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CountriesAPIService } from '../../../services/countries-api.service';
import { CommonModule } from '@angular/common';
import { Score } from '../../../services/score';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class PreguntadosComponent implements OnInit {
  perdiste: boolean = false;
  constructor(private countries: CountriesAPIService, private afs: Firestore) {}

  ngOnInit(): void {
    this.countries.todos().subscribe((banderas) => {
      console.info(banderas);
      this.misBanderas = banderas;
    });

    this.misPaises = this.countries.todos();
    this.cargarPregunta();
  }

  opcion1 = {
    img: '',
    nombre: '',
  };
  opcion2 = {
    img: '',
    nombre: '',
  };
  opcion3 = {
    img: '',
    nombre: '',
  };
  opcion4 = {
    img: '',
    nombre: '',
  };

  correcto: number = 0;
  misBanderas: any[] | undefined;
  misPaises: Observable<any> | undefined;
  bandera: string = '';
  contadorCorrectas: number = 0;
  contadorIncorrectas: number = 0;

  cargarPregunta() {
    this.countries.todos().subscribe((t) => {
      var random = Math.floor(Math.random() * 200);

      this.opcion1.img = t[random + 12].flags.png;
      this.opcion1.nombre = t[random + 12].name.common;
      this.opcion2.img = t[random + 7].flags.png;
      this.opcion2.nombre = t[random + 7].name.common;
      this.opcion3.img = t[random + 21].flags.png;
      this.opcion3.nombre = t[random + 21].name.common;
      this.opcion4.img = t[random + 32].flags.png;
      this.opcion4.nombre = t[random + 32].name.common;

      this.correcto = Math.floor(Math.random() * 4);

      switch (this.correcto) {
        case 0:
          this.bandera = this.opcion1.nombre;
          break;
        case 1:
          this.bandera = this.opcion2.nombre;
          break;
        case 2:
          this.bandera = this.opcion3.nombre;
          break;
        case 3:
          this.bandera = this.opcion4.nombre;
          break;
      }

      console.log(this.bandera);
    });
  }

  preguntaRespondida(respuesta: number) {
    if (this.correcto == respuesta) {
      this.contadorCorrectas++;
    } else {
      this.perder();
    }
    this.cargarPregunta();
  }

  perder() {
    this.perdiste = true;
    if (this.contadorCorrectas > 0) {
      var puntajesPreguntados = collection(this.afs, 'puntajesPreguntados');

      var nuevoPuntaje: Score = {
        nombre: localStorage.getItem('user') || 'Guest',
        fecha: new Date(),
        puntaje: this.contadorCorrectas,
      };
      addDoc(puntajesPreguntados, nuevoPuntaje);
    }
  }

  reiniciar() {
    this.perdiste = false;
    this.contadorCorrectas = 0;
  }

  buscarPais(nombre: string) {
    this.countries
      .pais(nombre)
      .subscribe((t) => (this.bandera = t[0].flags.png));
  }
}
