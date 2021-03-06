import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormGruposComponent } from './components/grupos/form-grupos/form-grupos.component';
import { GrillaGruposComponent } from './components/grupos/grilla-grupos/grilla-grupos.component';
import { HomeComponent } from './components/home/home.component';
import { ServicioTareaComponent } from './components/servicio-tarea/servicio-tarea.component';
import { FormServiciosComponent } from './components/servicios/form-servicios/form-servicios.component';
import { GrillaServiciosComponent } from './components/servicios/grilla-servicios/grilla-servicios.component';
import { TareaComponent } from './components/tarea/tarea.component';

const routes: Routes = [
  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  { path: 'home', component: HomeComponent },
  { path: 'tareas', component: TareaComponent },
  { path: 'grupos', component: GrillaGruposComponent },
  { path: 'grupos/form/:reason', component: FormGruposComponent },
  { path: 'servicios', component: GrillaServiciosComponent },
  { path: 'servicios/form/:reason', component: FormServiciosComponent },

  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
