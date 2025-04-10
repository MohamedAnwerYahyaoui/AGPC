import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StockService } from '../stock.service';
import { MaterialsService } from '../materials.service';
import { Materials } from '../models/materials.model';
import { Stock } from '../models/stock.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {
  stock: Partial<Stock> = {
    materiel: undefined,
    currentQuantity: undefined,
    threshold: undefined
  };

  materials: Materials[] = [];
  isEditMode: boolean = false;
  submitted: boolean = false; 
  constructor(
    private stockService: StockService,
    private materialsService: MaterialsService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadStockById(+id);
    }
    this.getMaterials();
  }

  loadStockById(id: number): void {
    this.stockService.getStockById(id).subscribe(
      (data: Stock) => {
        this.stock = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération du stock :', error);
      }
    );
  }

  getMaterials(): void {
    this.materialsService.getMaterials().subscribe(
      (data: Materials[]) => {
        this.materials = data;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des matériels :', error);
      }
    );
  }

  onSubmit(form: NgForm): void {
    this.submitted = true; 

    if (form.invalid) {
      Object.keys(form.controls).forEach((key) => {
        form.controls[key].markAsTouched(); 
      });

      
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez obligatoirement remplir tous les champs.',
        confirmButtonColor: '#4169E1', 
        confirmButtonText: 'OK'
      });

      return; 
    }

   
    if (this.stock.currentQuantity! < this.stock.threshold!) {
      
      Swal.fire({
        icon: 'warning',
        title: 'Stock insuffisant',
        text: 'Veuillez vérifier le stock et accéder aux commandes.',
        confirmButtonColor: '#4169E1', 
        confirmButtonText: 'Accéder aux commandes',
        showCancelButton: true,
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          
          this.router.navigate(['/dashboard/commande/add']);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          
          this.addStock(form);
        }
      });

      return; 
    }

    
    this.addStock(form);
  }

  
  addStock(form: NgForm): void {
    const stockToSend: Stock = {
      materiel: this.stock.materiel!,
      currentQuantity: this.stock.currentQuantity || 0,
      threshold: this.stock.threshold || 0
    };

    if (this.isEditMode && this.stock.id) {
      this.stockService.updateStock(this.stock.id, stockToSend).subscribe(
        (response) => {
          this.router.navigate(['/dashboard/stock-list']);
        },
        (error) => {
          console.error('Erreur lors de la modification du stock :', error);
        }
      );
    } else {
      this.stockService.createStock(stockToSend).subscribe(
        (response: any) => {
          form.resetForm(); 
          this.stock = { materiel: undefined, currentQuantity: undefined, threshold: undefined };
          this.submitted = false; 
          this.router.navigate(['/dashboard/stock-list']);
        },
        (error: any) => {
          console.error('Erreur lors de l’ajout du stock :', error);
        }
      );
    }
  }
}