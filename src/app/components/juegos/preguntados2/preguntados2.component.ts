import { Component, inject, OnInit } from '@angular/core';
import { PreguntadosService } from '../../../services/preguntados.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preguntados2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preguntados2.component.html',
  styleUrl: './preguntados2.component.scss',
})
export class Preguntados2Component implements OnInit {
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  selectedAnswer: string | null = null;
  triviaService = inject(PreguntadosService);
  constructor() {}

  ngOnInit(): void {
    this.triviaService.getQuestions().subscribe((data) => {
      this.questions = data.results;
    });
  }

  shuffledAnswers(questionIndex: number): string[] {
    const question = this.questions[questionIndex];
    const answers = [...question.incorrect_answers, question.correct_answer];
    return answers.sort(() => Math.random() - 0.5);
  }

  selectAnswer(answer: string): void {
    this.selectedAnswer = answer;
  }

  nextQuestion(): void {
    this.selectedAnswer = null;
    this.currentQuestionIndex++;
    console.log('puto');
    console.log(this.questions);
  }
}
