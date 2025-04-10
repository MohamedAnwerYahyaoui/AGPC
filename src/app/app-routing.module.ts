import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './FrontOffice/home/home.component';
import { SigninComponent } from './Authentification/signin/signin.component';
import { SignupComponent } from './Authentification/signup/signup.component';
import { UserManagementComponent } from './BackOffice/Modules/User Management/user-management/user-management.component';
import { ProfileManagementComponent } from './BackOffice/Modules/User Management/profile-management/profile-management.component';
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
import { HomeUserComponent } from './BackOffice/Modules/User Management/home-user/home-user.component';
import { UpdateComponent } from './BackOffice/Modules/User Management/role-management/update/update.component';
import { UnauthorizedComponent } from './BackOffice/unauthorized/unauthorized.component';
import { RoleGaurdService } from './Authentification/services/role-gaurd.service';
import { RoleAssignmentComponent } from './BackOffice/Modules/User Management/role-management/role-assignment/role-assignment.component';
import { AddFournisseurComponent } from './BackOffice/Modules/RessourceManagement/add-fournisseur/add-fournisseur.component';
import { AddMaterialComponent } from './BackOffice/Modules/RessourceManagement/add-material/add-material.component';
import { CommandeFormComponent } from './BackOffice/Modules/RessourceManagement/commande-form/commande-form.component';
import { FactureFormComponent } from './BackOffice/Modules/RessourceManagement/facture-form/facture-form.component';
import { FactureListComponent } from './BackOffice/Modules/RessourceManagement/facture-list/facture-list.component';
import { ListFournisseursComponent } from './BackOffice/Modules/RessourceManagement/list-fournisseurs/list-fournisseurs.component';
import { ListMaterialsComponent } from './BackOffice/Modules/RessourceManagement/list-materials/list-materials.component';
import { ListeCommandesComponent } from './BackOffice/Modules/RessourceManagement/liste-commandes/liste-commandes.component';
import { StockFormComponent } from './BackOffice/Modules/RessourceManagement/stock-form/stock-form.component';
import { StockListComponent } from './BackOffice/Modules/RessourceManagement/stock-list/stock-list.component';
import { BuildingGeneratorComponent } from './BackOffice/Modules/Livrable Management/Component/building-generator/building-generator.component';
import { CalendarComponent } from './BackOffice/Modules/Livrable Management/Component/calendar/calendar.component';
import { GanttChartComponent } from './BackOffice/Modules/Livrable Management/Component/gantt-chart/gantt-chart.component';
import { HoursPerTaskComponent } from './BackOffice/Modules/Livrable Management/Component/hours-per-task/hours-per-task.component';
import { KanbanComponent } from './BackOffice/Modules/Livrable Management/Component/kanban/kanban.component';
import { LivrableFormComponent } from './BackOffice/Modules/Livrable Management/Component/livrable-form/livrable-form.component';
import { LivrableListComponent } from './BackOffice/Modules/Livrable Management/Component/livrable-list/livrable-list.component';
import { TimeSheetListComponent } from './BackOffice/Modules/Livrable Management/Component/time-sheet-list/time-sheet-list.component';
import { AssuranceFormComponent } from './BackOffice/Modules/AssuranceManagement/assurance-form/assurance-form.component';
import { AssuranceListComponent } from './BackOffice/Modules/AssuranceManagement/assurance-list/assurance-list.component';
import { DocumentFormComponent } from './BackOffice/Modules/DocumentManagement/document-form/document-form.component';
import { DocumentListComponent } from './BackOffice/Modules/DocumentManagement/document-list/document-list.component';
import { NotificationListComponent } from './BackOffice/Modules/NotificationManagement/notification-list/notification-list.component';
import { AddChantierComponent } from './BackOffice/Modules/Environnement Management/Chantier/add-chantier/add-chantier.component';
import { ListChantierComponent } from './BackOffice/Modules/Environnement Management/Chantier/list-chantier/list-chantier.component';
import { UpdateChantierComponent } from './BackOffice/Modules/Environnement Management/Chantier/list-chantier/update-chantier/update-chantier.component';
import { AddZoneComponent } from './BackOffice/Modules/Environnement Management/Zones/add-zone/add-zone.component';
import { ListZonesComponent } from './BackOffice/Modules/Environnement Management/Zones/list-zones/list-zones.component';
import { UpdateZoneComponent } from './BackOffice/Modules/Environnement Management/Zones/update-zone/update-zone.component';
import { AddBudgetComponent } from './BackOffice/Modules/Finance Management/Budget/add-budget/add-budget.component';
import { ListBudgetComponent } from './BackOffice/Modules/Finance Management/Budget/list-budget/list-budget.component';
import { UpdateBudgetComponent } from './BackOffice/Modules/Finance Management/Budget/update-budget/update-budget.component';
import { AddExpencesComponent } from './BackOffice/Modules/Finance Management/Expences/add-expences/add-expences.component';
import { ListExpencesComponent } from './BackOffice/Modules/Finance Management/Expences/list-expences/list-expences.component';
import { UpdateExpencesComponent } from './BackOffice/Modules/Finance Management/Expences/update-expences/update-expences.component';
import { AddFormationsComponent } from './BackOffice/Modules/Formation Management/add-formations/add-formations.component';
import { ListFormationsComponent } from './BackOffice/Modules/Formation Management/list-formations/list-formations.component';
import { AddCongeeComponent } from './BackOffice/Modules/MembresManagement/add-congee/add-congee.component';
import { AddContratComponent } from './BackOffice/Modules/MembresManagement/add-contrat/add-contrat.component';
import { AddEquipeComponent } from './BackOffice/Modules/MembresManagement/add-equipe/add-equipe.component';
import { AddLivrableComponent } from './BackOffice/Modules/MembresManagement/add-livrable/add-livrable.component';
import { AddMembresComponent } from './BackOffice/Modules/MembresManagement/add-membres/add-membres.component';
import { CheckCongeeComponent } from './BackOffice/Modules/MembresManagement/check-congee/check-congee.component';
import { EmailComponent } from './BackOffice/Modules/MembresManagement/email/email.component';
import { ListCongeeComponent } from './BackOffice/Modules/MembresManagement/list-congee/list-congee.component';
import { ListContratComponent } from './BackOffice/Modules/MembresManagement/list-contrat/list-contrat.component';
import { ListEquipeComponent } from './BackOffice/Modules/MembresManagement/list-equipe/list-equipe.component';
import { ListLivrableComponent } from './BackOffice/Modules/MembresManagement/list-livrable/list-livrable.component';
import { ListeEmployesComponent } from './BackOffice/Modules/MembresManagement/liste-employes/liste-employes.component';
import { StatsComponent } from './BackOffice/Modules/MembresManagement/stats/stats.component';
import { AdminReclamationsComponent } from './BackOffice/admin-reclamations/admin-reclamations.component';
import { AdminCategoryFeedbacksComponent } from './BackOffice/admin-category-feedbacks/admin-category-feedbacks.component';
import { UserCategoryFeedbacksComponent } from './FrontOffice/user-category-feedbacks/user-category-feedbacks.component';
import { UserReclamationsComponent } from './FrontOffice/user-reclamations/user-reclamations.component';
import { UserFeedbacksComponent } from './FrontOffice/user-feedbacks/user-feedbacks.component';

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
     { path: 'reclamations', component: UserReclamationsComponent },
     { path: 'feedbacks', component: UserCategoryFeedbacksComponent },
     { path: 'feedbacksUser', component: UserFeedbacksComponent },
     
   ],
 },

 // Authentication
 { path: 'signin', component: SigninComponent },
 { path: 'signup', component: SignupComponent },
 { path: 'password-reset', component: WelcomNewUserComponent }, 
 { path: 'forgotPassword', component: ForgotPasswordComponent },
 { path: 'unauthorized', component: UnauthorizedComponent },

 // BackOffice Layout (Dashboard)
 {
   path: 'dashboard',
   component: DashboardLayoutComponent,
   canActivate: [AuthGaurdservService],
   children: [
     { path: '', component: HomeUserComponent },
     { path: 'user/management-user', component: UserManagementComponent ,  canActivate: [RoleGaurdService], data: { roles: ['ADMIN'] }},
     { path: 'user/management-profile', component: ProfileManagementComponent ,  canActivate: [RoleGaurdService], data: { roles: ['ADMIN'] }},
     { path: 'user/addUser', component: AddUserComponent ,  canActivate: [RoleGaurdService], data: { roles: ['ADMIN'] }},
     
     { path: 'user/RoleAssignment', component: RoleAssignmentComponent ,  canActivate: [RoleGaurdService], data: { roles: ['ADMIN'] }}, 
     { path: 'user/usersList', component: UserListComponent ,  canActivate: [RoleGaurdService], data: { roles: ['ADMIN'] }},
     { path: 'user/createUser', component: CreateUserComponent ,  canActivate: [RoleGaurdService], data: { roles: ['ADMIN'] }},
     { path: 'user/rolesList', component: RoleListComponent ,  canActivate: [RoleGaurdService], data: { roles: ['ADMIN'] }},
     { path: 'user/updateRole/:name', component: UpdateComponent ,  canActivate: [RoleGaurdService], data: { roles: ['ADMIN'] }},
     { path: 'user/createRole', component: CreateRoleComponent ,  canActivate: [RoleGaurdService], data: { roles: ['ADMIN'] } },
    // Ressource management

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
   
     { path: 'factures', component: FactureListComponent },
     { path: 'ajouter-facture', component: FactureFormComponent },
     { path: 'modifier-facture/:id', component: FactureFormComponent },
     
   
     // livrable routes 
     {path: 'livrable/listetache',component: KanbanComponent},

     {path: 'livrable/chart',component: HoursPerTaskComponent},

     {path: 'livrable/listelivrable',component: LivrableListComponent},
     {path: 'livrable/ajouterlivrable',component: LivrableFormComponent},
     {path: 'livrable/listetime',component: TimeSheetListComponent},
     {path: 'livrable/tacheuser',component: CalendarComponent},
     {path: 'livrable/model',component: BuildingGeneratorComponent},
     {path: 'livrable/gantt',component: GanttChartComponent},


     { path: 'list-membres', component: ListeEmployesComponent },
     { path: 'add-membre', component: AddMembresComponent }, 
     { path: 'send-email', component: EmailComponent },
     { path: 'add-membres/:id', component: AddMembresComponent },
     { path: 'list-contrat', component: ListContratComponent },
     { path: 'add-contrat', component: AddContratComponent }, 
     { path: 'add-contrat/:id', component: AddContratComponent },
     { path: 'list-congee', component: ListCongeeComponent },
     { path: 'add-congee', component: AddCongeeComponent }, 
     { path: 'add-congee/:id', component: AddCongeeComponent },
     { path: 'list-equipe', component: ListEquipeComponent },
     { path: 'add-equipe', component: AddEquipeComponent }, 
     { path: 'add-equipe/:id', component: AddEquipeComponent },
     { path: 'list-livrable', component: ListLivrableComponent},
     { path: 'add-livrable', component: AddLivrableComponent}, 
     { path: 'add-livrable/:id', component: AddLivrableComponent },
     { path: 'statistics', component: StatsComponent },
     { path: 'check-congee', component: CheckCongeeComponent },


      //Finance Routing


      {path:'finance/budget',component:ListBudgetComponent},

      {path:'finance/AddBudget',component:AddBudgetComponent},
 
      {path:'finance/UpdateBudget/:id',component:UpdateBudgetComponent},
      {path:'finance/expences',component:ListExpencesComponent},
      {path:'finance/AddExpences',component:AddExpencesComponent},
      {path:'finance/UpdateExpences/:id',component:UpdateExpencesComponent},
 
      //Environenment
      {path:'environnement/list',component:ListChantierComponent},
      {path:'environnement/UpdateChantier/:id',component:UpdateChantierComponent},
      {path:'environnement/AddChantier',component:AddChantierComponent},
      {path:'environnement/listZones',component:ListZonesComponent},
      {path:'environnement/AddZone',component:AddZoneComponent},
      {path:'environnement/UpdateZone/:id',component:UpdateZoneComponent},

      { path: 'reclamations', component: AdminReclamationsComponent },
     { path: 'feedbacks', component: AdminCategoryFeedbacksComponent },
 
      //formation
      {path:'formation/list',component:ListFormationsComponent},
      {path:'formation/AddFormation',component:AddFormationsComponent},

     // Grouping Documentation-related routes
     {
      path: 'documentation',
      children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' }, // Redirige vers la liste par défaut
        { path: 'list', component: DocumentListComponent },  // Supprime 'dashboard/documentation/'
        { path: 'add', component: DocumentFormComponent },
        { path: 'add/:id', component: DocumentFormComponent },  
        
          { path: 'edit/:id', component: DocumentFormComponent }, // 🟢 Corrigé ici !
          { path: 'list', component: DocumentListComponent },  // Supprime 'dashboard/documentation/'

           

        

      ]
    },
    {
      path: 'assurance',
      children: [
        { path: 'list', component: AssuranceListComponent },
        { path: 'add', component: AssuranceFormComponent },
{ path: 'edit/:id', component: AssuranceFormComponent },


           

        

      ]
    },
    {
      path: 'notifications',
      children: [
        { path: 'list', component: NotificationListComponent }
      ]
    },
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
