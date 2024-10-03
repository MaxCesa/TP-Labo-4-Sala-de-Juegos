import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

@Injectable({
  providedIn: 'root',
})
export class PreguntadosService {
  api: string = 'https://opentdb.com/api.php?amount=10&type=multiple';
  httpClient = inject(HttpClient);
  constructor() {}

  public getQuestions(): Observable<{ results: TriviaQuestion[] }> {
    return this.httpClient.get<{ results: TriviaQuestion[] }>(this.api);
  }
}
