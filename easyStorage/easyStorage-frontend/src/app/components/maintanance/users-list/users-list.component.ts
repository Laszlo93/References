import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ShareItemService } from 'src/app/services/share-item.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  public loading: boolean = true;
  public users: User[] = [];
  public selectedUser?: User;

  constructor(
    private userService: UsersService,
    private router: Router,
    private sharedItem: ShareItemService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: data => {
        this.users = data;
      },
      error: err => {
        console.error(err);
      },
      complete: () => {},
    });

    this.userService.RefreshedRequired.subscribe(() => {
      this.loading = true;
      this.getItems();
      setTimeout(() => {
        this.loading = false;
      }, 500);
    });

    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  public getItems(): void {
    this.userService.getUsers().subscribe({
      next: data => {
        this.users = data;
      },
      error: err => {
        console.error(err);
      },
      complete: () => {},
    });
  }

  public updateItem(id: number): void {
    this.router.navigate(['users', id]);
  }

  public sendData(user: User): void {
    if (user) {
      this.sharedItem.shareTheItem(user);
    }
  }
}
