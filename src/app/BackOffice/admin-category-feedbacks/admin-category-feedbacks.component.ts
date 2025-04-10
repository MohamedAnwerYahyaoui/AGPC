import { Component, OnInit } from '@angular/core';
import { CategoryFeedback } from 'src/app/modelsChaima/category-feedback';
import { CategoryFeedbackService } from 'src/app/servicesChaima/category-feedback.service';


@Component({
  selector: 'app-admin-category-feedbacks',
  templateUrl: './admin-category-feedbacks.component.html',
  styleUrls: ['./admin-category-feedbacks.component.css']
})
export class AdminCategoryFeedbacksComponent implements OnInit {
  feedbacks: CategoryFeedback[] = [];
  averageRatings: { [key: string]: number } = {};
  categoryNames: string[] = [
    'Fournisseur', 'Stock', 'Livrable', 'Assurance',
    'Document', 'Environnement', 'Formation', 'Notification'
  ];  

  constructor(private feedbackService: CategoryFeedbackService) {}

  ngOnInit(): void {
    this.feedbackService.getAverageRatings().subscribe(data => {
      this.averageRatings = data;
    });
  }

  getRoundedRating(value: number | undefined): number {
    return Math.round(value || 0);
  }
  

}
