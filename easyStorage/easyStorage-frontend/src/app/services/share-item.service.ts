import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareItemService {

  private shareItem = new Subject<any>();
  public currentSharedItem = this.shareItem.asObservable();

  constructor() { }

  public shareTheItem(sharedData: any) {
    this.shareItem.next(sharedData);
  }
}
