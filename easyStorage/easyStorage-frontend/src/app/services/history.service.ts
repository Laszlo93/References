import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  public addToHistory(modifiedItem: Item, typeOfChange: string, quantityOfChange: number): Observable<HistoryItem> {
    this.authService.getLoggedInUserObject().subscribe({
      next: (userData) => {
        this.userDataObject = userData;
        console.log(this.userDataObject);
        if (this.userDataObject) {
          this.historyItem = {
            username: this.userDataObject?.name,
            action: `${typeOfChange}ás`,
            name: modifiedItem.name,
            drawingNumber: modifiedItem.drawingNumber,
          }
        }
        console.log('MIIII van?')
      },
      error: (err) => { console.log('MIIII van?') },
    });

    return this.http.post<HistoryItem>(`${this.BASE_URL}/history/add`, this.historyItem);
    // return this.valami;
  }

  public getHistoryItems(): Observable<HistoryItem[]> {
    return this.http.get<HistoryItem[]>(`${this.BASE_URL}/history`);
  }

}
