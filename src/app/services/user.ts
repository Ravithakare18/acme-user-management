import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class User {
  private url = 'https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json';
  private _users: any[] = [];

  constructor(private http: HttpClient) {}

  fetchUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  setUsers(users: any[]) {
    this._users = users;
  }
  getUsers(): any[] {
    return this._users;
  }
  getUser(index: number) {
    return this._users?.[index];
  }
}
