import { Component, OnInit } from '@angular/core';
import { Reclamation } from 'src/app/modelsChaima/reclamation';
import { ReclamationService } from 'src/app/servicesChaima/reclamation.service';


@Component({
  selector: 'app-admin-reclamations',
  templateUrl: './admin-reclamations.component.html',
  styleUrls: ['./admin-reclamations.component.css']
})
export class AdminReclamationsComponent implements OnInit {
  reclamations: Reclamation[] = [];
  selectedReclamation: Reclamation | null = null;
  updatedComment: string = '';
  searchTerm: string = '';

  constructor(private reclamationService: ReclamationService) { }

  ngOnInit(): void {
    this.loadAllReclamations();
  }

  filteredReclamations(): Reclamation[] {
    const term = this.searchTerm.toLowerCase();
  
    return this.reclamations.filter(reclamation =>
      // reclamation.employee.name.toLowerCase().includes(term) ||
      // reclamation.employee.lastname.toLowerCase().includes(term) ||
      reclamation.comment.toLowerCase().includes(term)
    );
  }

  loadAllReclamations() {
    this.reclamationService.getAllReclamations().subscribe(data => {
      console.log("Loaded Reclamations:", data); // ADD THIS
      this.reclamations = data;
    });
  }

  deleteReclamation(id: number) {
    this.reclamationService.deleteReclamation(id).subscribe(() => {
      this.loadAllReclamations();
    });
  }

  selectReclamation(reclamation: Reclamation) {
    this.selectedReclamation = {...reclamation}; // Create a copy to avoid direct binding
    this.updatedComment = reclamation.comment;
  }

  saveReclamation() {
    if (this.selectedReclamation) {
      this.selectedReclamation.comment = this.updatedComment;
      this.reclamationService.updateReclamation(this.selectedReclamation).subscribe(() => {
        this.loadAllReclamations();
        this.selectedReclamation = null;
        this.updatedComment = '';
      });
    }
  }

  cancelEdit() {
    this.selectedReclamation = null;
    this.updatedComment = '';
  }
}
