import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  errorCode?: number;

  public isSubmitted?: boolean;

  constructor(
    private userService: UsersService,
    private router: Router,
    private messageService: MessageService
  ) {}

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
        error: (err) => {
          this.errorCode = err.error.message.code;
          this.messageService.add({severity:'error', summary:'Hiba', detail:`Felhasználónév már foglalt!`});
          console.error(err);
        },
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
