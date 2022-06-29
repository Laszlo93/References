import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService,  } from 'primeng/api';
import { User } from 'src/app/models/user.model';
import { ShareItemService } from 'src/app/services/share-item.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-maintanance-sidebar',
  templateUrl: './maintanance-sidebar.component.html',
  styleUrls: ['./maintanance-sidebar.component.css']
})
export class MaintananceSidebarComponent implements OnInit {

  public items: MenuItem[] = [];
  public currentUser?: User;

  constructor(
    public sharedItem: ShareItemService,
    private router: Router, private userService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
    ) { }

  ngOnInit(): void {
    this.sharedItem.currentSharedItem.subscribe(user => {
      this.currentUser = user;
    });

    this.items = [
      {
        label: 'Felhasználó',
        icon: 'pi pi-pw pi-file',
        items: [
        {
          label: 'Hozzáadás',
          icon: 'pi pi-fw pi-plus',
          routerLink: 'add'
        },
        {
          label: 'Szerkesztés',
          icon: 'pi pi-fw pi-pencil',
          command: () => this.updateSelectedItem(),
        },
        { separator: true },
        {
          label: 'Törlés',
          icon: 'pi pi-fw pi-trash',
          command: () => this.confirmDeletion(this.currentUser)
        }
        ],
        expanded: true
      },
      {
        label: 'Szűrés',
        icon: 'pi pi-fw pi-pencil',
        expanded: true
      },
    ];
  }

  public updateSelectedItem(): void {
    this.router.navigate(['users', this.currentUser?._id]);
  }

  public deleteSelectedItem(id: string | undefined): void {
    if(id) {
      this.userService.deleteItemById(id).subscribe({
        next: () => {},
        error: () => {},
        complete: () => {
          this.router.navigate(['users', 'users-list']);
        }
      })
    }
  }

  public confirmDeletion(currentUser: User | undefined): void {
    if(currentUser) {
      this.confirmationService.confirm({
        message: `Biztosan törölni szeretné ${currentUser.lastName} ${currentUser.firstName} nevű felhaszánlót?`,
        header: 'Törlés',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Igen',
        rejectLabel: 'Nem',
        accept: () => {
          this.deleteSelectedItem(currentUser._id);
          this.messageService.add({severity:'success', summary:'Megerősítve', detail:'Sikeresen törölve!'});
        },
        reject: () => {
          this.messageService.add({severity:'info', summary:'Megszakítva', detail:'Törlés megszakítva!'});
        }
      })

    } else {
      this.messageService.add({severity:'info', summary:'Figyelmeztetés', detail:'Válassz ki egy elemet!'});
    }
  }
}
