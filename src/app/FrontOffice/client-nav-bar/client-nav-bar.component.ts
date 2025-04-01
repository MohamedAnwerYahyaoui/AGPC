import { Component } from '@angular/core';
import { TranslationService } from 'src/app/BackOffice/Modules/RessourceManagement/translation.service';
@Component({
  selector: 'app-client-nav-bar',
  templateUrl: './client-nav-bar.component.html',
  styleUrls: ['./client-nav-bar.component.css']
})
export class ClientNavBarComponent {
  showLanguageMenu = false;
  currentLanguage = 'EN';
  isTranslating = false;
  
  languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' }
  ];

  // Liste des éléments à traduire avec leurs IDs
  navItems = [
    { id: 'home-link', default: 'Home' },
    { id: 'about-link', default: 'About' },
    { id: 'solutions-link', default: 'Solutions' },
    { id: 'projects-link', default: 'Projects' },
    { id: 'signin-link', default: 'Sign In' }
  ];

  constructor(private translationService: TranslationService) {}

  toggleLanguageMenu(): void {
    this.showLanguageMenu = !this.showLanguageMenu;
  }

  changeLanguage(langCode: string): void {
    if (this.isTranslating) return;
    
    this.currentLanguage = langCode.toUpperCase();
    this.showLanguageMenu = false;
    this.translateNavigation();
  }

  private translateNavigation(): void {
    this.isTranslating = true;
    
    // Traduisez chaque élément un par un avec un délai
    this.navItems.forEach((item, index) => {
      setTimeout(() => {
        const element = document.getElementById(item.id);
        if (element) {
          this.translationService.translate(item.default, this.currentLanguage.toLowerCase())
            .subscribe({
              next: (translation) => {
                element.textContent = translation;
                console.log(`Traduit ${item.default} -> ${translation}`);
              },
              error: (err) => {
                console.error(`Erreur pour ${item.id}:`, err);
                element.textContent = item.default;
              },
              complete: () => {
                if (index === this.navItems.length - 1) {
                  this.isTranslating = false;
                }
              }
            });
        }
      }, index * 200); // Délai progressif pour éviter les blocages
    });
  }
}