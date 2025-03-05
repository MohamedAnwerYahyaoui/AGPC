import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChantierService } from '../../Services/chantier.service';
import { Chantier } from '../../models/Chantier';
import { Zones } from '../../models/Zones';
import { User } from '../../models/User';

@Component({
  selector: 'app-update-zone',
  templateUrl: './update-zone.component.html',
  styleUrls: ['./update-zone.component.css']
})
export class UpdateZoneComponent implements OnInit {
  zoneForm: FormGroup;
  zoneId: number;
  chantiers: Chantier[] = [];
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ChantierService: ChantierService
  ) {
    this.zoneForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      chantier: [null, Validators.required],
      user: [null, Validators.required]
    });
    this.zoneId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadZoneDetails();
    this.loadChantiers();
  }

  loadZoneDetails(): void {
    this.ChantierService.getZoneById(this.zoneId).subscribe((zone: Zones) => {
      this.zoneForm.patchValue(zone);
    });
  }

  loadChantiers(): void {
    this.ChantierService.getChantier().subscribe((data: Chantier[]) => {
      this.chantiers = data;
    });

    this.ChantierService.getUser().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  onSubmit(): void {
    if (this.zoneForm.valid) {
      this.ChantierService.updateZone(this.zoneId, this.zoneForm.value).subscribe(() => {
        this.router.navigate(['/dashboard/environnement/listZones']);
      });
    }
  }
}
