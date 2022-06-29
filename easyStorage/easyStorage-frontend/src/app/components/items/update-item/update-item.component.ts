import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryItem } from 'src/app/models/history-item.model';
import { Item } from 'src/app/models/item.model';
import { HistoryService } from 'src/app/services/history.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  public itemID: string = '';
  public actualItem?: Item;
  public historyItem: HistoryItem = {
    username: '',
    action: '',
    name: '',
    drawingNumber: '',
    quantityOfChange: ''
  };

  itemForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    drawingNumber: new FormControl('', Validators.required),
    customerDrawingNumber: new FormControl(''),
    storage: new FormGroup({
      storageName: new FormControl('', Validators.required),
      shelf: new FormControl('', Validators.required),
      box: new FormControl('', Validators.required),
    }),
  });


  get name() { return this.itemForm.get('name'); }
  get drawingNumber() { return this.itemForm.get('drawingNumber'); }
  get customerDrawingNumber() { return this.itemForm.get('customerDrawingNumber'); }
  get storageName() { return this.itemForm.get('storage.storageName'); }
  get shelf() { return this.itemForm.get('storage.shelf'); }
  get box() { return this.itemForm.get('storage.box'); }

  constructor(
    private itemsService: ItemsService,
    private historyService: HistoryService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.itemID = params['id'];
    });

    this.itemsService.getItemById(this.itemID).subscribe({
      next: item => {
        this.actualItem = item;
        this.setItemValues();
      },
      error: err => {
        console.error(err);
      }
    });
  }

  public onSubmit() {
    this.itemsService.updateItemById(this.itemID, this.itemForm.value).subscribe({
      error: (err) => console.error(err),
      complete: () => {
        this.historyService.addToHistory(this.itemForm.value, 'Módosítás', '').subscribe();
        this.router.navigate(['items', 'items-list']);
      }
    });
  }

  public setItemValues(): void {
    if(this.actualItem) {
      this.itemForm.patchValue(this.actualItem);
    }
  }

  public navigateToItemsList(): void {
    this.router.navigate(['items', 'items-list']);
  }
}
