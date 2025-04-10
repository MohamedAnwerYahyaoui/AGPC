
export class Fournisseur {
    id!: number;
    name: string = '';
    contact: string = '';
    numtel: string = '';
    
    constructor(id: number, name: string, contact: string, numtel: string) {
      this.id = id;
      this.name = name;
      this.contact = contact;
      this.numtel = numtel;
    }
  }
  
  export class Facture {
    id!: number;
    date: Date = new Date();  
    totalAmount: number = 0;
  
    constructor(id: number, date: Date, totalAmount: number) {
      this.id = id;
      this.date = date;
      this.totalAmount = totalAmount;
    }
  }
  
  export class Commande {
    id: number = 0;
    date: Date = new Date();  
    status: string = '';
    totalAmount: number = 0;
    fournisseur: Fournisseur = new Fournisseur(0, '', '', '');
    factures: Facture[] = [];
  
    constructor(
      id: number = 0,
      date: Date = new Date(),  
      status: string = '',
      totalAmount: number = 0,
      fournisseur: Fournisseur = new Fournisseur(0, '', '', ''),
      factures: Facture[] = []
    ) {
      this.id = id;
      this.date = date;
      this.status = status;
      this.totalAmount = totalAmount;
      this.fournisseur = fournisseur;
      this.factures = factures;
    }
  }