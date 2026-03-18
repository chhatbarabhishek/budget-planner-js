import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  @ViewChild('spendingChart') spendingChart!: ElementRef;
  budgets = [];
  transactions = [];
  categoryBreakdown = [];
  totalIncome = 0;
  totalExpenses = 0;
  netBalance = 0;
  chart = null;

  constructor(private budgetService: BudgetService) {}

  ngOnInit() {
    this.updateData();
  }

  ngAfterViewInit() {
    this.createChart();
  }

  private updateData() {
    this.budgets = this.budgetService.budgets;
    this.transactions = this.budgetService.transactions;
    
    this.categoryBreakdown = this.budgets.map(budget => ({
      category: budget.category,
      spent: budget.spent,
      limit: budget.limit,
      utilization: ((budget.spent / budget.limit) * 100).toFixed(1)
    }));

    const income = this.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = this.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    this.totalIncome = income;
    this.totalExpenses = expenses;
    this.netBalance = income - expenses;
    
    if (this.chart) {
      this.updateChart();
    }
  }

  private createChart() {
    const ctx = this.spendingChart.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.categoryBreakdown.map(item => item.category),
        datasets: [{
          data: this.categoryBreakdown.map(item => item.spent),
          backgroundColor: [
            '#10b981',
            '#f59e0b', 
            '#ef4444',
            '#3b82f6',
            '#8b5cf6',
            '#ec4899'
          ],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((context.parsed / total) * 100).toFixed(1);
                return `${context.label}: ₹${context.parsed.toLocaleString()} (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  }

  private updateChart() {
    if (this.chart) {
      this.chart.data.labels = this.categoryBreakdown.map(item => item.category);
      this.chart.data.datasets[0].data = this.categoryBreakdown.map(item => item.spent);
      this.chart.update();
    }
  }
}

