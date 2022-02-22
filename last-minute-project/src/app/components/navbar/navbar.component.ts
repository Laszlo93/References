import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { clippingParents } from '@popperjs/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public loggedInStatus : boolean = false;
  public isAdmin: boolean = false;

  constructor(private auth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    this.auth.user.subscribe({
      next: (user) => {
        if(user){
          this.loggedInStatus = true;
          if(user?.email === "admin@admin.com"){
            this.isAdmin = true;
          }
        }
      },
      error: (e) => console.log(e),
      complete: () => {},
    })
  }

  public async logout(): Promise<void> {
    await this.auth.signOut();
    this.loggedInStatus = false;
    this.isAdmin=false;
    await this.router.navigate([''])
  }

}
