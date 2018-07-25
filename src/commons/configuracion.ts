import { Injectable } from '@angular/core';


@Injectable()
export class AppConfig {

    private configuracion;
    private rolesApp;
    //INFORMACION EQUIPO
    public model; platform; uuid; versionD; manufacturer; isVirtual; serial;
    public objetoDispositivo: any = {};
    public objetoDispositivoLocal: any = {};
    private tiempos: any;
    private tutorial: any;

    constructor() {
        this.conf();
        this.roles();
        this.tiempos = 0;
        this.tutorial = false;
    }

    private conf() {
        this.configuracion = {
            Url: 'https://190.144.36.196:1004',
            Paths: '/bmovilservices/wog/',

            //Powwi
            OrgId: '20',
            OrgUUID: '20CEA5081E844B979766D786E70520EA',
            AdClientId: '0',
            Nombre: 'Powwi',
            Host: 'http://test.powwi.co',
            Color2: '#09315e',
            CodigoPais: '057',
            CodigoCoop: '0001',
            Version: '1.3.145',
            Estado: 'PB',                    //PB PRUEBAS - PD PRODUCCION
            Fecha: '2017-05-23',
            Ip: '',
            Id_aplicativo_ios: 'www.powwi.co',
            Id_aplicativo_android: 'www.powwi.co',
            Consola: true,
            dispositivoLocal: true,         //Define si se va a usar un dispositivo local para pruebas locales, recordar dejar en FALSE para compilar versión de produccion
            OrigenOperacionApps: "APPS",    //4CHAR, ORIGEN DE OPERACION PARA LOGIN
            OrigenOperacion: "PGDE",        //4CHAR, ORIGEN DE OPERACION PARA GIROS
            OrigenCompra: "CPAY",           // ORIGEN DE OPERACION PARA COMPRAS
            OrigenTransferencia: "APPM",    // ORIGEN DE OPERACION PARA TRANSFERENCIA
            OrigenRecarga: "RCMO",          // ORIGEN DE OPERACION PARA RECARGAS A CELULAR
            OrigenOperacionUsuario: 'Powwi app', // ORIGEN DE OPERACIÓN VISUAL MAS QUE TgODO, PARA INDICARLE AL USUARIO DE DONDE NACE LA OPERACIÓN
            OrigenOperacionCorresponsal: 'Powwi punto',  // ORIGEN DE OPERACIÓN VISUAL MAS QUE TODO, PARA INDICARLE AL CORRESPONSAL DE DONDE NACE LA OPERACIÓN
            OrigenOperacionComercio: 'Powwi comercio',  // ORIGEN DE OPERACIÓN VISUAL MAS QUE TODO, PARA INDICARLE AL COMERCIO DE DONDE NACE LA OPERACIÓN
            RedSocial: {
                facebook: 'https://www.facebook.com/PowwiCo-2114548735445801',
                twitter: 'https://twitter.com/PowwiCo',
                instagram: 'https://www.instagram.com/PowwiCo',
            },
            FireBase: {
                apiKey: "AIzaSyCrYqbz-TCzrleYG2K_6OJD3QEOto_IES0",
                authDomain: "wogloginapp.firebaseapp.com",
                databaseURL: "https://wogloginapp.firebaseio.com",
                projectId: "wogloginapp",
                storageBucket: "wogloginapp.appspot.com",
                messagingSenderId: "889189792647"
            }
        }
    }
    //Tutoriales
    //https://medium.com/appseed-io/integrating-firebase-password-and-google-authentication-into-your-ionic-3-app-2421cee32db9
    //https://javebratt.com/ionic-social-login-firebase/
    //FireBase@4.6.0
    //Plugins Instalados
    //ionic cordova plugin add cordova-universal-links-plugin --save
    //cordova plugin add cordova-plugin-buildinfo
    //cordova plugin add cordova-plugin-browsertab
    //cordova plugin add cordova-plugin-inappbrowser
    //ionic cordova plugin add cordova-plugin-customurlscheme --variable \  URL_SCHEME=com.firebase.cordova --save


    public roles() {
        let rol = this.getConf().OrgId;
        this.rolesApp = {
            rolCliente: parseFloat(rol + "8"),
            rolComercio: parseFloat(rol + "7"),
            rolCorresponsal: parseFloat(rol + "0001"),
            rolMixto: parseFloat(rol + "0002")
        }
    }

    public getConf() {
        return this.configuracion;
    }

    public getRoles() {
        return this.rolesApp;
    }

    //TIEMPO ENCARGADO DE DEFINIR LA INACTIVIDAD DEL APP PARA CERRAR SESION, SE DEFINE EN MILISEGUNDOS
    public getTiemposApp() {
        return this.tiempos;
    }

    public setTiemposApp(valor) {
        this.tiempos = valor;
    }

    public getTutorial() {
        return this.tutorial;
    }

    public setTutorial(valor) {
        this.tutorial = valor;
    }

}

export const firebaseConfig = {
    fire: {
        apiKey: "AIzaSyCrYqbz-TCzrleYG2K_6OJD3QEOto_IES0",
        authDomain: "wogloginapp.firebaseapp.com",
        databaseURL: "https://wogloginapp.firebaseio.com",
        projectId: "wogloginapp",
        storageBucket: "wogloginapp.appspot.com",
        messagingSenderId: "889189792647"
    }
};
