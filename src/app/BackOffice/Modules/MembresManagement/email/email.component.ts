import { Component } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {
  to!: string;
  subject!: string;
  body!: string;
  message!: string;

  constructor(private emailService: EmailService) { }

  sendEmail() {
    this.emailService.sendEmail(this.to, this.subject, this.body)
      .subscribe({
        next: (response) => {
          this.message = response; // "Email sent successfully!"
        },
        error: (err) => {
          this.message = 'Error sending email: ' + err.message;
        }
      });
  }

}
