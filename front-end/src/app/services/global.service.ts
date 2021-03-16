import { Injectable } from '@angular/core';
import { ServicioTarea } from '../models/servicio-tarea';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  itemsServicioTarea: ServicioTarea[] = [];

  constructor() { }
}
