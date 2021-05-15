import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-adder',
  templateUrl: './adder.component.html',
  styleUrls: ['./adder.component.css']
})
export class AdderComponent implements OnInit {

  mgrForm: FormGroup;
  name: string;
  owner: string;
  grade: number;

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private appService: AppService

  ) { this.validatorForm();}

  ngOnInit(): void {
  }

  validatorForm() {
    this.mgrForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      owner: ['', [Validators.required]],
      grade: ['', [Validators.required]]
    });
  }
  onSubmit() {
    this.submitted = true;
    if (!this.mgrForm.valid) {
      alert('Error during addition! Chck form!');
      return false;

    } else {
      this.appService.addMgr(this.mgrForm.value).subscribe(
        (res) => {
          alert('New SW added!');
          this.ngZone.run(() => this.router.navigateByUrl('/lister'));
        }, (error) => {
          console.log(error);
      });
      return true;
    }
  }
}
