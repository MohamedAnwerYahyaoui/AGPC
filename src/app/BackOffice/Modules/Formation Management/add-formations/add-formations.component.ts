import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormationService } from '../formation.service';
import { Formation } from '../models/formation';

@Component({
  selector: 'app-add-formations',
  templateUrl: './add-formations.component.html',
  styleUrls: ['./add-formations.component.css']
})
export class AddFormationsComponent implements OnInit {
  formationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formationService: FormationService
  ) {
    this.formationForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.formationForm.valid) {
      this.formationService.addFormation(this.formationForm.value).subscribe(() => {
        this.router.navigate(['/dashboard/formation/list']);
      });
    }
  }
}
