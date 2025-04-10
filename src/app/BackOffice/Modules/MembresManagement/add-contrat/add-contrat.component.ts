import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeContrat, Contrat } from 'src/app/Models/Contrat';
import { ContratService } from 'src/app/services/contrat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-contrat',
  templateUrl: './add-contrat.component.html',
  styleUrls: ['./add-contrat.component.css']
})
export class AddContratComponent implements OnInit {
  contratForm: FormGroup;
  isEditMode = false;
  typeContrats = Object.values(TypeContrat);

  constructor(
    private fb: FormBuilder,
    private contratService: ContratService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Notez l'ajout du champ `id` dans le FormGroup
    this.contratForm = this.fb.group({
      id: [null],  // <--- NOUVEAU CHAMP
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      contrat: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.contratService.getContratById(+id).subscribe((contrat: Contrat) => {
        // On "patch" l'ID pour qu'il ne soit pas undefined
        this.contratForm.patchValue({
          id: contrat.id,  // <--- On stocke l'ID dans le form
          dateDebut: contrat.dateDebut
            ? formatDate(contrat.dateDebut, 'yyyy-MM-dd', 'en-US')
            : '',
          dateFin: contrat.dateFin
            ? formatDate(contrat.dateFin, 'yyyy-MM-dd', 'en-US')
            : '',
          contrat: contrat.contrat
        });
      });
    }
  }

  saveContrat(): void {
    if (this.contratForm.invalid) {
      return;
    }

    const formValue = this.contratForm.value;

    // Formatage des dates en 'yyyy-MM-dd'
    formValue.dateDebut = formatDate(formValue.dateDebut, 'yyyy-MM-dd', 'en-US');
    formValue.dateFin = formatDate(formValue.dateFin, 'yyyy-MM-dd', 'en-US');

    if (this.isEditMode) {
      // Ici, formValue.id n'est plus undefined
      this.contratService.updateContrat(formValue.id, formValue).subscribe(() => {
        this.router.navigate(['/dashboard/list-contrat']);
      });
    } else {
      this.contratService.addContrat(formValue).subscribe(() => {
        this.router.navigate(['/dashboard/list-contrat']);
      });
    }
  }
}
