import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false // si vous avez besoin de réévaluer le pipe à chaque changement
})
export class FilterPipe implements PipeTransform {

  transform(
    items: any[],
    searchText: string,
    selectedContrat?: number | string,
    selectedEquipe?: number | string
  ): any[] {
    if (!items) return [];
    const search = searchText ? searchText.toLowerCase() : '';

    return items.filter(item => {
      // Filtre par texte
      const matchesSearch = !search || (
        (item.nom && item.nom.toLowerCase().includes(search)) ||
        (item.prenom && item.prenom.toLowerCase().includes(search)) ||
        (item.poste && item.poste.toLowerCase().includes(search)) ||
        (item.email && item.email.toLowerCase().includes(search))
      );

      // Filtre par contrat
      const matchesContrat = !selectedContrat ||
        (item.contrat && item.contrat.id == selectedContrat);

      // Filtre par équipe
      const matchesEquipe = !selectedEquipe ||
        (item.equipe && item.equipe.id == selectedEquipe);

      return matchesSearch && matchesContrat && matchesEquipe;
    });
  }

}
