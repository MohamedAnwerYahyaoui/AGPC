import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livrable } from 'src/app/Models/Livrable';
import { LivrableService } from 'src/app/services/livrable.service';

@Component({
  selector: 'app-list-livrable',
  templateUrl: './list-livrable.component.html',
  styleUrls: ['./list-livrable.component.css']
})
export class ListLivrableComponent implements OnInit {
  livrables: Livrable[] = [];

  // Ajout pour la recherche et la pagination
  searchText: string = '';
  page: number = 1;

  constructor(
    private livrableService: LivrableService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadLivrables();
  }

  loadLivrables(): void {
    this.livrableService.getLivrables().subscribe(
      (data: Livrable[]) => {
        this.livrables = data;
      },
      error => {
        console.error('Erreur lors du chargement des livrables', error);
      }
    );
  }

  deleteLivrable(id: number): void {
    if (confirm('Voulez-vous supprimer ce livrable ?')) {
      this.livrableService.deleteLivrable(id).subscribe(
        () => {
          // Mise à jour immédiate du tableau local
          this.livrables = this.livrables.filter(l => l.id !== id);
        },
        error => {
          console.error('Erreur lors de la suppression du livrable', error);
        }
      );
    }
  }

  editLivrable(id: number): void {
    this.router.navigate(['/dashboard/add-livrable', id]);
  }
}
