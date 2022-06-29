import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item.model';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExportedItemModel } from '../models/exported-item.model';

@Injectable({
  providedIn: 'root'
})

export class ItemsService {

  private readonly BASE_URL = environment.apiUrl;
  private refreshedRequired = new Subject<void>();

  get RefreshedRequired() {
    return this.refreshedRequired;
  }

  constructor(private http: HttpClient) { }

  public getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.BASE_URL}/items/items-list`);
  }

  public getItemsToExport(): Observable<ExportedItemModel[]> {
    return this.http.get<ExportedItemModel[]>(`${this.BASE_URL}/items/export`);
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
    return this.http.delete<void>(`${this.BASE_URL}/items/${id}`)
      .pipe(
        tap(() => {
          this.RefreshedRequired.next();
        })
      );
  }
}
