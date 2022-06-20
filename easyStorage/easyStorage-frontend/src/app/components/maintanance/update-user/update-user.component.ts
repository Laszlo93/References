import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  public isSubmitted?: boolean;
  public actualUser?: User;
  public userID: string = '';

  constructor(private userService: UsersService, private router: Router, private activeRoute: ActivatedRoute) {
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
    this.activeRoute.params.subscribe(params => {
      this.userID = params['id'];
    });

    this.userService.getUserById(this.userID).subscribe({
      next: item => {
        this.actualUser = item;
        this.setItemValues();
      },
      error: err => {
        console.error(err);
      }
    });
  }

  public onSubmit() {
    this.isSubmitted = true;

    if (this.userForm.valid) {
      this.userService.updateUserById(this.userID,this.userForm.value).subscribe({
        next: () => {},
        error: () => {},
        complete: () => {
          this.router.navigate(['users', 'users-list']);
        }
      });
    }
  }

  public setItemValues(): void {
    if(this.actualUser) {
      this.userForm.patchValue(this.actualUser);
    }
  }

  public navigateToUsersList(): void {
    this.router.navigate(['users', 'users-list']);
  }

}
