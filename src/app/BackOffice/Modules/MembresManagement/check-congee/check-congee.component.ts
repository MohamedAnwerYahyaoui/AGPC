import { Component } from '@angular/core';
import { congeeService} from 'src/app/services/congee.service';

@Component({
  selector: 'app-check-congee',
  templateUrl: './check-congee.component.html',
  styleUrls: ['./check-congee.component.css']
})
export class CheckCongeeComponent {
  congeeNom!: string; // changé en string
  remainingDays: number | null = null;

  constructor(private congeeService: congeeService) {}

  onCheck() {
    this.congeeService.checkRemainingDaysByNom(this.congeeNom).subscribe({
      next: (days: number) => {
        this.remainingDays = days;
      },
      error: (err: any) => console.error('Erreur checkRemainingDays', err)
    });
  }
}
