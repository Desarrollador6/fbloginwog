import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RegistroPage } from '../pages/registro/registro';
import { LoginGooglePage } from '../pages/login-google/login-google';
import { LoginEmailPage } from '../pages/login-email/login-email';
import { LoginGithubPage } from '../pages/login-github/login-github';

import { UsuarioModel } from '../models/usuario.model';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../commons/configuracion';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RegistroPage,
    LoginGooglePage,
    LoginEmailPage,
    LoginGithubPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    RegistroPage,
    LoginGooglePage,
    LoginEmailPage,
    LoginGithubPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    AuthService,
    UsuarioModel,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
