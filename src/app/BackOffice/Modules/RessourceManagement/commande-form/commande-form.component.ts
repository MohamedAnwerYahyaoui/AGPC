import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommandeService } from '../commande.service';
import { FournisseurService } from '../fournisseur.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'; 
import { Commande, Fournisseur } from '../models/commande.model'; 

@Component({
  selector: 'app-commande-form',
  templateUrl: './commande-form.component.html',
  styleUrls: ['./commande-form.component.css'],
})
export class CommandeFormComponent implements OnInit {
  commande: Commande = new Commande(); 
  fournisseurs: Fournisseur[] = []; 
  isEditMode: boolean = false; 
  submitted: boolean = false; 

  constructor(
    private commandeService: CommandeService,
    private fournisseurService: FournisseurService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.commande.status = 'EN_ATTENTE'; 
    this.commande.fournisseur = new Fournisseur(0, '', '', ''); 
  }

  ngOnInit(): void {
    this.loadFournisseurs(); 
    const commandeId = this.route.snapshot.paramMap.get('id');
    if (commandeId) {
      this.isEditMode = true;
      this.loadCommande(Number(commandeId)); 
    }
  }

  loadFournisseurs(): void {
    this.fournisseurService.getFournisseurs().subscribe(
      (data: Fournisseur[]) => {
        this.fournisseurs = data;
        console.log('Fournisseurs loaded:', this.fournisseurs);
      },
      (error) => {
        console.error('Error loading fournisseurs:', error);
      }
    );
  }

 
  loadCommande(id: number): void {
    this.commandeService.getCommandeById(id).subscribe(
      (data: Commande) => {
        this.commande = data;
        console.log('Commande loaded:', this.commande);
      },
      (error) => {
        console.error('Error loading commande:', error);
      }
    );
  }

 
  markAllAsTouched(form: NgForm): void {
    Object.keys(form.controls).forEach((key) => {
      form.controls[key].markAsTouched(); 
    });
  }

  saveCommande(form: NgForm): void {
    this.submitted = true;

  
    if (form.invalid || !this.commande.fournisseur.id) {
      this.markAllAsTouched(form); 

      
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez remplir tous les champs obligatoires.',
        confirmButtonColor: '#4169E1', 
        confirmButtonText: 'OK',
      });

      return; 
    }

    if (this.commande.totalAmount < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Le montant total ne peut pas être négatif.',
        confirmButtonColor: '#4169E1', 
        confirmButtonText: 'OK',
      });
      return;
    }

    if (this.isEditMode) {
      this.updateCommande();
    } else {
      this.commandeService.createCommande(this.commande).subscribe(
        () => {
          this.router.navigate(['/dashboard/commandes']);
        },
        (error) => {
          console.error('Error creating commande:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la création de la commande.',
            confirmButtonColor: '#4169E1',
            confirmButtonText: 'OK',
          });
        }
      );
    }
  }

  
  updateCommande(): void {
    if (this.commande.id) {
      this.commandeService.updateCommande(this.commande.id, this.commande).subscribe(
        () => {
          this.router.navigate(['/dashboard/commandes']);
        },
        (error) => {
          console.error('Error updating commande:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la mise à jour de la commande.',
            confirmButtonColor: '#4169E1',
            confirmButtonText: 'OK',
          });
        }
      );
    }
  }

 
  goToStockList(): void {
    this.router.navigate(['/dashboard/stock-list']);
  }
}