import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';

import { UsuarioModel } from '../models/usuario.model';

import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class AuthService {
    private user: firebase.User;

    constructor(
        public afAuth: AngularFireAuth,
        private toastCtrl: ToastController,
        private usuarioModelo: UsuarioModel
    ) {
        afAuth.authState.subscribe(user => {
            this.user = user;
        });
    }

    //Estados de persistencia https://firebase.google.com/docs/auth/web/auth-state-persistence?hl=es-419
    signInWithEmail(credentials) {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(data => {
                console.log('Sign in with email');
                // Existing and future Auth states are now persisted in the current
                // session only. Closing the window would clear any existing state even
                // if a user forgets to sign out.
                // ...
                // New sign-in will be persisted with session persistence.
                return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
                    credentials.password);
            })
            .catch(function (error) {
                console.log('Sign in with email error');
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
                    credentials.password);
            });
        return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
            credentials.password);
    }

    /** 
    * Funcion encargada de crear usuario, email y password
    */
    signUp(credentials) {
        return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
    }

    /** 
    * Funcion encargada de cerrar sesion y limpiar token de login
    */
    signOut(): Promise<void> {
        return this.afAuth.auth.signOut();
    }

    /** 
    * Funcion encargada de retornar el estado actual (login) de un usuario
    */
    get authenticated(): boolean {
        return this.user !== null;
    }

    /** 
    * Funcion encargada de retornar la data usuario
    */
    getUser() {
        return this.user;
    }

    /** 
    * Funcion encargada de retornar solo el email del usuario
    */
    getEmail() {
        return this.user && this.user.email;
    }

    signInWithGoogle() {
        console.log('Sign in with google');
        return this.oauthSignInGoogle(new firebase.auth.GoogleAuthProvider());
    }

    private oauthSignInGoogle(provider: AuthProvider) {
        this.presentToast("Calling oauthSignIn", "", "top");
        if (!(<any>window).cordova) { //Verifica si el proceso actual se esta ejecutando desde cordova
            console.debug("!(<any>window).cordova");
            return this.afAuth.auth.signInWithPopup(provider)
                .then(result => {
                    this.presentToast("signInWithPopup OK", result, "middle");
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    //var token = result.credential;
                    // The signed-in user info.
                    //var user = result.user;
                    console.debug("Data usuario", result);
                    this.usuarioModelo.setObjUsu(result);
                    return result;
                })
                .catch(error => {
                    this.presentToast("signInWithPopup ERROR", error, "middle");
                    // Handle Errors here.
                    //var errorCode = error.code;
                    //var errorMessage = error.message;
                    // The email of the user's account used.
                    //var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    //var credential = error.credential;
                    console.debug("Data error", error);
                    alert(error.message);
                    return error;
                });
        } else {
            console.debug("(<any>window).cordova");
            return this.afAuth.auth.signInWithRedirect(provider)
                .then(data => {
                    this.presentToast("signInWithRedirect OK", data, "middle");
                    console.debug("signInWithRedirect");
                    return this.afAuth.auth.getRedirectResult()
                        .then(result => {
                            this.presentToast("getRedirectResult OK", data, "bottom");
                            // This gives you a Google Access Token.
                            // You can use it to access the Google API.
                            let token = result.credential;
                            // The signed-in user info.
                            let user = result.user;
                            console.debug("Data usuario", result);
                        })
                        .catch(function (error) {
                            this.presentToast("getRedirectResult ERROR", error, "bottom");
                            console.debug(error);
                            // Handle Errors here.
                            alert(error.message);
                        });
                });
        }
    }

    signInWithGitHub() {
        console.log('Sign in with GitHub');
        return this.oauthSignInGitHub(new firebase.auth.GithubAuthProvider());
    }

    private oauthSignInGitHub(provider: AuthProvider) {
        this.presentToast("Calling oauthSignIn", "", "top");
        if (!(<any>window).cordova) {
            console.debug("!(<any>window).cordova");
            return this.afAuth.auth.signInWithPopup(provider)
                .then(result => {
                    this.presentToast("signInWithPopup OK", result, "middle");
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    //var token = result.credential;
                    // The signed-in user info.
                    //var user = result.user;
                    console.debug("Data usuario", result);
                    // ...
                })
                .catch(error => {
                    this.presentToast("signInWithPopup ERROR", error, "middle");
                    // Handle Errors here.
                    //var errorCode = error.code;
                    //var errorMessage = error.message;
                    // The email of the user's account used.
                    //var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    //var credential = error.credential;
                    console.debug("Data error", error);
                    alert(error.message);
                });
        } else {
            console.debug("(<any>window).cordova");
            return this.afAuth.auth.signInWithRedirect(provider)
                .then(data => {
                    this.presentToast("signInWithRedirect OK", data, "middle");
                    console.debug("signInWithRedirect");
                    return this.afAuth.auth.getRedirectResult()
                        .then(result => {
                            this.presentToast("getRedirectResult OK", data, "bottom");
                            // This gives you a Google Access Token.
                            // You can use it to access the Google API.
                            let token = result.credential;
                            // The signed-in user info.
                            let user = result.user;
                            console.debug("Data usuario", result);
                        })
                        .catch(function (error) {
                            this.presentToast("getRedirectResult ERROR", error, "bottom");
                            console.debug(error);
                            // Handle Errors here.
                            alert(error.message);
                        });
                });
        }
    }

    signInWithFacebook() {
        console.log('Sign in with facebook');
        return this.oauthSignInFacebook(new firebase.auth.FacebookAuthProvider());
    }

    private oauthSignInFacebook(provider: AuthProvider) {
        this.presentToast("Calling oauthSignIn", "", "top");
        if (!(<any>window).cordova) {
            console.debug("!(<any>window).cordova");
            return this.afAuth.auth.signInWithPopup(provider)
                .then(result => {
                    this.presentToast("signInWithPopup OK", result, "middle");
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    //var token = result.credential;
                    // The signed-in user info.
                    //var user = result.user;
                    console.debug("Data usuario", result);
                })
                .catch(error => {
                    this.presentToast("signInWithPopup ERROR", error, "middle");
                    // Handle Errors here.
                    //var errorCode = error.code;
                    //var errorMessage = error.message;
                    // The email of the user's account used.
                    //var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    //var credential = error.credential;
                    console.debug("Data error", error);
                    alert(error.message);
                });
        } else {
            console.debug("(<any>window).cordova");
            return this.afAuth.auth.signInWithRedirect(provider)
                .then(data => {
                    this.presentToast("signInWithRedirect OK", data, "middle");
                    console.debug("signInWithRedirect");
                    return this.afAuth.auth.getRedirectResult()
                        .then(result => {
                            this.presentToast("getRedirectResult OK", data, "bottom");
                            // This gives you a Google Access Token.
                            // You can use it to access the Google API.
                            let token = result.credential;
                            // The signed-in user info.
                            let user = result.user;
                            console.debug("Data usuario", result);
                        })
                        .catch(function (error) {
                            this.presentToast("getRedirectResult ERROR", error, "bottom");
                            console.debug(error);
                            // Handle Errors here.
                            alert(error.message);
                        });
                });
        }
    }

    presentToast(mensaje, data, position) {
        let toast = this.toastCtrl.create({
            message: mensaje + " " + data,
            duration: 3000,
            position: position
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

}