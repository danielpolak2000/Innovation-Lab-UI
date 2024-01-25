import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private selectedQuestionIndices: Set<number> = new Set<number>();

  constructor(private http: HttpClient) {}

  getQuestions(
    fileNames: string[],
    amount: number,
  ): Observable<{ text: string}[]> {
    const observables: Observable<string>[] = [];

    // Create an array of observables for each file
    for (const fileName of fileNames) {
      observables.push(this.http.get(`assets/${fileName}.txt`, { responseType: 'text' }));
    }

    return forkJoin(observables).pipe(
      map((fileContents: string[]) => {
        const selectedQuestions: { text: string}[] = [];

        for (const fileContent of fileContents) {
          const allLines = fileContent.split('\n').filter(line => line.trim() !== '');

          // Ensure that the requested amount is not more than the total number of lines
          const requestedAmount = Math.min(amount, allLines.length);

          // Shuffle the array to randomize the order
          const shuffledLines = this.shuffleArray(allLines);

          // Select the first 'requestedAmount' lines from each file
          for (let i = 0; i < requestedAmount; i++) {
            const [text] = shuffledLines[i].split('|');
            const question = {
              text
            };

            selectedQuestions.push(question);
          }
        }

        return selectedQuestions;
      })
    );
  }

  clearSelectedQuestionIndices() {
    this.selectedQuestionIndices.clear();
  }

  private shuffleArray(array: any[]): any[] {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
