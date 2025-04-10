import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/modelsChaima/feedback';
import { FeedbackService } from 'src/app/servicesChaima/feedback.service';
import { UserService } from 'src/app/servicesChaima/user-service.service';


@Component({
  selector: 'app-user-feedbacks',
  templateUrl: './user-feedbacks.component.html',
  styleUrls: ['./user-feedbacks.component.css']
})
export class UserFeedbacksComponent implements OnInit {
  feedbacks: Feedback[] = [];
  newNote: number = 0;
  selectedFeedback: Feedback | null = null;
  updatedNote: number = 0;
  userId: number | null = null;

  constructor(
    private feedbackService: FeedbackService, 
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    if (this.userId) {
        this.loadUserFeedbacks(this.userId);
    }
  }

  loadUserFeedbacks(userId: number) {
    this.feedbackService.getUserFeedbacks(userId).subscribe(data => {
        this.feedbacks = data;
    });
  }

  addFeedback() {
    if (this.newNote && this.userId) {
        const feedbackData: Feedback = {
            id: 0,
            note: this.newNote,
            employee: { id: this.userId } as any
        };

        this.feedbackService.createFeedback(feedbackData).subscribe(() => {
            this.loadUserFeedbacks(this.userId!);
            this.newNote = 0;
        });
    }
  }

  deleteFeedback(id: number) {
    if (this.userId) {
      this.feedbackService.deleteFeedback(id).subscribe(() => {
        this.loadUserFeedbacks(this.userId!);
      });
    }
  }

  selectFeedback(feedback: Feedback) {
    this.selectedFeedback = { ...feedback };
    this.updatedNote = feedback.note;
  }

  saveFeedback() {
    if (this.selectedFeedback) {
      this.selectedFeedback.note = this.updatedNote;
      this.feedbackService.updateFeedback(this.selectedFeedback).subscribe(() => {
        if (this.userId) {
          this.loadUserFeedbacks(this.userId);
        }
        this.selectedFeedback = null;
        this.updatedNote = 0;
      });
    }
  }

  cancelEdit() {
    this.selectedFeedback = null;
    this.updatedNote = 0;
  }

  getAverageRating(): number {
    if (!this.feedbacks.length) return 0;
    return this.feedbacks.reduce((sum, f) => sum + f.note, 0) / this.feedbacks.length;
  }
}
