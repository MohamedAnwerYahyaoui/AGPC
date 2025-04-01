export interface Commande {
  id: number;
  description: string;
  dateCommande: Date;
  
}

  
  export interface Facture {
    id: number;
    date: Date;
    totalAmount: number;
    commande: Commande;
  }
  