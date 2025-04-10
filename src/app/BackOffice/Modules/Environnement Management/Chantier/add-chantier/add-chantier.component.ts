import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChantierService } from '../../Services/chantier.service';
import { Chantier } from '../../models/Chantier';

@Component({
  selector: 'app-add-chantier',
  templateUrl: './add-chantier.component.html',
  styleUrls: ['./add-chantier.component.css']
})
export class AddChantierComponent implements OnInit {
  chantierForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private chantierService: ChantierService
  ) {
    this.chantierForm = this.fb.group({
      nom: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.chantierForm.valid) {
      this.chantierService.addChantier(this.chantierForm.value).subscribe(() => {
        this.router.navigate(['/dashboard/environnement/list']);
      });
    }
  }
}