import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

import { UsuarioModel } from '../../models/usuario.model';

import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-login-github',
  templateUrl: 'login-github.html',
})
export class LoginGithubPage {

  private usuario: object;
  private dataGitHub: any;
  private jsonDataGitHub: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService,
    private usuarioModelo: UsuarioModel) {
      this.dataGitHub = this.navParams.data;
  }

  ionViewDidLoad() {
    console.debug("this.auth.getUser()", this.auth.getUser());
    console.log('ionViewDidLoad LoginGithubPage');
    this.getLoginAuth();
  }

  getLoginAuth() {
    this.dataGitHub = this.auth.getUser();
    console.log('dataGitHub ->', this.usuarioModelo.getObjUsu());
    if (this.dataGitHub.email &&
      this.dataGitHub.metadata.creationTime &&
      this.dataGitHub.metadata.lastSignInTime &&
      this.dataGitHub.displayName &&
      this.dataGitHub.photoURL &&
      this.dataGitHub.providerData["0"].providerId,
      this.dataGitHub.u
    ) {
      this.usuario = {
        email: this.dataGitHub.email,
        creationTime: this.dataGitHub.metadata.creationTime,
        lastSignInTime: this.dataGitHub.metadata.lastSignInTime,
        name: this.dataGitHub.displayName,
        picture: this.dataGitHub.photoURL,
        signInMethod: this.dataGitHub.providerData["0"].providerId,
        u: this.dataGitHub.u
      }
      this.jsonDataGitHub = JSON.stringify(this.dataGitHub, null, 4);
    }
    console.debug("this.usuario", this.usuario);
  }

  logout() {
    this.auth.signOut();
    this.navCtrl.setRoot(HomePage);
  }

}
