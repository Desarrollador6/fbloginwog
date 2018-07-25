import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

import { UsuarioModel } from '../../models/usuario.model';

import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-login-google',
  templateUrl: 'login-google.html',
})
export class LoginGooglePage {

  private usuario: object;
  private dataGoogle: any;
  private jsonDataGoogle: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService,
    private usuarioModelo: UsuarioModel

  ) {
    this.dataGoogle = this.navParams.data;
    console.debug("Login dataGoogle", this.dataGoogle);
    console.debug("Login with typeof dataGoogle", typeof (this.dataGoogle));
    console.debug("this.auth.getEmail()", this.auth.getEmail());
    console.debug("this.auth.getUser()", this.auth.getUser());
    if (this.dataGoogle) {
      console.debug("Login with navparams", this.dataGoogle);
      this.dataGoogle = this.auth.getUser();
      console.debug("Login with navparams", this.dataGoogle);
      this.getLoginAuth();
    } else {
      this.getObjetoUsuario();
    }
  }

  ionViewDidLoad() {

  }

  getObjetoUsuario() {
    console.log('ionViewDidLoad LoginGooglePage -> dataGoogle', this.usuarioModelo.getObjUsu());
    if (
      this.dataGoogle.additionalUserInfo.profile &&
      this.dataGoogle.credential
    ) {
      this.usuario = {
        email: this.dataGoogle.additionalUserInfo.profile.email,
        hd: this.dataGoogle.additionalUserInfo.profile.hd,
        name: this.dataGoogle.additionalUserInfo.profile.name,
        picture: this.dataGoogle.additionalUserInfo.profile.picture,
        signInMethod: this.dataGoogle.credential.signInMethod,
        u: this.dataGoogle.user.u
      }
    }
    this.jsonDataGoogle = JSON.stringify(this.dataGoogle, null, 4);
    console.debug("this.usuario", this.usuario);
  }

  getLoginAuth() {
    console.log('ionViewDidLoad LoginGooglePage -> dataGoogle', this.usuarioModelo.getObjUsu());
    if (this.dataGoogle.email &&
      this.dataGoogle.X.currentUser.h.f.i &&
      this.dataGoogle.displayName &&
      this.dataGoogle.photoURL &&
      this.dataGoogle.providerData["0"].providerId &&
      this.dataGoogle.u
    ) {
      this.usuario = {
        email: this.dataGoogle.email,
        hd: this.dataGoogle.X.currentUser.h.f.i,
        name: this.dataGoogle.displayName,
        picture: this.dataGoogle.photoURL,
        signInMethod: this.dataGoogle.providerData["0"].providerId,
        u: this.dataGoogle.u
      }
      this.jsonDataGoogle = JSON.stringify(this.dataGoogle, null, 4);
    }
    console.debug("this.usuario", this.usuario);
  }

  logout() {
    this.auth.signOut();
    this.navCtrl.setRoot(HomePage);
  }

}
