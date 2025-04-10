import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BudgetServiceService } from '../../Services/budget-service.service';
import { tache } from '../../models/Tache';
import { Budget } from '../../models/Budget';

@Component({
  selector: 'app-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.css'],
  encapsulation: ViewEncapsulation.None, // Disable encapsulation
})
export class AddBudgetComponent implements OnInit {
  taches: tache[] = [];
  BudgetForm: FormGroup;

  constructor(
    private rs: BudgetServiceService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddBudgetComponent>
  ) {
    this.BudgetForm = this.fb.group({
      montant: ['', [Validators.required, Validators.min(10000)]],
      description: ['', Validators.required],
      nom: ['', [Validators.required, Validators.minLength(3)]],
      tache: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.rs.getTaches().subscribe((response: tache[]) => {
      this.taches = response;
    });
  }

  onSubmit(): void {
    if (this.BudgetForm.valid) {
      const budgetData = {
        ...this.BudgetForm.value,
        tacheId: this.BudgetForm.value.tache
      };

      this.rs.addBudget(budgetData).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}