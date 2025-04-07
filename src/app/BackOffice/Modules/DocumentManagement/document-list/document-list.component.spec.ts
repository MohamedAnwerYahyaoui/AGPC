import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentListComponent } from './document-list.component';
import { DocumentService } from '../document.service';
import { of } from 'rxjs';

describe('DocumentListComponent', () => {
  let component: DocumentListComponent;
  let fixture: ComponentFixture<DocumentListComponent>;
  let mockDocumentService = jasmine.createSpyObj(['getDocuments']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentListComponent ],
      providers: [
        { provide: DocumentService, useValue: mockDocumentService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentListComponent);
    component = fixture.componentInstance;
    mockDocumentService.getDocuments.and.returnValue(of([
      { id: 1, nom: 'Rapport', dateCreation: new Date(), cheminFichier: 'chemin.pdf', typeD: 'RAPPORT' }
    ]));
    fixture.detectChanges();
  });

  it('devrait récupérer la liste des documents au chargement', () => {
    expect(component.documents.length).toBe(1);
    expect(component.documents[0].nom).toBe('Rapport');
  });
});
