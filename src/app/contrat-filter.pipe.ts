import { Pipe, PipeTransform } from '@angular/core';
import { Contrat } from 'src/app/Models/Contrat';


function parseDateFr(dateStr: string): Date | null {
  if (!dateStr) return null;
  dateStr = dateStr.trim();
  const parts = dateStr.split('/');
  if (parts.length !== 3) return null;
  
  const jour = parseInt(parts[0], 10);
  const mois = parseInt(parts[1], 10) - 1; // Les mois commencent à 0
  const annee = parseInt(parts[2], 10);

  if (isNaN(jour) || isNaN(mois) || isNaN(annee)) return null;

  return new Date(annee, mois, jour);
}


function parseDateDb(dbDateStr: string): Date | null {
  if (!dbDateStr) return null;
  
 
  const isoLikeStr = dbDateStr.replace(' ', 'T');
  const d = new Date(isoLikeStr);
  return isNaN(d.getTime()) ? null : d;
}

@Pipe({
  name: 'contractFilter',
  pure: false // Important pour réévaluer le pipe à chaque changement
})
export class ContractFilterPipe implements PipeTransform {

  transform(
    contrats: Contrat[],
    searchText: string,
    selectedType?: string,
    filterStartDate?: string, // "jj/mm/aaaa"
    filterEndDate?: string    // "jj/mm/aaaa"
  ): Contrat[] {
    if (!contrats) {
      return [];
    }

    let filtered = contrats;

    // 1) Filtrage par texte (ex. sur le type de contrat)
    if (searchText) {
      const search = searchText.toLowerCase();
      filtered = filtered.filter((c) =>
        c.contrat && c.contrat.toLowerCase().includes(search)
      );
    }

    // 2) Filtrage par type de contrat
    if (selectedType) {
      filtered = filtered.filter((c) => c.contrat === selectedType);
    }

    // 3) Filtrage strict par intervalle de dates
    //    Le contrat doit être ENTIEREMENT dans [start, end].
    //    => (dateDebut >= start) && (dateFin <= end)
    //    Si l'utilisateur ne saisit qu'une seule date, on applique seulement le filtre correspondant.

    const start = filterStartDate ? parseDateFr(filterStartDate) : null;
    const end   = filterEndDate   ? parseDateFr(filterEndDate)   : null;

    // On neutralise l'heure pour comparer uniquement les dates
    if (start) {
      start.setHours(0, 0, 0, 0);
    }
    if (end) {
      end.setHours(0, 0, 0, 0);
    }

    if (start && end) {
      // Inclusion stricte dans [start, end]
      filtered = filtered.filter((c) => {
        if (!c.dateDebut || !c.dateFin) return false;

        const dStart = parseDateDb(c.dateDebut);
        const dEnd   = parseDateDb(c.dateFin);
        if (!dStart || !dEnd) return false;

        dStart.setHours(0, 0, 0, 0);
        dEnd.setHours(0, 0, 0, 0);

        // Condition stricte
        return dStart >= start && dEnd <= end;
      });
    } 
    else if (start) {
      // L'utilisateur n'a saisi que la date de début
      filtered = filtered.filter((c) => {
        if (!c.dateDebut) return false;
        const dStart = parseDateDb(c.dateDebut);
        if (!dStart) return false;

        dStart.setHours(0, 0, 0, 0);
        // On filtre les contrats qui commencent après (ou le jour même) 'start'
        return dStart >= start;
      });
    } 
    else if (end) {
      // L'utilisateur n'a saisi que la date de fin
      filtered = filtered.filter((c) => {
        if (!c.dateFin) return false;
        const dEnd = parseDateDb(c.dateFin);
        if (!dEnd) return false;

        dEnd.setHours(0, 0, 0, 0);
        // On filtre les contrats qui finissent avant (ou le jour même) 'end'
        return dEnd <= end;
      });
    }

    return filtered;
  }
}
