import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CountdownModule } from 'ngx-countdown';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { MegaMenuModule } from 'primeng/megamenu';
import { AccordionModule } from 'primeng/accordion';
import { MenuModule } from 'primeng/menu';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ItemsComponent } from './components/items/items.component';
import { HistoryComponent } from './components/history/history.component';
import { AppRoutingModule } from './app-routing.module';
import { MaintananceComponent } from './components/maintanance/maintanance.component';
import { LoginComponent } from './components/login/login.component';
import { InputTextareaModule } from "primeng/inputtextarea";
import { RippleModule } from 'primeng/ripple';
import { ItemsSidebarComponent } from './components/items/items-sidebar/items-sidebar.component';
import { ItemsListComponent } from './components/items/items-list/items-list.component';
import { UpdateItemComponent } from './components/items/update-item/update-item.component';
import { HistoryListComponent } from './components/history/history-list/history-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddItemComponent } from './components/items/add-item/add-item.component';
import { MaintananceSidebarComponent } from './components/maintanance/maintanance-sidebar/maintanance-sidebar.component';
import { AddUserComponent } from './components/maintanance/add-user/add-user.component';
import { UsersListComponent } from './components/maintanance/users-list/users-list.component';
import { UpdateUserComponent } from './components/maintanance/update-user/update-user.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { HistorySidebarComponent } from './components/history/history-sidebar/history-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ItemsComponent,
    HistoryComponent,
    MaintananceComponent,
    LoginComponent,
    ItemsSidebarComponent,
    ItemsListComponent,
    UpdateItemComponent,
    HistoryListComponent,
    PageNotFoundComponent,
    AddItemComponent,
    MaintananceSidebarComponent,
    AddUserComponent,
    UsersListComponent,
    UpdateUserComponent,
    HistorySidebarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CountdownModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    SidebarModule,
    MegaMenuModule,
    AccordionModule,
    AppRoutingModule,
    MenuModule,
    InputTextareaModule,
    RippleModule,
    CheckboxModule,
    RadioButtonModule,
    PanelMenuModule,
    TableModule,
    PaginatorModule,
    DropdownModule,
    MultiSelectModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
