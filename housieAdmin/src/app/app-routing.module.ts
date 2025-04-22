import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './_shared/services/auth.service';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagement } from './user-management/user-management.component';
import { AdminComponent } from './admin/admin.component';
import { UserTransaction } from './user-transactions/user-transactions.component';
import { WithdrownTransactions } from './withdrown-transactions/withdrown-transactions.component';
import { UserWallet } from './user-wallet/user-wallet.component';
// import { BonusManagement } from './bonus-management/bonus-management.component';
import { QuzeManagement } from './quiz-management/quiz-management.component';
import { BannerManagement } from './banner-management/banner-management.component';
import { ForgetpasswordComponent } from './login/forgetpassword/forgetpassword.component';
import { ContestManagement } from './contests-management/contests-management.component';
import { SettingsComponent } from './settings/settings.component';
import { ViewEditComponent } from './quiz-management/view-edit/view-edit.component';
import { AddGameComponent } from './contests-management/add-game/add-game.component';
import { EditGameComponent } from './contests-management/edit-game/edit-game.component';
import { SendNotificationComponent } from './send-notification/send-notification.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { UserInfoComponent } from './contests-management/game-table/user-info/user-info.component';
import { TdsComponent } from './tds/tds.component';
import {DepositGstComponent} from './deposit-gst/deposit-gst.component'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgetpasswordComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'user-management', component: UserManagement, canActivate: [AuthGuardService] },
  { path: 'admin-management', component: AdminComponent, canActivate: [AuthGuardService] },
  { path: 'user-transaction', component: UserTransaction, canActivate: [AuthGuardService] },
  { path: 'withdrown-transactions', component: WithdrownTransactions, canActivate: [AuthGuardService] },
  { path: 'user-wallet', component: UserWallet, canActivate: [AuthGuardService] },
  // { path: 'bonus-management', component: BonusManagement, canActivate: [AuthGuardService] },
  { path: 'quiz-management', component: QuzeManagement, canActivate: [AuthGuardService] },
  { path: 'banner-management', component: BannerManagement, canActivate: [AuthGuardService] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService] },
  { path: 'ViewEdit/:id', component: ViewEditComponent, canActivate: [AuthGuardService] },
  { path: 'send-notification', component: SendNotificationComponent, canActivate: [AuthGuardService] },
  { path: 'notification-list', component: NotificationListComponent, canActivate: [AuthGuardService] },
  { path: 'tds', component: TdsComponent, canActivate: [AuthGuardService] },
  { path: 'deposit-gst', component: DepositGstComponent, canActivate: [AuthGuardService] },
  {
    path: 'contest-management',
    children: [
      { path: '', component: ContestManagement, canActivate: [AuthGuardService] },
      { path: 'add-game', component: AddGameComponent, canActivate: [AuthGuardService] },
      { path: 'user-info/:id', component: UserInfoComponent, canActivate: [AuthGuardService] },
      { path: 'edit-game/:id', component: AddGameComponent, canActivate: [AuthGuardService] },
      { path: 'game-info/:id', component: UserInfoComponent, canActivate: [AuthGuardService] },
    ]
  },
  // { path: 'add-game', component: AddGameComponent}
  {path: '**' , component: DashboardComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false })
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
