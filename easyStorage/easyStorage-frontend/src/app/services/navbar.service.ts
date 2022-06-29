import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  public visibleNavbar: boolean;

  constructor() { this.visibleNavbar = true }

  public showNavbar(): void {
    this.visibleNavbar = true;
  }

  public hideNavbar(): void {
    this.visibleNavbar = false;
  }
}
