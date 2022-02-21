import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OffersComponent } from './components/offers/offers.component';
import { DetailsComponent } from './components/details/details.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CalendarWeatherComponent } from './components/details/calendar-weather/calendar-weather.component';
import { TravelPlannerComponent } from './components/details/travel-planner/travel-planner.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAnalyticsModule} from "@angular/fire/compat/analytics";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { AddPackageComponent } from './components/admin/add-package/add-package.component';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ListPackagesComponent } from './components/admin/list-packages/list-packages.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OffersComponent,
    DetailsComponent,
    LoginComponent,
    CalendarWeatherComponent,
    TravelPlannerComponent,
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    RegisterComponent,
    AdminComponent,
    AddPackageComponent,
    ListPackagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleMapsModule,
    FormsModule,
    NgbModule,
    MdbScrollspyModule,
    FontAwesomeModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore())
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
