import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(username: string, password: string): boolean {
    console.log('IN HERE', username, password)
    return username === 'admin' && password === 'admin';
  }
}
