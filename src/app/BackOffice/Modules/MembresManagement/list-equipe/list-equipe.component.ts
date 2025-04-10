import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Equipe } from 'src/app/Models/Equipe';
import { EquipeService } from 'src/app/services/equipe.service';
import { EmployeService } from  'src/app/services/employe.service';
import { LivrableService } from 'src/app/services/livrable.service';
import { Livrable } from 'src/app/Models/Livrable';

@Component({
  selector: 'app-list-equipe',
  templateUrl: './list-equipe.component.html',
  styleUrls: ['./list-equipe.component.css']
})
export class ListEquipeComponent implements OnInit {
  equipes: Equipe[] = [];
  livrables: Livrable[] = [];

  // Propriétés de filtrage
  searchTerm: string = '';
  selectedLivrable: string = '';

  // Pagination
  page: number = 1;

  constructor(
    private equipeService: EquipeService,
    private livrableService: LivrableService,
    private router: Router,
    private employeService: EmployeService
  ) {}

  ngOnInit(): void {
    this.loadEquipes();
    this.loadLivrables();
  }

  onStarClick(team: Equipe, star: number): void {
    if (team.id !== undefined) {
      // Si l'étoile cliquée correspond au rating actuel, alors on décrémente (en toggle)
      const newRating = team.rating === star ? (star > 1 ? star - 1 : 0) : star;
      
      this.equipeService.updateRating(team.id, newRating).subscribe({
        next: (updatedTeam) => {
          // Mise à jour du rating local avec la réponse du backend
          team.rating = updatedTeam.rating;
        },
        error: (err) => console.error('Erreur lors de la mise à jour du rating', err)
      });
    }
  }
 // Export Excel (employés de l'équipe)
 exportExcel(equipe: Equipe): void {
  if (equipe.id !== undefined) {
    this.employeService.exportEmployees(equipe.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `employes_equipe_${equipe.nom}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => console.error('Erreur lors de l\'exportation', err)
    });
  }
}
triggerFileInput(equipe: any) {
  const input = document.getElementById('fileInput_' + equipe.id) as HTMLInputElement;
  if (input) {
    input.click();
  }
}


// Import Excel (employés dans l'équipe)
onFileSelected(event: any, equipe: Equipe): void {
  const file: File = event.target.files[0];
  if (file && equipe.id !== undefined) {
    this.employeService.importEmployees(file, equipe.id).subscribe({
      next: (message: string) => {
        alert(`Import réussi pour l'équipe ${equipe.nom} : ${message}`);
        this.loadEquipes(); // recharger les équipes
      },
      error: (err) => console.error('Erreur lors de l\'importation', err)
    });
  }
}
  
  

  loadEquipes(): void {
    this.equipeService.getEquipes().subscribe(
      data => {
        this.equipes = data.map(eq => {
          if (eq.livrable) {
            eq.livrable_id = eq.livrable.id;
          }
          return eq;
        });
      },
      error => console.error('Erreur lors du chargement des équipes :', error)
    );
  }

  loadLivrables(): void {
    this.livrableService.getLivrables().subscribe(
      data => {
        this.livrables = data;
      },
      error => console.error('Erreur lors du chargement des livrables :', error)
    );
  }

  deleteEquipe(id: number): void {
    if (confirm('Voulez-vous supprimer cette équipe ?')) {
      this.equipeService.deleteEquipe(id).subscribe(
        () => {
          this.equipes = this.equipes.filter(e => e.id !== id);
        },
        error => console.error('Erreur lors de la suppression de l\'équipe :', error)
      );
    }
  }

  editEquipe(equipe: Equipe): void {
    if (equipe.id !== undefined) {
      this.router.navigate(['/dashboard/add-equipe', equipe.id]);
    }
  }
  
  goToAddEquipe(): void {
    this.router.navigate(['/dashboard/add-equipe']);
  }

  /**
   * Réinitialise la pagination à la page 1
   * dès qu'un filtre (searchTerm ou selectedLivrable) change
   */
  resetPage(): void {
    this.page = 1;
  }
}
