import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Livrable, LivrableService} from "../../Service/livrable.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";



const dateFutureValidator: any = (control: any): { [key: string]: any } | null => {
  const date = new Date(control.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Réinitialiser l'heure à minuit
  if (date < today) {
    return { dateFuture: true };
  }
  return null;
};





@Component({
  selector: 'app-livrable-form',
  templateUrl: './livrable-form.component.html',
  styleUrls: ['./livrable-form.component.css']
})
export class LivrableFormComponent {
  form: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private service: LivrableService,
    private dialogRef: MatDialogRef<LivrableFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Livrable
  ) {
    this.form = this.fb.group({
      nom: [data.nom, [Validators.required, Validators.minLength(3)]],
      description: [data.description],
      dateLivraison: [data.dateLivraison, [Validators.required, dateFutureValidator]]
    });
    this.isEdit = !!data.id;
  }

  submit(): void {
    if (this.form.valid) {
      const livrable = { ...this.data, ...this.form.value };
      const operation = this.isEdit ?
        this.service.updateLivrable(livrable.id!, livrable) :
        this.service.addLivrable(livrable);

      operation.subscribe({
        next: () => this.dialogRef.close(true),
        error: () => alert('Erreur lors de la sauvegarde')
      });
    }
  }

  get nom() { return this.form.get('nom'); }
  get dateLivraison() { return this.form.get('dateLivraison'); }
}