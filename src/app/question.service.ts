import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Question } from './models';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private selectedQuestionIndices: Set<number> = new Set<number>();

  constructor(private http: HttpClient) {}

  getQuestions(
    fileNames: string[],
    amount: number
  ): Observable<Question[]> {
    const observables: Observable<string>[] = [];
  
    for (const fileName of fileNames) {
      observables.push(this.http.get(`assets/${fileName}.txt`, { responseType: 'text' }));
    }
  
    return forkJoin(observables).pipe(
      map((fileContents: string[]) => {
        const selectedQuestions: Question[] = [];
  
        for (let i = 0; i < fileNames.length; i++) {
          const category = this.extractCategory(fileNames[i]);
          const allLines = fileContents[i].split('\n').filter(line => line.trim() !== '');
          const requestedAmount = Math.min(amount, allLines.length);
          const shuffledLines = this.shuffleArray(allLines);
  
          for (let j = 0; j < requestedAmount; j++) {
            const [text] = shuffledLines[j].split('|');
            const question: Question = {
              text,
              category,
            };
            selectedQuestions.push(question);
          }
        }
  
        return selectedQuestions;
      })
    );
  }
  
  private extractCategory(fileName: string): string {
    return fileName.replace('.txt', '');
  }
  

  clearSelectedQuestionIndices() {
    this.selectedQuestionIndices.clear();
  }

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
