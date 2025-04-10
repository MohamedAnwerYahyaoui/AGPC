import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chantier } from '../../../models/Chantier';
import { ChantierService } from '../../../Services/chantier.service';

@Component({
  selector: 'app-update-chantier',
  templateUrl: './update-chantier.component.html',
  styleUrls: ['./update-chantier.component.css']
})
export class UpdateChantierComponent implements OnInit {
  chantierForm: FormGroup;
  chantierId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  private chantierService: ChantierService
  ) {
    this.chantierForm = this.fb.group({
      nom: ['', Validators.required],
      location: ['', Validators.required]
    });
    this.chantierId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadChantierDetails();
  }

  loadChantierDetails(): void {
    this.chantierService.getChantierById(this.chantierId).subscribe((chantier: Chantier) => {
      this.chantierForm.patchValue(chantier);
    });
  }

  onSubmit(): void {
    if (this.chantierForm.valid) {
      this.chantierService.updateChantier(this.chantierId, this.chantierForm.value).subscribe(() => {
        this.router.navigate(['/dashboard/environnement/list']);
      });
    }
  }
}