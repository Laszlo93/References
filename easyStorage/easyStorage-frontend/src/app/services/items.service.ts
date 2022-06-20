import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item.model';
import { Observable, retry } from 'rxjs';
import { HistoryItem } from '../models/history-item.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ItemsService {

  private readonly BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.BASE_URL}/items/items-list`);
  }

  public getItemById(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.BASE_URL}/items/${id}`);
  }

  public addNewItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.BASE_URL}/items/add`, item);
  }

  public updateItemById(id: string, updatedItem: Item): Observable<Item> {
    return this.http.put<Item>(`${this.BASE_URL}/items/${id}`, updatedItem);
  }

  public deleteItemById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/items/${id}`);
  }
}
