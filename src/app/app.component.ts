import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from './question.service';
import { QuestionPageComponent } from './question-page/question-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showQuestion = false;
  showResult = false;
  questions: any[] = []; 
  currentQuestionIndex = 0;
  currentQuestion: any;
  quizResults: any[] = [];
  totalScore = 0;
  @ViewChild(QuestionPageComponent) questionPageComponent: QuestionPageComponent | undefined;
  private processedCategories: Set<string> = new Set<string>();

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.questionService.getQuestions(["Extraversion", "Gewissenhaftigkeit", "Neurotizismus", "Offenheit", "Sicherheitsmotiv"], 1).subscribe((data: { text: string}[]) => {
      this.questions = data;
    });
  }

  startQuiz() {
    this.showQuestion = true;
    this.showResult = false;
    this.loadQuestion();
  }

  loadQuestion() {
    if (this.currentQuestionIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    } else {
      this.showQuestion = false;
      this.showResult = true;
    }
  }

  submitAnswer() {
    const question = this.questionPageComponent?.question;
    //console.log(this.processedCategories)
  
    if (question && !this.processedCategories.has(question.category)) {
      const { text, category } = question;
      const sliderValue = this.questionPageComponent?.sliderValue || 0;
      const calculatedScore = this.calculateScore(category, sliderValue);
      
  
      this.quizResults.push({ text, category, score: calculatedScore });
      this.totalScore += calculatedScore;
      //console.log(this.totalScore)
      this.currentQuestionIndex++;
      this.loadQuestion();

      this.processedCategories.add(category);
    }
  }


  restartQuiz() {
    this.showQuestion = false;
    this.showResult = false;
    this.currentQuestionIndex = 0;
    this.quizResults = [];
    this.totalScore = 0;
  }

  private calculateScore(category: string, sliderValue: number): number {
    switch (category) {
      case 'Neurotizismus':
        switch (sliderValue) {
          case 0:
            return 1;
          case 1:
            return 0.75;
          case 2:
            return 0.25;
          case 3:
            return 0;
          default:
            return 0; 
        }
      case 'Gewissenhaftigkeit':
      case 'Sicherheitsmotiv':

        return this.calculateScore('Neurotizismus', sliderValue);
  
      case 'Extraversion':
      case 'Offenheit':
        switch (sliderValue) {
          case 0:
            return 0;
          case 1:
            return 0.25;
          case 2:
            return 0.75;
          case 3:
            return 1;
          default:
            return 0;
        }
  
      default:
        return 0; 
    }
  }

}
