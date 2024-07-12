import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {
    this.initUsers();
  }

  // getUsers(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl);
  // }
  fetchUsersFromApi(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
    .pipe(
      tap((users) => console.log('Fetched users:', users)),
      catchError(this.handleError<User[]>('getAllUsers', []))
    );
  }
  
  // getUsers() {
  //   this.fetchUsers()
  //   .subscribe(users => this.users = users);
  //   console.log(this.users)
  // }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  initUsers() {
    this.fetchUsersFromApi().subscribe((users) => {
      this.users = users;
      console.log('init', this.users)
    });
  }

  getUsers() {
    console.log('get users ', this.users)
    return this.users;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error)
      return of(result as T);
    };
  }

}
