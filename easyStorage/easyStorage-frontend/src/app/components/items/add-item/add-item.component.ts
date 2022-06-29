import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HistoryService } from 'src/app/services/history.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  public errorCode?: number;
  public selectedStorage: string = '';

  constructor(
    private itemsService: ItemsService,
    private router: Router,
    private historyService: HistoryService,
    private messageService: MessageService
  ) { }

  itemForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    drawingNumber: new FormControl('', Validators.required),
    customerDrawingNumber: new FormControl(''),
    storage: new FormGroup({
      storageName: new FormControl('', Validators.required),
      shelf: new FormControl('', Validators.required),
      box: new FormControl('', Validators.required),
    }),
    quantity: new FormControl(0),
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
    this.itemsService.addNewItem(this.itemForm.value).subscribe({
      next: () => {},
      error: (err) => {
        this.errorCode = err.error.message.code;
        this.messageService.add({severity:'error', summary:'Hiba', detail:`A cikk már szerepel az adatbázisban!`});
        console.error(err);
      },
      complete: () => {
        this.historyService.addToHistory(this.itemForm.value, 'Letrehozás', '').subscribe();
        this.router.navigate(['items', 'items-list']);
      }
    });
  }

  public navigateToItemsList(): void {
    this.router.navigate(['items', 'items-list']);
  }

}
