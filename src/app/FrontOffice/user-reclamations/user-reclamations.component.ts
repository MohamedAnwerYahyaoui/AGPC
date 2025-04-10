import { Component, OnInit } from '@angular/core';
import { Reclamation } from 'src/app/modelsChaima/reclamation';
import { ReclamationService } from 'src/app/servicesChaima/reclamation.service';
import { UserService } from 'src/app/servicesChaima/user-service.service';


@Component({
  selector: 'app-user-reclamations',
  templateUrl: './user-reclamations.component.html',
  styleUrls: ['./user-reclamations.component.css']
})
export class UserReclamationsComponent implements OnInit {
  reclamations: Reclamation[] = [];
  newComment: string = '';
  selectedReclamation: Reclamation | null = null;
  updatedComment: string = '';
  userId: number | null = null;
  selectedFile: File | null = null;

  constructor(
    private reclamationService: ReclamationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    if (this.userId) {
      this.loadUserReclamations(this.userId);
    }
  }

  loadUserReclamations(userId: number) {
    this.reclamationService.getUserReclamations(userId).subscribe(data => {
        this.reclamations = data.map(reclamation => ({
            ...reclamation,
            fileUrl: reclamation.file ? this.createFileUrl(reclamation.file) : undefined // Set to undefined instead of null
        }));
    });
  }

  downloadFile(id: number, fileName: string) {
    this.reclamationService.getFile(id).subscribe((file: Blob) => {
        const url = window.URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    });
  }

  onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
  }

  addReclamation() {
      if (this.newComment.trim() && this.userId) {
          const newReclamation: Reclamation = {
              id: null,
              comment: this.newComment,
              employee: { id: this.userId, name: '', lastname: '', email: '', phonenumber: 0, post: '', dateEmb: new Date(), salary: 0 }
          };

          this.reclamationService.createReclamation(
              newReclamation, 
              this.selectedFile ?? undefined
          ).subscribe(() => {
              this.loadUserReclamations(this.userId!);
              this.newComment = '';
              this.selectedFile = null;
          });
      }
  }

  createFileUrl(file: any): string {
    const blob = new Blob([file], { type: file.type });
    return URL.createObjectURL(blob);
  }

  deleteReclamation(id: number | undefined) {
    if (id !== undefined) {
        console.log("Deleting reclamation with ID:", id);
        this.reclamationService.deleteReclamation(id).subscribe(() => {
            if (this.userId) {
                this.loadUserReclamations(this.userId);
            }
        });
    } else {
        console.warn("Attempted to delete a reclamation with an undefined ID");
    }
  }

  selectReclamation(reclamation: Reclamation) {
    console.log("Editing reclamation with ID:", reclamation.id);
    this.selectedReclamation = { ...reclamation };
    this.updatedComment = reclamation.comment;
  }

  saveReclamation() {
      if (this.selectedReclamation) {
          this.selectedReclamation.comment = this.updatedComment;

          console.log("Saving updated reclamation:", this.selectedReclamation);

          this.reclamationService.updateReclamation(this.selectedReclamation).subscribe(() => {
              if (this.userId) {
                  this.loadUserReclamations(this.userId);
              }
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
