export enum TypeAssurance {
    SANTE = 'SANTE',
    AUTO = 'AUTO',
    HABITATION = 'HABITATION',
    RESPONSABILITE = 'RESPONSABILITE',
    VOYAGE = 'VOYAGE',
  }
  
  export class Assurance {
    id: number | null = null;  // Accepte null par défaut
    nom!: string;
    dateExpiration!: string;
    montantCouverture!: number;
    typeAssurance!: TypeAssurance;
    
  }
  