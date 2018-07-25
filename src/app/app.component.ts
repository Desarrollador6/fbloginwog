import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';
import { MenuController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RegistroPage } from '../pages/registro/registro';
import { LoginGooglePage } from '../pages/login-google/login-google';
import { LoginEmailPage } from '../pages/login-email/login-email';
import { LoginGithubPage } from '../pages/login-github/login-github';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public auth: AuthService,
    public menu: MenuController
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.menuOffLogin();
  }

  menuOffLogin() {
    this.pages = [
      { title: 'Ingreso', component: HomePage },
      { title: 'Registro', component: RegistroPage }
    ];
  }

  menuOnLogin() {
    this.pages = [
      { title: 'Ingreso', component: HomePage },
      { title: 'Registro', component: RegistroPage },
      { title: 'Login Google', component: LoginGooglePage },
      { title: 'Login GitHub', component: LoginGithubPage },
      //{ title: 'Login Email', component: LoginEmailPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.auth.afAuth.authState
      .subscribe(
        user => {
          if (user) {
            this.menuOnLogin();
            //this.rootPage = HomePage;
          } else {
            this.menuOnLogin();
            //this.rootPage = RegistroPage;
          }
        },
        () => {
          this.rootPage = HomePage;
        }
      );
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  login() {
    this.menu.close();
    this.auth.signOut();
    this.nav.setRoot(ListPage);
  }

  logout() {
    this.menu.close();
    this.auth.signOut();
    this.nav.setRoot(HomePage);
  }

}
