import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private apiURL = "http://localhost:8000/api/user/";


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }


  constructor(
    private httpClient : HttpClient
  ) { }


  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>("http://localhost:8000/api/allUser");
  }

  
 find(id:any): Observable<User> {
  return this.httpClient.get<User>(this.apiURL + id)
}




  update(id:any,user:any) : Observable<User>{
    return this.httpClient.put<User>(this.apiURL+id,JSON.stringify(user),this.httpOptions);
  }

  delete(id:any) {
    return this.httpClient.delete<User>(this.apiURL + id, this.httpOptions);
  }
}
