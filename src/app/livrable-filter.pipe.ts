import { Pipe, PipeTransform } from '@angular/core';
import { Livrable } from 'src/app/Models/Livrable';

@Pipe({
  name: 'livrableFilter',
  pure: false // Permet de réévaluer le pipe à chaque changement
})
export class LivrableFilterPipe implements PipeTransform {
  transform(livrables: Livrable[], searchText: string): Livrable[] {
    if (!livrables) return [];
    if (!searchText) return livrables;

    const lowerSearch = searchText.toLowerCase();

    // Filtrage par nom
    return livrables.filter(l => 
      l.nom?.toLowerCase().includes(lowerSearch)
    );
  }
}
