import { Component, OnInit } from '@angular/core';
import { BudgetServiceService } from '../../Services/budget-service.service';
import { expences } from '../../models/Expences';
import { ExchangeRateService } from '../../Services/exchange-rate.service';

@Component({
  selector: 'app-list-expences',
  templateUrl: './list-expences.component.html',
  styleUrls: ['./list-expences.component.css']
})
export class ListExpencesComponent implements OnInit {
  expences: expences[] = [];
  searchCategory: string = '';
  exchangeRates: any = {};
  selectedCurrency: string = 'TND';

  constructor(private rs: BudgetServiceService, private exchangeRateService: ExchangeRateService) { }

  ngOnInit(): void {
    this.getAllExpences();
    this.getExchangeRates();
  }

  getAllExpences() {
    this.rs.getExpences().subscribe(response => {
      this.expences = response;
    });
  }

  getExchangeRates() {
    this.exchangeRateService.getExchangeRates().subscribe(response => {
      this.exchangeRates = response.conversion_rates;
    });
  }

  deleteExpences(id: number): void {
    if (confirm("Voulez-vous vraiment supprimer ce Expence ?")) {
      this.rs.deleteExpences(id).subscribe(() => {
        this.getAllExpences(); // Recharge la liste des budgets après suppression
      }, error => {
        console.error("Erreur lors de la suppression du Expence", error);
      });
    }
  }

  filteredExpences(): expences[] {
    return this.expences.filter(expence =>
      expence.category.toLowerCase().includes(this.searchCategory.toLowerCase())
    );
  }

  convertCurrency(montant: number): number {
    if (this.selectedCurrency === 'TND') {
      return montant;
    }
    return montant * this.exchangeRates[this.selectedCurrency];
  }
}