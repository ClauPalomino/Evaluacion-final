import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Rol } from '../_model/rol';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  rolesCambio= new Subject<Rol []>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST_URL}/roles`;

  constructor(private http: HttpClient) {}

 listar() {
    return this.http.get<Rol[]>(this.url);
  }

  listarPorId(id: number) {
    return this.http.get<Rol>(`${this.url}/${id}`);
  }

  registrar(rol: Rol) {
    return this.http.post(this.url, rol);
  }

  modificar(rol: Rol) {
    return this.http.put(this.url, rol);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  listarPorMenu(idMenu: number) {
    let access_token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME)).access_token;
    return this.http.post<Rol[]>(`${this.url}/menu`,idMenu, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarPorUsuario(idUsuario: number) {
    let access_token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME)).access_token;
    return this.http.post<Rol[]>(`${this.url}/usuario`,idUsuario, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  
  }

