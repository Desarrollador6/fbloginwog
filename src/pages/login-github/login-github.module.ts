import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginGithubPage } from './login-github';

@NgModule({
  declarations: [
    LoginGithubPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginGithubPage),
  ],
})
export class LoginGithubPageModule {}
