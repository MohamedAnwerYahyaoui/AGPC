import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './FrontOffice/home/home.component';
import { SigninComponent } from './Authentification/signin/signin.component';
import { SignupComponent } from './Authentification/signup/signup.component';
import { DashboardHomeComponent } from './BackOffice/dashboard-home/dashboard-home.component';
import { UserManagementComponent } from './BackOffice/Modules/User Management/user-management/user-management.component';
import { ProfileManagementComponent } from './BackOffice/Modules/User Management/profile-management/profile-management.component';
import { LivrableManagementComponent } from './BackOffice/Modules/Livrable Management/livrable-management/livrable-management.component';
import { RessourceManagementComponent } from './BackOffice/Modules/Ressource Management/ressource-management/ressource-management.component';
import { AboutComponent } from './FrontOffice/about/about.component';
import { SolutionsComponent } from './FrontOffice/solutions/solutions.component';
import { OurClientsComponent } from './FrontOffice/our-clients/our-clients.component';
import { ClientLayoutComponent } from './FrontOffice/client-layout/client-layout.component';
import { DashboardLayoutComponent } from './BackOffice/dashboard-layout/dashboard-layout.component';
import { InfrastructureProjectComponent } from './FrontOffice/infrastructure-project/infrastructure-project.component';
import { ResidentialProjectComponent } from './FrontOffice/residential-project/residential-project.component';
import { CommercialProjectComponent } from './FrontOffice/commercial-project/commercial-project.component';
import { WelcomNewUserComponent } from './Authentification/welcom-new-user/welcom-new-user.component';
import { AddUserComponent } from './BackOffice/Modules/User Management/add-user/add-user.component';
import { ForgotPasswordComponent } from './Authentification/forgot-password/forgot-password.component';
import { AuthGaurdservService } from './Authentification/services/auth-gaurdserv.service';
import { UserListComponent } from './BackOffice/Modules/User Management/user-list/user-list.component';
import { CreateUserComponent } from './BackOffice/Modules/User Management/create-user/create-user.component';
import { RoleListComponent } from './BackOffice/Modules/User Management/role-management/role-list/role-list.component';
import { CreateRoleComponent } from './BackOffice/Modules/User Management/role-management/create-role/create-role.component';

const routes: Routes = [
 // Default Redirect to Client Home
 { path: '', redirectTo: '/client', pathMatch: 'full' },

 // FrontOffice Layout
 {
   path: 'client',
   component: ClientLayoutComponent,
   children: [
     { path: '', component: HomeComponent },
     { path: 'about', component: AboutComponent },
     { path: 'solutions', component: SolutionsComponent },
     { path: 'projects', component: OurClientsComponent },
     { path: 'projects/infrastructureProject', component: InfrastructureProjectComponent },
     { path: 'projects/residentialProject', component: ResidentialProjectComponent },
     { path: 'projects/commercialProject', component: CommercialProjectComponent },
   ],
 },

 // Authentication
 { path: 'signin', component: SigninComponent },
 { path: 'signup', component: SignupComponent },
 { path: 'welcome', component: WelcomNewUserComponent },
 { path: 'forgotPassword', component: ForgotPasswordComponent },

 // BackOffice Layout (Dashboard)
 {
   path: 'dashboard',
   component: DashboardLayoutComponent,
   canActivate: [AuthGaurdservService],
   children: [
     { path: '', component: DashboardHomeComponent },
     { path: 'user/management-user', component: UserManagementComponent },
     { path: 'user/management-profile', component: ProfileManagementComponent },
     { path: 'user/addUser', component: AddUserComponent },
     { path: 'user/usersList', component: UserListComponent },
     { path: 'user/createUser', component: CreateUserComponent },
     { path: 'user/rolesList', component: RoleListComponent },
     { path: 'user/createRole', component: CreateRoleComponent },
     { path: 'livrable/tache-management', component: LivrableManagementComponent },
     { path: 'ressource/ressource-management', component: RessourceManagementComponent },
   ],
 },

 // Not Found Page
 { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
