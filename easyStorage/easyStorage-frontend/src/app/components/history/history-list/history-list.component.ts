import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoryItem } from 'src/app/models/history-item.model';
import { Item } from 'src/app/models/item.model';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit {

  public loading: boolean = true;
  public selectedItem?: Item;
  public historyItems: HistoryItem[] = [];
  public numberOfRows: number = 12;
  public numberOfPreviousRows: number = 0;
  public numberOfHistoryItems: number = 0;
  public filterString?: string;
  public lazyLoading: boolean = true;

  constructor(public historyService: HistoryService, public router: Router) { }

  ngOnInit(): void {
    this.getOnePageData();
  }

  public tryIt(event: any): void {
    if (!this.filterString || event.type === 'click') {
      this.filterString = '';
      this.getOnePageData();
      this.loading = true;
      this.numberOfHistoryItems = 12;
    }
  }

  public getOnePageData(): void {
    this.loading = true;

    const filterObject = {
      numberOfPreviousRows: this.numberOfPreviousRows,
      numberOfRows: this.numberOfRows
    }

    const requestOptions = {
      params: this.setHttpParams(filterObject)
    }

    this.historyService.getHistoryItems(requestOptions).subscribe({
      next: data => {
        this.historyItems = data.historyItems;
        this.numberOfHistoryItems = data.numberOfHistoryItems;

        setTimeout(() => {
          this.loading = false;
        }, 200);
      },
      complete: () => {
        this.lazyLoading = true;
      }
    });
  }

  public getFilteredHistoryItems(): void {
    this.loading = true;

    if (this.filterString) {
      this.lazyLoading = false;
      const filterObject = {
        filter: this.filterString
      }

      const requestOptions = {
        params: this.setHttpParams(filterObject)
      }

      this.historyService.getFilterdHistoryItems(requestOptions).subscribe({
        next: data => {
          this.historyItems = data;
          setTimeout(() => {
            this.loading = false;
          }, 500);
        }
      });
    } else {
      this.getOnePageData();
      this.numberOfHistoryItems = 15;
      this.numberOfPreviousRows = 0;
      this.lazyLoading = true;
    }
  }

  public setHttpParams(filterObject: any): any {

    let httpParams = new HttpParams({fromObject: filterObject});

    return httpParams;
  }

  public showEventProperties(event: any): any {
    this.numberOfPreviousRows = event.first;
    this.numberOfRows = event.rows;
    this.getOnePageData();
  }
}
