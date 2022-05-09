import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    })
  }

  submit(): void {
    console.log(this.form.getRawValue());
    this.http.post('http://192.168.56.1:8000/api/auth/register', this.form.getRawValue())
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }

}
