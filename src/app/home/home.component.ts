import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WritePropExpr } from '@angular/compiler';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Emitters } from '../emitters/emiterrs';
import { User } from '../user';
import { UserService } from '../user.service';



interface user {
  nom: string,
  email: string

}

const userArray: user[] = [
  {
    nom: "Lionel",
    email: "lionel@hotmail.fr"
  },
  {
    nom: "Nicolas",
    email: "nicolas@hotmail.fr"
  }
]

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  displayedColumns: string[] = ['name', 'email'];

  message = 'Tu n es pas connecté'
  test: any = [];
  obj: any
  users : User[] = [];
  constructor(
    private http: HttpClient,
    public userService: UserService
  ) { }




  ngOnInit(): void {


    this.http.get('http://localhost:8000/api/user-profile', {
      withCredentials: true, responseType: 'text'
    }).subscribe(
      (res: any) => {
        console.log(res);
        this.message = `Hi admin`;
        Emitters.authEmitter.emit(true);
      },
      err => {
        console.log(err);
        Emitters.authEmitter.emit(false);
      }
    );
    this.http.get('http://localhost:8000/api/allUser', {
      withCredentials: true, responseType: 'text'
    }).subscribe(
      (res: any = []) => {
        this.test.push(res);
        this.users = JSON.parse(this.test[0]);




      },
      err => {
        console.log(err);
      }
    );
    this.userService.getAll().subscribe((data: User[]) => {
      this.users=data;
    })
  }
  deletePerson(id:any){
    this.userService.delete(id).subscribe(res => {
      this.users = this.users.filter(item=> item.id !==id);
    })
  }













  containtUserArray = userArray;


}
