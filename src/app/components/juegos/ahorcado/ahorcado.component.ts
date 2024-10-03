import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { collection, Firestore, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./ahorcado.component.scss'],
})
export class AhorcadoComponent implements OnInit {
  afs = inject(Firestore);
  constructor() {}
  @ViewChild('keypad', { static: true }) keypad!: ElementRef;
  ngOnInit(): void {}

  //--------------------------------------------------------------------------------------------------

  wins: number = 0;
  losses: number = 0;
  abortions: number = 0;
  gameInProcess: any;
  answer: any;
  maskedAnswer: any;
  wrongGuesses: any;
  masthead = document.querySelector('h1');
  labelState: string = 'hidden';

  commonWords = [
    'jirafa',
    'elefante',
    'perro',
    'ahora',
    'camioneta',
    'ahorcado',
    'edificio',
    'dinosaurio',
    'computadora',
    'programador',
    'escalera',
    'cuchillo',
    'zorro',
    'botella',
    'persona',
    'hormiga',
    'tejer',
    'transplante',
    'percha',
    'sorpresa',
    'adulto',
    'koala',
    'gobierno',
    'trenza',
    'tumba',
    'tanga',
    'gracias',
    'cabina',
    'escritor',
    'pintor',
    'muletas',
  ];

  newGame() {
    if (this.gameInProcess == true) {
      this.aborted();
    }
    this.labelState = 'hidden';
    this.enableAllButtons();
    this.gameInProcess = true;
    this.answer = this.newRandomWord();
    this.wrongGuesses = 0;
    this.maskedAnswer = [];
    for (var i of this.answer) this.maskedAnswer.push('_');
    this.updateDisplayWord();
    this.hang();
  }

  enableAllButtons() {
    // Find all buttons inside the container with id 'keypad'
    const buttons = this.keypad.nativeElement.querySelectorAll('button');

    // Loop through the buttons and disable them
    buttons.forEach((button: HTMLButtonElement) => {
      button.disabled = false;
    });
  }

  newRandomWord() {
    return this.commonWords[
      Math.floor(Math.random() * this.commonWords.length)
    ];
  }

  verifyGuess(letter: string, btn: HTMLButtonElement) {
    btn.disabled = true;
    if (String(this.answer).toLowerCase().includes(letter)) {
      for (var i in this.maskedAnswer) {
        if (this.answer[i] == letter) this.maskedAnswer[i] = this.answer[i];
      }
      this.updateDisplayWord();
      if (this.maskedAnswer.includes('_') == false) this.escaped();
    } else {
      this.wrongGuesses++;
      this.hang();
    }
  }

  updateDisplayWord() {
    var display = '';
    for (var i of this.maskedAnswer) display += i + ' ';
    display.slice(0, -1);
    document.querySelector('#guessing')!.textContent = display;
  }

  aborted() {
    this.abortions++;
    this.unhideAll('.abortions');
  }

  hang() {
    switch (this.wrongGuesses) {
      case 0:
        this.hideAll('svg *');
        break;
      case 1:
        this.unhideAll('.gallows');
        break;
      case 2:
        this.unhide('#head');
        break;
      case 3:
        this.unhide('#body');
        break;
      case 4:
        this.unhide('#left-arm');
        break;
      case 5:
        this.unhide('#right-arm');
        break;
      case 6:
        this.unhide('#left-leg');
        break;
      case 7:
        this.unhide('#right-leg');
        this.hanged();
        break;
      default:
        this.newGame();
    }
  }

  hanged() {
    //lost
    this.gameInProcess = false;
    this.labelState = 'lose';
    this.wins = 0;
    this.unhideAll('.losses');
    var display = '';
    for (var i of this.answer) display += i + ' ';
    display.slice(0, -1);
    document.querySelector('#guessing')!.textContent = display;

    var puntajesAhorcado = collection(this.afs, 'puntajesAhorcado');

    var nuevoPuntaje = {
      nombre: localStorage.getItem('user'),
      fecha: Date.now(),
      puntaje: this.wins,
    };

    addDoc(puntajesAhorcado, nuevoPuntaje);
  }

  escaped() {
    //won
    this.gameInProcess = false;
    this.wins++;
    this.newGame();
  }

  resetKeypad() {
    document
      .querySelectorAll('#keypad div')
      .forEach((i) => ((i as HTMLAnchorElement).innerText = ''));
    this.populateRow(1, 'QWERTYUIOP');
    this.populateRow(2, 'ASDFGHJKL');
    this.populateRow(3, 'ZXCVBNM');
  }

  populateRow(rowNumber: number, rowLetters: string) {
    for (let i of rowLetters) {
      let key = document.createElement('a');
      document
        .querySelector('#keypad--row' + rowNumber)!
        .insertAdjacentHTML(
          'beforeend',
          '<a #' +
            i.toLowerCase() +
            " (click) = 'verifyGuess(" +
            i.toLowerCase() +
            ".id)' >" +
            i +
            '</a>'
        );
    }
  }

  unhide(targetElement: any) {
    document.querySelector(targetElement).classList.toggle('hidden', false);
  }

  hideAll(targetElements: any) {
    document
      .querySelectorAll(targetElements)
      .forEach((i) => i.classList.toggle('hidden', true));
  }

  unhideAll(targetElements: any) {
    document
      .querySelectorAll(targetElements)
      .forEach((i) => i.classList.toggle('hidden', false));
  }
}
