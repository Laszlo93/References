import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-maintanance',
  templateUrl: './maintanance.component.html',
  styleUrls: ['./maintanance.component.css']
})
export class MaintananceComponent implements OnInit {

  constructor(public itemsService: ItemsService) { }

  ngOnInit(): void {
  }
}
