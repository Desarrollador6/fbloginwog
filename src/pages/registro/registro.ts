import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { HomePage } from '../../pages/home/home';
import { LoginEmailPage } from '../../pages/login-email/login-email';


@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  signupError: string;
  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public auth: AuthService
  ) {
    this.form = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  signup() {
    let data = this.form.value;
    let credentials = {
      email: data.email,
      password: data.password
    };
    this.auth.signUp(credentials)
      .then(
        data => {
          console.debug("Ok", data);
          //this.navCtrl.setRoot(HomePage);
          this.navCtrl.setRoot(LoginEmailPage, data);
        },
        error => {
          console.debug("Ok", error);
          this.signupError = error.message;
        }
      );
  }

}
