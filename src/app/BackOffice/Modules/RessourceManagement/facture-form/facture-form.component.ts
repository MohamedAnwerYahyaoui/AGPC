import { Component } from '@angular/core';
import { FactureService, Facture, Commande } from '../facture.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-facture-form',
  templateUrl: './facture-form.component.html',
  styleUrls: ['./facture-form.component.css']
})
export class FactureFormComponent {
  facture: Facture = { 
    id: 0, 
    date: new Date(),  
    totalAmount: 0, 
    commande: { id: 0, description: '', dateCommande: new Date(), status: '', totalAmount: 0 } 
  };
  commandes: Commande[] = [];
  isEdit = false;
  errorMessage: string | null = null;

  constructor(
    private factureService: FactureService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCommandes();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.factureService.getFactureById(+id).subscribe(data => {
        
        this.facture = { 
          ...data, 
          date: new Date(data.date), 
          commande: { 
            ...data.commande, 
            dateCommande: new Date(data.commande.dateCommande) 
          }
        };
      });
    }
  }

  loadCommandes(): void {
    this.factureService.getCommandes().subscribe(data => {
      this.commandes = data;
    });
  }

  saveFacture(): void {
    
    this.errorMessage = null;

  
    if (!this.facture.date || !this.facture.totalAmount || !this.facture.commande.id) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

   
    this.facture.date = new Date(this.facture.date);
    this.facture.commande.dateCommande = new Date(this.facture.commande.dateCommande);

    if (this.isEdit) {
      this.factureService.updateFacture(this.facture.id, this.facture).subscribe(() => {
        this.router.navigate(['/dashboard/factures']);
      });
    } else {
      this.factureService.createFacture(this.facture).subscribe(() => {
        this.router.navigate(['/dashboard/factures']);
      });
    }
  }
}