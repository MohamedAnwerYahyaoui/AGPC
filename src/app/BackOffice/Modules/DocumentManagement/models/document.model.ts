// src/app/models/document.model.ts
export enum TypeDocument {
  CONTRAT = 'CONTRAT',
  RAPPORT = 'RAPPORT',
  FACTURE = 'FACTURE'
}

export class Document {
  id?: number;
  nom!: string;  // Utilisation de "!" pour indiquer que la propriété doit être initialisée
  dateCreation?: Date;
  cheminFichier!: string;
  typeD?: TypeDocument;
  fichier?: File;
  assuranceId?: number;
}



