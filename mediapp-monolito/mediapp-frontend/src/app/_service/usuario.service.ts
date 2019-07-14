import { UsuarioRolDTO } from './../_model/usuarioRolDTO';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Usuario } from '../_model/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioCambio = new Subject<Usuario[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST_URL}/usuarioss`;
  constructor(private http: HttpClient) { }

  listarPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }
  listarPorId(id: number) {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  listar() {
    return this.http.get<Usuario[]>(this.url);
  }
  registrarUsuarioRol(usuarioRolDTO: UsuarioRolDTO) {
    return this.http.post(this.url, usuarioRolDTO);
  }
}
