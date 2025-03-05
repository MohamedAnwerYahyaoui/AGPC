import { Component, OnInit, Inject } from '@angular/core';
import { Zones } from '../../models/Zones';
import { ChantierService } from '../../Services/chantier.service';

@Component({
  selector: 'app-list-zones',
  templateUrl: './list-zones.component.html',
  styleUrls: ['./list-zones.component.css']
})
export class ListZonesComponent implements OnInit {
  zones: Zones[] = [];
  page: number = 1;
  constructor( private ChantierService: ChantierService) { }

  ngOnInit(): void {
    this.loadZones();
  }

  loadZones(): void {
    this.ChantierService.getZone().subscribe((data: Zones[]) => {
      this.zones = data;
    });
  }

  deleteZone(id: number): void {
    if (confirm("Voulez-vous vraiment supprimer cette zone ?")) {
      this.ChantierService.deleteZone(id).subscribe(() => {
        this.loadZones(); // Reload the list after deletion
      }, error => {
        console.error("Erreur lors de la suppression de la zone", error);
      });
    }
  }
}
