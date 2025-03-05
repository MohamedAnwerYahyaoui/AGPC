import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tache } from '../../models/Tache';
import { BudgetServiceService } from '../../Services/budget-service.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Budget } from '../../models/Budget';

@Component({
  selector: 'app-update-budget',
  templateUrl: './update-budget.component.html',
  styleUrls: ['./update-budget.component.css']
})
export class UpdateBudgetComponent {
  BudgetForm: FormGroup;
  budgetId: number;
  taches: tache[] = [];

  constructor(
    private budgetService: BudgetServiceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.BudgetForm = this.fb.group({
      montant: ['', [Validators.required, Validators.min(10000)]],
      description: ['', Validators.required],
      nom: ['', [Validators.required, Validators.minLength(3)]],
      tache: [null, Validators.required],

    });

    this.budgetId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    // 🔹 Récupérer les tâches pour la sélection
    this.budgetService.getTaches().subscribe((data: tache[]) => {
      this.taches = data;
    });

    // 🔹 Charger les détails du Budget à modifier
    this.budgetService.getBudgetById(this.budgetId).subscribe((budget: Budget) => {
      this.BudgetForm.patchValue(budget);
    });
  }

  onSubmit(): void {
    if (this.BudgetForm.valid) {
      this.budgetService.updateBudget(this.budgetId, this.BudgetForm.value).subscribe(() => {
        this.router.navigate(['/dashboard/finance/budget']);
      });
    }
  }
}
