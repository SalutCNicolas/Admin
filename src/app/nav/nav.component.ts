import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emiterrs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  authenticated = false
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth:boolean) => {
        this.authenticated =auth;

      }
    );
  }


  logout(): void{
    this.http.post('http://localhost:8000/api/user-profile', {},{withCredentials:true})
    .subscribe ( () => {
      this.authenticated = false
    });


  }

}
