import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
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
export class ItemsListComponent implements OnInit {

  public storages: any[] = [];
  public loading: boolean = true;
  public items$?: Observable<Item[]>;
  public selectedItem?: Item;
  public modalVisibility: boolean = false;
  public typeOfChange: string = '';
  public quantityOfChange: number = 0;
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

    setTimeout(() => {
      this.items$ = this.itemsService.getItems();
      this.loading = false;
    }, 500);

    this.userLoginSubscription = this.authService.getLoggedInUserObject().subscribe(
      userData => {
        this.userDataObject = userData;
        console.log(this.userDataObject?.isAdmin);

      }
    );
  }

  public updateItem(id: number): void {
    this.router.navigate(['items', id]);
  }

  public sendData(item: Item): void {
    if (item) {
      this.sharedItem.shareTheItem(item);
      this.selectedItem = item;
    }
  }

  public increaseItemQuantitiy(): void {
    this.typeOfChange = "Betárol";
    this.modalVisibility = true;
    if (this.selectedItem) {
      this.selectedItem.quantity += this.quantityOfChange;
    }
  }

  public decreaseItemQuantitiy(): void {
    this.typeOfChange = "Kitárol";
    this.modalVisibility = true;
  }

  public changeItemQuantity(): void {
    this.modalVisibility = false;

    if (this.selectedItem) {
      if (this.typeOfChange === 'Betárol') {
        this.selectedItem.quantity += this.quantityOfChange;
      } else if (this.quantityOfChange > this.selectedItem.quantity) {
        this.messageService.add({severity:'error', summary:'Hiba', detail:'Nincs elegendő darabszám raktáron!'});
        return;
      } else {
        this.selectedItem.quantity -= this.quantityOfChange;
      }

      this.itemsService.updateItemById(this.selectedItem._id, this.selectedItem).subscribe({
        error: (err) => {
          console.error(err)
          this.messageService.add({severity:'error', summary:'Hiba', detail:`Sikertelen ${this.typeOfChange.toLowerCase()}ás!`});
        },
        complete: () => {
          this.quantityOfChange = 0;
        }
      });

      if (this.selectedItem) {
        this.historyService.addToHistory(this.selectedItem, this.typeOfChange, this.quantityOfChange).subscribe();
      }
    }
  }

}
