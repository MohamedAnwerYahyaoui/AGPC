import { Pipe, PipeTransform } from '@angular/core';
import { Stock } from '../BackOffice/Modules/RessourceManagement/models/stock.model';

@Pipe({
  name: 'searchFilter'
})
export class SearchPipe implements PipeTransform {
  transform(stocks: Stock[], searchTerm: string): Stock[] {
    if (!stocks || !searchTerm) {
      return stocks;
    }
    
    searchTerm = searchTerm.toLowerCase();

    return stocks.filter(stock =>
      stock.id?.toString().includes(searchTerm) ||
      stock.materiel.name.toLowerCase().includes(searchTerm) ||
      stock.currentQuantity.toString().includes(searchTerm) ||
      stock.threshold.toString().includes(searchTerm)
    );
  }
}
