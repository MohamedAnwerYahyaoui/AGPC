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
import { DashboardLayoutComponent } from './BackOffice/dashboard-layout/dashboard-layout.component';
import { ClientLayoutComponent } from './FrontOffice/client-layout/client-layout.component';
import { ResidentialProjectComponent } from './FrontOffice/residential-project/residential-project.component';
import { CommercialProjectComponent } from './FrontOffice/commercial-project/commercial-project.component';
import { InfrastructureProjectComponent } from './FrontOffice/infrastructure-project/infrastructure-project.component';
import { WelcomNewUserComponent } from './Authentification/welcom-new-user/welcom-new-user.component';
import { AddUserComponent } from './BackOffice/Modules/User Management/add-user/add-user.component';
import { ForgotPasswordComponent } from './Authentification/forgot-password/forgot-password.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { DragDropModule } from '@angular/cdk/drag-drop';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';



import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import {NgxPaginationModule} from "ngx-pagination";
import {FullCalendarModule} from "@fullcalendar/angular";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";
import {MatChipsModule} from "@angular/material/chips";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { AddtacheComponent } from './BackOffice/Modules/Livrable Management/Component/addtache/addtache.component';
import { KanbanComponent } from './BackOffice/Modules/Livrable Management/Component/kanban/kanban.component';
import { ConfirmDialogComponent } from './BackOffice/Modules/Livrable Management/Component/confirm-dialog/confirm-dialog.component';
import { HoursPerTaskComponent } from './BackOffice/Modules/Livrable Management/Component/hours-per-task/hours-per-task.component';
import {NgChartsModule} from "ng2-charts";
import { LivrableListComponent } from './BackOffice/Modules/Livrable Management/Component/livrable-list/livrable-list.component';
import { LivrableFormComponent } from './BackOffice/Modules/Livrable Management/Component/livrable-form/livrable-form.component';
import { TimeSheetListComponent } from './BackOffice/Modules/Livrable Management/Component/time-sheet-list/time-sheet-list.component';
import { TimeSheetFormComponent } from './BackOffice/Modules/Livrable Management/Component/time-sheet-form/time-sheet-form.component';
import { CalendarComponent } from './BackOffice/Modules/Livrable Management/Component/calendar/calendar.component';
import { BuildingGeneratorComponent } from './BackOffice/Modules/Livrable Management/Component/building-generator/building-generator.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { GanttChartComponent } from './BackOffice/Modules/Livrable Management/Component/gantt-chart/gantt-chart.component';


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
    AddtacheComponent,
    KanbanComponent,
    ConfirmDialogComponent,
    HoursPerTaskComponent,
    LivrableListComponent,
    LivrableFormComponent,
    TimeSheetListComponent,
    TimeSheetFormComponent,
    CalendarComponent,
    BuildingGeneratorComponent,
    GanttChartComponent,





  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    //DragDropModule,
    FullCalendarModule,
    MatChipsModule,
    DragDropModule,
    ReactiveFormsModule,


    MatProgressSpinnerModule,

    NgChartsModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,


    MatProgressBarModule,

    CommonModule,
    MatChipsModule,


    MatDialogModule,
    MatSnackBarModule,



    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,

    MatIconModule,

    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,



    MatCardModule,
    MatToolbarModule,




    FormsModule,
    BrowserAnimationsModule,





















  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
