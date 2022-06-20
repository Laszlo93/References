import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/users/users-list`);
  }

  public getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/users/${id}`);
  }

  public addNewUser(item: User): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/users/add`, item);
  }

  public updateUserById(id: string, updatedItem: User): Observable<User> {
    return this.http.put<User>(`${this.BASE_URL}/users/${id}`, updatedItem);
  }

  public deleteItemById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/users/${id}`);
  }
}
