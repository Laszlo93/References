import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { UserDataModel } from 'src/app/models/user-data.model';
import { AuthService } from 'src/app/services/auth.service';
import { HistoryService } from 'src/app/services/history.service';
import { ItemsService } from 'src/app/services/items.service';
import { ShareItemService } from 'src/app/services/share-item.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { ExportedItemModel } from 'src/app/models/exported-item.model';

@Component({
  selector: 'app-items-sidebar',
  templateUrl: './items-sidebar.component.html',
  styleUrls: ['./items-sidebar.component.css']
})
export class ItemsSidebarComponent implements OnInit, OnDestroy {

  public menuItems: MenuItem[] = [];
  public currentItem?: Item;
  public itemsToExport?: ExportedItemModel[];
  private userDataObject?: UserDataModel;

  private userLoginSubscription?: Subscription;
  private sharedItemSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    public sharedItem: ShareItemService,
    private router: Router,
    private itemsService: ItemsService,
    private historyService: HistoryService,
    private confirmationSercvice: ConfirmationService,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.sharedItemSubscription = this.sharedItem.currentSharedItem.subscribe(item => {
      this.currentItem = item;
    });

    this.userLoginSubscription = this.authService.getLoggedInUserObject().subscribe({
      next: (userData) => {
        this.userDataObject = userData;
        this.setSideBarItems();
      },
      error: (err) => {
        console.error(err);
        this.setSideBarItems();
      }
    }
    );
  }

  public setSideBarItems(): void {
    this.menuItems = [
      {
        label: 'Cikk',
        icon: 'pi pi-pw pi-file',
        items: [
        {
          label: 'Hozz??ad??s',
          icon: 'pi pi-fw pi-plus',
          routerLink: 'add',
          disabled: !this.userDataObject?.isAdmin,
        },
        {
          label: 'Szerkeszt??s',
          icon: 'pi pi-fw pi-pencil',
          disabled: !this.userDataObject?.isAdmin,
          command: () => this.recieveSharedItem(),
        },
        { separator: true },
        {
          label: 'T??rl??s',
          icon: 'pi pi-fw pi-trash',
          disabled: !this.userDataObject?.isAdmin,
          command: () => this.confirmDeletion(this.currentItem),
        }
        ],
        expanded: true
      },
      // {
      //   label: 'Sz??r??s',
      //   icon: 'pi pi-fw pi-pencil',
      //   items: [
      //   ],
      //   expanded: true
      // },
      {
        label: 'M??veletek',
        icon: 'pi pi-fw pi-question',
        items: [
          {
            label: 'Import??l??s',
            icon: 'pi pi-pi pi-folder-open'
          },
          {
            label: 'Export??l??s',
            icon: 'pi pi-pi pi-file-excel',
            command: () => this.exportItemsToCsv()
          }
        ],
        expanded: true
      }
    ];
  }

  public recieveSharedItem(): void {
    if (!this.currentItem) {
      this.messageService.add({severity:'info', summary:'Figyelmeztet??s', detail:'V??lassz ki egy elemet!'});
    }

    this.router.navigate(['items', this.currentItem?._id]);
  }

  public deleteSelectedItem(id: string | undefined): void {
    if(id) {
      this.itemsService.deleteItemById(id).subscribe({
        next: () => {},
        error: () => {},
        complete: () => {
          if (this.currentItem) {
            this.historyService.addToHistory(this.currentItem, 'T??rl??s', '').subscribe();
          }
          this.router.navigate(['items']);
        }
      })
    }
  }

  public confirmDeletion(currentItem: Item | undefined): void {
    if(currentItem) {
      this.confirmationSercvice.confirm({
        message: `Biztosan t??r??lni szeretn?? a k??vetkez??t: ${currentItem.drawingNumber}?`,
        header: 'T??rl??s',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Igen',
        rejectLabel: 'Nem',
        accept: () => {
          this.deleteSelectedItem(currentItem._id);
          this.messageService.add({severity:'success', summary:'Meger??s??tve', detail:'Sikeresen t??r??lve!'});
        },
        reject: () => {
          this.messageService.add({severity:'info', summary:'Megszak??tva', detail:'T??rl??s megszak??tva!'});
        }
      })

    } else {
      this.messageService.add({severity:'info', summary:'Figyelmeztet??s', detail:'V??lassz ki egy elemet!'});
    }
  }

  public exportItemsToCsv(): void {
    const options = {
      fieldSeparator: ';',
      quoteStrings: '',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      title: '',
      useBom: true,
      noDownload: false,
      headers: ["Megnevez??s", "Saj??t rajzsz??m", "Vev??i rajzss??m", "Rakt??r", "Polc", "Doboz", "Darabsz??m"]
    }

    this.itemsService.getItemsToExport().subscribe({
      next: (responseData) => {
        this.itemsToExport = responseData;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        new ngxCsv(this.itemsToExport, "Export??ltCikkek", options)
      }
    })

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
