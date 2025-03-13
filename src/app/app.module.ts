import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './FrontOffice/footer/footer.component';
import { AboutComponent } from './FrontOffice/about/about.component';
import { HomeComponent } from './FrontOffice/home/home.component';
import { ClientNavBarComponent } from './FrontOffice/client-nav-bar/client-nav-bar.component';
import { SolutionsComponent } from './FrontOffice/solutions/solutions.component';
import { OurClientsComponent } from './FrontOffice/our-clients/our-clients.component';
import { SigninComponent } from './Authentification/signin/signin.component';
import { SignupComponent } from './Authentification/signup/signup.component';
import { DashboardHomeComponent } from './BackOffice/dashboard-home/dashboard-home.component';
import { DashboardNavBarComponent } from './BackOffice/dashboard-nav-bar/dashboard-nav-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileManagementComponent } from './BackOffice/Modules/User Management/profile-management/profile-management.component';
import { UserManagementComponent } from './BackOffice/Modules/User Management/user-management/user-management.component';
import { RessourceManagementComponent } from './BackOffice/Modules/Ressource Management/ressource-management/ressource-management.component';
import { LivrableManagementComponent } from './BackOffice/Modules/Livrable Management/livrable-management/livrable-management.component';
import { DashboardLayoutComponent } from './BackOffice/dashboard-layout/dashboard-layout.component';
import { ClientLayoutComponent } from './FrontOffice/client-layout/client-layout.component';
import { ResidentialProjectComponent } from './FrontOffice/residential-project/residential-project.component';
import { CommercialProjectComponent } from './FrontOffice/commercial-project/commercial-project.component';
import { InfrastructureProjectComponent } from './FrontOffice/infrastructure-project/infrastructure-project.component';
import { WelcomNewUserComponent } from './Authentification/welcom-new-user/welcom-new-user.component';
import { AddUserComponent } from './BackOffice/Modules/User Management/add-user/add-user.component';
import { ForgotPasswordComponent } from './Authentification/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './Authentification/services/auth-interceptor.service';
import { UserListComponent } from './BackOffice/Modules/User Management/user-list/user-list.component';
import { CreateUserComponent } from './BackOffice/Modules/User Management/create-user/create-user.component';
import { CreateRoleComponent } from './BackOffice/Modules/User Management/role-management/create-role/create-role.component';
import { RoleListComponent } from './BackOffice/Modules/User Management/role-management/role-list/role-list.component';
import { HomeUserComponent } from './BackOffice/Modules/User Management/home-user/home-user.component';
import { UpdateComponent } from './BackOffice/Modules/User Management/role-management/update/update.component';
import { UnauthorizedComponent } from './BackOffice/unauthorized/unauthorized.component';
import { RoleAssignmentComponent } from './BackOffice/Modules/User Management/role-management/role-assignment/role-assignment.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    ClientNavBarComponent,
    SolutionsComponent,
    OurClientsComponent,
    SigninComponent,
    SignupComponent,
    DashboardHomeComponent,
    DashboardNavBarComponent,
    UserManagementComponent,
    RessourceManagementComponent,
    LivrableManagementComponent,
    NotFoundComponent,
    ProfileManagementComponent,
    DashboardLayoutComponent,
    ClientLayoutComponent,
    ResidentialProjectComponent,
    CommercialProjectComponent,
    InfrastructureProjectComponent,
    WelcomNewUserComponent,
    AddUserComponent,
    ForgotPasswordComponent,
    UserListComponent,
    CreateUserComponent,
    CreateRoleComponent,
    RoleListComponent,
    HomeUserComponent,
    UpdateComponent,
    UnauthorizedComponent,
    RoleAssignmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
