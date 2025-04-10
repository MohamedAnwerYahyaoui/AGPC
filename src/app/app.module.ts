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
import { DashboardLayoutComponent } from './BackOffice/dashboard-layout/dashboard-layout.component';
import { ClientLayoutComponent } from './FrontOffice/client-layout/client-layout.component';
import { ResidentialProjectComponent } from './FrontOffice/residential-project/residential-project.component';
import { CommercialProjectComponent } from './FrontOffice/commercial-project/commercial-project.component';
import { InfrastructureProjectComponent } from './FrontOffice/infrastructure-project/infrastructure-project.component';
import { WelcomNewUserComponent } from './Authentification/welcom-new-user/welcom-new-user.component';
import { AddUserComponent } from './BackOffice/Modules/User Management/add-user/add-user.component';
import { ForgotPasswordComponent } from './Authentification/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
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
import { AddFournisseurComponent } from './BackOffice/Modules/RessourceManagement/add-fournisseur/add-fournisseur.component';
import { AddMaterialComponent } from './BackOffice/Modules/RessourceManagement/add-material/add-material.component';
import { CommandeFormComponent } from './BackOffice/Modules/RessourceManagement/commande-form/commande-form.component';
import { FactureFormComponent } from './BackOffice/Modules/RessourceManagement/facture-form/facture-form.component';
import { FactureListComponent } from './BackOffice/Modules/RessourceManagement/facture-list/facture-list.component';
import { LanguageSelectorComponent } from './BackOffice/Modules/RessourceManagement/language-selector/language-selector.component';
import { ListFournisseursComponent } from './BackOffice/Modules/RessourceManagement/list-fournisseurs/list-fournisseurs.component';
import { ListMaterialsComponent } from './BackOffice/Modules/RessourceManagement/list-materials/list-materials.component';
import { ListeCommandesComponent } from './BackOffice/Modules/RessourceManagement/liste-commandes/liste-commandes.component';
import { StockFormComponent } from './BackOffice/Modules/RessourceManagement/stock-form/stock-form.component';
import { StockListComponent } from './BackOffice/Modules/RessourceManagement/stock-list/stock-list.component';
import { SearchPipe } from './pipes/search.pipe';
import { ArrayFromNumberPipe } from './pipes/array-from-number.pipe';

import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { QRCodeModule } from 'angularx-qrcode';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ListChantierComponent } from './BackOffice/Modules/Environnement Management/Chantier/list-chantier/list-chantier.component';
import { AddChantierComponent } from './BackOffice/Modules/Environnement Management/Chantier/add-chantier/add-chantier.component';
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
import { UpdateChantierComponent } from './BackOffice/Modules/Environnement Management/Chantier/list-chantier/update-chantier/update-chantier.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { AddtacheComponent } from './BackOffice/Modules/Livrable Management/Component/addtache/addtache.component';
import { BuildingGeneratorComponent } from './BackOffice/Modules/Livrable Management/Component/building-generator/building-generator.component';
import { CalendarComponent } from './BackOffice/Modules/Livrable Management/Component/calendar/calendar.component';
import { ConfirmDialogComponent } from './BackOffice/Modules/Livrable Management/Component/confirm-dialog/confirm-dialog.component';
import { GanttChartComponent } from './BackOffice/Modules/Livrable Management/Component/gantt-chart/gantt-chart.component';
import { HoursPerTaskComponent } from './BackOffice/Modules/Livrable Management/Component/hours-per-task/hours-per-task.component';
import { KanbanComponent } from './BackOffice/Modules/Livrable Management/Component/kanban/kanban.component';
import { LivrableFormComponent } from './BackOffice/Modules/Livrable Management/Component/livrable-form/livrable-form.component';
import { LivrableListComponent } from './BackOffice/Modules/Livrable Management/Component/livrable-list/livrable-list.component';
import { TimeSheetFormComponent } from './BackOffice/Modules/Livrable Management/Component/time-sheet-form/time-sheet-form.component';
import { TimeSheetListComponent } from './BackOffice/Modules/Livrable Management/Component/time-sheet-list/time-sheet-list.component'; // the main connector. must go first

import {MatToolbarModule} from "@angular/material/toolbar";
import {NgChartsModule} from "ng2-charts";

import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatChipsModule} from "@angular/material/chips";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { DragDropModule } from '@angular/cdk/drag-drop';

import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { AssuranceFormComponent } from './BackOffice/Modules/AssuranceManagement/assurance-form/assurance-form.component';
import { AssuranceListComponent } from './BackOffice/Modules/AssuranceManagement/assurance-list/assurance-list.component';
import { DocumentFormComponent } from './BackOffice/Modules/DocumentManagement/document-form/document-form.component';
import { DocumentListComponent } from './BackOffice/Modules/DocumentManagement/document-list/document-list.component';
import { NotificationListComponent } from './BackOffice/Modules/NotificationManagement/notification-list/notification-list.component';
import { ToastrModule } from 'ngx-toastr';
// Import SharedModule

