import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

import { UsuarioModel } from '../../models/usuario.model';

import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-login-email',
  templateUrl: 'login-email.html',
})
export class LoginEmailPage {

  private usuario: object;
  private dataCorreo: any;
  private jsonDataCorreo: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService,
    private usuarioModelo: UsuarioModel
  ) {
    this.dataCorreo = this.navParams.data;
    this.usuario = {
      email: "",
      creationTime: "",
      lastSignInTime: "",
      picture: "https://cdn-images-1.medium.com/max/1600/1*ipwpqQrHz0Lkd_5setXQCQ.png",
      signInMethod: "",
      u: ""
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginEmailPage -> dataGoogle', this.usuarioModelo.getObjUsu());
    console.log('ionViewDidLoad LoginEmailPage -> dataCorreo', this.dataCorreo);
    this.usuario = {
      email: this.dataCorreo.user.email,
      creationTime: this.dataCorreo.user.metadata.creationTime,
      lastSignInTime: this.dataCorreo.user.metadata.lastSignInTime,
      signInMethod: this.dataCorreo.user.W.app.options_.databaseURL,
      picture: "https://cdn-images-1.medium.com/max/1600/1*ipwpqQrHz0Lkd_5setXQCQ.png",
      u: this.dataCorreo.user.u
    }
    this.jsonDataCorreo = JSON.stringify(this.dataCorreo);
    console.debug("this.usuario", this.usuario);
  }

  logout() {
    this.auth.signOut();
    this.navCtrl.setRoot(HomePage);
  }

}
