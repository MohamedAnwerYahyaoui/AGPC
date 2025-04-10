import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userId: number = 1; // Replace this with your authentication logic

  getUserId(): number {
    return this.userId;
  }
}
