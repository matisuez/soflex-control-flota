import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiServiceService } from '../core/api-service.service';
import { ConfigService } from '../core/config.service';
import { GrupoServicio } from '../models/grupo-servicio';

@Injectable({
  providedIn: 'root'
})
export class GrupoServicioService extends ApiServiceService<GrupoServicio> {

  constructor(
    protected http: HttpClient,
    protected app: ConfigService
  ) {
    super('grupo-servicio', http, app);
  }
  
}
