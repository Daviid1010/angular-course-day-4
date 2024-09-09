import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users = [
    {id: 1, name: "John Doe"},
    {id: 2, name: "Jane Doe"},
  ]

  constructor() { }

  getUsers() {
    return of(this.users)
  }
}
