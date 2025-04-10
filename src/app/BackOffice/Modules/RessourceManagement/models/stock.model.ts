

export interface Materials {
    id: number;
    name: string;
    quantity: number;
    unitPrice: number;
    categorie: string;
  }
  
  
  export interface Stock {
    id?: number;
    materiel: Materials;
    currentQuantity: number;
    threshold: number;
  }
  
  
  export interface StockDetails extends Stock {
    materiel: Materials; 
  }