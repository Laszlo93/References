import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  // public historyItem: HistoryItem = {
  //   user: '',
  //   items: [],
  //   dateOfUpdate: ''
  // };

  public storages: Array<any> = [
    { nameOfStorage: 'Megamat1' },
    { nameOfStorage: 'Megamat2' },
    { nameOfStorage: 'Alapanyag' }
  ];

  public selectedStorage: string = '';

  constructor(
    private itemsService: ItemsService,
    private router: Router) { }

  itemForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    drawingNumber: new FormControl('', Validators.required),
    customerDrawingNumber: new FormControl(''),
    storage: new FormGroup({
      storageName: new FormControl('', Validators.required),
      shelf: new FormControl('', Validators.required),
      box: new FormControl('', Validators.required),
    }),
    quantity: new FormControl(),
  });


  get name() { return this.itemForm.get('name'); }
  get drawingNumber() { return this.itemForm.get('drawingNumber'); }
  get customerDrawingNumber() { return this.itemForm.get('customerDrawingNumber'); }
  get storageName() { return this.itemForm.get('storage.storageName'); }
  get shelf() { return this.itemForm.get('storage.shelf'); }
  get box() { return this.itemForm.get('storage.box'); }
  get quantity() { return this.itemForm.get('quantity'); }

  ngOnInit(): void {
  }

  public onSubmit() {
    // this.setHistoryItemValue();
    // this.itemsService.addToHistory(this.historyItem).subscribe();
    console.log(this.itemForm.value);

    this.itemsService.addNewItem(this.itemForm.value).subscribe({
      next: () => {},
      error: () => {},
      complete: () => {
        this.router.navigate(['items', 'items-list']);
      }
    });
  }

  // public setHistoryItemValue(): void {
  //   this.historyItem.user = 'Felhasználó';
  //   this.historyItem.items.push(this.itemForm.value);
  //   this.historyItem.dateOfUpdate = (new Date()).toLocaleDateString('hu-HU');
  // }

  public navigateToItemsList(): void {
    this.router.navigate(['items', 'items-list']);
  }

}
