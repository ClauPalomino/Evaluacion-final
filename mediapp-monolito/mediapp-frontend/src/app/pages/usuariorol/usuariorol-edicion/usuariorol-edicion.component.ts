import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Rol } from 'src/app/_model/rol';
import { RolService } from 'src/app/_service/rol.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Usuario } from 'src/app/_model/usuario';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { UsuarioRolDTO } from 'src/app/_model/usuarioRolDTO';
@Component({
  selector: 'app-usuariorol-edicion',
  templateUrl: './usuariorol-edicion.component.html',
  styleUrls: ['./usuariorol-edicion.component.css']
})
export class UsuariorolEdicionComponent implements OnInit {
  form: FormGroup;
  id: number;
  usuario: Usuario;
  
  roles: Rol[] = [];
  rolSeleccionado: Rol
  rolesSeleccionados: Rol[] = [];

  mensaje: string;
  
  
  displayedColumns = ['id', 'nombre','descripcion'];
  dataSource: MatTableDataSource<Rol>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private builder: FormBuilder,private usuarioService: UsuarioService,private rolService: RolService, private route: ActivatedRoute, private router: Router,public snackBar: MatSnackBar) {    
  }

  ngOnInit() {
    this.usuario = new Usuario();    
    this.route.params.subscribe((params: Params) => {
    this.id = params['id'];
    this.initForm();      
    });

    
    this.form = this.builder.group({     
      'username': new FormControl({value: '', disabled: true})
    })

    this.rolService.listarPorUsuario(this.id).subscribe(
      
      data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    });

    this.listarRoles();    

    }

  initForm(){
    
      this.usuarioService.listarPorId(this.id).subscribe(data => {
        let id = data.idUsuario;
        let username = data.username;    
        this.form = new FormGroup({
          'id': new FormControl(id),
          'username': new FormControl(username)    
        });
      });
  
    
  }

  agregarRol() {
    if (this.rolSeleccionado) {
      let cont = 0;
      for (let i = 0; i < this.rolesSeleccionados.length; i++) {
        let rol = this.rolesSeleccionados[i];
        if (rol.idRol === this.rolSeleccionado.idRol) {
          cont++;
          break;
        }
      }
      if (cont > 0) {
        this.mensaje = `El rol se encuentra en la lista`;
        this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
      } else {
        this.rolesSeleccionados.push(this.rolSeleccionado);
      }
    } else {
      this.mensaje = `Debe agregar un rol`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }

 
  listarRoles() {
    this.rolService.listar().subscribe(data => {
      this.roles = data;
    })
  }

  estadoBotonRegistrar() {
    return ( this.rolSeleccionado === null );
  }

  removerRol(index: number) {
    this.rolesSeleccionados.splice(index, 1);
  }
  
  limpiarControles() {
  
    this.rolesSeleccionados = [];
    this.rolSeleccionado = null;
    this.mensaje = '';
  }

  
  aceptar() {

    let usuarioRolDTO = new UsuarioRolDTO();
    usuarioRolDTO.idUsuario = this.id;
    usuarioRolDTO.roles = this.rolesSeleccionados;
       
    this.usuarioService.registrarUsuarioRol(usuarioRolDTO).subscribe(() => {
      this.snackBar.open("Se asignaron los roles", "Aviso", { duration: 2000 });

      this.rolService.listarPorUsuario(this.id).subscribe(
      
        data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
      });

      setTimeout(() => {
        this.limpiarControles();
      }, 2000);
    });
    
    
  }

}
