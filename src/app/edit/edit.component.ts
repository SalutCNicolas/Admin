import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id !: number;
  user !: User;
  form!: FormGroup; 

  constructor(
    private userService: UserService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.find(this.id).subscribe((data: User) => {
      this.user = data;
    });

    this.form = new FormGroup({
      name:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      email: new FormControl('', [ Validators.required, Validators.email ]),
      
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    this.userService.update(this.id, this.form.value).subscribe(res => {
      console.log('Person updated successfully!');
      this.router.navigateByUrl('/');
 })
  }

  

}
