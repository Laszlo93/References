import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { UserDataModel } from 'src/app/models/user-data.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit, OnDestroy {

  public userDataObject?: UserDataModel;
  public loginTime: number = 300;

  private expirationDate: Date | null = null;
  private accessToken: string | null = null;
  private interval?: number;
  private timout?: number;

  private userLoginSubscription?: Subscription;
  private authenticationRefreshSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private jwtHelperService: JwtHelperService,
    private router: Router,
    private navbarService: NavbarService
  ) { }

  items: MenuItem[] = [];

  ngOnInit(): void {

    this.userLoginSubscription = this.authService.getLoggedInUserObject().subscribe({
      next: userData => {
        this.userDataObject = userData;
        this.setNavbarItems();
      },
      error: (err) => {
        console.error(err);
        this.setNavbarItems();
      },
      complete: () => {
      }
    });

    this.loginAuthenticationSettings();
  }

  public setNavbarItems(): void {
    this.items = [
      {
        label: 'Raktárkészlet',
        icon: 'pi pi-fw pi-file',
        routerLink: ['items']
      },
      // {
      //   label: 'Ki/betárolás',
      //   icon: 'pi pi-fw pi-pencil',
      //   routerLink: ['stock-movement']
      // },
      {
        label: 'Felhasználók',
        icon: 'pi pi-fw pi-user',
        routerLink: ['users'],
        disabled: !this.userDataObject?.isAdmin
      },
      {
        label: 'History',
        routerLink: ['history'],
        icon: 'pi pi-fw pi-history',
      },
    ];
  }

  public login(): void {
    this.router.navigate(['login']);
  }

  public loginAuthenticationSettings() {
    if(localStorage.getItem('refreshToken')) {
      this.authenticationRefreshSubscription = this.authService.refreshPersonAuthentication().subscribe({
        next: () => {},
        error: () => {},
        complete: () => {
          this.accessToken = localStorage.getItem('accessToken');

          if(this.accessToken) {
            this.expirationDate = this.jwtHelperService.getTokenExpirationDate(this.accessToken);
            this.loginTime = this.expirationDate ? Math.ceil((this.expirationDate.getTime() - new Date().getTime()) / 1000) : 0;

            if(!this.interval) this.startTimer();

            this.autoLogout();
          }
        }
      });
    }
  }

  public autoLogout(): void {
    window.clearTimeout(this.timout);

    this.timout = window.setTimeout(() => {
      this.logout();
    }, this.loginTime * 1000);
  }

  public logout(): void {

    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['login']);
      },
      error: (err) => { console.error(err) },
      complete: () => {
        this.navbarService.hideNavbar();
        window.clearTimeout(this.timout);
      },
    });
  }

  public startTimer() {
    this.interval = window.setInterval(() => {
      if(this.loginTime > 0) {
        this.loginTime--;
      }
    }, 1000);
  }

  public confirmLoginExtension() {
    this.loginAuthenticationSettings();
  }

  public rejectLoginExtension() {
    this.logout();
  }

  ngOnDestroy(): void {
    if(this.userLoginSubscription) {
      this.userLoginSubscription.unsubscribe();
    }

    if(this.authenticationRefreshSubscription) {
      this.authenticationRefreshSubscription.unsubscribe();
    }
  }
}
