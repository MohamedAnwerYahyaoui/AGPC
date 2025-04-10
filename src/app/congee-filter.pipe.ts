import { Pipe, PipeTransform } from '@angular/core';
import { Congee } from 'src/app/Models/congee';


function parseDateDb(dbDate: string | Date): Date | null {
  if (!dbDate) return null;


  if (dbDate instanceof Date) {
    return dbDate;
  }

 
  const isoLike = dbDate.trim().replace(' ', 'T');
  const d = new Date(isoLike);
  return isNaN(d.getTime()) ? null : d;
}

@Pipe({
  name: 'congeeFilter',
  pure: false 
})
export class CongeeFilterPipe implements PipeTransform {
  transform(
    congees: Congee[],
    searchText: string,
    selectedEtat: string,
    filterStartDate: string,
    filterEndDate: string
  ): Congee[] {
    if (!congees) {
      return [];
    }

    let filtered = congees;

   
    if (searchText) {
      const lowerSearch = searchText.toLowerCase();
      filtered = filtered.filter((c) =>
        c.nom?.toLowerCase().includes(lowerSearch)
      );
    }

    if (selectedEtat) {
      filtered = filtered.filter((c) => c.etat === selectedEtat);
    }

    
    const hasStart = !!filterStartDate;
    const hasEnd   = !!filterEndDate;

    if (hasStart && hasEnd) {
      const start = new Date(filterStartDate);
      const end   = new Date(filterEndDate);

      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        filtered = filtered.filter((c) => {
          if (!c.dateDebut || !c.dateFin) return false;
          const dStart = parseDateDb(c.dateDebut);
          const dEnd   = parseDateDb(c.dateFin);
          if (!dStart || !dEnd) return false;
          dStart.setHours(0, 0, 0, 0);
          dEnd.setHours(0, 0, 0, 0);

        
          return dStart >= start && dEnd <= end;
        });
      }
    } else if (hasStart) {
      const start = new Date(filterStartDate);
      if (!isNaN(start.getTime())) {
        start.setHours(0, 0, 0, 0);
        filtered = filtered.filter((c) => {
          if (!c.dateDebut) return false;
          const dStart = parseDateDb(c.dateDebut);
          if (!dStart) return false;
          dStart.setHours(0, 0, 0, 0);
          return dStart >= start;
        });
      }
    } else if (hasEnd) {
      const end = new Date(filterEndDate);
      if (!isNaN(end.getTime())) {
        end.setHours(0, 0, 0, 0);
        filtered = filtered.filter((c) => {
          if (!c.dateFin) return false;
          const dEnd = parseDateDb(c.dateFin);
          if (!dEnd) return false;
          dEnd.setHours(0, 0, 0, 0);
          return dEnd <= end;
        });
      }
    }

    return filtered;
  }
}
