
export interface Materials {
    id?: number; 
    name: string;
    quantity: number;
    unitPrice: number;
    categorie: Categorie;
  }
  
  export enum Categorie {
    BOIS = 'BOIS',
    PLASTIQUE = 'PLASTIQUE',
    ACIER = 'ACIER',
    CIMENT = 'CIMENT'
  }