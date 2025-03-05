import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Budget } from '../../models/Budget';
import { BudgetServiceService } from '../../Services/budget-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { expences } from '../../models/Expences';

@Component({
  selector: 'app-update-expences',
  templateUrl: './update-expences.component.html',
  styleUrls: ['./update-expences.component.css']
})
export class UpdateExpencesComponent {
  BudgetForm: FormGroup;
    budgetId: number;
    budgets: Budget[] = [];

    constructor(
      private budgetService: BudgetServiceService,
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.BudgetForm = this.fb.group({
        montant: ['', Validators.required],
        description: ['', Validators.required],
        budget: [null, Validators.required],
        category: ['', Validators.required],

      });

      this.budgetId = this.route.snapshot.params['id'];
    }

    ngOnInit(): void {
      // 🔹 Récupérer les tâches pour la sélection
      this.budgetService.getBudget().subscribe((data: Budget[]) => {
        this.budgets = data;
      });

      // 🔹 Charger les détails du Budget à modifier
      this.budgetService.getExpencesById(this.budgetId).subscribe((budget: expences) => {
        this.BudgetForm.patchValue(budget);
      });
    }

    onSubmit(): void {
      if (this.BudgetForm.valid) {
        this.budgetService.updateExpences(this.budgetId, this.BudgetForm.value).subscribe(() => {
          this.router.navigate(['/dashboard/finance/expences']);
        });
      }
    }

}
