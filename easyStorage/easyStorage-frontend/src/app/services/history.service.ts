import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilteredHistoryItemsModel } from '../models/filtered-history-items.model';
import { HistoryItem } from '../models/history-item.model';
import { Item } from '../models/item.model';
import { UserDataModel } from '../models/user-data.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private readonly BASE_URL = environment.apiUrl;
  public userDataObject?: UserDataModel;
  public historyItem?: HistoryItem;
  public valami: any;

  constructor(private http: HttpClient, private authService: AuthService) { }

  public addToHistory(modifiedItem: Item, typeOfChange: string, quantityOfChange: string): Observable<HistoryItem> {
    this.authService.getLoggedInUserObject().subscribe({
      next: (userData) => {
        this.userDataObject = userData;
        if (this.userDataObject) {
          this.historyItem = {
            username: this.userDataObject?.name,
            action: typeOfChange,
            name: modifiedItem.name,
            drawingNumber: modifiedItem.drawingNumber,
            quantityOfChange: quantityOfChange ? `${quantityOfChange}` : 'nincs'
          }
          console.log(this.historyItem);

        }
      },
      error: (err) => { console.error(err) },
    });

    return this.http.post<HistoryItem>(`${this.BASE_URL}/history/add`, this.historyItem);
  }

  public getHistoryItems(requestOptions: Object): Observable<FilteredHistoryItemsModel> {
    return this.http.get<FilteredHistoryItemsModel>(`${this.BASE_URL}/history`, requestOptions);
  }

  public getHistoryToExport(): Observable<HistoryItem[]> {
    return this.http.get<HistoryItem[]>(`${this.BASE_URL}/history/export`);
  }

  public getFilterdHistoryItems(requestOptions: Object): Observable<HistoryItem[]> {
    return this.http.get<HistoryItem[]>(`${this.BASE_URL}/history/filtered`, requestOptions);
  }

}
