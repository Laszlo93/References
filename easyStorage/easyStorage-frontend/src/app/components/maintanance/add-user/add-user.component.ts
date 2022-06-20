import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  cities: any;
  selectedCity1: any;

  public isSubmitted?: boolean;

  constructor(private userService: UsersService, private router: Router) {
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
    ];
  }

  userForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    isAdmin: new FormControl(false, Validators.required),
  });

  get firstName() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get username() { return this.userForm.get('username'); }
  get password() { return this.userForm.get('password'); }
  get position() { return this.userForm.get('position'); }
  get isAdmin() { return this.userForm.get('isAdmin'); }

  ngOnInit(): void {
  }

  public onSubmit() {
    this.isSubmitted = true;

    if (this.userForm.valid) {
      this.userService.addNewUser(this.userForm.value).subscribe({
        next: () => {},
        error: () => {},
        complete: () => {
          this.router.navigate(['users', 'users-list']);
        }
      });
    }
  }

  public navigateToUsersList(): void {
    this.router.navigate(['users', 'users-list']);
  }
}
