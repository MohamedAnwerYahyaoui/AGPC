import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChantierService } from '../../Services/chantier.service';
import { Chantier } from '../../models/Chantier';
import { User } from '../../models/User';

@Component({
  selector: 'app-add-zone',
  templateUrl: './add-zone.component.html',
  styleUrls: ['./add-zone.component.css']
})
export class AddZoneComponent implements OnInit {
  zoneForm: FormGroup;
  chantiers: Chantier[] = [];
  users: User[] = [];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ChantierService: ChantierService,
  ) {
    this.zoneForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      chantier: [null, Validators.required],
      user: [null, Validators.required]

    });
  }

  ngOnInit(): void {
    this.loadChantiers();
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
      this.ChantierService.addZone(this.zoneForm.value).subscribe(() => {
        this.router.navigate(['/dashboard/environnement/listZones']);
      });
    }
  }
}