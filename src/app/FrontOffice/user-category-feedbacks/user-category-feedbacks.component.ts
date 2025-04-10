import { Component, OnInit } from '@angular/core';
import { CategoryFeedback } from 'src/app/modelsChaima/category-feedback';
import { CategoryFeedbackService } from 'src/app/servicesChaima/category-feedback.service';
import { UserService } from 'src/app/servicesChaima/user-service.service';


@Component({
  selector: 'app-user-category-feedbacks',
  templateUrl: './user-category-feedbacks.component.html',
  styleUrls: ['./user-category-feedbacks.component.css']
})
export class UserCategoryFeedbacksComponent implements OnInit {
  categories = [
    'Fournisseur', 'Stock', 'Livrable', 'Assurance',
    'Document', 'Environnement', 'Formation', 'Notification'
  ];
  categoryRatings: { [key: string]: number } = {};
  userId: number | null = null;
  averageRatings: { [key: string]: number } = {};

  constructor(
    private feedbackService: CategoryFeedbackService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = this.userService.getUserId();

    this.categories.forEach(cat => {
      this.categoryRatings[cat] = 0;
    });

    if (this.userId) {
      this.feedbackService.getUserFeedbacks(this.userId).subscribe(data => {
        data.forEach(fb => {
          this.categoryRatings[fb.category] = fb.note;
        });
      });
    }

    this.feedbackService.getAverageRatings().subscribe(data => {
      this.averageRatings = data;
    });    
  }

  setRating(category: string, rating: number) {
    this.categoryRatings[category] = rating;
  }

  submitAllFeedbacks() {
    if (!this.userId) return;
  
    this.categories.forEach(category => {
      const rating = this.categoryRatings[category];
      if (rating > 0) {
        const feedback: CategoryFeedback = {
          id: 0,
          category: category, // ✅ must be a string
          note: rating,       // ✅ must be number > 0
          employee: { id: this.userId } as any
        };
        console.log('Sending feedback:', feedback);

        this.feedbackService.createFeedback(feedback).subscribe();
      }
    });
  }   
}
