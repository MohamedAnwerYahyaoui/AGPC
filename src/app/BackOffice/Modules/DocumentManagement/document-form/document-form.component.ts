import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentService } from 'src/app/BackOffice/Modules/DocumentManagement/document.service';
import { Document, TypeDocument } from 'src/app/BackOffice/Modules/DocumentManagement/models/document.model';
import { AssuranceService } from 'src/app/BackOffice/Modules/AssuranceManagement/assurance.service';

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.css'],
})
export class DocumentFormComponent implements OnInit {
  typeDocuments = Object.values(TypeDocument);
  documentForm: FormGroup;
  nouveauDocument: {
    nom: string;
    typeD: string;
    dateCreation: string;
    cheminFichier: string;
    fichier: File | null;
  } = {
    nom: '',
    typeD: '',
    dateCreation: '',
    cheminFichier: '',
    fichier: null
  };
  assurances: any[] = [];

  toastMessage: string = '';
  isEditMode = false;
  documentId: number | null = null;

  @Output() documentAjoute = new EventEmitter<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private fb: FormBuilder,
    private assuranceService: AssuranceService
  ) {
    this.documentForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      typeD: ['', Validators.required],
      dateCreation: ['', Validators.required],
      cheminFichier: ['', Validators.required],
      assuranceId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAssurances();
    this.checkEditMode();
  }

  checkEditMode(): void {
    this.route.params.subscribe(params => {
      this.documentId = params['id'] ? +params['id'] : null;
      if (this.documentId) {
        this.isEditMode = true;
        this.loadDocument(this.documentId);
      } else {
        this.isEditMode = false;
      }
    });
  }

  loadDocument(id: number): void {
    this.documentService.getDocumentById(id).subscribe({
      next: (document: Document) => {
        const safeDocument = {
          nom: document.nom || '',
          typeD: document.typeD || '',
          dateCreation: document.dateCreation || '',
          cheminFichier: document.cheminFichier || '',
          assuranceId: document.assuranceId || ''
        };

        const formattedDate = safeDocument.dateCreation 
          ? new Date(safeDocument.dateCreation).toISOString().slice(0, 16) 
          : '';

        this.documentForm.patchValue({
          nom: safeDocument.nom,
          typeD: safeDocument.typeD,
          dateCreation: formattedDate,
          cheminFichier: safeDocument.cheminFichier,
          assuranceId: safeDocument.assuranceId
        });

        this.nouveauDocument = {
          nom: safeDocument.nom,
          typeD: safeDocument.typeD,
          dateCreation: formattedDate,
          cheminFichier: safeDocument.cheminFichier,
          fichier: null
        };
      },
      error: (err) => {
        console.error('Erreur lors du chargement du document', err);
        this.toastMessage = 'Erreur lors du chargement du document';
      }
    });
  }

  loadAssurances(): void {
    this.assuranceService.getAllAssurances(0, 10).subscribe({
      next: (data) => this.assurances = data.content || data,
      error: (err) => console.error('Erreur lors du chargement des assurances', err)
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.nouveauDocument.fichier = file;
      this.nouveauDocument.cheminFichier = file.name;
      this.documentForm.patchValue({ cheminFichier: file.name });
    }
  }

  soumettreFormulaire(): void {
    if (this.documentForm.invalid) {
      this.toastMessage = 'Veuillez remplir tous les champs obligatoires';
      return;
    }

    if (this.isEditMode) {
      this.updateDocument();
    } else {
      this.ajouterDocument();
    }
  }
  ajouterDocument(): void {
    const document: Document = {
      nom: this.documentForm.value.nom,
      typeD: this.documentForm.value.typeD,
      dateCreation: new Date(this.documentForm.value.dateCreation),
      cheminFichier: this.nouveauDocument.cheminFichier || '',
      assuranceId: this.documentForm.value.assuranceId
    };
  
    if (this.nouveauDocument.fichier) {
      this.documentService.addDocumentWithFile(document, this.nouveauDocument.fichier).subscribe({
        next: (response) => {
          console.log('Document ajouté avec succès:', response); // Log the response
          this.handleSuccess('Document ajouté');
        },
        error: (err) => {
          console.error('Full error details:', err);
          console.error('Error message:', err.message);
          console.error('Error status:', err.status);
          console.error('Error statusText:', err.statusText);
          this.handleError('ajout avec fichier', err);
        }
      });
    } else {
      this.documentService.addDocument(document).subscribe({
        next: () => this.handleSuccess('Document ajouté'),
        error: (err) => this.handleError('ajout', err)
      });
    }
  }

  updateDocument(): void {
    if (this.documentId) {
      const updatedDocument: Document = {
        id: this.documentId,
        nom: this.documentForm.value.nom,
        typeD: this.documentForm.value.typeD,
        dateCreation: new Date(this.documentForm.value.dateCreation),
        cheminFichier: this.nouveauDocument.cheminFichier || '',
        assuranceId: this.documentForm.value.assuranceId
      };

      this.documentService.updateDocument(updatedDocument).subscribe({
        next: () => this.handleSuccess('Document mis à jour'),
        error: (err) => this.handleError('mise à jour', err)
      });
    }
  }

  private handleSuccess(message: string): void {
    this.toastMessage = `${message} avec succès`;
    this.documentAjoute.emit();
    this.router.navigate(['/dashboard/documentation/list']);
  }

  private handleError(action: string, err: any): void {
    console.error(`Erreur lors de l'${action} du document`, err);
    this.toastMessage = `Erreur lors de l'${action} du document`;
  }

  // Validation messages
  get nomInvalid() {
    const nomControl = this.documentForm.get('nom');
    return nomControl?.touched && nomControl?.invalid;
  }

  get typeDInvalid() {
    const typeDControl = this.documentForm.get('typeD');
    return typeDControl?.touched && typeDControl?.invalid;
  }

  get dateCreationInvalid() {
    const dateCreationControl = this.documentForm.get('dateCreation');
    return dateCreationControl?.touched && dateCreationControl?.invalid;
  }

  get assuranceIdInvalid() {
    const assuranceIdControl = this.documentForm.get('assuranceId');
    return assuranceIdControl?.touched && assuranceIdControl?.invalid;
  }

  get cheminFichierInvalid() {
    const cheminFichierControl = this.documentForm.get('cheminFichier');
    return cheminFichierControl?.touched && cheminFichierControl?.invalid;
  }
}
