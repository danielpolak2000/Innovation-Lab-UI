import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';

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

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.questionService.getQuestions().subscribe((data: string) => {
      // Parse the data into JSON
      this.questions = data.split('\n').map((line) => {
        const [text, min, max] = line.split('|');
        return { text, min: parseInt(min), max: parseInt(max) };
      });
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

  submitAnswer(score: number) {
    this.quizResults.push({ text: this.currentQuestion.text, score });
    this.totalScore += score;
    this.currentQuestionIndex++;
    this.loadQuestion();
  }

  restartQuiz() {
    this.showQuestion = false;
    this.showResult = false;
    this.currentQuestionIndex = 0;
    this.quizResults = [];
    this.totalScore = 0;
  }
}
