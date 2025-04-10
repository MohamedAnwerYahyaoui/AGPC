import { Component, OnInit } from '@angular/core';
import { FactureService } from '../facture.service';
import { Facture } from '../models/facture.model';
import { jsPDF } from 'jspdf';
import Swal from 'sweetalert2';
import { loadScript } from '@paypal/paypal-js';

@Component({
  selector: 'app-facture-list',
  templateUrl: './facture-list.component.html',
  styleUrls: ['./facture-list.component.css']
})
export class FactureListComponent implements OnInit {
  factures: Facture[] = [];
  filteredFactures: Facture[] = [];
  searchTerm: string = '';
  page: number = 1;
  paypal: any;

  constructor(private factureService: FactureService) {}

  async ngOnInit(): Promise<void> {
    this.loadFactures();
    await this.loadPaypalScript();
  }

  async loadPaypalScript(): Promise<void> {
    try {
      this.paypal = await loadScript({
        clientId: "AYUaIrcvF0U6278lpKXc4QzPVm9WEAZMnaMDgn2Y1O9fHjCtLNbIufmEUkSiSr1cMgT8eVyxawu2MnTq",
        currency: "EUR"
      });
    } catch (error) {
      console.error("Erreur lors du chargement de PayPal:", error);
    }
  }

  loadFactures(): void {
    this.factureService.getFactures().subscribe(data => {
      this.factures = data.map(facture => {
        facture.date = new Date(facture.date);
        facture.commande.dateCommande = new Date(facture.commande.dateCommande);
        return facture;
      });
      this.filteredFactures = this.factures;
    });
  }

  deleteFacture(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez-vous vraiment supprimer cette facture ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.factureService.deleteFacture(id).subscribe(() => {
          this.loadFactures();
          Swal.fire('Supprimé !', 'La facture a été supprimée avec succès.', 'success');
        });
      }
    });
  }

  generatePDF(facture: Facture): void {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(144, 12, 63);
    doc.text('TECHROOTS', 105, 20, { align: 'center' });
    doc.setFillColor(6, 218, 228);
    doc.rect(10, 25, 190, 10, 'F');
    doc.setFontSize(12);
    doc.setTextColor(6, 39, 228);
    doc.text('Facture Détails', 105, 30, { align: 'center' });
    const startY = 40;
    doc.setFontSize(12);
    doc.setTextColor(6, 39, 228);
    const tableData = [
      ['Facture ID', facture.id.toString()],
      ['Date', facture.date.toLocaleDateString()],
      ['Total', facture.totalAmount.toFixed(2) + ' EUR'],
      ['Commande ID', facture.commande ? facture.commande.id.toString() : 'N/A']
    ];
    let rowHeight = 10;
    let x = 20;
    let y = startY;
    tableData.forEach((row, index) => {
      doc.setFillColor(240, 240, 240);
      doc.rect(x, y, 170, rowHeight, 'F');
      doc.setTextColor(0, 0, 0);
      doc.text(row[0], x + 5, y + 7);
      doc.text(row[1], x + 90, y + 7);
      y += rowHeight;
    });
    doc.setFontSize(14);
    doc.setTextColor(144, 12, 63);
    doc.text('Merci de faire confiance à TECHROOTS!', 105, y + 10, { align: 'center' });
    doc.setFontSize(8);
    doc.setTextColor(6, 39, 228);
    doc.text('© 2025 TECHROOTS - Tous droits réservés', 105, y + 20, { align: 'center' });
    doc.save(`facture_${facture.id}.pdf`);
  }

  filtrerFactures(): void {
    if (!this.searchTerm) {
      this.filteredFactures = this.factures;
    } else {
      this.filteredFactures = this.factures.filter(facture =>
        facture.id.toString().includes(this.searchTerm) ||
        facture.date.toLocaleDateString().includes(this.searchTerm) ||
        facture.totalAmount.toString().includes(this.searchTerm) ||
        (facture.commande ? facture.commande.id.toString().includes(this.searchTerm) : false)
      );
    }
  }

  openPaypalPopup(facture: Facture): void {
    Swal.fire({
      title: `Paiement de la facture #${facture.id}`,
      html: `<div id="paypal-button-container-${facture.id}" style="margin-top: 20px;"></div>`,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: 'Fermer',
      width: '600px',
      didOpen: () => {
        this.initPaypalPayment(facture);
      },
      willClose: () => {
        // Nettoyage si nécessaire
        const container = document.getElementById(`paypal-button-container-${facture.id}`);
        if (container) container.innerHTML = '';
      }
    });
  }

  initPaypalPayment(facture: Facture): void {
    const containerId = `paypal-button-container-${facture.id}`;

    this.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'blue',
        shape: 'rect',
        label: 'pay'
      },
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: facture.totalAmount.toFixed(2),
              currency_code: "EUR",
              breakdown: {
                item_total: {
                  value: facture.totalAmount.toFixed(2),
                  currency_code: "EUR"
                }
              }
            },
            description: `Paiement de la facture #${facture.id}`,
            items: [{
              name: `Facture #${facture.id}`,
              unit_amount: {
                value: facture.totalAmount.toFixed(2),
                currency_code: "EUR"
              },
              quantity: "1"
            }]
          }]
        });
      },
      onApprove: async (data: any, actions: any) => {
        try {
          const details = await actions.order.capture();
          Swal.fire(
            'Paiement réussi!',
            `Le paiement de ${facture.totalAmount}€ pour la facture #${facture.id} a été effectué.`,
            'success'
          );
          // Ferme automatiquement la pop-up après succès
          Swal.close();
        } catch (err) {
          Swal.fire(
            'Erreur de paiement',
            'Le paiement n\'a pas pu être traité.',
            'error'
          );
        }
      },
      onError: (err: any) => {
        console.error("Erreur PayPal:", err);
        Swal.fire(
          'Erreur technique',
          'Une erreur est survenue lors de la connexion à PayPal.',
          'error'
        );
      }
    }).render(`#${containerId}`);
  }
}