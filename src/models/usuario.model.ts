import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioModel {
    private obj_usuario: any;
    private ciudadLogin: any;
    private regionLogin: any;

    constructor() {
    }

    public setCiudad(ciudad){
        this.ciudadLogin = ciudad;
    }
    public getCiudad(){
        return this.ciudadLogin;
    }

    public setRegion(region){
        this.regionLogin = region;
    }
    public getRegion(){
        return this.regionLogin;
    }

    setObjUsu(valor) {
        this.obj_usuario = valor;
    }

    getObjUsu() {
        return this.obj_usuario;
    }

    vaciarObjUsu() {
        this.obj_usuario = [];
    }
}