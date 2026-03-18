import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {
  goals = [];
  showAddForm = false;
  newGoal = {
    name: '',
    targetAmount: '',
    deadline: ''
  };
  editGoalId = null;
  editAmount = '';

  constructor(private budgetService: BudgetService) {}

  ngOnInit() {
    this.updateGoals();
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.newGoal = { name: '', targetAmount: '', deadline: '' };
    }
  }

  addGoal() {
    if (this.newGoal.name && !isNaN(parseFloat(this.newGoal.targetAmount))) {
      const goal = new SavingsGoal(
        Date.now(),
        this.newGoal.name,
        parseFloat(this.newGoal.targetAmount),
        0,
        new Date(this.newGoal.deadline),
        this.getIcon(this.newGoal.name)
      );
      this.budgetService.goals.push(goal);
      this.budgetService.saveData();
      this.updateGoals();
      this.toggleAddForm();
    }
  }

  addGoalProgress(goalId) {
    const amount = parseFloat(this.editAmount);
    if (!isNaN(amount)) {
      const goal = this.goals.find(g => g.id === goalId);
      if (goal) {
        goal.currentAmount += amount;
        this.budgetService.saveData();
        this.updateGoals();
        this.editGoalId = null;
        this.editAmount = '';
      }
    }
  }

  startEditing(goalId) {
    this.editGoalId = goalId;
    const goal = this.goals.find(g => g.id === goalId);
    this.editAmount = '';
  }

  private updateGoals() {
    this.goals = this.budgetService.goals;
  }

  private getIcon(name) {
    const icons = {
      'Laptop': '💻',
      'Phone': '📱',
      'Vacation': '✈️',
      'Emergency': '🆘',
      'Course': '🎓'
    };
    return icons[name] || '🎯';
  }
}

