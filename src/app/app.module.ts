import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import { QuestionPageComponent } from './question-page/question-page.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { FooterComponent } from './footer/footer.component';
import { ExplanationComponent } from './explanation/explanation.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    QuestionPageComponent,
    ResultPageComponent,
    FooterComponent,
    ExplanationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
