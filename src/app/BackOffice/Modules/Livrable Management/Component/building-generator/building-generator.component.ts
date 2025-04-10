
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import {BuildingModel} from "../../Model/building.model";
import {BuildingService} from "../../Service/building.service";
import {Building3dService} from "../../Service/building3d.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-building-generator',
  templateUrl: './building-generator.component.html',
  styleUrls: ['./building-generator.component.css']
})
export class BuildingGeneratorComponent implements AfterViewInit {
  @ViewChild('buildingCanvas') canvasRef!: ElementRef;

  buildingForm: FormGroup;
  showHelp = false;
  isLoading = false;

  buildingTypes = ['Maison', 'Immeuble', 'Bureau'];
  architecturalStyles = ['Moderne', 'Classique', 'Industriel'];

  constructor(
    private fb: FormBuilder,
    private building3dService: Building3dService
  ) {
    this.buildingForm = this.fb.group({
      buildingType: ['Maison', Validators.required],
      length: [10, [Validators.required, Validators.min(1)]],
      width: [8, [Validators.required, Validators.min(1)]],
      floorCount: [2, [Validators.required, Validators.min(1), Validators.max(10)]],
      floorHeight: [3, [Validators.required, Validators.min(2), Validators.max(5)]],
      roomCount: [5, [Validators.required, Validators.min(1)]],
      architecturalStyle: ['Moderne', Validators.required]
    });

    this.buildingForm.valueChanges.subscribe(() => {
      if (this.buildingForm.valid) {
        this.generateBuilding();
      }
    });
  }

  ngAfterViewInit(): void {
    this.building3dService.initializeScene(this.canvasRef);
    this.generateBuilding();
  }
/*
  generateBuilding(): void {
    if (this.buildingForm.invalid) return;

    this.isLoading = true;
    const formData = this.buildingForm.value;
    const buildingData = {
      ...formData,
      height: formData.floorCount * formData.floorHeight,
      roofType: formData.buildingType === 'Maison' ? 'Sloped' : 'Flat',
      roomsPerFloor: this.calculateRoomsPerFloor(formData.roomCount, formData.floorCount)
    };

    setTimeout(() => {
      this.building3dService.generateBuilding(buildingData);
      this.isLoading = false;
    }, 100);
  }
*/


  generateBuilding(): void {
    const buildingData = {
      ...this.buildingForm.value,
      height: this.buildingForm.value.floorCount * this.buildingForm.value.floorHeight,
      roofType: this.buildingForm.value.buildingType === 'Maison' ? 'Sloped' : 'Flat',
      roomsPerFloor: this.calculateRoomsPerFloor(),
      roomColors: [0xFF5733, 0x33FF57, 0x3357FF, 0xF1C40F] // Couleurs personnalisées
    };

    this.building3dService.generateBuilding(buildingData);
  }

  private calculateRoomsPerFloor(): { [key: number]: number } {
    const rooms: { [key: number]: number } = {};
    let remaining = this.buildingForm.value.roomCount;

    for (let i = 1; i <= this.buildingForm.value.floorCount; i++) {
      rooms[i] = Math.min(remaining, Math.max(4, Math.ceil(this.buildingForm.value.roomCount / this.buildingForm.value.floorCount)));
      remaining -= rooms[i];
    }

    return rooms;
  }




  /*   youfa lahnee */
  /*
  private calculateRoomsPerFloor(totalRooms: number, floors: number): { [key: number]: number } {
    const rooms: { [key: number]: number } = {};
    let remaining = totalRooms;

    for (let i = 1; i <= floors; i++) {
      rooms[i] = Math.min(remaining, Math.max(4, Math.ceil(totalRooms / floors)));
      remaining -= rooms[i];
    }

    return rooms;
  }
*/
  resetCamera(): void {
    this.building3dService.resetCamera();
  }

  toggleWireframe(): void {
    this.building3dService.toggleWireframe();
  }

  toggleHelp(): void {
    this.showHelp = !this.showHelp;
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.building3dService.onResize(this.canvasRef);
  }










  async exportPlan(): Promise<void> {
    try {
      const { model, details } = await this.building3dService.exportBuilding();

      // Télécharger le modèle
      this.downloadFile(model, 'building-model.glb');

      // Télécharger les détails
      this.downloadFile(
        new Blob([details], { type: 'application/json' }),
        'building-details.json'
      );

      this.showExportSuccess();
    } catch (error) {
      this.showExportError(error);
    }
  }

  private downloadFile(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  private showExportSuccess(): void {
    // Utilisez votre système de notification préféré
    alert('Export réussi ! Deux fichiers ont été téléchargés.');
  }

  private showExportError(error: any): void {
    console.error('Export error:', error);
    alert('Erreur lors de l\'export : ' + error.message);
  }

}