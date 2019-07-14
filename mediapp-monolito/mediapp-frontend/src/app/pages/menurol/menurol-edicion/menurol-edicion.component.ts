import { Component, OnInit, ViewChild } from '@angular/core';
import { Menu } from './../../../_model/menu';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MenuService } from './../../../_service/menu.service';
import { Rol } from 'src/app/_model/rol';
import { RolService } from 'src/app/_service/rol.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MenuRolDTO } from 'src/app/_model/menuRolDTO';
import { DISABLED } from '@angular/forms/src/model';
@Component({
  selector: 'app-menurol-edicion',
  templateUrl: './menurol-edicion.component.html',
  styleUrls: ['./menurol-edicion.component.css']
})
export class MenurolEdicionComponent implements OnInit {
  form: FormGroup;
  id: number;
  menu: Menu;
  
  roles: Rol[] = [];
  rolSeleccionado: Rol
  rolesSeleccionados: Rol[] = [];

  mensaje: string;
  
  displayedColumns = ['id', 'nombre','descripcion'];
  dataSource: MatTableDataSource<Rol>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private builder: FormBuilder,private menuService: MenuService,private rolService: RolService, private route: ActivatedRoute, private router: Router,public snackBar: MatSnackBar) {    
  }

  ngOnInit() {
    this.menu = new Menu();    
    this.route.params.subscribe((params: Params) => {
    this.id = params['id'];
    this.initForm();      
    });

    
    this.form = this.builder.group({     
      'nombre': new FormControl({value: '', disabled: true})
    })

    this.rolService.listarPorMenu(this.id).subscribe(
      
      data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    });

    this.listarRoles();       
    
    
    }

  initForm(){
    
      this.menuService.listarPorId(this.id).subscribe(data => {
        let id = data.idMenu;
        let nombre = data.nombre;    
        this.form = new FormGroup({
          'id': new FormControl(id),
          'nombre': new FormControl(nombre)    
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

    let menuRolDTO = new MenuRolDTO();
    menuRolDTO.idMenu = this.id;
    menuRolDTO.roles = this.rolesSeleccionados;
       
    this.menuService.registrarMenuRol(menuRolDTO).subscribe(() => {
      this.snackBar.open("Se asignaron los roles", "Aviso", { duration: 2000 });
      this.rolService.listarPorMenu(this.id).subscribe(
      
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
