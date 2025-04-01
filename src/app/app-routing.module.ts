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
import { ListFournisseursComponent }  from './BackOffice/Modules/RessourceManagement/list-fournisseurs/list-fournisseurs.component';
import { AddFournisseurComponent } from './BackOffice/Modules/RessourceManagement/add-fournisseur/add-fournisseur.component';
import { ListMaterialsComponent } from './BackOffice/Modules/RessourceManagement/list-materials/list-materials.component';
import { AddMaterialComponent } from './BackOffice/Modules/RessourceManagement/add-material/add-material.component';
import { StockFormComponent } from './BackOffice/Modules/RessourceManagement/stock-form/stock-form.component';
import { StockListComponent } from './BackOffice/Modules/RessourceManagement/stock-list/stock-list.component';
import { ListeCommandesComponent } from './BackOffice/Modules/RessourceManagement/liste-commandes/liste-commandes.component';
import { CommandeFormComponent } from './BackOffice/Modules/RessourceManagement/commande-form/commande-form.component';
import { FactureFormComponent } from './BackOffice/Modules/RessourceManagement/facture-form/facture-form.component';
import { FactureListComponent } from './BackOffice/Modules/RessourceManagement/facture-list/facture-list.component';
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
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'user/management-user', component: UserManagementComponent },
      { path: 'user/management-profile', component: ProfileManagementComponent },
      { path: 'user/addUser', component: AddUserComponent },
      { path: 'livrable/tache-management', component: LivrableManagementComponent },
      { path: 'add-fournisseur', component: AddFournisseurComponent }, // ✅ Route pour AddFournisseur
      { path: 'list-fournisseurs', component: ListFournisseursComponent }, // ✅ Route pour ListFournisseurs
       { path: 'list-materials', component: ListMaterialsComponent },
       { path: 'add-material', component: AddMaterialComponent },
       { path: 'dashboard/stock-form/:id', component: StockFormComponent },
      { path: 'stock-form', component: StockFormComponent },
       { path: 'stock-list', component: StockListComponent },
       { path: 'commandes', component: ListeCommandesComponent },
       { path: 'commande/add', component: CommandeFormComponent },
       { path: 'commande/edit/:id', component: CommandeFormComponent },
       { path: '', redirectTo: '/commandes', pathMatch: 'full' },
       { path: 'factures', component: FactureListComponent },
       { path: 'ajouter-facture', component: FactureFormComponent },
       { path: 'modifier-facture/:id', component: FactureFormComponent },
       { path: '', redirectTo: '/factures', pathMatch: 'full' }

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
