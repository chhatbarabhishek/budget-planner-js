import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions = [];
  newTransaction = {
    description: '',
    amount: '',
    category: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  };
  filterType = 'all';

  constructor(private budgetService: BudgetService) {}

  ngOnInit() {
    this.updateTransactions();
  }

  addTransaction() {
    const amount = parseFloat(this.newTransaction.amount);
    if (this.newTransaction.description && !isNaN(amount) && this.newTransaction.category) {
      const transaction = new Transaction(
        Date.now(),
        this.newTransaction.description,
        amount,
        this.newTransaction.category,
        new Date(this.newTransaction.date),
        this.newTransaction.type
      );
      this.budgetService.addTransaction(transaction);
      this.updateTransactions();
      this.newTransaction = {
        description: '',
        amount: '',
        category: '',
        type: 'expense',
        date: new Date().toISOString().split('T')[0]
      };
    }
  }

  removeTransaction(id) {
    this.budgetService.removeTransaction(id);
    this.updateTransactions();
  }

  getFilteredTransactions() {
    return this.transactions.filter(t => {
      if (this.filterType === 'all') return true;
      return t.type === this.filterType;
    });
  }

  private updateTransactions() {
    this.transactions = this.budgetService.transactions;
  }
}

