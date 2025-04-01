// language-selector.component.ts
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  template: `
    <div class="language-selector">
      <button mat-icon-button [matMenuTriggerFor]="languageMenu">
        <mat-icon>translate</mat-icon>
      </button>
      <mat-menu #languageMenu="matMenu">
        <button mat-menu-item (click)="changeLanguage('fr')">
          <span class="fi fi-fr"></span> Français
        </button>
        <button mat-menu-item (click)="changeLanguage('en')">
          <span class="fi fi-gb"></span> English
        </button>
        <button mat-menu-item (click)="changeLanguage('ar')">
          <span class="fi fi-sa"></span> العربية
        </button>
      </mat-menu>
    </div>
  `,
  styles: [`
    .language-selector {
      margin: 0 10px;
      display: inline-block;
    }
    .fi {
      margin-right: 8px;
      border: 1px solid #ddd;
    }
  `]
})
export class LanguageSelectorComponent {
  constructor(private translate: TranslateService) {}

  changeLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('userLanguage', language);
  }
}