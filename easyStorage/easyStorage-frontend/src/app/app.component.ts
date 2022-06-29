import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Item } from './models/item.model';
import { AuthService } from './services/auth.service';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'easyStorage';

  public userObject?: any;

  constructor(private primengConfig: PrimeNGConfig, public navbar: NavbarService, public authService: AuthService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.authService.getLoggedInUserObject().subscribe(user => {
      this.userObject = user;
    });
  }
}
