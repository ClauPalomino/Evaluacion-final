import { Component, OnInit } from '@angular/core';
import { Rol } from './../../../_model/rol';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RolService } from './../../../_service/rol.service';

@Component({
  selector: 'app-rol-edicion',
  templateUrl: './rol-edicion.component.html',
  styleUrls: ['./rol-edicion.component.css']
})
export class RolEdicionComponent implements OnInit {

  
  id: number;
  rol: Rol;
  form: FormGroup;
  edicion: boolean = false;

  constructor(private rolService: RolService, private route: ActivatedRoute, private router: Router) {    
  }

  ngOnInit() {
    
    this.rol = new Rol();
    
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl(''),
      'descripcion': new FormControl('')
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm(){
    if (this.edicion) {
      this.rolService.listarPorId(this.id).subscribe(data => {
        let id = data.idRol;
        let nombre = data.nombre;
        let descripcion=data.descripcion;
        this.form = new FormGroup({
          'id': new FormControl(id),
          'nombre': new FormControl(nombre),
          'descripcion': new FormControl(descripcion)
        });
      });
    }
  }

  operar() {
    this.rol.idRol = this.form.value['id'];
    this.rol.nombre = this.form.value['nombre'];
    this.rol.descripcion = this.form.value['descripcion'];

    if (this.rol != null && this.rol.idRol > 0) {
      this.rolService.modificar(this.rol).subscribe(data => {
        this.rolService.listar().subscribe(rol => {
          this.rolService.rolesCambio.next(rol);
          this.rolService.mensajeCambio.next("Se modificó");
        });
      });
    } else {
      this.rolService.registrar(this.rol).subscribe(data => {        
        this.rolService.listar().subscribe(rol => {
          this.rolService.rolesCambio.next(rol);
          this.rolService.mensajeCambio.next("Se registró");
        });
      });
    }

    this.router.navigate(['rol']);
  }


}
