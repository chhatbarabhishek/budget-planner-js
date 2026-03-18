import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { BudgetComponent } from './components/budget/budget.component';
import { GoalsComponent } from './components/goals/goals.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { BudgetService } from './services/budget.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TransactionsComponent,
    BudgetComponent,
    GoalsComponent,
    AnalyticsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [BudgetService],
  bootstrap: [AppComponent]
})
export class AppModule { }

