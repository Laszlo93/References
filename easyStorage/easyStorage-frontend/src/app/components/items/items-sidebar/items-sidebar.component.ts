import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { UserDataModel } from 'src/app/models/user-data.model';
import { AuthService } from 'src/app/services/auth.service';
import { ItemsService } from 'src/app/services/items.service';
import { ShareItemService } from 'src/app/services/share-item.service';

@Component({
  selector: 'app-items-sidebar',
  templateUrl: './items-sidebar.component.html',
  styleUrls: ['./items-sidebar.component.css']
})
export class ItemsSidebarComponent implements OnInit, OnDestroy {

  public items: MenuItem[] = [];
  public currentItem?: Item;
  public userDataObject?: UserDataModel;

  private userLoginSubscription?: Subscription;
  private sharedItemSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    public sharedItem: ShareItemService,
    private router: Router,
    private itemsService: ItemsService,
    private confirmationSercvice: ConfirmationService,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.sharedItemSubscription = this.sharedItem.currentSharedItem.subscribe(item => {
      this.currentItem = item;
    });

    this.userLoginSubscription = this.authService.getLoggedInUserObject().subscribe(
      userData => {
        this.userDataObject = userData;
      }
    );

    this.items = [
      {
        label: 'Cikk',
        icon: 'pi pi-pw pi-file',
        items: [
        {
          label: 'Hozzáadás',
          icon: 'pi pi-fw pi-plus',
          routerLink: 'add',
          disabled: !this.userDataObject?.isAdmin,
          command: () => { if (this.items[0].items) this.items[0].items[1].disabled = true }
        },
        {
          label: 'Szerkesztés',
          icon: 'pi pi-fw pi-pencil',
          disabled: !this.userDataObject?.isAdmin,
          command: () => this.recieveSharedItem(),
        },
        { separator: true },
        {
          label: 'Törlés',
          icon: 'pi pi-fw pi-trash',
          disabled: !this.userDataObject?.isAdmin,
          command: () => this.confirmDeletion(this.currentItem),
        }
        ],
        expanded: true
      },
      {
        label: 'Szűrés',
        icon: 'pi pi-fw pi-pencil',
        expanded: true
      },
      {
        label: 'Műveletek',
        icon: 'pi pi-fw pi-question',
        items: [
          {
            label: 'Importálás',
            icon: 'pi pi-pi pi-folder-open'
          },
          {
            label: 'Exportálás',
            icon: 'pi pi-pi pi-file-excel',
          }
        ],
        expanded: true
      }
    ];
  }

  public recieveSharedItem(): void {
    this.router.navigate(['items', this.currentItem?._id]);
  }

  public deleteSelectedItem(id: string | undefined): void {
    if(id) {
      this.itemsService.deleteItemById(id).subscribe({
        next: () => {},
        error: () => {},
        complete: () => {
          this.router.navigate(['items']);
        }
      })
    }
  }

  public confirmDeletion(currentItem: Item | undefined): void {
    if(currentItem) {
      this.confirmationSercvice.confirm({
        message: `Biztosan törölni szeretné a következőt: ${currentItem.drawingNumber}?`,
        header: 'Törlés',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Igen',
        rejectLabel: 'Nem',
        accept: () => {
          this.deleteSelectedItem(currentItem._id);
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

  ngOnDestroy(): void {
    if (this.userLoginSubscription) {
      this.userLoginSubscription.unsubscribe();
    }

    if (this.sharedItemSubscription) {
      this.sharedItemSubscription.unsubscribe();
    }
  }
}
