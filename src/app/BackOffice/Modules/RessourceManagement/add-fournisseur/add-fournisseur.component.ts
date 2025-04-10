import { Component, OnInit } from '@angular/core';
import { FournisseurService } from '../fournisseur.service';
import { Fournisseur } from '../models/fournisseur.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; 
import { parsePhoneNumberFromString } from 'libphonenumber-js'; 
@Component({
  selector: 'app-add-fournisseur',
  templateUrl: './add-fournisseur.component.html',
  styleUrls: ['./add-fournisseur.component.css'],
})
export class AddFournisseurComponent implements OnInit {
  fournisseur: Fournisseur = new Fournisseur(); 
  detectedCountry: string = ''; 

  constructor(
    private fournisseurService: FournisseurService,
    public router: Router
  ) {}

  ngOnInit(): void {}

 
  onSubmit(fournisseurForm: any): void {
    
    fournisseurForm.form.markAllAsTouched();
  
    if (fournisseurForm.invalid) {
      
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez remplir tous les champs obligatoires.',
        confirmButtonColor: '#007bff',
      });
      return; 
    }
  
   
    this.fournisseurService.createFournisseur(this.fournisseur).subscribe({
      next: (newFournisseur) => {
        console.log('Fournisseur ajouté avec succès :', newFournisseur);
        this.router.navigate(['/dashboard/list-fournisseurs']);
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du fournisseur', error);
      },
    });
  }
 
  suggestNameFromEmail(email: string): void {
    if (email && email.includes('@')) {
      const nameSuggestion = email.split('@')[0]; 
      this.fournisseur.name = nameSuggestion.charAt(0).toUpperCase() + nameSuggestion.slice(1); 

      
      Swal.fire({
        icon: 'info',
        title: 'Nom suggéré',
        text: `Le nom "${this.fournisseur.name}" a été suggéré à partir de l'adresse e-mail.`,
        confirmButtonColor: '#007bff',
        timer: 3000, 
      });
    }
  }

  
  detectCountryFromPhoneNumber(phoneNumber: string): void {
    if (phoneNumber) {
      const phoneNumberObj = parsePhoneNumberFromString(phoneNumber); 
      if (phoneNumberObj && phoneNumberObj.country) {
        this.detectedCountry = phoneNumberObj.country; 
        Swal.fire({
          icon: 'info',
          title: 'Pays détecté',
          text: `Le pays associé à ce numéro est : ${this.detectedCountry}`,
          confirmButtonColor: '#007bff',
          timer: 3000, 
        });
      } else {
        this.detectedCountry = ''; 
      }
    }
  }
}