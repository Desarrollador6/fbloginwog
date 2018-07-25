import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { ToastController } from 'ionic-angular';

import { UsuarioModel } from '../../models/usuario.model';

import { RegistroPage } from '../registro/registro';
import { ListPage } from '../list/list';
import { LoginGooglePage } from '../login-google/login-google';
import { LoginEmailPage } from '../login-email/login-email';
import { LoginGithubPage } from '../login-github/login-github';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loginForm: FormGroup;
  loginError: string;

  constructor(
    private navCtrl: NavController,
    private auth: AuthService,
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private usuarioModelo: UsuarioModel
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ionViewDidLoad() {
    console.debug("HomePage");
  }

  login() {
    let data = this.loginForm.value;

    if (!data.email) {
      return;
    }

    let credentials = {
      email: data.email,
      password: data.password
    };
    this.auth.signInWithEmail(credentials)
      .then(
        data => {
          console.debug("Ok", data);
          this.usuarioModelo.setObjUsu(data);
          this.navCtrl.setRoot(LoginEmailPage, data);
        },
        error => {
          console.debug("error", error);
          this.loginError = error.message
        },
    );
  }

  loginWithGoogle() {
    this.auth.signInWithGoogle()
      .then(
        data => {
          this.presentToast("loginWithGoogle", data);
          console.debug("data signInWithGoogle", data);
          this.navCtrl.setRoot(LoginGooglePage, data);
        },
        error => {
          this.presentToast("error", error);
          console.debug("error signInWithGoogle", error)
          console.debug(error.message)
        });
  }

  loginWithGitHub(){
    this.auth.signInWithGoogle()
      .then(
        data => {
          this.presentToast("loginWithGitHub", data);
          console.debug("data signInWithGitHub", data);
          this.navCtrl.setRoot(LoginGithubPage, data);
        },
        error => {
          this.presentToast("error", error);
          console.debug("error signInWithGitHub", error)
          console.debug(error.message)
        });
  }

  loginWithFacebook() {
    this.auth.signInWithFacebook()
      .then(
        data => {
          this.presentToast("signInWithFacebook", data);
          console.debug("data signInWithFacebook");
          this.navCtrl.setRoot(LoginGooglePage, data);
        },
        error => {
          this.presentToast("error", error);
          console.debug("error signInWithFacebook")
          console.debug(error.message)
        });
  }

  signup() {
    this.navCtrl.push(RegistroPage);
  }

  presentToast(mensaje, data) {
    let toast = this.toastCtrl.create({
      message: mensaje + " " + data,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
