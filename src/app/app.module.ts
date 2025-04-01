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

import { LivrableManagementComponent } from './BackOffice/Modules/Livrable Management/livrable-management/livrable-management.component';
import { DashboardLayoutComponent } from './BackOffice/dashboard-layout/dashboard-layout.component';
import { ClientLayoutComponent } from './FrontOffice/client-layout/client-layout.component';
import { ResidentialProjectComponent } from './FrontOffice/residential-project/residential-project.component';
import { CommercialProjectComponent } from './FrontOffice/commercial-project/commercial-project.component';
import { InfrastructureProjectComponent } from './FrontOffice/infrastructure-project/infrastructure-project.component';
import { WelcomNewUserComponent } from './Authentification/welcom-new-user/welcom-new-user.component';
import { AddUserComponent } from './BackOffice/Modules/User Management/add-user/add-user.component';
import { ForgotPasswordComponent } from './Authentification/forgot-password/forgot-password.component';

import { AddFournisseurComponent } from './BackOffice/Modules/RessourceManagement/add-fournisseur/add-fournisseur.component';
import { ListFournisseursComponent } from './BackOffice/Modules/RessourceManagement/list-fournisseurs/list-fournisseurs.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ListMaterialsComponent } from './BackOffice/Modules/RessourceManagement/list-materials/list-materials.component';
import { AddMaterialComponent } from './BackOffice/Modules/RessourceManagement/add-material/add-material.component';
import { StockFormComponent } from './BackOffice/Modules/RessourceManagement/stock-form/stock-form.component';
import { StockListComponent } from './BackOffice/Modules/RessourceManagement/stock-list/stock-list.component';
import { ListeCommandesComponent } from './BackOffice/Modules/RessourceManagement/liste-commandes/liste-commandes.component';
import { CommandeFormComponent } from './BackOffice/Modules/RessourceManagement/commande-form/commande-form.component';
import { FactureListComponent } from './BackOffice/Modules/RessourceManagement/facture-list/facture-list.component';
import { FactureFormComponent } from './BackOffice/Modules/RessourceManagement/facture-form/facture-form.component';
import { SearchPipe } from './pipes/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination'; // Importation de ngx-pagination
import { ArrayFromNumberPipe } from './pipes/array-from-number.pipe';
import { QRCodeModule } from 'angularx-qrcode';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { LanguageSelectorComponent } from './BackOffice/Modules/RessourceManagement/language-selector/language-selector.component';


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
    
    AddFournisseurComponent,
    ListFournisseursComponent,
    ListMaterialsComponent,
    AddMaterialComponent,
    StockFormComponent,
    StockListComponent,
    ListeCommandesComponent,
    CommandeFormComponent,
    FactureListComponent,
    FactureFormComponent,
   SearchPipe,
   ArrayFromNumberPipe,
   LanguageSelectorComponent,
   
   
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
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
  

  
    
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
