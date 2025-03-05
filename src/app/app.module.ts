import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
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
import { ListBudgetComponent } from './BackOffice/Modules/Finance Management/Budget/list-budget/list-budget.component';
import { AddBudgetComponent } from './BackOffice/Modules/Finance Management/Budget/add-budget/add-budget.component';
import { UpdateBudgetComponent } from './BackOffice/Modules/Finance Management/Budget/update-budget/update-budget.component';
import { ListExpencesComponent } from './BackOffice/Modules/Finance Management/Expences/list-expences/list-expences.component';
import { AddExpencesComponent } from './BackOffice/Modules/Finance Management/Expences/add-expences/add-expences.component';
import { UpdateExpencesComponent } from './BackOffice/Modules/Finance Management/Expences/update-expences/update-expences.component';
import { ListChantierComponent } from './BackOffice/Modules/Environnement Management/Chantier/list-chantier/list-chantier.component';
import { UpdateChantierComponent } from './BackOffice/Modules/Environnement Management/Chantier/list-chantier/update-chantier/update-chantier.component';
import { AddChantierComponent } from './BackOffice/Modules/Environnement Management/Chantier/add-chantier/add-chantier.component';
import { ListZonesComponent } from './BackOffice/Modules/Environnement Management/Zones/list-zones/list-zones.component';
import { AddZoneComponent } from './BackOffice/Modules/Environnement Management/Zones/add-zone/add-zone.component';
import { UpdateZoneComponent } from './BackOffice/Modules/Environnement Management/Zones/update-zone/update-zone.component';
import { ListFormationsComponent } from './BackOffice/Modules/Formation Management/list-formations/list-formations.component';
import { AddFormationsComponent } from './BackOffice/Modules/Formation Management/add-formations/add-formations.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
 // Import SharedModule
import autoTable from 'jspdf-autotable';

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
    ListBudgetComponent,
    AddBudgetComponent,
    UpdateBudgetComponent,
    ListExpencesComponent,
    AddExpencesComponent,
    UpdateExpencesComponent,
    ListChantierComponent,
    UpdateChantierComponent,
    AddChantierComponent,
    ListZonesComponent,
    AddZoneComponent,
    UpdateZoneComponent,
    ListFormationsComponent,
    AddFormationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FullCalendarModule, // Import FullCalendarModule
     // Add SharedModule here
    RouterModule // Add RouterModule here
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
