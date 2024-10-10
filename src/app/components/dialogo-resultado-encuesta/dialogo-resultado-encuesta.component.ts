import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-resultado-encuesta',
  templateUrl: './dialogo-resultado-encuesta.component.html',
  styleUrls: ['./dialogo-resultado-encuesta.component.css']
})
export class DialogoResultadoEncuestaComponent implements OnInit {

  encuestas: any;

  resultados = {
    juegoFavorito: {
      preguntados: 0,
      ahorcado: 0,
      mayorMenor :0,
      clicker: 0
    },
    juegoMenosFavorito: {
      preguntados: 0,
      ahorcado: 0,
      mayorMenor :0,
      clicker: 0
    },
    recomendarias: {
      si: 0,
      no: 0
    }
  }

  async obtenerEncuestas()
  {
    await this.afs.collection('encuestas').valueChanges().forEach(t => {
      t.forEach((element: any) => {
        switch(element.pregunta1)
        {
          case 'preguntados':
            this.resultados.juegoFavorito.preguntados++;
            break;
          case 'ahorcado':
            this.resultados.juegoFavorito.ahorcado++;
            break;
          case 'mayorMenor':
            this.resultados.juegoFavorito.mayorMenor++;
            break;
          case 'clicker':
            this.resultados.juegoFavorito.clicker++;
            break;
        }
        switch(element.pregunta2)
        {
          case 'preguntados':
            this.resultados.juegoMenosFavorito.preguntados++;
            break;
          case 'ahorcado':
            this.resultados.juegoMenosFavorito.ahorcado++;
            break;
          case 'mayorMenor':
            this.resultados.juegoMenosFavorito.mayorMenor++;
            break;
          case 'clicker':
            this.resultados.juegoMenosFavorito.clicker++;
            break;
        }
        if(element.pregunta3 == "Si")
        {
          this.resultados.recomendarias.si++;
        }
        else
        {
          this.resultados.recomendarias.no++;
        }
        
      });});
    console.log(this.encuestas);
    alert("Hola");
  }

  constructor(public dialogRef: MatDialogRef<DialogoResultadoEncuestaComponent>, private afs: AngularFirestore) { }

  ngOnInit(): void {

    this.obtenerEncuestas();



  }


}
