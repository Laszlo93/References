import { NgModule } from '@angular/core';
import { ItemsComponent } from './components/items/items.component';
import { HistoryComponent } from './components/history/history.component';
import { RouterModule, Routes } from '@angular/router';
import { MaintananceComponent } from './components/maintanance/maintanance.component';
import { LoginComponent } from './components/login/login.component';
import { UpdateItemComponent } from './components/items/update-item/update-item.component';
import { ItemsListComponent } from './components/items/items-list/items-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddItemComponent } from './components/items/add-item/add-item.component';
import { UsersListComponent } from './components/maintanance/users-list/users-list.component';
import { AddUserComponent } from './components/maintanance/add-user/add-user.component';
import { UpdateUserComponent } from './components/maintanance/update-user/update-user.component';

const routes: Routes  = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'items', component: ItemsComponent,
    children:
    [
        { path: '', redirectTo: 'items-list', pathMatch: 'full' },
        { path: 'items-list', component: ItemsListComponent },
        { path: 'add', component: AddItemComponent },
        { path: ':id', component: UpdateItemComponent }
      ]},
  {path: 'users', component: MaintananceComponent,
    children:
      [
        { path: '', redirectTo: 'users-list', pathMatch: 'full' },
        { path: 'users-list', component: UsersListComponent },
        { path: 'add', component: AddUserComponent },
        { path: ':id', component: UpdateUserComponent }
      ]
  },
  {path: 'history', component: HistoryComponent},
  {path: '**', component: PageNotFoundComponent},

]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }

