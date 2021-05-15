import { error } from '@angular/compiler/src/util';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { AppService } from '../app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  users: User[] = [];
  user = new User();
  found = false;

  userForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private appService: AppService,
  ) { this.validatorForm(); }

  ngOnInit(): void {
  }

  validatorForm() {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  onSubmit() {
    this.appService.getUsers().subscribe((res) => {
      this.users = res as User[];

      for (this.user of this.users) {
        if (this.user.username === this.userForm.value.username) {
          this.found = true;
          alert('Username already exists!');
          return false;
        }
      }

      if (!this.userForm.valid) {
        alert('Username minimum length is 5 characters!');
      }
      else {
        this.appService.createUser(this.userForm.value).subscribe(
          (res) => {
            alert('Registration successful!');
            this.ngZone.run(() => this.router.navigateByUrl('/login'));
          },
          (error) => {
            console.log = (error);
          });
        
      }
      return true;
    }
    );
  }
}
