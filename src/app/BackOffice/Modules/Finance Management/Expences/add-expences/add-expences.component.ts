import { Component } from '@angular/core';
import { Budget } from '../../models/Budget';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BudgetServiceService } from '../../Services/budget-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-expences',
  templateUrl: './add-expences.component.html',
  styleUrls: ['./add-expences.component.css']
})
export class AddExpencesComponent {
budgets:Budget[]=[]
  ngOnInit(): void {
    this.rs.getBudget().subscribe((response: Budget[]) => {
      this.budgets = response; // ✅ List of all Taches with their IDs
    });
  }
  BudgetForm: FormGroup;

  constructor(
    private rs: BudgetServiceService,
    private fb: FormBuilder,
    private r: Router
  ) {
    this.BudgetForm = this.fb.group({
      montant:['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],

    budget: [null, Validators.required],



    });
  }

  onSubmit(): void {
    if (this.BudgetForm.valid) {
      const budgetData = {
        ...this.BudgetForm.value,
        tacheId: this.BudgetForm.value.tache // ✅ Use only the selected tacheId
      };

      this.rs.addExpences(budgetData).subscribe(() => {
        this.r.navigate(['/dashboard/finance/expences']);
      });
    }
  }
}