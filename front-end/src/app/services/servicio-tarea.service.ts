import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServiceService } from '../core/api-service.service';
import { ConfigService } from '../core/config.service';
import { ServicioTarea } from '../models/servicio-tarea';

@Injectable({
  providedIn: 'root'
})
export class ServicioTareaService extends ApiServiceService<ServicioTarea> {

  constructor(
    protected http: HttpClient,
    protected app: ConfigService
  ) {
    super('servicio-tarea', http, app)
  }

}
