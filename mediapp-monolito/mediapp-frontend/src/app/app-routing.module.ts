import { TokenComponent } from './login/recuperar/token/token.component';
import { Not401Component } from './pages/not401/not401.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { EspecialComponent } from './pages/consulta/especial/especial.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicoComponent } from './pages/medico/medico.component';
import { LoginComponent } from './login/login.component';
import { GuardService } from './_service/guard.service';
import { RecuperarComponent } from './login/recuperar/recuperar.component';
import { RolEdicionComponent } from './pages/rol/rol-edicion/rol-edicion.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuEdicionComponent } from './pages/menu/menu-edicion/menu-edicion.component';
import { RolComponent } from './pages/rol/rol.component';
import { MenurolComponent } from './pages/menurol/menurol.component';
import { MenurolEdicionComponent } from './pages/menurol/menurol-edicion/menurol-edicion.component';
import { UsuariorolComponent } from './pages/usuariorol/usuariorol.component';
import { UsuariorolEdicionComponent } from './pages/usuariorol/usuariorol-edicion/usuariorol-edicion.component';

const routes: Routes = [
  {
    path: 'paciente', component: PacienteComponent, children: [
      { path: 'nuevo', component: PacienteEdicionComponent },
      { path: 'edicion/:id', component: PacienteEdicionComponent }
    ], canActivate: [GuardService]
  },
  {
    path: 'especialidad', component: EspecialidadComponent, children: [
      { path: 'nuevo', component: EspecialidadEdicionComponent },
      { path: 'edicion/:id', component: EspecialidadEdicionComponent }
    ], canActivate: [GuardService]
  },
  {
    path: 'examen', component: ExamenComponent, children: [
      { path: 'nuevo', component: ExamenEdicionComponent },
      { path: 'edicion/:id', component: ExamenEdicionComponent }
    ], canActivate: [GuardService]
  },
  { path: 'medico', component: MedicoComponent, canActivate: [GuardService] },
  { path: 'consulta', component: ConsultaComponent, canActivate: [GuardService] },
  { path: 'consulta-especial', component: EspecialComponent, canActivate: [GuardService] },
  { path: 'buscar', component: BuscarComponent, canActivate: [GuardService] },
  { path: 'reporte', component: ReporteComponent, canActivate: [GuardService] },
  { path: 'not-401', component: Not401Component },
  { path: 'login', component: LoginComponent },
  {
    path: 'recuperar', component: RecuperarComponent, children: [
      { path: ':token', component: TokenComponent }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'rol', component: RolComponent, children: [
      { path: 'nuevo', component: RolEdicionComponent },
      { path: 'edicion/:id', component: RolEdicionComponent }
    ], canActivate: [GuardService]
  },
  {
    path: 'menu', component: MenuComponent, children: [
      { path: 'nuevo', component: MenuEdicionComponent },
      { path: 'edicion/:id', component: MenuEdicionComponent }
    ], canActivate: [GuardService]
  },
  {
    path: 'menurol', component: MenurolComponent, children: [
      { path: 'edicion/:id', component: MenurolEdicionComponent }
    ], canActivate: [GuardService]
  },
  
  {
    path: 'usuariorol', component: UsuariorolComponent, children: [
      { path: 'edicion/:id', component: UsuariorolEdicionComponent }
    ], canActivate: [GuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
