import { Injectable } from '@angular/core';

export class Transaction {
  constructor(id, description, amount, category, date, type) {
    this.id = id;
    this.description = description;
    this.amount = amount;
    this.category = category;
    this.date = date;
    this.type = type;
  }
}

export class BudgetCategory {
  constructor(category, limit, spent) {
    this.category = category;
    this.limit = limit;
    this.spent = spent;
  }
}

export class SavingsGoal {
  constructor(id, name, targetAmount, currentAmount, deadline, icon) {
    this.id = id;
    this.name = name;
    this.targetAmount = targetAmount;
    this.currentAmount = currentAmount;
    this.deadline = deadline;
    this.icon = icon;
  }
}

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  constructor() {
    this.transactions = [];
    this.budgets = [
      new BudgetCategory('Food', 200, 150),
      new BudgetCategory('Transport', 100, 80),
      new BudgetCategory('Entertainment', 150, 120)
    ];
    this.goals = [
      new SavingsGoal(1, 'Laptop', 50000, 12000, new Date('2025-06-01'), '💻')
    ];
    this.loadData();
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
    if (transaction.type === 'expense') {
      this.updateBudgetSpent(transaction.category, transaction.amount);
    }
    this.saveData();
  }

  removeTransaction(id) {
    const transaction = this.transactions.find(t => t.id === id);
    if (transaction && transaction.type === 'expense') {
      this.updateBudgetSpent(transaction.category, -transaction.amount);
    }
    this.transactions = this.transactions.filter(t => t.id !== id);
    this.saveData();
  }

  updateBudgetLimit(category, newLimit) {
    const budget = this.budgets.find(b => b.category === category);
    if (budget) {
      budget.limit = newLimit;
      this.saveData();
    }
  }

  addBudgetCategory(category, limit) {
    this.budgets.push(new BudgetCategory(category, limit, 0));
    this.saveData();
  }

  updateBudgetSpent(category, amount) {
    const budget = this.budgets.find(b => b.category === category);
    if (budget) {
      budget.spent += amount;
      this.saveData();
    }
  }

  addGoalProgress(goalId, amount) {
    const goal = this.goals.find(g => g.id === goalId);
    if (goal) {
      goal.currentAmount += amount;
      this.saveData();
    }
  }

  get transactions() {
    return this.transactions.slice();
  }

  get budgets() {
    return this.budgets.slice();
  }

  get goals() {
    return this.goals.slice();
  }

  private saveData() {
    localStorage.setItem('budget_transactions', JSON.stringify(this.transactions));
    localStorage.setItem('budget_budgets', JSON.stringify(this.budgets));
    localStorage.setItem('budget_goals', JSON.stringify(this.goals));
  }

  private loadData() {
    const savedTransactions = localStorage.getItem('budget_transactions');
    if (savedTransactions) {
      this.transactions = JSON.parse(savedTransactions).map(t => Object.assign(new Transaction(), t));
    }
    const savedBudgets = localStorage.getItem('budget_budgets');
    if (savedBudgets) {
      this.budgets = JSON.parse(savedBudgets).map(b => Object.assign(new BudgetCategory(), b));
    }
    const savedGoals = localStorage.getItem('budget_goals');
    if (savedGoals) {
      this.goals = JSON.parse(savedGoals).map(g => Object.assign(new SavingsGoal(), g));
    }
  }
}

