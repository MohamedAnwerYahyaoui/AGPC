import { Pipe, PipeTransform } from '@angular/core';
import { Equipe } from 'src/app/Models/Equipe';

@Pipe({
  name: 'equipeFilter',
  pure: false // réévaluation à chaque changement
})
export class EquipeFilterPipe implements PipeTransform {

  transform(
    equipes: Equipe[],
    searchTerm: string,
    selectedLivrable: string // par exemple, l'ID du livrable sous forme de string
  ): Equipe[] {
    if (!equipes) return [];
    
    // 1) Filtre par recherche texte (nom, contact, livrable.nom)
    let filtered = equipes;
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(eq => {
        const matchNom       = eq.nom?.toLowerCase().includes(lower);
        const matchContact   = eq.contactEquipe?.toLowerCase().includes(lower);
        const matchLivrable  = eq.livrable?.nom?.toLowerCase().includes(lower);
        return matchNom || matchContact || matchLivrable;
      });
    }

    // 2) Filtre par livrable_id
    //    si selectedLivrable n'est pas vide
    if (selectedLivrable) {
      // on compare eq.livrable_id à selectedLivrable (converti en number)
      const livId = +selectedLivrable; // parse en number
      filtered = filtered.filter(eq => eq.livrable_id === livId);
    }

    return filtered;
  }
}
