import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoryItem } from 'src/app/models/history-item.model';
import { Item } from 'src/app/models/item.model';
import { HistoryService } from 'src/app/services/history.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit {

  public loading: boolean = true;
  public selectedItem?: Item;
  public historyItems: HistoryItem[] = [];

  constructor(public historyService: HistoryService, public router: Router) { }

  ngOnInit(): void {
    this.historyService.getHistoryItems().subscribe({
      next: data => {
        this.historyItems = data;
        this.loading = false;
      }
    });
  }
}