import { ListeEmployesComponent } from './BackOffice/Modules/MembresManagement/liste-employes/liste-employes.component';
import { AddMembresComponent } from './BackOffice/Modules/MembresManagement/add-membres/add-membres.component';
import { congeeService } from './services/congee.service';
import { AddContratComponent } from './BackOffice/Modules/MembresManagement/add-contrat/add-contrat.component';
import { ListContratComponent } from './BackOffice/Modules/MembresManagement/list-contrat/list-contrat.component';
import { AddCongeeComponent } from './BackOffice/Modules/MembresManagement/add-congee/add-congee.component';
import { ListCongeeComponent } from './BackOffice/Modules/MembresManagement/list-congee/list-congee.component';
import { AddEquipeComponent } from './BackOffice/Modules/MembresManagement/add-equipe/add-equipe.component';
import { ListEquipeComponent } from './BackOffice/Modules/MembresManagement/list-equipe/list-equipe.component';
import { AddLivrableComponent } from './BackOffice/Modules/MembresManagement/add-livrable/add-livrable.component';
import { ListLivrableComponent } from './BackOffice/Modules/MembresManagement/list-livrable/list-livrable.component';
import { FilterPipe } from './filter.pipe';
import { ContractFilterPipe } from './contrat-filter.pipe';
import { CongeeFilterPipe } from './congee-filter.pipe';
import { LivrableFilterPipe } from './livrable-filter.pipe';
import { EquipeFilterPipe } from './equipe-filter.pipe';
import { EmailComponent } from './BackOffice/Modules/MembresManagement/email/email.component';
import { StatsComponent } from './BackOffice/Modules/MembresManagement/stats/stats.component';
import { CheckCongeeComponent } from './BackOffice/Modules/MembresManagement/check-congee/check-congee.component';
import { ContratService } from './services/contrat.service';
import { EquipeService } from './services/equipe.service';
//import { ListMembresComponent } from './BackOffice/Modules/MembresManagement/list-membres/list-membres.component';
import { EmployeService } from './services/employe.service';
import { AdminCategoryFeedbacksComponent } from './BackOffice/admin-category-feedbacks/admin-category-feedbacks.component';
import { AdminReclamationsComponent } from './BackOffice/admin-reclamations/admin-reclamations.component';

import { UserReclamationsComponent } from './FrontOffice/user-reclamations/user-reclamations.component';
import { UserFeedbacksComponent } from './FrontOffice/user-feedbacks/user-feedbacks.component';
import { UserCategoryFeedbacksComponent } from './FrontOffice/user-category-feedbacks/user-category-feedbacks.component';
// Fonction nécessaire pour le chargement des traductions
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    RoleAssignmentComponent,


    AddFournisseurComponent,
    AddMaterialComponent,
    CommandeFormComponent,
    FactureFormComponent,
    FactureListComponent,
    LanguageSelectorComponent,
    ListFournisseursComponent,
    ListMaterialsComponent,
    ListeCommandesComponent,
    StockFormComponent,
    StockListComponent,
    SearchPipe,
    ArrayFromNumberPipe,
    ListChantierComponent,
    AddChantierComponent,
    AddZoneComponent,
    ListZonesComponent,
    UpdateZoneComponent,
    AddBudgetComponent,
    ListBudgetComponent,
    UpdateBudgetComponent,
    AddExpencesComponent,
    ListExpencesComponent,
    UpdateExpencesComponent,
    AddFormationsComponent,
    ListFormationsComponent,
    UpdateChantierComponent,
    AddtacheComponent,
    BuildingGeneratorComponent,
    CalendarComponent,
    ConfirmDialogComponent,
    GanttChartComponent,
    HoursPerTaskComponent,
    KanbanComponent,
    LivrableFormComponent,
    LivrableListComponent,
    TimeSheetFormComponent,
    TimeSheetListComponent,
    AssuranceFormComponent,
    AssuranceListComponent,
    DocumentFormComponent,
    DocumentListComponent,
    NotificationListComponent,

    ListeEmployesComponent,
    AddMembresComponent,
    AddContratComponent,
    ListContratComponent,
    AddCongeeComponent,
    ListCongeeComponent,
    AddEquipeComponent,
    ListEquipeComponent,
    AddLivrableComponent,
    ListLivrableComponent,
    FilterPipe,
    ContractFilterPipe,
    CongeeFilterPipe,
    LivrableFilterPipe,
    EquipeFilterPipe,
    EmailComponent,
    StatsComponent,
    CheckCongeeComponent,
    AdminCategoryFeedbacksComponent,
    AdminReclamationsComponent,

    UserReclamationsComponent,
    UserFeedbacksComponent,
    UserCategoryFeedbacksComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
   
    FormsModule,
    NgxPaginationModule,
    QRCodeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
       defaultLanguage: 'fr'
    }),
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FullCalendarModule,
    MatChipsModule,
    DragDropModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    NgChartsModule,
    MatPaginatorModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatProgressBarModule,
    CommonModule,
    MatTooltipModule,
    ToastrModule.forRoot(),
    
    
    
   
  ],
  providers: [
    
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
