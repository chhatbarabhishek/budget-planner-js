import { Component, OnInit } from '@angular/core';
import { BudgetService, Transaction } from '../../services/budget.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  recentTransactions = [];
  goals = [];

  constructor(private budgetService: BudgetService, private router: Router) {}

  ngOnInit() {
    this.updateData();
  }

  private updateData() {
    this.recentTransactions = this.budgetService.transactions.slice(-5);
    this.goals = this.budgetService.goals.slice(0, 3);
  }

  getRecentTransactions() {
    return this.recentTransactions;
  }
}

