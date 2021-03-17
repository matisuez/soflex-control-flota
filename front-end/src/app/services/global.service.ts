import { Injectable } from '@angular/core';
import { GrupoServicio } from '../models/grupo-servicio';
import { ServicioTarea } from '../models/servicio-tarea';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  itemsServicioTarea: ServicioTarea[] = [];
  itemsGrupoServicio: GrupoServicio[] = [];

  constructor() { }
  
}
