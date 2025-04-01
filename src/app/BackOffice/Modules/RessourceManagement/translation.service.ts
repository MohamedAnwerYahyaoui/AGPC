import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  // Cache simple pour les traductions
  private translationCache = new Map<string, string>();

  constructor(private http: HttpClient) {}

  translate(text: string, targetLang: string): Observable<string> {
    // 1. Vérifiez le cache d'abord
    const cacheKey = `${targetLang}:${text}`;
    if (this.translationCache.has(cacheKey)) {
      return of(this.translationCache.get(cacheKey)!);
    }

    // 2. Si vide, retournez le texte original
    if (!text?.trim()) return of(text);

    // 3. Envoyez la requête
    return this.http.post<any>(
      'http://localhost:8089/AGPC/api/translate',
      { text, target: targetLang },
      { headers: { 'Content-Type': 'application/json' } }
    ).pipe(
      tap(response => console.log('Réponse complète:', response)),
      map(response => {
        // 4. Gestion des erreurs
        if (response.error) {
          console.error('Erreur backend:', response.error);
          throw new Error(response.message);
        }

        // 5. Mettez en cache le résultat
        const translated = response.translatedText || text;
        this.translationCache.set(cacheKey, translated);
        return translated;
      }),
      catchError(error => {
        console.error('Erreur HTTP:', error);
        // 6. Fallback local pour les textes communs
        const fallback = this.getFallbackTranslation(text, targetLang);
        return of(fallback);
      })
    );
  }

  private getFallbackTranslation(text: string, lang: string): string {
    const translations: Record<string, Record<string, string>> = {
      fr: {
        'Home': 'Accueil',
        'About': 'À propos',
        'Solutions': 'Solutions',
        'Projects': 'Projets',
        'Sign In': 'Connexion'
      },
      es: {
        'Home': 'Inicio',
        'About': 'Acerca de',
        'Solutions': 'Soluciones',
        'Projects': 'Proyectos',
        'Sign In': 'Iniciar sesión'
      }
    };

    return translations[lang]?.[text] || text;
  }
}