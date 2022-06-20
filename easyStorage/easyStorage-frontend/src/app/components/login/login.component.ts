import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private messageService: MessageService,
    private router: Router,
    private navbar: NavbarService,
    private authService: AuthService
    ) {
      this.navbar.hideNavbar();
    }

  ngOnInit(): void {
  }

  public login(form: NgForm): void {
    if(form.valid) {
      this.authService.login(form.value).subscribe({
        next: () => {},
        error: () => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Hibás felhasználónév vagy jelszó!'});
        },
        complete: () => {
          form.reset();
          this.router.navigate(['items']);
        }
      });
    } else {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Felhasználónév és jelszó megadása kötelező!'});
    }
  }

  ngOnDestroy(): void {
    this.navbar.showNavbar();
  }
}
