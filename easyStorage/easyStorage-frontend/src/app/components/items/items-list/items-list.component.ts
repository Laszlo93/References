import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { UserDataModel } from 'src/app/models/user-data.model';
import { AuthService } from 'src/app/services/auth.service';
import { HistoryService } from 'src/app/services/history.service';
import { ItemsService } from 'src/app/services/items.service';
import { ShareItemService } from 'src/app/services/share-item.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit, OnDestroy {

  public items$?: Observable<Item[]>;

  public storages: any[] = [];
  public loading: boolean = true;
  public selectedItem?: Item;
  public modalVisibility: boolean = false;
  public typeOfChange: string = '';
  public quantityOfChange: number = 0;
  public quantityOfChangeAndType: string = '';
  public userDataObject?: UserDataModel;
  private userLoginSubscription?: Subscription;

  constructor(
    public itemsService: ItemsService,
    public router: Router,
    public sharedItem: ShareItemService,
    private messageService: MessageService,
    private authService: AuthService,
    private historyService: HistoryService
  ) { }

  ngOnInit(): void {

    this.userLoginSubscription = this.authService.getLoggedInUserObject().subscribe(
      userData => {
        this.userDataObject = userData;
      }
    );

    this.items$ = this.itemsService.getItems();
    this.itemsService.RefreshedRequired.subscribe(() => {
      this.loading = true;
      this.items$ = this.itemsService.getItems();
      setTimeout(() => {
        this.loading = false;
      }, 500);
    });

    setTimeout(() => {
      this.loading = false;
    }, 500);

    this.storages = [
      { label: "Megamat1", value: "Megamat1" },
      { label: "Megamat2", value: "Megamat2" },
      { label: "Alapanyag", value: "Alapanyag" },
    ]
  }

  public updateItem(id: number): void {
    if (this.userDataObject?.isAdmin) {
      this.router.navigate(['items', id]);
    } else {
      this.messageService.add({severity:'error', summary:'Hiba', detail:`Admin jogosultság szükséges!`});
    }
  }

  public sendData(item: Item): void {
    if (item) {
      this.sharedItem.shareTheItem(item);
      this.selectedItem = item;
    }
  }

  public increaseItemQuantitiy(): void {
    this.typeOfChange = "Betárolás";
    this.modalVisibility = true;
  }

  public decreaseItemQuantitiy(): void {
    this.typeOfChange = "Kitárolás";
    this.modalVisibility = true;
  }

  public changeItemQuantity(): void {
    this.modalVisibility = false;

    if (this.selectedItem) {
      if (this.typeOfChange === 'Betárolás') {
        this.selectedItem.quantity += this.quantityOfChange;
      } else if (this.quantityOfChange > this.selectedItem.quantity) {
        this.messageService.add({severity:'error', summary:'Hiba', detail:'Nincs elegendő darabszám raktáron!'});
        this.quantityOfChange = 0;
        return;
      } else {
        this.selectedItem.quantity -= this.quantityOfChange;
      }

      this.itemsService.updateItemById(this.selectedItem._id, this.selectedItem).subscribe({
        error: (err) => {
          console.error(err)
          this.messageService.add({severity:'error', summary:'Hiba', detail:`Sikertelen ${this.typeOfChange.toLowerCase()}!`});
        },
        complete: () => {
          if (this.selectedItem) {
            this.quantityOfChangeAndType = this.typeOfChange === 'Betárolás' ? `+${this.quantityOfChange} db` : `-${this.quantityOfChange} db`
            this.historyService.addToHistory(this.selectedItem, this.typeOfChange, this.quantityOfChangeAndType).subscribe();
          }
          this.quantityOfChange = 0;
        }
      });

      if (this.selectedItem) {
      }
    }
  }

  ngOnDestroy(): void {
    if (this.userLoginSubscription) {
      this.userLoginSubscription.unsubscribe();
    }
  }

}
