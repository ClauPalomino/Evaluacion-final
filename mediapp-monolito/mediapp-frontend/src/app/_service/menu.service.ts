import { MenuRolDTO } from './../_model/menuRolDTO';
import { Subject } from 'rxjs';
import { Menu } from './../_model/menu';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  
  menuCambio = new Subject<Menu[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST_URL}/menus`;

  constructor(private http: HttpClient) { }

  listar(){
    let access_token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME)).access_token;
    return this.http.get<Menu[]>(`${this.url}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarMenu() {
    return this.http.get<Menu[]>(this.url);
  }

  listarPorUsuario(nombre: string) {
    let access_token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME)).access_token;
    return this.http.post<Menu[]>(`${this.url}/usuario`, nombre, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  registrar(menu: Menu) {
    return this.http.post(this.url, menu);
  }

 
  registrarMenuRol(menuRolDTO: MenuRolDTO) {
    return this.http.post(this.url, menuRolDTO);
  }
  modificar(menu: Menu) {
    return this.http.put(this.url, menu);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  listarPorId(id: number) {
    return this.http.get<Menu>(`${this.url}/${id}`);
  }
  
}
