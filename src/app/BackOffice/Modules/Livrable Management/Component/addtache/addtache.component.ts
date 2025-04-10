import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../Service/user.service";
import {User} from "../../Model/user.model";
import {Status, Tache} from "../../Model/tache.model";










@Component({
  selector: 'app-addtache',
  templateUrl: './addtache.component.html',
  styleUrls: ['./addtache.component.css']
})
export class AddtacheComponent implements OnInit {
  tacheForm!: FormGroup;
  statusValues = Object.values(Status);
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddtacheComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tache,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => console.error('Erreur lors du chargement des utilisateurs', error)
    );

    this.tacheForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      status: [Status.ToDo, Validators.required],
      dateDebut: ['', [Validators.required, this.dateNotBeforeTodayValidator]],
      dateFin: [''],
      userId: ['', Validators.required],
      userNom: ['']
    });

    if (this.data) {
      this.tacheForm.patchValue(this.data);
    }
  }

  dateNotBeforeTodayValidator(control: any): { [key: string]: any } | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return { dateBeforeToday: true };
    }
    return null;
  }
/*
  onSubmit(): void {
    if (this.tacheForm.valid) {
      const selectedUser = this.users.find(user => user.id === this.tacheForm.get('userId')?.value);
      if (selectedUser) {
        this.tacheForm.get('userNom')?.setValue(selectedUser.username);
      }

      this.dialogRef.close(this.tacheForm.value);
    }
  }
*/

  onSubmit(): void {
    if (this.tacheForm.valid) {
      const formValue = this.tacheForm.value;

      const tache: Tache = {
        ...formValue,
        dateDebut: new Date(formValue.dateDebut),
        dateFin: formValue.dateFin ? new Date(formValue.dateFin) : null,
        userId: formValue.userId,    // Envoyer userId
        iduser: formValue.userId     // Envoyer iduser (identique à userId)
      };

      this.dialogRef.close(tache);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}