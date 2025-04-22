import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { APP_CONFIG, AppConfig } from './_shared/config/app.config';
import { AdminService } from './_shared/services/admin.service';
import { Cache } from './_shared/services/cache';
import { AuthInterceptor } from './_shared/services/token-interceptor.service';
import { ToastService } from './_shared/services/toast.service';
import { AuthGuardService } from './_shared/services/auth.service';

import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { UpdatePasswordModalComponent } from './_shared/update-password-modal/update-password-modal.component';
import { LoaderComponent } from './_shared/loader.component';
import { MatIconModule } from '@angular/material/icon';

// import { UploadService } from './_shared/services/upload.service';



import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './_shared/footer/footer.component';
import { HeaderComponent } from './_shared/header/header.component';
import { SidebarComponent } from './_shared/sidebar/sidebar.component';
import { ManagementTable } from './_shared/management-table/management-table.component';
import { UpdateProfileModalComponent } from './_shared/update-profile-modal/update-profile-modal.component';

import { UserManagement } from './user-management/user-management.component';
import { UserTransaction } from './user-transactions/user-transactions.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WithdrownTransactions } from './withdrown-transactions/withdrown-transactions.component';
import { UserWallet } from './user-wallet/user-wallet.component';
import { BonusManagement } from './bonus-management/bonus-management.component';
import { AdminModalComponent } from './admin/admin-modal/admin-modal.component';
import { BonusModalComponent } from './bonus-management/bonus-modal/bonus-modal.component';
import { QuzeManagement } from './quiz-management/quiz-management.component';
import { QuizModalComponent } from './quiz-management/quiz-modal/quiz-modal.component';
import { BannerManagement } from './banner-management/banner-management.component';
import { ForgetpasswordComponent } from './login/forgetpassword/forgetpassword.component';
import { ContestManagement } from './contests-management/contests-management.component';
import { BannerModalComponent } from './banner-management/bonus-modal/banner-modal.component';
import { SettingsComponent } from './settings/settings.component';
import { ViewEditComponent } from './quiz-management/view-edit/view-edit.component';
import { UserModalComponent } from './user-management/user-modal/user-modal.component';
import { AdminComponent } from './admin/admin.component';
import { WithdrownModalComponent } from './withdrown-transactions/withdrown-modal/withdrown-modal.component';
import { AddGameComponent } from './contests-management/add-game/add-game.component';
import { EditGameComponent } from './contests-management/edit-game/edit-game.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { SendNotificationComponent } from './send-notification/send-notification.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SharedLogic, DATE_TIME_FORMAT } from './core/shared-logic';
import { ChartsModule } from 'ng2-charts';
import { NotificationModelComponent } from './notification-list/notification-model/notification-model.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { MatRadioModule } from '@angular/material/radio';
import { GameTableComponent } from './contests-management/game-table/game-table.component';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { UserInfoComponent } from './contests-management/game-table/user-info/user-info.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { TdsComponent } from './tds/tds.component';
import { TdsModalComponent } from './tds/tds-modal/tds-modal.component';
import { TdsViewModalComponent } from './tds/tds-view-modal/tds-view-modal.component';
import { DepositGstComponent } from './deposit-gst/deposit-gst.component';

// export const DATETIME_FORMATS = {
//   parse: {
//     dateInput: 'l, L, LTS',
//   },
//   display: {
//     dateInput: 'DD/MM/YYYY HH:mm',
//     monthYearLabel: 'MM YYYY',
//     dateA11yLabel: 'DD/MM/YYYY HH:mm',
//     monthYearA11yLabel: 'MMMM-YYYY',
//   },
// };

registerLocaleData(localeFr, 'fr');
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ManagementTable,
    DashboardComponent,
    UserManagement,
    UserTransaction,
    WithdrownTransactions,
    BonusManagement,
    BonusModalComponent,
    AdminModalComponent,
    QuzeManagement,
    QuizModalComponent,
    BannerManagement,
    ForgetpasswordComponent,
    ContestManagement,
    BannerModalComponent,
    UpdatePasswordModalComponent,
    SettingsComponent,
    LoaderComponent,
    ViewEditComponent,
    UserModalComponent,
    AdminComponent,
    WithdrownModalComponent,
    UserWallet,
    AddGameComponent,
    EditGameComponent,
    UpdateProfileModalComponent,
    SendNotificationComponent,
    NotificationListComponent,

    NotificationModelComponent,
    GameTableComponent,
    UserInfoComponent,
    TdsComponent,
    TdsModalComponent,
    TdsViewModalComponent,
    DepositGstComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ToastrModule.forRoot(),
    MatDialogModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    ChartsModule,
    MatDatepickerModule,
    NgxMatMomentModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatRadioModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSelectModule
  ],
  providers: [
    { provide: APP_CONFIG, useValue: AppConfig },
    { provide: LOCALE_ID, useValue: 'fr' },
    // { provide: NGX_MAT_DATE_FORMATS, useValue: DATETIME_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'en' },
    AdminService,
    HttpClient,
    Cache,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ToastService,
    AuthGuardService,
    SharedLogic,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 