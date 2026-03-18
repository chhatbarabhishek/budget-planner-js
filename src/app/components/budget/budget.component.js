import { Component, OnInit } from '@angular/core';
import { BudgetService, BudgetCategory } from '../../services/budget.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  budgets = [];
  showAddForm = false;
  newCategory = '';
  newLimit = '';
  editCategory = '';
  editLimit = 0;

  constructor(private budgetService: BudgetService) {}

  ngOnInit() {
    this.updateBudgets();
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.newCategory = '';
      this.newLimit = '';
    }
  }

  addBudgetCategory() {
    if (this.newCategory && !isNaN(parseFloat(this.newLimit))) {
      this.budgetService.addBudgetCategory(this.newCategory, parseFloat(this.newLimit));
      this.updateBudgets();
      this.toggleAddForm();
    }
  }

  updateBudgetLimit(category, currentLimit) {
    this.editCategory = category;
    this.editLimit = currentLimit;
  }

  saveBudgetLimit() {
    this.budgetService.updateBudgetLimit(this.editCategory, this.editLimit);
    this.updateBudgets();
    this.editCategory = '';
    this.editLimit = 0;
  }

  private updateBudgets() {
    this.budgets = this.budgetService.budgets;
  }
}

