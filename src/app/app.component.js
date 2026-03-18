import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Dashboard';
  currentDate = new Date();
  
  remainingBudget = 450;
  monthlyBudget = 1000;
  
  get budgetStatus() {
    const percentage = (this.remainingBudget / this.monthlyBudget) * 100;
    if (percentage > 50) return 'positive';
    if (percentage > 20) return 'warning';
    return 'negative';
  }
  
  get budgetStatusText() {
    if (this.budgetStatus === 'positive') return 'On Track';
    if (this.budgetStatus === 'warning') return 'Careful Spending';
    return 'Over Budget';
  }
}

