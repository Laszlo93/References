import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoggedInUserModel } from '../models/logged-in-user.model';
import { UserDataModel } from '../models/user-data.model';
import { UserLoginModel } from '../models/user-login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly BASE_URL: string = environment.apiUrl;
  private loggedInUserData: BehaviorSubject<UserDataModel | null> = new BehaviorSubject<UserDataModel | null>(null);

  constructor(private http: HttpClient) { }

  public login(loginData: UserLoginModel): Observable<LoggedInUserModel> {
    return this.http.post<LoggedInUserModel>(`${this.BASE_URL}/login`, loginData)
      .pipe(
        tap({
          next: (loggedInPerson) => {
            if(loggedInPerson) {
              localStorage.setItem('accessToken', loggedInPerson.accessToken);
              localStorage.setItem('refreshToken', loggedInPerson.refreshToken);

              this.loggedInUserData.next(loggedInPerson.userData);
            }
          },
          error: (err) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            this.loggedInUserData.next(null);
            console.error(err);
          },
          complete: () => {}
        })
      );
  }

  public refreshPersonAuthentication(): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/refresh`, { token: localStorage.getItem('refreshToken' )})
      .pipe(
        tap({
          next: (loggedInPerson) => {
            if(loggedInPerson) {
              localStorage.setItem('accessToken', loggedInPerson.accessToken);
              this.loggedInUserData.next(loggedInPerson.userData);
            }
          },
          error: (err) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            this.loggedInUserData.next(null);
            console.error(err);
          },
          complete: () => {},
        })
      )
  }

  public logout(): Observable<void> {
    const token = localStorage.getItem('refreshToken');
    return this.http.post<void>(`${this.BASE_URL}/logout`, { token })
      .pipe(
        tap({
          next: () => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            this.loggedInUserData.next(null);
          },
          error: (err) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            this.loggedInUserData.next(null);
            console.error(err);
          },
          complete: () => {}
        })
      );
  }

  public getLoggedInUserObject(): Observable<any> {
    return this.loggedInUserData.asObservable();
  }
}
