import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialsService } from '../materials.service';
import { Materials, Categorie } from './../models/materials.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent {
  @ViewChild('materialForm') materialForm!: NgForm;

  material: Materials = {
    name: '',
    quantity: 1,
    unitPrice: 0,
    categorie: Categorie.BOIS, 
  };

  categories = Object.values(Categorie);
  suggestedCategory: string | null = null; 
  suggestionExplanation: string | null = null; 
  explanation: string | null = null;
  isThinking: boolean = false; 

  constructor(
    private materialsService: MaterialsService,
    private router: Router,
    private http: HttpClient
  ) {}
  suggestCategory(): void {
    if (this.material.name.trim().length > 0) {
      this.isThinking = true; 
  
      const name = this.material.name.toLowerCase();
      let suggestedCategory: string | null = null;
      let suggestionExplanation: string | null = null;
  
     
      const boisKeywords = [
        'bois', 'planche', 'contreplaqué', 'lamellé-collé', 'osb', 'mdf', 
        'panneau de fibres', 'bois massif', 'bois traité', 'bois dur', 
        'bois tendre', 'bois de charpente', 'bois de construction', 
        'bois d’œuvre', 'bois exotique', 'bois composite'
      ];
      if (boisKeywords.some(keyword => name.includes(keyword))) {
        suggestedCategory = Categorie.BOIS;
        suggestionExplanation = 'Le matériau semble être en bois ou dérivé du bois.';
      }
  
      const acierKeywords = [
        'acier', 'acier galvanisé', 'acier inoxydable', 'tole d’acier', 
        'treillis métallique', 'poutre en acier', 'profilé en acier', 
        'acier de construction', 'ferraillage', 'acier carbone', 
        'acier corten', 'acier laminé', 'acier trempé'
      ];
      if (acierKeywords.some(keyword => name.includes(keyword))) {
        suggestedCategory = Categorie.ACIER;
        suggestionExplanation = 'Le matériau semble être en acier ou dérivé de l’acier.';
      }
  
    
      const plastiqueKeywords = [
        'plastique', 'pvc', 'polycarbonate', 'polyéthylène', 'polystyrène', 
        'polypropylène', 'composite plastique', 'nylon', 'plexiglas', 
        'acrylique', 'résine', 'fibre de verre', 'polyuréthane', 'téflon'
      ];
      if (plastiqueKeywords.some(keyword => name.includes(keyword))) {
        suggestedCategory = Categorie.PLASTIQUE;
        suggestionExplanation = 'Le matériau semble être en plastique ou dérivé du plastique.';
      }
  
     
      const cimentKeywords = [
        'ciment', 'béton', 'mortier', 'béton armé', 'béton préfabriqué', 
        'béton cellulaire', 'ciment prompt', 'bloc de béton', 'dalle en béton', 
        'enduit en ciment', 'chape en ciment', 'béton léger', 'béton fibré'
      ];
      if (cimentKeywords.some(keyword => name.includes(keyword))) {
        suggestedCategory = Categorie.CIMENT;
        suggestionExplanation = 'Le matériau semble être en ciment ou dérivé du ciment.';
      }
  
      
      if (!suggestedCategory) {
        suggestedCategory = null;
        suggestionExplanation = 'Aucune catégorie correspondante trouvée.';
      }
  
     
      setTimeout(() => {
        this.isThinking = false;
        this.suggestedCategory = suggestedCategory;
        this.suggestionExplanation = suggestionExplanation;
      }, 1000); 
    }
  }

  
  applySuggestedCategory(): void {
    if (this.suggestedCategory) {
      this.material.categorie = this.suggestedCategory as Categorie;
      this.suggestedCategory = null;
      this.suggestionExplanation = null;
    }
  }
 
  parseSuggestion(result: string): [string, string] {
    const parts = result.split('.');
    if (parts.length >= 2) {
      const suggestedCategory = parts[0].trim();
      const explanation = parts.slice(1).join('.').trim();
      return [suggestedCategory, explanation];
    }
    return ['', '']; }
    
  addMaterial(): void {
    if (this.materialForm?.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez remplir tous les champs obligatoires correctement.',
      });
      this.materialForm.control.markAllAsTouched();
      return;
    }

    this.materialsService.addMaterial(this.material).subscribe({
      next: (newMaterial) => {
        console.log('Matériau ajouté avec succès :', newMaterial);
        this.router.navigate(['/dashboard/list-materials']);
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du matériau :', err);
      },
    });
  }
}