import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServiceService } from '../core/api-service.service';
import { ConfigService } from '../core/config.service';
import { Tarea } from '../models/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService extends ApiServiceService<Tarea> {

  constructor(
    protected http: HttpClient,
    protected app: ConfigService
  ) { 
    super('tarea', http, app);
  }

}
