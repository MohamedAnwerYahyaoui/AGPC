import { Component, OnInit } from '@angular/core';
import { Status, Tache } from "../../Model/tache.model";
import { User } from "../../Model/user.model";
import { TacheService } from "../../Service/tache.service";
import { UserService } from "../../Service/user.service";
import { MatDialog } from "@angular/material/dialog";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { AddtacheComponent } from "../addtache/addtache.component";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { lastValueFrom } from "rxjs";

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  todoTaches: Tache[] = [];
  inProgressTaches: Tache[] = [];
  doneTaches: Tache[] = [];
  users: User[] = [];
  showAddTaskModal = false;

  constructor(
    private tacheService: TacheService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.tacheService.getTaches().subscribe({
      next: (taches: Tache[]) => {
        this.todoTaches = taches.filter(t => t.status === Status.ToDo);
        this.inProgressTaches = taches.filter(t => t.status === Status.inprosses);
        this.doneTaches = taches.filter(t => t.status === Status.DONE);
        this.sortAllTaches();
      },
      error: (err) => console.error('Erreur chargement tâches:', err)
    });

    this.userService.getUsers().subscribe({
      next: (users: User[]) => this.users = users,
      error: (err) => console.error('Erreur chargement utilisateurs:', err)
    });
  }

  openTacheDialog(tache?: Tache): void {
    const dialogRef = this.dialog.open(AddtacheComponent, {
      width: '600px',
      data: tache ? { ...tache } : {
        nom: '',
        description: '',
        status: Status.ToDo,
        dateDebut: new Date(),
        dateFin: new Date(),
        userId: 0,
      },
    });

    dialogRef.afterClosed().subscribe((result: Tache) => {
      if (result) {
        const operation = result.id
          ? this.tacheService.updateTache(result.id, result)
          : this.tacheService.ajouterTache(result);

        operation.subscribe({
          next: (savedTache) => {
            this.updateLocalTache(savedTache);
            this.snackBar.open(`Tâche ${result.id ? 'modifiée' : 'ajoutée'}`, 'Fermer', {
              duration: 3000
            });
          },
          error: (err) => this.showError('Erreur lors de l\'opération', err)
        });
      }
    });
  }

  deleteTache(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer cette tâche ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tacheService.deleteTache(id).subscribe({
          next: () => {
            this.removeTacheFromLocalArrays(id);
            this.snackBar.open('Tâche supprimée avec succès', 'Fermer', {
              duration: 3000
            });
          },
          error: (err) => {
            console.error('Erreur technique:', err);
            // Vérifie si c'est une erreur de parsing (statut 200 mais réponse non-JSON)
            if (err.status === 200 && err.error && err.error.text === 'Tache supprimé') {
              this.removeTacheFromLocalArrays(id);
              this.snackBar.open('Tâche supprimée avec succès', 'Fermer', {
                duration: 3000
              });
            } else {
              this.snackBar.open('Échec de la suppression', 'Fermer', {
                duration: 3000,
                panelClass: ['error-snackbar']
              });
            }
          }
        });
      }
    });
  }

  async drop(event: CdkDragDrop<Tache[]>): Promise<void> {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      return;
    }

    const movedTache = event.previousContainer.data[event.previousIndex];
    const newStatus = this.getStatusFromContainerId(event.container.id);

    // Mise à jour visuelle immédiate
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    try {
      const updatedTache = await lastValueFrom(
        this.tacheService.updateTacheSafe(movedTache.id, {
          ...movedTache,
          status: newStatus
        })
      );

      // Mise à jour de la référence dans le tableau
      event.container.data[event.currentIndex] = updatedTache;
      this.snackBar.open('Statut mis à jour', 'Fermer', { duration: 2000 });

    } catch (error) {
      // Annulation en cas d'erreur
      transferArrayItem(
        event.container.data,
        event.previousContainer.data,
        event.currentIndex,
        event.previousIndex
      );
      this.showError('Échec de la mise à jour', error);
    }
  }

  private getStatusFromContainerId(containerId: string): Status {
    switch (containerId) {
      case 'todo-list': return Status.ToDo;
      case 'in-progress-list': return Status.inprosses;
      case 'done-list': return Status.DONE;
      default: return Status.ToDo;
    }
  }

  private updateLocalTache(updatedTache: Tache): void {
    this.removeTacheFromLocalArrays(updatedTache.id!);

    switch(updatedTache.status) {
      case Status.ToDo:
        this.todoTaches.push(updatedTache);
        break;
      case Status.inprosses:
        this.inProgressTaches.push(updatedTache);
        break;
      case Status.DONE:
        this.doneTaches.push(updatedTache);
        break;
    }

    this.sortAllTaches();
  }

  private removeTacheFromLocalArrays(id: number): void {
    [this.todoTaches, this.inProgressTaches, this.doneTaches].forEach(array => {
      const index = array.findIndex(t => t.id === id);
      if (index > -1) array.splice(index, 1);
    });
  }

  private sortAllTaches(): void {
    const sortFn = (a: Tache, b: Tache) =>
      new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime();

    this.todoTaches.sort(sortFn);
    this.inProgressTaches.sort(sortFn);
    this.doneTaches.sort(sortFn);
  }

  private showError(message: string, error: any): void {
    console.error(message, error);
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

  getUserName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.username : 'Non assigné';
  }
}
