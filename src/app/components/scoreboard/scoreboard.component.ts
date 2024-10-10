import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  query,
  orderBy,
  limit,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Score {
  fecha: string;
  nombre: string;
  puntaje: number;
}

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.scss',
})
export class ScoreboardComponent implements OnInit {
  mayorMenorLeaderboard: Score[] = [];
  preguntadosLeaderboard: Score[] = [];
  buscaminasLeaderboard: Score[] = [];
  ahorcadoLeaderboard: Score[] = [];

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.getMayorMenorScores();
    this.getPreguntadosScores();
    this.getbuscaminasScores();
    this.getAhorcadoScores();
  }

  getMayorMenorScores(): void {
    const mayorMenorCollection = collection(
      this.firestore,
      'puntajesMayorMenor'
    );
    const top20MayorMenorQuery = query(
      mayorMenorCollection,
      orderBy('puntaje', 'desc'),
      limit(20)
    );
    collectionData(top20MayorMenorQuery, { idField: 'id' }).subscribe(
      (data: any) => {
        this.mayorMenorLeaderboard = this.sortScores(data);
      }
    );
  }

  getPreguntadosScores(): void {
    const preguntadosCollection = collection(
      this.firestore,
      'puntajesPreguntados'
    );
    const top20PreguntadosQuery = query(
      preguntadosCollection,
      orderBy('puntaje', 'desc'),
      limit(20)
    );
    collectionData(top20PreguntadosQuery, { idField: 'id' }).subscribe(
      (data: any) => {
        this.preguntadosLeaderboard = this.sortScores(data);
      }
    );
  }

  getbuscaminasScores(): void {
    const buscaminasCollection = collection(
      this.firestore,
      'puntajesBuscaminas'
    );
    const top20BuscaminasQuery = query(
      buscaminasCollection,
      orderBy('puntaje', 'desc'),
      limit(20)
    );
    collectionData(top20BuscaminasQuery, { idField: 'id' }).subscribe(
      (data: any) => {
        this.buscaminasLeaderboard = this.sortScores(data);
      }
    );
  }

  getAhorcadoScores(): void {
    const ahorcadoCollection = collection(this.firestore, 'puntajesAhorcado');
    const top20AhorcadoQuery = query(
      ahorcadoCollection,
      orderBy('puntaje', 'desc'),
      limit(20)
    );
    collectionData(top20AhorcadoQuery, { idField: 'id' }).subscribe(
      (data: any) => {
        this.ahorcadoLeaderboard = this.sortScores(data);
      }
    );
  }

  // Sort scores by 'puntaje' in descending order
  sortScores(data: any[]): Score[] {
    return data.map((doc) => ({
      fecha: doc.fecha,
      nombre: doc.nombre,
      puntaje: doc.puntaje,
    }));
  }

  showTab(tabId: string): void {
    // Remove active class from all tab links and tab panes
    const tabs = document.querySelectorAll('.tab-link');
    const panes = document.querySelectorAll('.tab-pane');

    tabs.forEach((tab) => tab.classList.remove('active'));
    panes.forEach((pane) => pane.classList.remove('active'));

    // Add active class to the clicked tab and corresponding pane
    document.getElementById(tabId)?.classList.add('active');
  }
}
