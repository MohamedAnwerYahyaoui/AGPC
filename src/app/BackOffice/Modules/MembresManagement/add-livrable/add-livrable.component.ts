import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LivrableService } from 'src/app/services/livrable.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Livrable } from 'src/app/Models/Livrable';

@Component({
  selector: 'app-add-livrable',
  templateUrl: './add-livrable.component.html',
  styleUrls: ['./add-livrable.component.css']
})
export class AddLivrableComponent implements OnInit {
  livrableForm: FormGroup;
  isEditMode: boolean = false;
  currentId?: number;

  constructor(
    private fb: FormBuilder,
    private livrableService: LivrableService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Ajout des validateurs : required + minLength(3)
    this.livrableForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    // Vérifier si un id est passé dans l'URL pour passer en mode modification
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.currentId = +params['id'];

        // Si vous avez une méthode getLivrableById, utilisez-la de préférence
        this.livrableService.getLivrables().subscribe(livrables => {
          const livrable = livrables.find(l => l.id === this.currentId);
          if (livrable) {
            this.livrableForm.patchValue({
              nom: livrable.nom
            });
          }
        });
      }
    });
  }

  onSubmit(): void {
    // Si le formulaire est invalide, on ne soumet pas
    if (this.livrableForm.invalid) {
      return;
    }

    const formData = this.livrableForm.value as Livrable;

    if (this.isEditMode && this.currentId) {
      this.livrableService.updateLivrable(this.currentId, formData).subscribe(() => {
        this.router.navigate(['/dashboard/list-livrable']);
      });
    } else {
      this.livrableService.addLivrable(formData).subscribe(() => {
        this.router.navigate(['/dashboard/list-livrable']);
      });
    }
  }
}
