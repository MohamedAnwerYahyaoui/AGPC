import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Tache } from "../../Model/tache.model";
import { User } from "../../Model/user.model";
import { Timesheet, TimeSheetService } from "../../Service/time-sheet.service";
import { TacheService } from "../../Service/tache.service";
import { UserService } from "../../Service/user.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-time-sheet-form',
  templateUrl: './time-sheet-form.component.html',
  styleUrls: ['./time-sheet-form.component.css']
})
export class TimeSheetFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  isLoading = false;
  tasks: Tache[] = [];
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private timesheetService: TimeSheetService,
    private taskService: TacheService,
    private userService: UserService,
    public dialogRef: MatDialogRef<TimeSheetFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Timesheet,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      id: [null],
      date: ['', Validators.required],
      heures: [0, [Validators.required, Validators.min(0.5), Validators.max(24)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      tacheId: [null, Validators.required],
      userId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTasks();
    this.loadUsers();

    if (this.data && this.data.id) {
      this.isEdit = true;
      this.patchFormValues();
    }
  }

  loadTasks(): void {
    this.taskService.getTaches().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        console.log('Tâches chargées :', tasks);
      },
      error: (error) => {
        console.error('Erreur chargement tâches:', error);
        this.showError('Erreur lors du chargement des tâches');
      }
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log('Utilisateurs chargés :', users);
      },
      error: (error) => {
        console.error('Erreur chargement utilisateurs:', error);
        this.showError('Erreur lors du chargement des utilisateurs');
      }
    });
  }

  patchFormValues(): void {
    this.form.patchValue({
      id: this.data.id,
      date: this.formatDateForInput(this.data.date),
      heures: this.data.heures,
      description: this.data.description,
      tacheId: this.data.tache?.id || null,
      userId: this.data.user?.id || null
    });
  }

  formatDateForInput(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  save(): void {
    if (this.form.invalid) {
      this.showError('Veuillez remplir tous les champs requis');
      return;
    }

    this.isLoading = true;
    const formData = this.form.value;

    const timesheet: Timesheet = {
      id: formData.id,
      date: formData.date,
      heures: formData.heures,
      description: formData.description,
      tache: { id: formData.tacheId } as Tache,
      user: { id: formData.userId } as User
    };

    // Vérification cruciale pour éviter l'URL avec "undefined"
    if (this.isEdit && timesheet.id) {
      this.updateTimesheet(timesheet);
    } else {
      this.createTimesheet(timesheet);
    }
  }

  private updateTimesheet(timesheet: Timesheet): void {
    this.timesheetService.updateTimesheet(timesheet.id!, timesheet).subscribe({
      next: () => {
        this.showSuccess('Timesheet mis à jour avec succès');
        this.dialogRef.close('success');
      },
      error: (err: HttpErrorResponse) => {
        this.handleSaveError(err);
      }
    });
  }

  private createTimesheet(timesheet: Timesheet): void {
    this.timesheetService.createTimesheet(timesheet).subscribe({
      next: () => {
        this.showSuccess('Timesheet créé avec succès');
        this.dialogRef.close('success');
      },
      error: (err: HttpErrorResponse) => {
        this.handleSaveError(err);
      }
    });
  }

  private handleSaveError(error: HttpErrorResponse): void {
    this.isLoading = false;
    console.error('Erreur sauvegarde:', error);

    if (error.status === 400) {
      if (error.error?.errors) {
        const errorMessages = Object.values(error.error.errors).flat();
        this.showError(errorMessages.join(', '));
      } else {
        this.showError('Données invalides - vérifiez les champs');
      }
    } else {
      this.showError('Erreur lors de la sauvegarde');
    }
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}