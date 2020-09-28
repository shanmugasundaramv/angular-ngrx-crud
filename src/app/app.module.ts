import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from './filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserResolver } from './store/user.resolver';
import { UserEffects } from './store/user.effects';
import { userReducer } from './store/user.reducers';


@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    UserDetailsComponent,
    UserListComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    StoreModule.forRoot({users: userReducer}),
    EffectsModule.forRoot([UserEffects])
  ],
  providers: [UserResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
