import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "@angular/fire/auth";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  private fireAuth: any = getAuth();

  regForm: FormGroup = new FormGroup({
    regEmail: new FormControl('', [Validators.required, Validators.email]),
    regPassword: new FormControl('', [Validators.required]),
  });

  get regEmail() { return this.regForm.get('regEmail'); }

  get regPassword() { return this.regForm.get('regPassword'); }

  constructor( private router: Router,
    private toastr: ToastrService,
    private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  public async submitRegForm(): Promise<void> {
    console.log(this.regForm.value);
    try {
      const userData = await createUserWithEmailAndPassword(this.fireAuth, this.regForm.value.regEmail, this.regForm.value.regPassword);
      console.log(userData);
      this.toastr.success('You have registrated successfully.', 'Success');

    } catch (e) {
      console.log(e);
      this.toastr.error('Ooops, something went wrong!', 'Error');
    }
  }
}
