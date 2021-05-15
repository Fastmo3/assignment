import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../../models/user";
import { Mgr } from "../../models/mgr";
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  user = new User();
  mgr: Mgr | undefined;

  constructor(private http: HttpClient) { }

  baseurl: string = 'http://localhost:8080';

  createUser(data: any): Observable<any> {
    return this.http.post(this.baseurl + '/addUser', data);
  }

  addMgr(data: any) {
    return this.http.post(this.baseurl + '/addMgr', data);
  }

  getMgrs() {
    return this.http.get(this.baseurl + '/getAllMgrs');
  }

  getUsers() {
    return this.http.get(this.baseurl + '/getAllUsers');
  }

  setLoggedInUser(user: User) {
    this.user = user;
  }

  getLoggedUser() {
    return this.user;
  }

  deleteMgr(id: string) {
    return this.http.delete(this.baseurl + '/delete/' + id, { headers: this.headers });
  }
}
