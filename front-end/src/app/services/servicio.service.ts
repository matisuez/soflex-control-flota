import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServiceService } from '../core/api-service.service';
import { ConfigService } from '../core/config.service';
import { Servicio } from '../models/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService extends ApiServiceService<Servicio> {

  constructor(
    protected http: HttpClient,
    protected app: ConfigService
  ) { 
    super('servicio', http, app);
  }
}
