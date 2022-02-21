import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "@angular/fire/auth";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private fireAuth: any = getAuth();

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }

   constructor(
    private router: Router,
    private toastr: ToastrService,
    private auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
  }
  public submitLoginForm(): void {
    console.log(this.loginForm.value);
    signInWithEmailAndPassword(this.fireAuth, this.loginForm.value.email, this.loginForm.value.password)
      .then((userData) => {
        console.log(userData);
        this.toastr.success('Sikeresen bejelentkeztél.', 'Success');
        this.router.navigate(['']);
      })
      .catch((e) => {
        console.log(e);
        this.toastr.error('Az email cím, vagy a jelszó helytelen!', 'Error');
      })
  }

  public loginWithGoogle(): void {
    console.log('google login');
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userData) => {
          console.log(userData.user?.displayName);
          console.log(userData.user?.email);
          console.log(userData.user?.uid);
          console.log(userData.user?.emailVerified);
          this.toastr.success('Sikeresen bejelentkeztél.', 'Success');
          this.router.navigate(['']);
      })
      .catch((e) => console.log(e))
  }
}
