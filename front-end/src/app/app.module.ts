import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';

import { ConfigService } from './core/config.service';
import { HomeComponent } from './components/home/home.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { ConfirmarComponent } from './shared/confirmar/confirmar.component';
import { GrillaGruposComponent } from './components/grupos/grilla-grupos/grilla-grupos.component';
import { FormGruposComponent } from './components/grupos/form-grupos/form-grupos.component';
import { GrillaServiciosComponent } from './components/servicios/grilla-servicios/grilla-servicios.component';
import { FormServiciosComponent } from './components/servicios/form-servicios/form-servicios.component';
import { ServicioTareaComponent } from './components/servicio-tarea/servicio-tarea.component';
import { GrupoServicioComponent } from './components/grupo-servicio/grupo-servicio.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TareaComponent,
    ConfirmarComponent,
    GrillaGruposComponent,
    FormGruposComponent,
    GrillaServiciosComponent,
    FormServiciosComponent,
    ServicioTareaComponent,
    GrupoServicioComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSortModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule
  ],
  providers: [
    ConfigService,
    { provide: APP_INITIALIZER, useFactory: loadConfig, deps: [ConfigService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function loadConfig(config: ConfigService) {
  return () => config.load();
}
